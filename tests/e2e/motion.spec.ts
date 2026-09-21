import { expect, test } from '@playwright/test';

/**
 * Reduced motion is an instruction, not a preference to soften. Revealed
 * content must be fully visible and in its final position, with no transform
 * left applied by the animation library.
 */
test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('reveals content without moving it', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    const unsettled = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[data-motion-reveal]'))
        .filter((node) => {
          const style = getComputedStyle(node);
          return style.opacity !== '1' || style.transform !== 'none';
        })
        .map((node) => node.textContent?.slice(0, 40) ?? ''),
    );

    expect(unsettled).toEqual([]);
  });

  test('keeps every section readable after scrolling', async ({ page }) => {
    await page.goto('/services');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const hidden = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('main h2, main h3'));
      return headings
        .filter((node) => getComputedStyle(node).opacity !== '1')
        .map((node) => node.textContent);
    });

    expect(hidden).toEqual([]);
  });
});

/**
 * The reveal writes its starting state into the server-rendered markup, so
 * scripting being unavailable must not leave the page blank.
 */
test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const path of ['/', '/services', '/about']) {
    test(`${path} renders its content`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      const hidden = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-motion-reveal]'))
          .filter((node) => {
            const style = getComputedStyle(node);
            return style.opacity !== '1' || style.transform !== 'none';
          })
          .map((node) => node.textContent?.slice(0, 40) ?? ''),
      );

      expect(hidden).toEqual([]);
    });
  }
});
