import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const origin = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const publicOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreativesparq.com"
).replace(/\/$/, "");
const routeConfig = JSON.parse(
  readFileSync(new URL("../content/site-routes.json", import.meta.url), "utf8"),
);
const indexable = new Set(routeConfig.indexable.map((route) => route.path));
const noindex = new Set(routeConfig.noindex.map((route) => route.path));
const routes = [...routeConfig.indexable, ...routeConfig.noindex];
const widths = [360, 375, 390, 768, 1024, 1440, 1920];
const themes = ["light", "dark"];
const axeWidths = new Set([360, 1440]);
const conversionStates = new Map([
  ["/contact", "Online inquiries are not available yet."],
  ["/start-a-project", "Project brief submissions are not available yet."],
  ["/book", "Online booking is not available yet."],
  ["/thank-you", "No submission has been recorded."],
  ["/privacy", "The privacy policy is in review."],
  ["/terms", "The terms of use are in review."],
]);
const forbiddenPublicCopy = [
  "Your inquiry has been sent.",
  "Your call is booked.",
  "We have your project brief.",
  "Subscription confirmed.",
];
const geographyNeutralRoutes = new Set([
  "/",
  "/services",
  "/services/brand-strategy",
  "/services/creative-design",
  "/services/content-social-media",
  "/services/performance-marketing",
  "/services/web-design-development",
  "/services/campaigns-activations",
  "/work",
  "/insights",
]);
const geographyTerms = /\b(?:Nigeria|Nigerian|diaspora)\b/i;
const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];
const titles = new Map();
const descriptions = new Map();
let responsiveStates = 0;
let axeScans = 0;

