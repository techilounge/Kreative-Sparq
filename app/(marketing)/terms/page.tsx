import type { Metadata } from 'next';

import { termsContent } from '@/content/pages/legal';
import { LegalDocument, LegalUnpublished } from '@/components/sections/LegalDocument';
import { pageMetadata } from '@/lib/seo/metadata';
import { siteSettings, termsPagePublished } from '@/lib/site-settings';

export const metadata: Metadata = pageMetadata({
  title: termsContent.seo.title,
  description: termsContent.seo.description,
  path: '/terms',
  noindex: true,
});

export default function TermsPage() {
  if (!termsPagePublished) {
    return <LegalUnpublished title={termsContent.h1} />;
  }

  return (
    <LegalDocument
      title={termsContent.h1}
      lastUpdatedLabel={termsContent.lastUpdatedLabel}
      lastUpdated={siteSettings.termsLastUpdated ?? ''}
      intro={termsContent.intro}
      blocks={termsContent.blocks}
    />
  );
}
