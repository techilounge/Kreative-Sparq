import { brand } from '@/content/global';
import { siteSettings, siteUrl } from '@/lib/site-settings';

/**
 * `Organization` carries only fields that are verified and visible on the site.
 * An unconfigured email, phone, or social profile is omitted rather than guessed,
 * and no address, rating, award, or founding date is asserted.
 */
export function organizationSchema(): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: siteUrl,
    logo: new URL('/brand/kreative-sparq-logo-light.png', siteUrl).toString(),
    description: brand.positioning,
  };

  if (siteSettings.socialProfiles.length > 0) {
    schema['sameAs'] = siteSettings.socialProfiles;
  }
  if (siteSettings.contactEmail) {
    schema['email'] = siteSettings.contactEmail;
  }
  if (siteSettings.contactPhone) {
    schema['telephone'] = siteSettings.contactPhone;
  }

  return schema;
}

export type BreadcrumbEntry = { readonly name: string; readonly path: string };

export function breadcrumbSchema(entries: readonly BreadcrumbEntry[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: new URL(entry.path, siteUrl).toString(),
    })),
  };
}

export function articleSchema(input: {
  readonly headline: string;
  readonly description: string;
  readonly path: string;
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly authorName: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: new URL(input.path, siteUrl).toString(),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: { '@type': 'Person', name: input.authorName },
    publisher: {
      '@type': 'Organization',
      name: brand.name,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/brand/kreative-sparq-logo-light.png', siteUrl).toString(),
      },
    },
  };
}
