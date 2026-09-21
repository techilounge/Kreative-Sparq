import { expect, test } from '@playwright/test';

const STORAGE_KEY = 'kreative-sparq-theme';

test.describe('theme', () => {
  test('follows the operating system preference on a first visit', async ({ browser }) => {
    const dark = await browser.newContext({ colorScheme: 'dark' });
    const darkPage = await dark.newPage();
    await darkPage.goto('/');
    await expect(darkPage.locator('html')).toHaveClass(/dark/);
    await dark.close();

    const light = await browser.newContext({ colorScheme: 'light' });
    const lightPage = await light.newPage();
    await lightPage.goto('/');
    await expect(lightPage.locator('html')).not.toHaveClass(/dark/);
    await light.close();
  });

  test('persists an explicit choice across a hard reload and client navigation', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'Uses the desktop theme control');

    await page.goto('/');
    await page.getByRole('radio', { name: 'Dark' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(stored).toBe('dark');

    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'About' })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('System hands control back to the operating system preference', async ({ browser }) => {
    const context = await browser.newContext({
      colorScheme: 'dark',
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    await page.goto('/');
    await page.getByRole('radio', { name: 'Light' }).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    await page.getByRole('radio', { name: 'System' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await context.close();
  });

  test('does not flash the wrong theme before first paint', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();

    // The class must already be present when the first script runs, which is
    // what the blocking theme script guarantees.
    const classAtFirstScript: string[] = [];
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        (window as unknown as { __themeClass: string }).__themeClass =
          document.documentElement.className;
      });
    });

    await page.goto('/');
    const className = await page.evaluate(
      () => (window as unknown as { __themeClass?: string }).__themeClass ?? '',
    );
    classAtFirstScript.push(className);
    expect(className).toContain('dark');

    await context.close();
  });

  test('announces the change to screen readers', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'Uses the desktop theme control');

    await page.goto('/');
    await page.getByRole('radio', { name: 'Dark' }).click();
    await expect(
      page.locator('[aria-live="polite"]').filter({ hasText: 'Colour theme changed to Dark.' }),
    ).toHaveCount(1);
  });

  test('renders the mode-appropriate logo in each theme', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/');

    const darkLogo = page.locator('header img[src*="logo-dark"]').first();
    await expect(darkLogo).toBeVisible();
    await expect(page.locator('header img[src*="logo-light"]').first()).toBeHidden();

    await context.close();
  });
});
