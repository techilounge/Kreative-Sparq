import type { MetadataRoute } from 'next';

import { siteUrl } from '@/lib/site-settings';

/**
 * Preview and development deployments are excluded from crawling entirely.
 * Production allows everything except routes that must never become a search
 * result. CSS, JavaScript, and images stay crawlable so pages can be rendered.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === undefined;

  if (!isProduction) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you', '/api/'],
      },
    ],
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
    host: siteUrl,
  };
}