function canonicalFor(path) {
  return `${publicOrigin}${path === "/" ? "" : path}`;
}

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function recordPageFailures(page, label) {
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(`${label}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    pageErrors.push(`${label}: ${error.message}`);
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(
      `${label}: ${request.url()} — ${request.failure()?.errorText ?? "failed"}`,
    );
  });
}

async function waitForImages(page, route) {
  for (const image of await page.locator("img:visible").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(async (element) => {
      if (!(element instanceof HTMLImageElement)) return;
      if (!element.complete || element.naturalWidth === 0) {
        await new Promise((resolve, reject) => {
          element.addEventListener("load", resolve, { once: true });
          element.addEventListener("error", reject, { once: true });
        });
      }
      await element.decode();
    });
    assert.equal(
      await image.evaluate(
        (element) => element.complete && element.naturalWidth > 0,
      ),
      true,
      `${route}: visible image did not load`,
    );
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

async function validateResponsiveRoute(browser, route, theme) {
  const context = await browser.newContext({
    baseURL: origin,
    colorScheme: theme,
  });
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem("kreative-sparq-theme", selectedTheme);
  }, theme);
  const page = await context.newPage();
  page.setDefaultTimeout(20_000);
  recordPageFailures(page, `${route.path} ${theme}`);

  try {
    for (const width of widths) {
      await page.setViewportSize({
        width,
        height: width < 600 ? 844 : width < 1024 ? 1024 : 900,
      });
      const response = await page.goto(route.path, {
        waitUntil: "domcontentloaded",
      });
      assert.equal(response?.status(), 200, `${route.path} returned non-200`);
      await page.locator("main h1").waitFor({ state: "visible" });
      assert.equal(
        await page.locator("main h1").count(),
        1,
        `${route.path} must have one H1`,
      );
      assert.equal(
        await page.locator("html").getAttribute("lang"),
        "en-NG",
        `${route.path} has the wrong document language`,
      );
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        theme,
        `${route.path} did not resolve ${theme}`,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
        true,
        `${route.path} ${theme} ${width}px has horizontal overflow`,
      );
      assert.equal(
        /\{\{|\[CONTENT REQUIRED:/.test(
          normalize((await page.locator("main").textContent()) ?? ""),
        ),
        false,
        `${route.path} renders unresolved placeholder syntax`,
      );

      if (axeWidths.has(width)) {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        assert.deepEqual(
          result.violations.map((violation) => violation.id),
          [],
          `${route.path} ${theme} ${width}px axe violations: ${JSON.stringify(
            result.violations.map((violation) => ({
              id: violation.id,
              nodes: violation.nodes.map((node) => ({
                target: node.target,
                summary: node.failureSummary,
              })),
            })),
          )}`,
        );
        axeScans += 1;
      }
      responsiveStates += 1;
    }
  } finally {
    await context.close();
  }
}

async function validateMetadataAndLinks(browser, route) {
  const context = await browser.newContext({ baseURL: origin });
  const page = await context.newPage();
  page.setDefaultTimeout(20_000);
  recordPageFailures(page, `${route.path} metadata`);
  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto(route.path, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);
    const title = normalize(await page.title());
    const description = normalize(
      (await page
        .locator('meta[name="description"]')
        .getAttribute("content")) ?? "",
    );
    assert.ok(
      title.length >= 20,
      `${route.path}: title is missing or too short`,
    );
    assert.ok(
      description.length >= 70,
      `${route.path}: description is missing or too short`,
    );
    assert.equal(
      titles.has(title),
      false,
      `${route.path}: duplicate title also used by ${titles.get(title)}`,
    );
    assert.equal(
      descriptions.has(description),
      false,
      `${route.path}: duplicate description also used by ${descriptions.get(description)}`,
    );
    titles.set(title, route.path);
    descriptions.set(description, route.path);

    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      canonicalFor(route.path),
      `${route.path}: incorrect canonical`,
    );
    assert.equal(
      await page.locator('meta[property="og:url"]').getAttribute("content"),
      canonicalFor(route.path),
      `${route.path}: incorrect Open Graph URL`,
    );
    for (const selector of [
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:image"]',
      'meta[property="og:image:alt"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:image"]',
    ]) {
      assert.equal(
        await page.locator(selector).count(),
        1,
        `${route.path}: expected one ${selector}`,
      );
    }

    const robotsLocator = page.locator('meta[name="robots"]');
    const robots = normalize(
      (await robotsLocator.count())
        ? ((await robotsLocator.getAttribute("content")) ?? "")
        : "",
    ).toLowerCase();
    if (noindex.has(route.path)) {
      assert.ok(robots.includes("noindex"), `${route.path}: missing noindex`);
      assert.ok(robots.includes("follow"), `${route.path}: missing follow`);
    } else {
      assert.equal(
        robots.includes("noindex"),
        false,
        `${route.path}: indexable route emits noindex`,
      );
    }

    const mainText = normalize(
      (await page.locator("main").textContent()) ?? "",
    );
    if (geographyNeutralRoutes.has(route.path)) {
      assert.equal(
        geographyTerms.test(mainText),
        false,
        `${route.path}: visitor copy must remain geography-neutral`,
      );
      assert.equal(
        geographyTerms.test(`${title} ${description}`),
        false,
        `${route.path}: metadata must remain geography-neutral`,
      );
    }
    const fallbackHeading = conversionStates.get(route.path);
    if (fallbackHeading) {
      assert.ok(
        mainText.includes(fallbackHeading),
        `${route.path}: truthful fallback heading is missing`,
      );
      assert.equal(await page.locator("main form").count(), 0);
      assert.equal(
        await page.locator("main input, main textarea, main select").count(),
        0,
      );
      assert.equal(await page.locator("main iframe").count(), 0);
      for (const forbidden of forbiddenPublicCopy) {
        assert.equal(
          mainText.includes(forbidden),
          false,
          `${route.path}: false success copy is visible`,
        );
      }
    }

    const scriptTexts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    for (const scriptText of scriptTexts) {
      const data = JSON.parse(scriptText);
      const nodes = Array.isArray(data) ? data : [data];
      for (const node of nodes) {
        assert.ok(
          ["Organization", "BreadcrumbList", "Service"].includes(node["@type"]),
          `${route.path}: unsupported top-level schema ${node["@type"]}`,
        );
        assert.equal(
          "areaServed" in node,
          false,
          `${route.path}: schema must not claim an unverified service area`,
        );
      }
      assert.equal(
        /"@type"\s*:\s*"(?:Article|Review|Person|LocalBusiness|CaseStudy)"/.test(
          scriptText,
        ),
        false,
        `${route.path}: unsupported proof or publication schema`,
      );
      if (nodes.some((node) => node["@type"] === "BreadcrumbList")) {
        assert.equal(
          await page.locator('nav[aria-label="Breadcrumb"]').count(),
          1,
          `${route.path}: breadcrumb data has no visible breadcrumb`,
        );
      }
    }
    if (route.path === "/") {
      assert.equal(scriptTexts.length, 1);
      assert.equal(JSON.parse(scriptTexts[0])["@type"], "Organization");
    }
    if (route.path === "/services" || route.path === "/about") {
      assert.equal(
        scriptTexts.length,
        0,
        `${route.path}: unnecessary structured data is present`,
      );
    }

    const internalHrefs = [
      ...new Set(
        (
          await page
            .locator("a[href]")
            .evaluateAll((anchors) =>
              anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
            )
        ).filter((href) => href.startsWith("/") && !href.startsWith("/#")),
      ),
    ];
    for (const href of internalHrefs) {
      const path = href.split(/[?#]/)[0];
      assert.ok(
        indexable.has(path) || noindex.has(path),
        `${route.path}: unexpected public link ${href}`,
      );
      assert.equal(
        (await page.request.get(path)).status(),
        200,
        `${route.path}: broken link ${path}`,
      );
    }
    await waitForImages(page, route.path);
  } finally {
    await context.close();
  }
}

async function validateIndexingAndAssets(browser) {
  const context = await browser.newContext({ baseURL: origin });
  try {
    const sitemapResponse = await context.request.get("/sitemap.xml");
    assert.equal(sitemapResponse.status(), 200);
    assert.match(
      sitemapResponse.headers()["content-type"] ?? "",
      /xml/,
      "sitemap has the wrong content type",
    );
    const sitemapText = await sitemapResponse.text();
    const sitemapUrls = new Set(
      [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
        match[1].replace(/\/$/, ""),
      ),
    );
    const expectedUrls = new Set(
      [...indexable].map((path) =>
        `${publicOrigin}${path === "/" ? "" : path}`.replace(/\/$/, ""),
      ),
    );
    assert.deepEqual(
      sitemapUrls,
      expectedUrls,
      "sitemap route set is incorrect",
    );
    for (const path of noindex) {
      assert.equal(
        sitemapText.includes(`${publicOrigin}${path}`),
        false,
        `${path} is noindex but appears in the sitemap`,
      );
    }

    const robotsResponse = await context.request.get("/robots.txt");
    assert.equal(robotsResponse.status(), 200);
    const robotsText = await robotsResponse.text();
    assert.match(robotsText, /User-Agent:\s*\*/i);
    assert.match(robotsText, /Allow:\s*\//i);
    assert.match(
      robotsText,
      new RegExp(`Sitemap:\\s*${publicOrigin}/sitemap\\.xml`, "i"),
    );
    assert.equal(
      /Disallow:\s*\/(?:contact|start-a-project|book|thank-you|privacy|terms|insights)/i.test(
        robotsText,
      ),
      false,
      "robots.txt blocks a noindex route from being crawled",
    );

    const manifestResponse = await context.request.get("/site.webmanifest");
    assert.equal(manifestResponse.status(), 200);
    const manifest = await manifestResponse.json();
    assert.equal(manifest.name, "Kreative Sparq");
    assert.equal(manifest.lang, "en-NG");
    assert.equal(manifest.start_url, "/");
    assert.equal(manifest.scope, "/");
    assert.equal(
      geographyTerms.test(manifest.description),
      false,
      "manifest description must remain geography-neutral",
    );
    for (const icon of manifest.icons) {
      assert.equal((await context.request.get(icon.src)).status(), 200);
    }

    const homeResponse = await context.request.get("/");
    const csp = homeResponse.headers()["content-security-policy"] ?? "";
    for (const directive of [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self'",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src 'none'",
      "worker-src 'none'",
    ]) {
      assert.ok(csp.includes(directive), `CSP is missing ${directive}`);
    }
    assert.equal(csp.includes("*"), false, "CSP must not contain wildcards");
    for (const anticipatedDomain of [
      "cal.com",
      "resend.com",
      "supabase.co",
      "challenges.cloudflare.com",
      "vercel-insights.com",
      "googletagmanager.com",
      "google-analytics.com",
      "sanity.io",
    ]) {
      assert.equal(
        csp.includes(anticipatedDomain),
        false,
        `CSP must not pre-authorize ${anticipatedDomain}`,
      );
    }
    assert.equal(homeResponse.headers()["x-content-type-options"], "nosniff");
    assert.equal(
      homeResponse.headers()["referrer-policy"],
      "strict-origin-when-cross-origin",
    );
    assert.equal(homeResponse.headers()["x-frame-options"], "SAMEORIGIN");
    assert.equal(
      homeResponse.headers()["permissions-policy"],
      "camera=(), microphone=(), geolocation=()",
    );
    assert.equal(homeResponse.headers()["x-powered-by"], undefined);

    for (const path of [
      "/work/unpublished-project",
      "/insights/unpublished-article",
      "/services/unpublished-service",
      "/phase-9-missing-route",
    ]) {
      const response = await context.request.get(path);
      assert.equal(response.status(), 404, `${path} must return 404`);
      assert.match(await response.text(), /name="robots" content="noindex/i);
    }
  } finally {
    await context.close();
  }
}

async function validateThemeAndReducedMotion(browser) {
  const persistenceContext = await browser.newContext({
    baseURL: origin,
    colorScheme: "light",
  });
  try {
    const page = await persistenceContext.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page
      .getByRole("combobox", { name: "Choose colour theme" })
      .selectOption("dark");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Services" })
      .click();
    await page.waitForURL("**/services");
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.reload({ waitUntil: "domcontentloaded" });
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    assert.equal(
      await page.evaluate(() => localStorage.getItem("kreative-sparq-theme")),
      "dark",
    );
  } finally {
    await persistenceContext.close();
  }

  const systemContext = await browser.newContext({
    baseURL: origin,
    colorScheme: "dark",
  });
  try {
    const page = await systemContext.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForFunction(
      () => document.documentElement.dataset.theme === "light",
    );
  } finally {
    await systemContext.close();
  }

  const reducedContext = await browser.newContext({
    baseURL: origin,
    reducedMotion: "reduce",
  });
  try {
    const page = await reducedContext.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of routes) {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      await page.locator("main h1").waitFor({ state: "visible" });
      assert.equal(
        await page.evaluate(
          () =>
            getComputedStyle(document.documentElement).scrollBehavior ===
              "auto" &&
            document
              .getAnimations()
              .filter((animation) => animation.playState !== "finished")
              .length === 0,
        ),
        true,
        `${route.path}: reduced motion leaves active motion`,
      );
    }
  } finally {
    await reducedContext.close();
  }
}

async function validateKeyboardAndFallbackFiles(browser) {
  const context = await browser.newContext({ baseURL: origin });
  try {
    const page = await context.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of routes) {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      await page.keyboard.press("Tab");
      const skip = page.getByRole("link", { name: "Skip to content" });
      assert.equal(
        await skip.evaluate((element) => element === document.activeElement),
        true,
        `${route.path}: skip link is not first`,
      );
      await page.keyboard.press("Enter");
      assert.equal(
        await page
          .locator("#main-content")
          .evaluate((element) => element === document.activeElement),
        true,
        `${route.path}: skip link did not focus main content`,
      );
      const trigger = page.getByRole("button", { name: "Open menu" });
      await trigger.click();
      const dialog = page.getByRole("dialog", {
        name: "Explore Kreative Sparq",
      });
      await dialog.waitFor({ state: "visible" });
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      assert.equal(
        await trigger.evaluate((element) => element === document.activeElement),
        true,
        `${route.path}: menu focus was not restored`,
      );
    }
  } finally {
    await context.close();
  }

  const errorSource = readFileSync(
    new URL("../app/error.tsx", import.meta.url),
    "utf8",
  );
  const globalErrorSource = readFileSync(
    new URL("../app/global-error.tsx", import.meta.url),
    "utf8",
  );
  assert.match(errorSource, /reset\(\)/);
  assert.match(errorSource, /Try again/);
  assert.match(globalErrorSource, /reset\(\)/);
  assert.match(globalErrorSource, /<html lang="en-NG">/);
}

let browser;
let exitCode = 0;
try {
  browser = await chromium.launch({ headless: true });
  for (const route of routes) {
    for (const theme of themes) {
      await validateResponsiveRoute(browser, route, theme);
    }
    await validateMetadataAndLinks(browser, route);
    process.stdout.write(`Site-wide validation passed for ${route.path}\n`);
  }
  await validateIndexingAndAssets(browser);
  await validateThemeAndReducedMotion(browser);
  await validateKeyboardAndFallbackFiles(browser);
  assert.deepEqual(
    consoleErrors,
    [],
    `Console errors:\n${consoleErrors.join("\n")}`,
  );
  assert.deepEqual(pageErrors, [], `Page errors:\n${pageErrors.join("\n")}`);
  assert.deepEqual(
    failedRequests,
    [],
    `Failed requests:\n${failedRequests.join("\n")}`,
  );
  process.stdout.write(
    `Site-wide validation passed for ${routes.length} routes, ${responsiveStates} responsive/theme states, and ${axeScans} axe scans.\n`,
  );
} catch (error) {
  process.stderr.write(
    `Site-wide validation failed: ${error instanceof Error ? error.stack : String(error)}\n`,
  );
  exitCode = 1;
} finally {
  if (browser) {
    await Promise.race([browser.close().catch(() => {}), delay(5000)]);
  }
  process.exit(exitCode);
}
