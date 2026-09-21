import { beforeEach, describe, expect, it, vi } from 'vitest';

import { pageMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema, organizationSchema } from '@/lib/seo/structured-data';

describe('page metadata', () => {
  it('sets an absolute canonical and allows indexing by default', () => {
    const metadata = pageMetadata({
      title: 'A title',
      description: 'A description.',
      path: '/services/brand-strategy',
    });

    expect(metadata.alternates?.canonical).toBe(
      'https://kreativesparq.com/services/brand-strategy',
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });

  it('marks a noindex route as noindex, follow', () => {
    const metadata = pageMetadata({
      title: 'Thank you',
      description: 'Confirmation.',
      path: '/thank-you',
      noindex: true,
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it('falls back to the page title for Open Graph when no override is given', () => {
    const metadata = pageMetadata({ title: 'A title', description: 'A description.', path: '/' });
    expect(metadata.openGraph?.title).toBe('A title');
  });
});

describe('structured data', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('omits contact and social fields that have not been configured', () => {
    const schema = organizationSchema();
    expect(schema['@type']).toBe('Organization');
    expect(schema['name']).toBe('Kreative Sparq');
    expect(schema).not.toHaveProperty('sameAs');
    expect(schema).not.toHaveProperty('email');
    expect(schema).not.toHaveProperty('telephone');
    // No address, rating, award, or founding date is ever asserted.
    expect(schema).not.toHaveProperty('address');
    expect(schema).not.toHaveProperty('aggregateRating');
    expect(schema).not.toHaveProperty('foundingDate');
  });

  it('numbers breadcrumb entries from one and makes each item absolute', () => {
    const schema = breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]);
    const items = schema['itemListElement'] as { position: number; item: string }[];
    expect(items[0]?.position).toBe(1);
    expect(items[1]?.item).toBe('https://kreativesparq.com/services');
  });

  it('uses the publish date as the modified date when no update exists', () => {
    const schema = articleSchema({
      headline: 'A headline',
      description: 'A description.',
      path: '/insights/a-slug',
      publishedAt: '2026-01-01',
      authorName: 'An author',
    });
    expect(schema['dateModified']).toBe('2026-01-01');
  });
});
