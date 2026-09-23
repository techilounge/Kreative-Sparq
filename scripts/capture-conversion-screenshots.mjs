import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";

const root = process.cwd();
const origin = "http://127.0.0.1:3100";
const nextCli = join(root, "node_modules", "next", "dist", "bin", "next");
const output = join(root, "qa", "phase8", "conversion");
const widths = [360, 375, 390, 768, 1024, 1440, 1920];
const themes = ["light", "dark"];
const routes = [
  { path: "/contact", slug: "contact" },
  { path: "/start-a-project", slug: "start-a-project" },
  { path: "/book", slug: "book" },
  { path: "/thank-you", slug: "thank-you" },
  { path: "/privacy", slug: "privacy" },
  { path: "/terms", slug: "terms" },
];

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
    if (!(await ready())) {
      throw new Error("Conversion screenshot server did not become ready.");
    }
  }

  mkdirSync(output, { recursive: true });
  browser = await chromium.launch();
  for (const route of routes) {
    for (const width of widths) {
      for (const theme of themes) {
        const context = await browser.newContext({
          viewport: {
            width,
            height: width < 600 ? 844 : width < 1024 ? 1024 : 900,
          },
          colorScheme: theme,
        });
        await context.addInitScript(
          (selectedTheme) => localStorage.setItem("theme", selectedTheme),
          theme,
        );
        const page = await context.newPage();
        const response = await page.goto(`${origin}${route.path}`, {
          waitUntil: "domcontentloaded",
        });
        if (response?.status() !== 200) {
          throw new Error(`${route.path} returned ${response?.status()}`);
        }
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
            if (!element.complete || element.naturalWidth === 0) {
              await new Promise((resolve, reject) => {
                element.addEventListener("load", resolve, { once: true });
                element.addEventListener("error", reject, { once: true });
              });
            }
            await element.decode();
          });
        }
        await page.evaluate(async () => {
          await document.fonts.ready;
          window.scrollTo({ top: 0, behavior: "instant" });
        });
        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1,
        );
        if (hasOverflow) {
          throw new Error(
            `${route.path} ${theme} ${width}px has horizontal overflow`,
          );
        }
        await page.screenshot({
          path: join(output, `${route.slug}-${theme}-${width}.png`),
          fullPage: true,
          animations: "disabled",
        });
        await context.close();
        process.stdout.write(`Captured ${route.slug} ${theme} ${width}px\n`);
      }
    }
  }
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
} finally {
  if (browser) {
    await Promise.race([browser.close().catch(() => {}), delay(5000)]);
  }
  await stopStartedServer(server);
  process.exit(process.exitCode ?? 0);
}
