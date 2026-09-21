import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

/**
 * Some environments ship a Chromium build that Playwright did not download
 * itself. Pointing at it through an environment variable keeps the config
 * portable: a normal checkout uses the browser `playwright install` provides.
 */
const executablePath = process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE'];
const chromium = {
  ...devices['Desktop Chrome'],
  ...(executablePath ? { launchOptions: { executablePath } } : {}),
};

/**
 * Tests run against a production build, so what is tested is what deploys.
 * The required widths are covered by named projects rather than per-test
 * viewport calls, which keeps the responsive matrix visible in the report.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    locale: 'en-NG',
  },
  projects: [
    { name: 'mobile-375', use: { ...chromium, viewport: { width: 375, height: 812 } } },
    { name: 'tablet-768', use: { ...chromium, viewport: { width: 768, height: 1024 } } },
    { name: 'laptop-1024', use: { ...chromium, viewport: { width: 1024, height: 800 } } },
    { name: 'desktop-1440', use: { ...chromium, viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: `npx next start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
