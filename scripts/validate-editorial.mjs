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
  readFileSync(new URL("../content/editorial.json", import.meta.url), "utf8"),
);
const pages = [content.work, content.about, content.insights];
const smokeWidths = [360, 768, 1440];
const themes = ["light", "dark"];
const publicRoutes = new Set([
  "/",
  "/services",
  "/services/brand-strategy",
  "/services/creative-design",
  "/services/content-social-media",
  "/services/performance-marketing",
  "/services/web-design-development",
  "/services/campaigns-activations",
  "/work",
  "/about",
  "/insights",
]);
const plannedRoutes = new Set(["/book", "/contact", "/start-a-project"]);
const unpublishedRoutes = [
  "/work/example-client",
  "/work/featured-editorial-concept",
  "/insights/before-spending-more-on-ads",
  "/insights/how-to-brief-a-marketing-agency",
  "/insights/social-media-activity-is-not-a-content-strategy",
  "/insights/unpublished-article",
];

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

async function visit(page, path, theme, width) {
  await page.setViewportSize({
    width,
    height: width < 600 ? 844 : width < 1024 ? 1024 : 900,
  });
  const response = await page.goto(path, { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 200, `${path} did not return HTTP 200`);
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

function expectedVisibleCopy(pageContent) {
  const route = pageContent.fields.Route;
  const sectionNames =
    route === "/work"
      ? ["Empty state", "Results note", "CTA"]
      : route === "/about"
        ? [
            "Our point of view",
            "What we believe",
            "Who we work with",
            "How the relationship works",
            "Service area",
            "CTA",
          ]
        : ["Empty state"];
  const values = [
    pageContent.fields.H1,
    pageContent.fields["Hero body"],
    pageContent.fields["Primary CTA"],
  ];
  if (route === "/about") values.push(pageContent.fields["Secondary CTA"]);
  for (const section of pageContent.sections.filter((item) =>
    sectionNames.includes(item.heading),
  )) {
    for (const block of section.blocks) {
      if (
        route === "/insights" &&
        block.type === "field" &&
        block.label === "CTA"
      ) {
        continue;
      }
      if (block.type === "list") values.push(...block.items);
      else values.push(block.text);
    }
  }
  return values.filter(Boolean);
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
    pageContent.fields["Open Graph title"],
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
  if (route === "/about") {
    assert.equal(scripts.length, 0, "About should not publish unneeded schema");
  } else {
    assert.equal(scripts.length, 1);
    const data = JSON.parse(scripts[0]);
    assert.equal(data["@type"], "BreadcrumbList");
    assert.equal(data.itemListElement.at(-1).item, `${publicOrigin}${route}`);
  }
}

async function expectMobileMenu(page, route) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route, { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  assert.equal(
    await skipLink.evaluate((element) => element === document.activeElement),
    true,
    `${route}: skip link is not first in keyboard order`,
  );
  assert.notEqual(
    await skipLink.evaluate(
      (element) => getComputedStyle(element).outlineStyle,
    ),
    "none",
    `${route}: focused skip link has no visible outline`,
  );

  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.focus();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Explore Kreative Sparq" });
  await dialog.waitFor({ state: "visible" });
  assert.equal(await dialog.getAttribute("open"), "");
  assert.equal(
    await page.evaluate(
      () =>
        document.body.classList.contains("mobile-menu-open") &&
        getComputedStyle(document.body).overflow === "hidden",
    ),
    true,
    `${route}: mobile menu did not lock body scrolling`,
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
    true,
    `${route}: open mobile menu causes horizontal overflow`,
  );
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  assert.equal(
    await trigger.evaluate((element) => element === document.activeElement),
    true,
    `${route}: menu trigger did not regain focus after Escape`,
  );
}

async function expectLinksAndImages(page, route) {
  const hrefs = [
    ...new Set(
      (
        await page
          .locator("a[href]")
          .evaluateAll((links) =>
            links.map((link) => link.getAttribute("href") ?? ""),
          )
      ).filter((href) => href.startsWith("/") && !href.startsWith("/#")),
    ),
  ];
  for (const href of hrefs) {
    const path = href.split("#")[0];
    assert.ok(
      publicRoutes.has(path) || plannedRoutes.has(path),
      `${route}: unexpected internal link ${href}`,
    );
    const response = await page.request.get(path);
    if (publicRoutes.has(path)) {
      assert.equal(response.status(), 200, `${route}: broken link ${path}`);
    } else {
      assert.equal(
        response.status(),
        404,
        `${route}: planned Phase 8 route ${path} should still return 404`,
      );
    }
  }

  const images = page.locator("img:visible");
  assert.ok((await images.count()) >= 2, `${route}: shell images are missing`);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    assert.equal(
      await image.evaluate(
        (element) => element.complete && element.naturalWidth > 0,
      ),
      true,
      `${route}: a visible image did not load`,
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
    const allText = normalize((await page.locator("main").textContent()) ?? "");
    for (const value of expectedVisibleCopy(pageContent)) {
      assert.ok(
        allText.includes(value),
        `${route}: missing approved copy ${value}`,
      );
    }
    assert.equal(
      allText.includes("Meet the people doing the work."),
      false,
      `${route}: unavailable team content became public`,
    );
    assert.equal(
      allText.includes("Send me the next note"),
      false,
      `${route}: unconfigured newsletter became public`,
    );
    assert.equal(
      allText.includes("Read the case study"),
      false,
      `${route}: an unpublished case study became public`,
    );
    await expectMetadata(page, pageContent);
    await expectLinksAndImages(page, route);
    await expectMobileMenu(page, route);
  } finally {
    await context.close();
  }
}

async function expectUnpublishedRoutes(browser) {
  const context = await browser.newContext({ baseURL: origin });
  try {
    for (const route of unpublishedRoutes) {
      const response = await context.request.get(route);
      assert.equal(
        response.status(),
        404,
        `${route} should remain unpublished`,
      );
      const body = await response.text();
      assert.equal(body.includes('"@type":"Article"'), false);
      assert.equal(body.includes('"@type":"CaseStudy"'), false);
    }
    for (const pageContent of pages) {
      const body = await (
        await context.request.get(pageContent.fields.Route)
      ).text();
      for (const route of unpublishedRoutes) {
        assert.equal(
          body.includes(`href="${route}"`),
          false,
          `${pageContent.fields.Route} exposes unpublished route ${route}`,
        );
      }
    }
  } finally {
    await context.close();
  }
}

let browser;
let exitCode = 0;
try {
  browser = await chromium.launch({ headless: true });
  for (const pageContent of pages) {
    await validateRoute(browser, pageContent);
    process.stdout.write(`Validated ${pageContent.fields.Route}\n`);
  }
  await expectUnpublishedRoutes(browser);
  process.stdout.write(
    "Editorial validation passed for 3 public routes, 6 unpublished routes, 3 widths, 2 themes, and 12 axe scans.\n",
  );
} catch (error) {
  process.stderr.write(
    `Editorial validation failed: ${error instanceof Error ? error.stack : String(error)}\n`,
  );
  exitCode = 1;
} finally {
  if (browser) {
    await Promise.race([browser.close().catch(() => {}), delay(5000)]);
  }
  process.exit(exitCode);
}
