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
  readFileSync(new URL("../content/conversion.json", import.meta.url), "utf8"),
);
const routes = [
  { key: "contact", path: "/contact", email: "hello@kreativesparq.com" },
  { key: "privacy", path: "/privacy", email: "legal@kreativesparq.com" },
  { key: "terms", path: "/terms", email: "legal@kreativesparq.com" },
];
const smokeWidths = [360, 768, 1440];
const themes = ["light", "dark"];
const forbiddenCopy = [
  "Book a strategy call",
  "Online inquiries are not available yet.",
  "Online booking is not available yet.",
  "Project brief submissions are not available yet.",
];

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

async function visit(page, route, theme, width) {
  await page.setViewportSize({
    width,
    height: width < 600 ? 844 : width < 1024 ? 1024 : 900,
  });
  const response = await page.goto(route.path, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(response?.status(), 200, `${route.path} did not return 200`);
  await page.evaluate((selectedTheme) => {
    localStorage.setItem("kreative-sparq-theme", selectedTheme);
  }, theme);
  if ((await page.locator("html").getAttribute("data-theme")) !== theme) {
    await page.reload({ waitUntil: "domcontentloaded" });
  }
  await page.locator("main h1").waitFor({ state: "visible" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), theme);
  assert.equal(
    normalize(await page.getByRole("heading", { level: 1 }).innerText()),
    content[route.key].fields.H1,
  );
}

async function validateRoute(browser, route) {
  const context = await browser.newContext({ baseURL: origin });
  const page = await context.newPage();
  page.setDefaultTimeout(30_000);
  try {
    for (const width of smokeWidths) {
      for (const theme of themes) {
        await visit(page, route, theme, width);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1,
          ),
          true,
          `${route.path} ${theme} ${width}px has horizontal overflow`,
        );
        if (width === 360 || width === 1440) {
          const scan = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
            .analyze();
          assert.deepEqual(
            scan.violations.map((violation) => violation.id),
            [],
            `${route.path} ${theme} ${width}px axe violations`,
          );
        }
      }
    }

    await visit(page, route, "light", 1440);
    const pageContent = content[route.key];
    const mainText = normalize(
      (await page.locator("main").textContent()) ?? "",
    );
    assert.ok(mainText.includes(pageContent.fields.H1));
    assert.equal(
      await page
        .locator(
          "main form, main input, main textarea, main select, main iframe",
        )
        .count(),
      0,
    );
    assert.equal(/\{\{|\[CONTENT REQUIRED:/.test(mainText), false);
    for (const forbidden of forbiddenCopy) {
      assert.equal(mainText.includes(forbidden), false);
    }
    for (const href of await page
      .locator('a[href^="mailto:"]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
      )) {
      assert.match(href, /^mailto:[^?@\s]+@kreativesparq\.com(?:\?|$)/i);
    }

    assert.equal(await page.title(), pageContent.fields["SEO title"]);
    assert.equal(
      await page.locator('meta[name="description"]').getAttribute("content"),
      pageContent.fields["Meta description"],
    );
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      `${publicOrigin}${route.path}`,
    );
    const robots = normalize(
      (await page.locator('meta[name="robots"]').count())
        ? ((await page
            .locator('meta[name="robots"]')
            .getAttribute("content")) ?? "")
        : "",
    ).toLowerCase();
    assert.equal(
      robots.includes("noindex"),
      false,
      `${route.path} must be indexable`,
    );

    const mailtoLinks = page.locator(`a[href="mailto:${route.email}"]`);
    assert.ok(
      (await mailtoLinks.count()) >= 1,
      `${route.path}: missing approved email link`,
    );

    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    assert.equal(scripts.length, 1);
    const breadcrumbs = JSON.parse(scripts[0]);
    assert.equal(breadcrumbs["@type"], "BreadcrumbList");
    assert.equal(
      breadcrumbs.itemListElement.at(-1).item,
      `${publicOrigin}${route.path}`,
    );

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .getByRole("link", { name: "Skip to content" })
        .evaluate((element) => element === document.activeElement),
      true,
    );
  } finally {
    await context.close();
  }
}

async function validateLegacyRoutes(browser) {
  const context = await browser.newContext({ baseURL: origin });
  try {
    for (const path of ["/start-a-project", "/book"]) {
      const response = await context.request.get(path, { maxRedirects: 0 });
      assert.equal(response.status(), 308, `${path} must permanently redirect`);
      assert.ok(
        (response.headers().location ?? "").endsWith("/contact"),
        `${path} must redirect to /contact`,
      );
    }
    const thankYou = await context.request.get("/thank-you");
    assert.equal(thankYou.status(), 404, "/thank-you must be removed");
    assert.match(await thankYou.text(), /name="robots" content="noindex/i);
  } finally {
    await context.close();
  }
}

let browser;
let exitCode = 0;
try {
  browser = await chromium.launch({ headless: true });
  for (const route of routes) {
    await validateRoute(browser, route);
    process.stdout.write(`Validated ${route.path}\n`);
  }
  await validateLegacyRoutes(browser);
  process.stdout.write(
    "Lean-launch validation passed for 3 public routes, 2 permanent redirects, 1 removed route, 3 widths, 2 themes, and 12 axe scans.\n",
  );
} catch (error) {
  process.stderr.write(
    `Lean-launch validation failed: ${error instanceof Error ? error.stack : String(error)}\n`,
  );
  exitCode = 1;
} finally {
  if (browser) {
    await Promise.race([browser.close().catch(() => {}), delay(5000)]);
  }
  process.exit(exitCode);
}
