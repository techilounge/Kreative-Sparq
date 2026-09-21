import type { Metadata } from 'next';

import { privacyContent } from '@/content/pages/legal';
import { LegalDocument, LegalUnpublished } from '@/components/sections/LegalDocument';
import { pageMetadata } from '@/lib/seo/metadata';
import { privacyPagePublished, siteSettings } from '@/lib/site-settings';

export const metadata: Metadata = pageMetadata({
  title: privacyContent.seo.title,
  description: privacyContent.seo.description,
  path: '/privacy',
  // The copy deck sets this route to `noindex, follow` in either state.
  noindex: true,
});

export default function PrivacyPage() {
  if (!privacyPagePublished) {
    return <LegalUnpublished title={privacyContent.h1} />;
  }

  return (
    <LegalDocument
      title={privacyContent.h1}
      lastUpdatedLabel={privacyContent.lastUpdatedLabel}
      lastUpdated={siteSettings.privacyLastUpdated ?? ''}
      intro={privacyContent.intro}
      blocks={privacyContent.blocks}
    >
      <section className="flex flex-col gap-3">
        <h2 className="text-display-sm font-display mt-4 font-normal">
          {privacyContent.responsibleHeading}
        </h2>
        <p className="text-ink measure text-base/7">{privacyContent.responsibleIntro}</p>
        <dl className="border-line flex flex-col gap-2 border-t pt-4">
          <div>
            <dt className="sr-only">Legal business name</dt>
            <dd className="text-ink font-medium">{siteSettings.legalBusinessName}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-muted">{privacyContent.responsibleLabels.tradingAs}:</dt>
            <dd className="text-ink">{privacyContent.tradingAs}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-muted">{privacyContent.responsibleLabels.address}:</dt>
            <dd className="text-ink">{siteSettings.legalAddress}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-muted">{privacyContent.responsibleLabels.email}:</dt>
            <dd>
              <a
                href={`mailto:${siteSettings.privacyEmail}`}
                className="text-link hover:text-action-hover underline underline-offset-4"
              >
                {siteSettings.privacyEmail}
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </LegalDocument>
  );
}
