import { describe, expect, it } from 'vitest';

import { articles } from '@/content/articles';
import { caseStudies, type CaseStudy } from '@/content/case-studies';
import { isArticlePublishable, isCaseStudyPublishable, readingTimeMinutes } from '@/lib/content';

function completeCaseStudy(overrides: Partial<CaseStudy> = {}): CaseStudy {
  return {
    slug: 'example-project',
    status: 'published',
    clientName: 'Approved Client',
    sector: 'Hospitality',
    title: 'An approved project title',
    summary: 'A short summary of the challenge and the response.',
    year: '2026',
    services: ['brand-strategy'],
    seo: { title: 'Title | Kreative Sparq', description: 'Description.' },
    brief: ['The situation.'],
    objective: ['The objective.'],
    thinking: ['The decision.'],
    work: ['The execution.'],
    results: [
      {
        value: '2x',
        label: 'Qualified inquiries',
        period: 'January to March 2026',
        source: 'Client CRM export',
        context: 'Compared with the preceding quarter.',
      },
    ],
    gallery: [],
    clientApproved: true,
    publishedAt: '2026-04-01',
    ...overrides,
  };
}

describe('case study publishability', () => {
  it('accepts a complete, client-approved case study', () => {
    expect(isCaseStudyPublishable(completeCaseStudy())).toBe(true);
  });

  it('rejects one without client approval', () => {
    expect(isCaseStudyPublishable(completeCaseStudy({ clientApproved: false }))).toBe(false);
  });

  it('rejects a draft even when every field is filled in', () => {
    expect(isCaseStudyPublishable(completeCaseStudy({ status: 'draft' }))).toBe(false);
  });

  it('rejects a result that is missing its source or period', () => {
    const missingSource = completeCaseStudy({
      results: [
        {
          value: '2x',
          label: 'Qualified inquiries',
          period: 'January to March 2026',
          source: '',
          context: 'Compared with the preceding quarter.',
        },
      ],
    });
    expect(isCaseStudyPublishable(missingSource)).toBe(false);
  });

  it('rejects a gallery item without cleared rights', () => {
    const uncleared = completeCaseStudy({
      gallery: [
        {
          src: '/images/a.jpg',
          alt: 'Campaign poster',
          width: 1200,
          height: 800,
          rightsCleared: false,
        },
      ],
    });
    expect(isCaseStudyPublishable(uncleared)).toBe(false);
  });

  it('rejects an unapproved testimonial', () => {
    const unapproved = completeCaseStudy({
      testimonial: {
        quote: 'A quote.',
        name: 'A person',
        role: 'A role',
        organisation: 'An organisation',
        approved: false,
      },
    });
    expect(isCaseStudyPublishable(unapproved)).toBe(false);
  });

  it('ships with no publishable case studies, so the empty state is what renders', () => {
    expect(caseStudies.filter(isCaseStudyPublishable)).toHaveLength(0);
  });
});

describe('article publishability', () => {
  it('keeps every launch article out of public listings while it is a draft', () => {
    expect(articles).toHaveLength(3);
    expect(articles.filter(isArticlePublishable)).toHaveLength(0);
  });

  it('requires an author even when the status is published', () => {
    const article = articles[0];
    expect(article).toBeDefined();
    if (!article) return;
    const withoutAuthor = { ...article, status: 'published' as const, publishedAt: '2026-01-01' };
    expect(isArticlePublishable(withoutAuthor)).toBe(false);
  });

  it('publishes once status, author, and publish date are all present', () => {
    const article = articles[0];
    expect(article).toBeDefined();
    if (!article) return;
    const ready = {
      ...article,
      status: 'published' as const,
      publishedAt: '2026-01-01',
      author: { name: 'A name', role: 'A role', responsibility: 'a responsibility' },
    };
    expect(isArticlePublishable(ready)).toBe(true);
  });

  it('reports a sensible reading time', () => {
    const article = articles[0];
    expect(article).toBeDefined();
    if (!article) return;
    const minutes = readingTimeMinutes(article);
    expect(minutes).toBeGreaterThan(2);
    expect(minutes).toBeLessThan(30);
  });
});
