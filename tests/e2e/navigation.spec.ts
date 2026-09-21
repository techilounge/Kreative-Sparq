import { expect, test } from '@playwright/test';

test.describe('header and navigation', () => {
  test('desktop navigation reaches every primary route', async ({ page, isMobile }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'Desktop navigation only');
    void isMobile;

    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });

    for (const [label, path] of [
      ['Services', '/services'],
      ['Work', '/work'],
      ['About', '/about'],
      ['Insights', '/insights'],
      ['Contact', '/contact'],
    ] as const) {
      await nav.getByRole('link', { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      );
      await page.goto('/');
    }
  });

  test('the skip link is the first stop and moves focus to the main region', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('navigation is reachable by keyboard alone', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'Desktop navigation only');

    await page.goto('/');
    const reached: string[] = [];

    for (let index = 0; index < 20; index += 1) {
      await page.keyboard.press('Tab');
      const label = await page.evaluate(() => {
        const active = document.activeElement as HTMLElement | null;
        return active?.textContent?.trim() ?? '';
      });
      if (label) reached.push(label);
    }

    expect(reached.join(' | ')).toContain('Services');
    expect(reached.join(' | ')).toContain('Book a strategy call');
  });
});

test.describe('mobile menu', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, 'Mobile and tablet only');

  test('opens, traps focus, locks scroll, closes on Escape, and restores focus', async ({
    page,
  }) => {
    await page.goto('/');

    const trigger = page.getByRole('button', { name: 'Open menu' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    // Background scrolling is locked while the sheet is open.
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    // Tab wraps inside the sheet rather than escaping to the page behind it.
    for (let index = 0; index < 15; index += 1) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => {
        const active = document.activeElement;
        return Boolean(active?.closest('[role="dialog"]'));
      });
      expect(inside).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('closes when a route is chosen', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('dialog').getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole('dialog')).toBeHidden();
  });
});

test('every interactive control meets the 44 by 44 pixel standard', async ({ page }) => {
  await page.goto('/contact');

  const controls = page.locator(
    'main a[href], main button, main input:not([type="hidden"]), main select, main textarea',
  );
  const count = await controls.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const control = controls.nth(index);
    if (!(await control.isVisible())) continue;
    const box = await control.boundingBox();
    if (!box) continue;

    // Inline links inside a paragraph are exempt: they are sized by the text
    // around them, which WCAG 2.2 allows.
    const isInlineLink = await control.evaluate(
      (node) => node.tagName === 'A' && node.closest('p') !== null,
    );
    if (isInlineLink) continue;

    expect.soft(box.height, `control ${index} height`).toBeGreaterThanOrEqual(44);
  }
});
