import { expect, test } from '@playwright/test';

import { FORBIDDEN_PATTERNS, FORBIDDEN_STRINGS, PUBLIC_ROUTES } from './routes';

test.describe('every public route', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route.path} renders one H1, correct metadata, and no placeholders`, async ({
      page,
    }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);

      const headings = page.locator('h1');
      await expect(headings).toHaveCount(1);
      await expect(headings).toHaveText(route.h1);

      // Canonical and description are required on every route. Next strips the
      // trailing slash from the home canonical to match the site's setting, so
      // the home route is matched against the bare origin.
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        route.path === '/' ? /^https?:\/\/[^/]+\/?$/ : new RegExp(`${route.path}$`),
      );
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.length ?? 0).toBeGreaterThan(20);

      const body = await page.locator('body').innerText();
      for (const forbidden of FORBIDDEN_STRINGS) {
        expect(body).not.toContain(forbidden);
      }
      for (const pattern of FORBIDDEN_PATTERNS) {
        expect(body).not.toMatch(pattern);
      }

      // An em dash is not used anywhere in the approved copy.
      expect(body).not.toContain('—');
    });

    test(`${route.path} has no horizontal overflow`, async ({ page }) => {
      await page.goto(route.path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      // One pixel of tolerance for sub-pixel rounding.
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});

test('the language is Nigerian English', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-NG');
});

test('heading order is logical on a long page', async ({ page }) => {
  await page.goto('/services/brand-strategy');
  const levels = await page
    .locator('h1, h2, h3, h4')
    .evaluateAll((nodes) => nodes.map((node) => Number(node.tagName.slice(1))));

  expect(levels[0]).toBe(1);
  for (let index = 1; index < levels.length; index += 1) {
    const previous = levels[index - 1] ?? 1;
    const current = levels[index] ?? 1;
    expect(current - previous).toBeLessThanOrEqual(1);
  }
});

test('the 404 route renders the approved copy', async ({ page }) => {
  const response = await page.goto('/a-route-that-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('This page has moved, changed, or never existed.');
  await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();
});

test('the thank-you route is noindex and echoes nothing from the query string', async ({
  page,
}) => {
  await page.goto('/thank-you?type=project&email=someone%40example.com&note=INJECTED');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  const body = await page.locator('body').innerText();
  expect(body).not.toContain('someone@example.com');
  expect(body).not.toContain('INJECTED');
  await expect(page.locator('h1')).toHaveText('We have your project brief.');
});

test('drafts stay out of the public listings and the sitemap', async ({ page, request }) => {
  await page.goto('/insights');
  await expect(
    page.getByRole('heading', { name: 'The first articles are in editorial review.' }),
  ).toBeVisible();

  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).not.toContain('/insights/');
  expect(sitemap).not.toContain('/work/');
  expect(sitemap).not.toContain('/thank-you');
});

test('the work index renders the approved empty state rather than sample clients', async ({
  page,
}) => {
  await page.goto('/work');
  await expect(
    page.getByRole('heading', { name: 'Approved case studies are on the way.' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Tell us what you need' })).toBeVisible();
});
