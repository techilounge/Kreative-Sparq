import type { MetadataRoute } from 'next';

import { services } from '@/content/services';
import { contentSource } from '@/lib/content';
import { privacyPagePublished, siteUrl, termsPagePublished } from '@/lib/site-settings';

/**
 * Only canonical public routes and published records. Thank-you pages, drafts,
 * and unpublished legal routes never appear.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...['/services', '/work', '/about', '/insights', '/contact', '/start-a-project', '/book'].map(
      (path) => ({
        url: new URL(path, siteUrl).toString(),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }),
    ),
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: new URL(`/services/${service.slug}`, siteUrl).toString(),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const caseStudies = await contentSource.getPublishedCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: new URL(`/work/${caseStudy.slug}`, siteUrl).toString(),
    lastModified: caseStudy.publishedAt ? new Date(caseStudy.publishedAt) : now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const articles = await contentSource.getPublishedArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: new URL(`/insights/${article.slug}`, siteUrl).toString(),
    lastModified: new Date(article.updatedAt ?? article.publishedAt ?? now),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const legalRoutes: MetadataRoute.Sitemap = [
    ...(privacyPagePublished
      ? [
          {
            url: new URL('/privacy', siteUrl).toString(),
            lastModified: now,
            changeFrequency: 'yearly' as const,
            priority: 0.2,
          },
        ]
      : []),
    ...(termsPagePublished
      ? [
          {
            url: new URL('/terms', siteUrl).toString(),
            lastModified: now,
            changeFrequency: 'yearly' as const,
            priority: 0.2,
          },
        ]
      : []),
  ];

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...articleRoutes, ...legalRoutes];
}
