import { expect, test } from '@playwright/test';

/**
 * Full-page captures at every required width in both colour schemes. These are
 * review artefacts rather than pixel comparisons: a baseline would have to be
 * regenerated on every copy change, which would hide real regressions behind
 * routine churn. Each capture still asserts the page laid out without a
 * horizontal overflow, which is the failure the widths exist to catch.
 */
const PAGES = [
  { slug: 'home', path: '/' },
  { slug: 'services', path: '/services' },
  { slug: 'service-brand-strategy', path: '/services/brand-strategy' },
  { slug: 'work', path: '/work' },
  { slug: 'about', path: '/about' },
  { slug: 'insights', path: '/insights' },
  { slug: 'contact', path: '/contact' },
  { slug: 'start-a-project', path: '/start-a-project' },
  { slug: 'book', path: '/book' },
] as const;

const SCHEMES = ['light', 'dark'] as const;

for (const scheme of SCHEMES) {
  for (const entry of PAGES) {
    test(`captures ${entry.slug} in ${scheme} mode`, async ({ page }, testInfo) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.goto(entry.path);
      await expect(page.locator('html')).toHaveClass(new RegExp(`\\b${scheme}\\b`));
      await page.waitForLoadState('networkidle');

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${entry.path} overflows horizontally`).toBeLessThanOrEqual(1);

      await page.screenshot({
        path: testInfo.outputPath(`${testInfo.project.name}-${scheme}-${entry.slug}.png`),
        fullPage: true,
      });
    });
  }
}
