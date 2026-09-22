import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: `./.playwright-runs/${Date.now()}-${process.pid}`,
  fullyParallel: false,
  workers: 2,
  reporter: "./scripts/playwright-reporter.mjs",
  globalTimeout: 180_000,
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "light",
      },
    },
    {
      name: "edge",
      use: {
        ...devices["Desktop Chrome"],
        channel: "msedge",
        colorScheme: "light",
      },
    },
  ],
});
