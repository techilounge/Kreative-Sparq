import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const origin = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const publicOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreativesparq.com"
).replace(/\/$/, "");
const content = JSON.parse(
  readFileSync(new URL("../content/services.json", import.meta.url), "utf8"),
);
const routeContent = [content.overview, ...content.details];
const smokeWidths = [360, 768, 1440];
const themes = ["light", "dark"];

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function ctaHref(label) {
  if (/work/i.test(label)) return "/work";
  if (/services/i.test(label)) return "/services";
  return "/contact";
}

async function visit(page, path, theme, width) {
  await page.setViewportSize({
    width,
    height: width < 600 ? 844 : width < 1024 ? 1024 : 900,
  });
  await page.goto(path, { waitUntil: "domcontentloaded" });
  if (width < 1024) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("combobox", { name: "Choose colour theme" })
      .selectOption(theme);
    await page.getByRole("button", { name: "Close menu" }).click();
  } else {
    await page
      .getByRole("combobox", { name: "Choose colour theme" })
      .selectOption(theme);
  }
  assert.equal(await page.locator("html").getAttribute("data-theme"), theme);
  assert.equal(await page.locator("main h1").isVisible(), true);
}

async function expectCopy(page, pageContent) {
  const allText = normalize((await page.locator("main").textContent()) ?? "");
  for (const field of ["H1", "Hero body", "Primary CTA", "Secondary CTA"]) {
    if (
      field === "Secondary CTA" &&
      ctaHref(pageContent.fields["Primary CTA"]) ===
        ctaHref(pageContent.fields["Secondary CTA"])
    ) {
      continue;
    }
    assert.ok(
      allText.includes(pageContent.fields[field]),
      `${pageContent.fields.Route}: missing ${field}`,
    );
  }
  for (const section of pageContent.sections) {
    const primaryAction = section.blocks.find(
      (block) => block.type === "field" && block.label === "Primary CTA",
    )?.text;
    for (const block of section.blocks) {
      if (
        block.type === "field" &&
        block.label === "Secondary CTA" &&
        primaryAction &&
        ctaHref(primaryAction) === ctaHref(block.text)
      ) {
        continue;
      }
      if (block.type === "list") {
        for (const item of block.items) {
          if (section.heading === "Service finder") {
            const match = item.match(/^(.*?\.) (Start with .+\.)$/);
            assert.ok(match, `Could not parse service finder item: ${item}`);
            assert.ok(allText.includes(match[1]));
            assert.ok(allText.includes(match[2]));
          } else {
            assert.ok(
              allText.includes(item),
              `${pageContent.fields.Route}: missing ${section.heading} item`,
            );
          }
        }
      } else if (
        block.type !== "field" ||
        ![
          "Route",
          "SEO title",
          "Meta description",
          "Open Graph title",
        ].includes(block.label)
      ) {
        assert.ok(
          allText.includes(block.text),
          `${pageContent.fields.Route}: missing ${section.heading} copy`,
        );
      }
    }
  }
}

async function expectMetadata(page, pageContent) {
  const route = pageContent.fields.Route;
  assert.equal(await page.title(), pageContent.fields["SEO title"]);
  assert.equal(
    await page.locator('meta[name="description"]').getAttribute("content"),
    pageContent.fields["Meta description"],
  );
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    `${publicOrigin}${route}`,
  );
  assert.equal(
    await page.locator('meta[property="og:title"]').getAttribute("content"),
    pageContent.fields["Open Graph title"] ?? pageContent.fields["SEO title"],
  );
  assert.equal(
    await page
      .locator('meta[property="og:description"]')
      .getAttribute("content"),
    pageContent.fields["Meta description"],
  );
  assert.equal(
    await page.locator('meta[property="og:url"]').getAttribute("content"),
    `${publicOrigin}${route}`,
  );
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  if (route === "/services") {
    assert.equal(
      scripts.length,
      0,
      "Services overview has no visible breadcrumb and must not publish breadcrumb data",
    );
  } else {
    assert.equal(scripts.length, 1);
    const data = JSON.parse(scripts[0]);
    const nodes = Array.isArray(data) ? data : [data];
    const breadcrumbs = nodes.find(
      (node) => node["@type"] === "BreadcrumbList",
    );
    assert.equal(breadcrumbs?.["@context"], "https://schema.org");
    assert.equal(
      breadcrumbs.itemListElement.at(-1).item,
      `${publicOrigin}${route}`,
    );
    const service = nodes.find((node) => node["@type"] === "Service");
    assert.equal(service?.url, `${publicOrigin}${route}`);
    assert.equal(service?.description, pageContent.fields["Hero body"]);
    assert.equal(service?.provider?.name, "Kreative Sparq");
    assert.equal(
      "areaServed" in service,
      false,
      `${route}: unverified geographic service coverage must be omitted`,
    );
  }
}

