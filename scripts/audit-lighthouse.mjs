import { spawn } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const root = process.cwd();
const origin = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const outputDirectory = join(root, "qa", "phase9", "lighthouse");
const nextCli = join(root, "node_modules", "next", "dist", "bin", "next");

const routes = [
  { path: "/", slug: "home", role: "Homepage" },
  {
    path: "/services/brand-strategy",
    slug: "brand-strategy",
    role: "Service detail",
  },
  { path: "/work", slug: "work", role: "Work index" },
  { path: "/contact", slug: "contact", role: "Conversion fallback" },
];

const profiles = [
  {
    name: "mobile",
    label: "Mobile — simulated Slow 4G and 4× CPU slowdown",
    preset: null,
    screen: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2 },
    throttling: {
      method: "simulate",
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
  },
  {
    name: "desktop",
    label: "Desktop — simulated broadband and 2× CPU slowdown",
    preset: "desktop",
    screen: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1 },
    throttling: {
      method: "simulate",
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 2,
    },
  },
];

const categories = ["performance", "accessibility", "best-practices", "seo"];

async function serverReady() {
  try {
    const response = await fetch(origin, { signal: AbortSignal.timeout(1500) });
    return response.ok && (await response.text()).includes("Kreative Sparq");
  } catch {
    return false;
  }
}

async function stopStartedServer(server) {
  if (!server || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    delay(3000),
  ]);
  if (server.exitCode === null && process.platform === "win32") {
    const killer = spawn("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
    await Promise.race([
      new Promise((resolve) => {
        killer.once("exit", resolve);
        killer.once("error", resolve);
      }),
      delay(3000),
    ]);
  }
}

async function getOpenPort() {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not reserve a Chromium debugging port"));
        return;
      }
      server.close((error) => {
        if (error) reject(error);
        else resolve(address.port);
      });
    });
  });
}

async function launchChrome() {
  const port = await getOpenPort();
  const browser = await chromium.launch({
    headless: true,
    args: [
      `--remote-debugging-port=${port}`,
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-background-networking",
    ],
  });
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`, {
        signal: AbortSignal.timeout(1000),
      });
      if (response.ok) return { browser, port };
    } catch {}
    await delay(250);
  }
  await browser.close();
  throw new Error("Chromium debugging port did not become ready");
}

async function stopChrome(chrome) {
  if (!chrome) return;
  await chrome.browser.close();
}

async function runLighthouse(url, profile, port) {
  const result = await lighthouse(
    url,
    {
      port,
      logLevel: "error",
      output: "json",
      onlyCategories: categories,
      locale: "en-US",
      formFactor: profile.screen.mobile ? "mobile" : "desktop",
      throttlingMethod: "simulate",
      throttling: {
        rttMs: profile.throttling.rttMs,
        throughputKbps: profile.throttling.throughputKbps,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
        cpuSlowdownMultiplier: profile.throttling.cpuSlowdownMultiplier,
      },
      screenEmulation: profile.screen,
      disableFullPageScreenshot: true,
    },
    profile.preset ? desktopConfig : undefined,
  );
  if (!result) throw new Error(`Lighthouse returned no result for ${url}`);
  return result.lhr;
}

function summarizeFailures(report) {
  const failures = [];
  for (const categoryId of categories) {
    const category = report.categories[categoryId];
    for (const reference of category.auditRefs) {
      const audit = report.audits[reference.id];
      if (
        audit.score === null ||
        audit.score >= 1 ||
        ["notApplicable", "manual", "informative"].includes(
          audit.scoreDisplayMode,
        )
      ) {
        continue;
      }
      failures.push({
        category: category.title,
        id: reference.id,
        title: audit.title,
        score: Math.round(audit.score * 100),
        displayValue: audit.displayValue ?? null,
        explanation: audit.explanation ?? null,
      });
    }
  }
  return failures;
}

function metric(report, id) {
  const audit = report.audits[id];
  return {
    value: audit.numericValue ?? null,
    unit: audit.numericUnit ?? null,
    displayValue: audit.displayValue ?? null,
    score: audit.score === null ? null : Math.round(audit.score * 100),
  };
}

let server;
let chrome;
try {
  if (!(await serverReady())) {
    if (!existsSync(join(root, ".next", "BUILD_ID"))) {
      throw new Error("No production build found. Run `pnpm build` first.");
    }
    server = spawn(
      process.execPath,
      [nextCli, "start", "-H", "127.0.0.1", "-p", "3100"],
      { cwd: root, stdio: "ignore", windowsHide: true },
    );
    for (
      let attempt = 0;
      attempt < 80 && !(await serverReady());
      attempt += 1
    ) {
      if (server.exitCode !== null) break;
      await delay(250);
    }
    if (!(await serverReady())) {
      throw new Error("Lighthouse server did not become ready.");
    }
  }

  chrome = await launchChrome();

  mkdirSync(outputDirectory, { recursive: true });
  for (const file of [
    "home-mobile.report.json",
    "home-desktop.report.json",
    "brand-strategy-mobile.report.json",
    "brand-strategy-desktop.report.json",
    "work-mobile.report.json",
    "work-desktop.report.json",
    "contact-mobile.report.json",
    "contact-desktop.report.json",
    "summary.json",
  ]) {
    rmSync(join(outputDirectory, file), { force: true });
  }

  const runs = [];
  for (const route of routes) {
    for (const profile of profiles) {
      const outputPath = join(
        outputDirectory,
        `${route.slug}-${profile.name}.report.json`,
      );
      process.stdout.write(
        `Lighthouse ${profile.name}: ${route.path || "/"}\n`,
      );
      const report = await runLighthouse(
        `${origin}${route.path}`,
        profile,
        chrome.port,
      );
      writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
      const scores = Object.fromEntries(
        categories.map((category) => [
          category,
          Math.round(report.categories[category].score * 100),
        ]),
      );
      const run = {
        route: route.path,
        role: route.role,
        profile: profile.name,
        scores,
        metrics: {
          firstContentfulPaint: metric(report, "first-contentful-paint"),
          largestContentfulPaint: metric(report, "largest-contentful-paint"),
          totalBlockingTime: metric(report, "total-blocking-time"),
          cumulativeLayoutShift: metric(report, "cumulative-layout-shift"),
          speedIndex: metric(report, "speed-index"),
        },
        failures: summarizeFailures(report),
        rawReport: `qa/phase9/lighthouse/${route.slug}-${profile.name}.report.json`,
      };
      runs.push(run);
      process.stdout.write(
        `  scores P${scores.performance} A${scores.accessibility} B${scores["best-practices"]} S${scores.seo}\n`,
      );
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    tool: { name: "Lighthouse", version: "13.5.0" },
    browser: {
      name: "Playwright bundled Chromium",
      executablePath: chromium.executablePath(),
    },
    server: "Local Next.js production build",
    categories,
    profiles: profiles.map(({ name, label, screen, throttling }) => ({
      name,
      label,
      screen,
      throttling,
    })),
    limitations: [
      "Local lab results are repeatable comparison evidence, not field Core Web Vitals.",
      "Lighthouse scores may vary across hardware and individual runs.",
      "The conversion fallback is intentionally noindex, which affects its SEO score.",
    ],
    runs,
  };
  writeFileSync(
    join(outputDirectory, "summary.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
  );
  process.stdout.write(`Wrote ${join(outputDirectory, "summary.json")}\n`);
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`,
  );
  process.exitCode = 1;
} finally {
  await stopChrome(chrome);
  await stopStartedServer(server);
}
