import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";

const origin = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const root = process.cwd();
const outputDirectory = join(root, "qa", "phase9");
const outputPath = join(outputDirectory, "performance-audit.json");
const routeConfig = JSON.parse(
  readFileSync(new URL("../content/site-routes.json", import.meta.url), "utf8"),
);
const routes = [...routeConfig.indexable, ...routeConfig.noindex];
const limits = {
  lcpMs: 2500,
  cls: 0.1,
  totalBlockingTimeMs: 200,
  loadEventMs: 3000,
  transferredBytes: 2_000_000,
  javascriptBytes: 500_000,
};

mkdirSync(outputDirectory, { recursive: true });

let browser;
let exitCode = 0;
const results = [];
try {
  browser = await chromium.launch({ headless: true });
  for (const route of routes) {
    const context = await browser.newContext({
      baseURL: origin,
      viewport: { width: 390, height: 844 },
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    await context.addInitScript(() => {
      window.__phase9Vitals = { cls: 0, lcpMs: 0, longTasks: [] };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__phase9Vitals.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const latest = entries.at(-1);
        if (latest) window.__phase9Vitals.lcpMs = latest.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__phase9Vitals.longTasks.push(entry.duration);
        }
      }).observe({ type: "longtask", buffered: true });
    });
    const page = await context.newPage();
    page.setDefaultTimeout(20_000);
    const browserErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") browserErrors.push(message.text());
    });
    page.on("pageerror", (error) => browserErrors.push(error.message));

    try {
      const response = await page.goto(route.path, {
        waitUntil: "networkidle",
      });
      assert.equal(response?.status(), 200);
      await page.locator("main h1").waitFor({ state: "visible" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise((resolve) => requestAnimationFrame(() => resolve()));
      });
      await delay(250);
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        const transferredBytes = resources.reduce(
          (total, resource) => total + (resource.transferSize || 0),
          0,
        );
        const javascriptBytes = resources
          .filter(
            (resource) =>
              resource.initiatorType === "script" ||
              resource.name.includes("/_next/static/chunks/"),
          )
          .reduce((total, resource) => total + (resource.transferSize || 0), 0);
        const totalBlockingTimeMs = window.__phase9Vitals.longTasks.reduce(
          (total, duration) => total + Math.max(0, duration - 50),
          0,
        );
        return {
          lcpMs: window.__phase9Vitals.lcpMs,
          cls: window.__phase9Vitals.cls,
          totalBlockingTimeMs,
          domContentLoadedMs: navigation.domContentLoadedEventEnd,
          loadEventMs: navigation.loadEventEnd,
          transferredBytes,
          javascriptBytes,
          requestCount: resources.length + 1,
        };
      });

      assert.ok(metrics.lcpMs > 0, `${route.path}: no LCP entry was recorded`);
      assert.ok(
        metrics.lcpMs <= limits.lcpMs,
        `${route.path}: LCP ${metrics.lcpMs}ms exceeds ${limits.lcpMs}ms`,
      );
      assert.ok(
        metrics.cls <= limits.cls,
        `${route.path}: CLS ${metrics.cls} exceeds ${limits.cls}`,
      );
      assert.ok(
        metrics.totalBlockingTimeMs <= limits.totalBlockingTimeMs,
        `${route.path}: blocking time ${metrics.totalBlockingTimeMs}ms exceeds ${limits.totalBlockingTimeMs}ms`,
      );
      assert.ok(
        metrics.loadEventMs <= limits.loadEventMs,
        `${route.path}: load event ${metrics.loadEventMs}ms exceeds ${limits.loadEventMs}ms`,
      );
      assert.ok(
        metrics.transferredBytes <= limits.transferredBytes,
        `${route.path}: transfer ${metrics.transferredBytes} exceeds ${limits.transferredBytes}`,
      );
      assert.ok(
        metrics.javascriptBytes <= limits.javascriptBytes,
        `${route.path}: JavaScript transfer ${metrics.javascriptBytes} exceeds ${limits.javascriptBytes}`,
      );
      assert.deepEqual(browserErrors, [], `${route.path}: browser errors`);
      results.push({ route: route.path, ...metrics });
      process.stdout.write(
        `Performance ${route.path}: LCP ${Math.round(metrics.lcpMs)}ms, CLS ${metrics.cls.toFixed(3)}, TBT ${Math.round(metrics.totalBlockingTimeMs)}ms\n`,
      );
    } finally {
      await context.close();
    }
  }

  const menuContext = await browser.newContext({
    baseURL: origin,
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  try {
    const page = await menuContext.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    const interactionMs = await page.evaluate(
      () =>
        new Promise((resolve, reject) => {
          const button = document.querySelector(
            'button[aria-label="Open menu"]',
          );
          const dialog = document.querySelector("#mobile-menu");
          if (!(button instanceof HTMLButtonElement)) {
            reject(new Error("Mobile-menu trigger was not found"));
            return;
          }
          if (!(dialog instanceof HTMLDialogElement)) {
            reject(new Error("Mobile-menu dialog was not found"));
            return;
          }

          const start = performance.now();
          const observer = new MutationObserver(() => {
            if (!dialog.open) return;
            observer.disconnect();
            requestAnimationFrame(() => resolve(performance.now() - start));
          });
          observer.observe(dialog, {
            attributes: true,
            attributeFilter: ["open"],
          });
          button.click();
        }),
    );
    await page
      .getByRole("dialog", { name: "Explore Kreative Sparq" })
      .waitFor({ state: "visible" });
    assert.ok(
      interactionMs <= 100,
      `Synthetic mobile-menu first paint ${interactionMs}ms exceeds 100ms`,
    );

    const report = {
      generatedAt: new Date().toISOString(),
      environment: {
        browser: "Playwright bundled Chromium",
        server: "local production build",
        viewport: "390x844",
        cache: "cold browser context per route",
        network: "local, unthrottled",
        motion: "reduced",
        scope:
          "Synthetic lab evidence; it is not a Lighthouse score or field Core Web Vitals data.",
      },
      limits,
      interaction: { mobileMenuFirstPaintMs: interactionMs },
      routes: results,
    };
    writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    process.stdout.write(`Wrote ${outputPath}\n`);
  } finally {
    await menuContext.close();
  }
} catch (error) {
  process.stderr.write(
    `Performance audit failed: ${error instanceof Error ? error.stack : String(error)}\n`,
  );
  exitCode = 1;
} finally {
  if (browser) {
    await Promise.race([browser.close().catch(() => {}), delay(5000)]);
  }
  process.exit(exitCode);
}
