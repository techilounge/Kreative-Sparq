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
const fallback = {
  contact: {
    heading: "Online inquiries are not available yet.",
    body: "A monitored destination, verified public contact details, and an approved response window must be in place before the inquiry form can open.",
  },
  project: {
    heading: "Project brief submissions are not available yet.",
    body: "The brief will open after its budget choices, monitored destination, privacy handling, spam protection, and response process are approved.",
  },
  booking: {
    heading: "Online booking is not available yet.",
    body: "Available times will appear here after the approved 30-minute booking calendar and its privacy settings are connected.",
  },
  thankYou: {
    heading: "No submission has been recorded.",
    body: "A confirmation appears only after a configured inquiry, project brief, or booking succeeds. Opening this page directly does not submit information.",
  },
  privacy: {
    heading: "The privacy policy is in review.",
    body: "It will be published after the legal business details, actual data flows, providers, retention periods, rights process, and applicable legal grounds are confirmed and reviewed.",
  },
  terms: {
    heading: "The terms of use are in review.",
    body: "They will be published after the legal entity, site features, liability position, governing law, dispute process, and effective date are confirmed and reviewed.",
  },
};
const routes = [
  { key: "contact", path: "/contact", h1: content.contact.fields.H1 },
  { key: "project", path: "/start-a-project", h1: content.project.fields.H1 },
  { key: "booking", path: "/book", h1: content.booking.fields.H1 },
  { key: "thankYou", path: "/thank-you", h1: "Submission status" },
  { key: "privacy", path: "/privacy", h1: "Privacy Policy" },
  { key: "terms", path: "/terms", h1: "Terms of Use" },
];
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
  ...routes.map((route) => route.path),
]);

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
  assert.equal(
    response?.status(),
    200,
    `${route.path} did not return HTTP 200`,
  );
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
  assert.equal(
    normalize(await page.getByRole("heading", { level: 1 }).innerText()),
    route.h1,
  );
}

async function expectMetadata(page, route) {
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    `${publicOrigin}${route.path}`,
  );
  const robots = normalize(
    (await page.locator('meta[name="robots"]').getAttribute("content")) ?? "",
  ).toLowerCase();
  assert.ok(robots.includes("noindex"), `${route.path} must emit noindex`);
  assert.ok(robots.includes("follow"), `${route.path} must allow follow`);
  assert.equal(
    await page.locator('meta[property="og:url"]').getAttribute("content"),
    `${publicOrigin}${route.path}`,
  );
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  assert.equal(scripts.length, 1, `${route.path} should emit one breadcrumb`);
  const data = JSON.parse(scripts[0]);
  assert.equal(data["@type"], "BreadcrumbList");
  assert.equal(
    data.itemListElement.at(-1).item,
    `${publicOrigin}${route.path}`,
  );
  assert.equal(
    scripts.some((script) =>
      /"@type"\s*:\s*"(?:Article|Person|Review|Organization|LocalBusiness)"/.test(
        script,
      ),
    ),
    false,
    `${route.path} emitted unsupported structured data`,
  );
}

async function expectLinks(page, route) {
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
    assert.ok(publicRoutes.has(path), `${route.path}: unexpected link ${href}`);
    assert.equal(
      (await page.request.get(path)).status(),
      200,
      `${route.path}: broken link ${path}`,
    );
  }
}

async function expectKeyboard(page, route) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route.path, { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  assert.equal(
    await skip.evaluate((element) => element === document.activeElement),
    true,
  );
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.focus();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Explore Kreative Sparq" });
  await dialog.waitFor({ state: "visible" });
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  assert.equal(
    await trigger.evaluate((element) => element === document.activeElement),
    true,
  );
}

async function validateRoute(browser, route) {
  const context = await browser.newContext({ baseURL: origin });
  const page = await context.newPage();
  page.setDefaultTimeout(15_000);
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
    const allText = normalize((await page.locator("main").textContent()) ?? "");
    assert.ok(allText.includes(fallback[route.key].heading));
    assert.ok(allText.includes(fallback[route.key].body));
    assert.equal(await page.locator("main form").count(), 0);
    assert.equal(
      await page.locator("main input, main textarea, main select").count(),
      0,
    );
    assert.equal(await page.locator('main button[type="submit"]').count(), 0);
    assert.equal(await page.locator("main iframe").count(), 0);
    assert.equal(/\{\{|\[CONTENT REQUIRED:/.test(allText), false);
    assert.equal(allText.includes("Your inquiry has been sent."), false);
    assert.equal(allText.includes("Your call is booked."), false);
    assert.equal(allText.includes("We have your project brief."), false);
    await expectMetadata(page, route);
    await expectLinks(page, route);
    await expectKeyboard(page, route);

    if (route.path === "/thank-you") {
      await page.goto(
        "/thank-you?type=project&email=private@example.com&leadId=secret-123",
        { waitUntil: "domcontentloaded" },
      );
      const safeText = normalize(
        (await page.locator("main").textContent()) ?? "",
      );
      assert.equal(safeText.includes("private@example.com"), false);
      assert.equal(safeText.includes("secret-123"), false);
      assert.equal(safeText.includes("We have your project brief."), false);
      assert.ok(safeText.includes(fallback.thankYou.heading));
    }
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
  process.stdout.write(
    "Conversion validation passed for 6 fallback routes, 3 widths, 2 themes, and 24 axe scans.\n",
  );
} catch (error) {
  process.stderr.write(
    `Conversion validation failed: ${error instanceof Error ? error.stack : String(error)}\n`,
  );
  exitCode = 1;
} finally {
  if (browser) {
    await Promise.race([browser.close().catch(() => {}), delay(5000)]);
  }
  process.exit(exitCode);
}
