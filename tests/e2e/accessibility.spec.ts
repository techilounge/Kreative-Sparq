import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { AXE_ROUTES } from './routes';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const SCHEMES = ['light', 'dark'] as const;

test.describe('accessibility', () => {
  for (const scheme of SCHEMES) {
    for (const path of AXE_ROUTES) {
      test(`${path} has no ${scheme} mode violations`, async ({ page }) => {
        // Reduced motion is emulated so every section is in its final,
        // fully opaque state: a scan caught mid-fade measures contrast
        // against a blended colour and reports failures that nobody sees.
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.goto(path);
        await expect(page.locator('html')).toHaveClass(new RegExp(`\\b${scheme}\\b`));

        const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

        expect(
          results.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact,
            nodes: violation.nodes.map((node) => node.target.join(' ')),
          })),
        ).toEqual([]);
      });
    }
  }

  test('the open mobile menu is free of violations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: 'Open menu' });
    test.skip(
      !(await trigger.isVisible()),
      'The menu button only exists below the nav breakpoint.',
    );

    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
});
