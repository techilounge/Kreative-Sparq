import { spawn } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, relative } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";

const root = process.cwd();
const origin = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const nextCli = join(root, "node_modules", "next", "dist", "bin", "next");
const output = join(
  root,
  "qa",
  "editorial-imagery",
  "generated",
  "full-matrix",
);
const representative = join(root, "qa", "editorial-imagery", "representative");
const widths = [390, 768, 1024, 1440, 1920];
const themes = ["light", "dark"];
const routes = [
  { path: "/services", slug: "services" },
  { path: "/services/brand-strategy", slug: "brand-strategy" },
  { path: "/services/creative-design", slug: "creative-design" },
  {
    path: "/services/content-social-media",
    slug: "content-social-media",
  },
  {
    path: "/services/performance-marketing",
    slug: "performance-marketing",
  },
  {
    path: "/services/web-design-development",
    slug: "web-design-development",
  },
  {
    path: "/services/campaigns-activations",
    slug: "campaigns-activations",
  },
  { path: "/work", slug: "work" },
  { path: "/about", slug: "about" },
  { path: "/insights", slug: "insights" },
  { path: "/contact", slug: "contact" },
  { path: "/privacy", slug: "privacy" },
  { path: "/terms", slug: "terms" },
];

const representativeFiles = new Set([
  "services-light-390.png",
  "services-dark-1440.png",
  "content-social-media-dark-390.png",
  "content-social-media-light-1440.png",
  "work-light-390.png",
  "work-dark-1440.png",
  "about-dark-390.png",
  "about-light-1440.png",
  "insights-light-390.png",
  "insights-dark-1440.png",
  "contact-dark-390.png",
  "contact-light-1440.png",
  "privacy-dark-1440.png",
  "terms-light-390.png",
]);

async function ready() {
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

let server;
let browser;
const report = [];
try {
  if (!(await ready())) {
    if (!existsSync(join(root, ".next", "BUILD_ID"))) {
      throw new Error("No production build found. Run `pnpm build` first.");
    }
    server = spawn(
      process.execPath,
      [nextCli, "start", "-H", "127.0.0.1", "-p", "3100"],
      { cwd: root, stdio: "ignore", windowsHide: true },
    );
    for (let attempt = 0; attempt < 80 && !(await ready()); attempt += 1) {
      if (server.exitCode !== null) break;
      await delay(250);
    }
    if (!(await ready()))
      throw new Error("Screenshot server did not become ready.");
  }

  rmSync(output, { recursive: true, force: true });
  rmSync(representative, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  mkdirSync(representative, { recursive: true });
  browser = await chromium.launch({ headless: true });

  for (const route of routes) {
    for (const theme of themes) {
      const context = await browser.newContext({ colorScheme: theme });
      await context.addInitScript((selectedTheme) => {
        localStorage.setItem("kreative-sparq-theme", selectedTheme);
      }, theme);
      const page = await context.newPage();
      const failures = [];
      page.on("console", (message) => {
        if (message.type() === "error") failures.push(message.text());
      });
      page.on("pageerror", (error) => failures.push(error.message));

      for (const width of widths) {
        await page.setViewportSize({
          width,
          height: width < 600 ? 844 : width < 1024 ? 1024 : 900,
        });
        const response = await page.goto(`${origin}${route.path}`, {
          waitUntil: "domcontentloaded",
        });
        if (!response?.ok())
          throw new Error(`${route.path} returned ${response?.status()}`);
        await page.locator("main h1").waitFor({ state: "visible" });
        await page.waitForFunction(
          (selectedTheme) =>
            document.documentElement.dataset.theme === selectedTheme,
          theme,
        );
        for (const image of await page.locator("img:visible").all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(async (element) => {
            if (!(element instanceof HTMLImageElement)) return;
            const source = element.currentSrc || element.src;
            if (element.complete && element.naturalWidth === 0) {
              throw new Error(`Image failed before capture: ${source}`);
            }
            if (!element.complete) {
              await Promise.race([
                new Promise((resolve, reject) => {
                  element.addEventListener("load", resolve, { once: true });
                  element.addEventListener("error", reject, { once: true });
                }),
                new Promise((_, reject) =>
                  setTimeout(
                    () => reject(new Error(`Timed out loading ${source}`)),
                    20_000,
                  ),
                ),
              ]);
            }
            await Promise.race([
              element.decode(),
              new Promise((_, reject) =>
                setTimeout(
                  () => reject(new Error(`Timed out decoding ${source}`)),
                  20_000,
                ),
              ),
            ]);
          });
        }
        const state = await page.evaluate(async () => {
          await document.fonts.ready;
          window.scrollTo({ top: 0, behavior: "instant" });
          const images = Array.from(document.querySelectorAll("main img"));
          return {
            overflow:
              document.documentElement.scrollWidth > window.innerWidth + 1,
            images: images.map((image) => ({
              src: new URL(image.currentSrc || image.src).pathname,
              width: image.naturalWidth,
              height: image.naturalHeight,
            })),
          };
        });
        if (state.overflow)
          throw new Error(`${route.path} ${theme} ${width}px overflows`);
        if (failures.length) {
          throw new Error(
            `${route.path} browser errors: ${failures.join(" | ")}`,
          );
        }

        const filename = `${route.slug}-${theme}-${width}.png`;
        const screenshotPath = join(output, filename);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
          animations: "disabled",
        });
        if (representativeFiles.has(filename)) {
          copyFileSync(screenshotPath, join(representative, filename));
        }
        report.push({ route: route.path, theme, width, images: state.images });
        process.stdout.write(`Captured ${route.slug} ${theme} ${width}px\n`);
      }
      await context.close();
    }
  }

  writeFileSync(
    join(root, "qa", "editorial-imagery", "capture-report.json"),
    `${JSON.stringify(
      {
        origin,
        generatedDirectory: relative(root, output).replaceAll("\\", "/"),
        widths,
        themes,
        routes: routes.map(({ path }) => path),
        captures: report,
      },
      null,
      2,
    )}\n`,
  );
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
} finally {
  if (browser) await browser.close().catch(() => {});
  await stopStartedServer(server);
  process.exit(process.exitCode ?? 0);
}