async function validateRoute(browser, pageContent) {
  const route = pageContent.fields.Route;
  const context = await browser.newContext({ baseURL: origin });
  const page = await context.newPage();
  page.setDefaultTimeout(15_000);

  try {
    for (const width of smokeWidths) {
      for (const theme of themes) {
        await visit(page, route, theme, width);
        assert.equal(
          normalize(await page.getByRole("heading", { level: 1 }).innerText()),
          pageContent.fields.H1,
        );
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1,
          ),
          true,
          `${route} ${theme} ${width}px has horizontal overflow`,
        );
        if (route === "/services") {
          assert.equal(
            await page.locator(".services-catalogue__item").count(),
            6,
          );
          assert.equal(
            await page.locator(".services-finder__list a").count(),
            6,
          );
        } else {
          const heroImage = page.locator(
            ".service-detail-hero .editorial-hero-media img",
          );
          await heroImage.scrollIntoViewIfNeeded();
          await heroImage.waitFor({ state: "visible" });
          assert.equal(
            await heroImage.evaluate(async (element) => {
              if (!element.complete || element.naturalWidth === 0) {
                await new Promise((resolve, reject) => {
                  element.addEventListener("load", resolve, { once: true });
                  element.addEventListener("error", reject, { once: true });
                });
              }
              await element.decode();
              return element.naturalWidth > 0;
            }),
            true,
          );
          assert.equal(
            await page.locator(".services-faq-list details").count(),
            route.includes("brand-strategy") ||
              route.includes("creative-design")
              ? 4
              : 5,
          );
          assert.match(
            (await page
              .locator(".services-related-list a")
              .first()
              .getAttribute("href")) ?? "",
            /^\/services\//,
          );
        }
        const routeHero = page.locator(".editorial-image-hero img").first();
        await routeHero.waitFor({ state: "visible" });
        assert.equal(
          await routeHero.evaluate(async (element) => {
            if (!element.complete || element.naturalWidth === 0) {
              await new Promise((resolve, reject) => {
                element.addEventListener("load", resolve, { once: true });
                element.addEventListener("error", reject, { once: true });
              });
            }
            await element.decode();
            return element.naturalWidth > 0;
          }),
          true,
        );
        if (width === 360 || width === 1440) {
          const scan = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
            .analyze();
          assert.deepEqual(
            scan.violations.map((violation) => violation.id),
            [],
            `${route} ${theme} ${width}px axe violations`,
          );
        }
      }
    }

    await visit(page, route, "light", 1440);
    await expectCopy(page, pageContent);
    await expectMetadata(page, pageContent);
    if (route === "/services") {
      for (const detail of content.details) {
        assert.equal(
          await page
            .locator(
              `.services-catalogue__item a[href="${detail.fields.Route}"]`,
            )
            .count(),
          1,
        );
        assert.equal(
          await page
            .locator(`.services-finder__list a[href="${detail.fields.Route}"]`)
            .count(),
          1,
        );
      }
    } else {
      assert.equal(
        await page
          .locator('.service-breadcrumb a[href="/services"]')
          .isVisible(),
        true,
      );
      for (const link of await page.locator(".services-related-list a").all()) {
        const href = await link.getAttribute("href");
        assert.ok(
          content.details.some((detail) => detail.fields.Route === href),
          `${route}: invalid related service link ${href}`,
        );
      }
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .getByRole("link", { name: "Skip to content" })
        .evaluate((element) => element === document.activeElement),
      true,
      `${route}: skip link is not first in keyboard order`,
    );
    assert.equal(
      await page
        .getByRole("button", { name: "Open menu" })
        .getAttribute("aria-expanded"),
      "false",
    );
    const menuTrigger = page.getByRole("button", { name: "Open menu" });
    await menuTrigger.focus();
    await menuTrigger.click();
    const menu = page.getByRole("dialog", { name: "Explore Kreative Sparq" });
    await menu.waitFor({ state: "visible" });
    assert.equal(await menu.getAttribute("open"), "");
    assert.equal(
      await page.evaluate(() =>
        document.body.classList.contains("mobile-menu-open"),
      ),
      true,
      `${route}: opening the menu did not lock body scrolling`,
    );
    assert.equal(
      await page.evaluate(() => getComputedStyle(document.body).overflow),
      "hidden",
      `${route}: body overflow is not locked while the menu is open`,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
      true,
      `${route}: open mobile menu causes horizontal overflow`,
    );
    await page.keyboard.press("Escape");
    await menu.waitFor({ state: "hidden" });
    assert.equal(
      await menuTrigger.evaluate(
        (element) => element === document.activeElement,
      ),
      true,
      `${route}: focus did not return to the menu trigger after Escape`,
    );
    assert.equal(await menuTrigger.getAttribute("aria-expanded"), "false");
    assert.equal(
      await page.evaluate(() =>
        document.body.classList.contains("mobile-menu-open"),
      ),
      false,
    );
  } finally {
    await context.close();
  }
}

let browser;
let exitCode = 0;
try {
  browser = await chromium.launch({ headless: true });
  for (const pageContent of routeContent) {
    await validateRoute(browser, pageContent);
    process.stdout.write(`Validated ${pageContent.fields.Route}\n`);
  }
  process.stdout.write(
    `Service validation passed for ${routeContent.length} routes, 3 widths, 2 themes, and 28 axe scans.\n`,
  );
} catch (error) {
  process.stderr.write(
    `Service validation failed: ${error instanceof Error ? error.stack : String(error)}\n`,
  );
  exitCode = 1;
} finally {
  if (browser) {
    await Promise.race([browser.close().catch(() => {}), delay(5000)]);
  }
  process.exit(exitCode);
}
