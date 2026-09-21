import type { Metadata } from 'next';

import { brand } from '@/content/global';
import { siteUrl } from '@/lib/site-settings';

export const defaultSocial = {
  siteName: 'Kreative Sparq',
  title: 'Kreative Sparq | Marketing Agency in Nigeria',
  description:
    'Strategy, creative, digital marketing, websites, and campaigns for brands ready to move with purpose.',
  imageAlt: 'Kreative Sparq, Marketing Agency',
  locale: 'en_NG',
} as const;

type PageMetadataInput = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly noindex?: boolean;
  readonly type?: 'website' | 'article';
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
  readonly authors?: readonly string[];
};

/**
 * One builder for every route, so canonicals, robots rules, and social metadata
 * stay consistent and no page can be shipped without them.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noindex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataInput): Metadata {
  const canonical = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type,
      url: canonical,
      siteName: defaultSocial.siteName,
      locale: defaultSocial.locale,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      ...(type === 'article'
        ? { publishedTime, modifiedTime, authors: authors ? [...authors] : undefined }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description: ogDescription ?? description,
    },
  };
}

export const organisationName = brand.name;
