import type { Metadata } from 'next';

import { startProjectContent } from '@/content/pages/start-a-project';
import { leadDestinationConfigured } from '@/lib/lead-destination';
import { ProjectBriefForm } from '@/components/forms/ProjectBriefForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';
import { siteSettings } from '@/lib/site-settings';

export const metadata: Metadata = pageMetadata({
  title: startProjectContent.seo.title,
  description: startProjectContent.seo.description,
  path: '/start-a-project',
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Start a project', path: '/start-a-project' },
];

export default function StartAProjectPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <Container className="pt-12 pb-10 md:pt-16">
        <div className="flex max-w-3xl flex-col gap-5">
          <h1 className="text-display-lg font-display font-normal">
            {startProjectContent.hero.h1}
          </h1>
          <p className="text-lede measure text-ink-muted">{startProjectContent.hero.body}</p>
        </div>
      </Container>

      <Section tone="surface" rule spacing="normal">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            {leadDestinationConfigured ? (
              <ProjectBriefForm
                turnstileSiteKey={siteSettings.turnstileSiteKey}
                budgetBands={siteSettings.budgetBands}
              />
            ) : (
              <EmptyState
                heading={startProjectContent.unavailable.heading}
                body={startProjectContent.unavailable.body}
                cta={startProjectContent.unavailable.cta}
              />
            )}
          </div>

          <aside className="border-line flex flex-col gap-4 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <h2 className="eyebrow">Before you send</h2>
            <p className="text-ink-muted text-sm/6">{startProjectContent.privacyNote}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
