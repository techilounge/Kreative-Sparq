import { describe, expect, it } from 'vitest';

import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

describe('sitemap', () => {
  it('includes every canonical public route', async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    for (const path of [
      '',
      '/services',
      '/work',
      '/about',
      '/insights',
      '/contact',
      '/start-a-project',
      '/book',
      '/services/brand-strategy',
      '/services/campaigns-activations',
    ]) {
      expect(urls).toContain(`https://kreativesparq.com${path}`);
    }
  });

  it('excludes thank-you, drafts, and unpublished legal routes', async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).not.toContain('https://kreativesparq.com/thank-you');
    expect(urls).not.toContain('https://kreativesparq.com/privacy');
    expect(urls).not.toContain('https://kreativesparq.com/terms');
    // All three launch articles are drafts.
    expect(urls.filter((url) => url.includes('/insights/'))).toHaveLength(0);
    expect(urls.filter((url) => url.includes('/work/'))).toHaveLength(0);
  });

  it('has no duplicate entries', async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe('robots', () => {
  it('disallows thank-you and the API surface, and points at the sitemap', () => {
    const rules = robots();
    const rule = Array.isArray(rules.rules) ? rules.rules[0] : rules.rules;
    expect(rule?.disallow).toContain('/thank-you');
    expect(rules.sitemap).toBe('https://kreativesparq.com/sitemap.xml');
  });
});
