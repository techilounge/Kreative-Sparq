import type { Metadata } from 'next';
import Link from 'next/link';

import { workContent } from '@/content/pages/work';
import { getService } from '@/content/services';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { HeroEditorial } from '@/components/sections/HeroEditorial';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { contentSource } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = pageMetadata({
  title: workContent.seo.title,
  description: workContent.seo.description,
  path: '/work',
  ogTitle: workContent.seo.ogTitle,
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
];

export default async function WorkPage() {
  const caseStudies = await contentSource.getPublishedCaseStudies();

  // Filters that would produce an empty category are not rendered at all.
  const activeCategories = Object.entries(workContent.filters.labels).filter(([slug]) =>
    caseStudies.some((caseStudy) => caseStudy.services.includes(slug as never)),
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <HeroEditorial
        title={workContent.hero.h1}
        body={workContent.hero.body}
        primaryCta={workContent.hero.primaryCta}
        size="lg"
      />

      <Section labelledBy="work-index-heading" spacing="normal">
        <h2 id="work-index-heading" className="sr-only">
          Case studies
        </h2>

        {caseStudies.length === 0 ? (
          <EmptyState
            heading={workContent.emptyState.heading}
            body={workContent.emptyState.body}
            cta={workContent.emptyState.cta}
          />
        ) : (
          <>
            {activeCategories.length > 0 ? (
              <nav aria-label="Filter work" className="mb-10">
                <ul className="flex flex-wrap gap-2">
                  <li>
                    <span className="border-action bg-action text-ink-on-action inline-flex min-h-11 items-center rounded-sm border px-4 text-sm font-medium">
                      {workContent.filters.all}
                    </span>
                  </li>
                  {activeCategories.map(([slug, label]) => (
                    <li key={slug}>
                      <Link
                        href={`/work?category=${slug}`}
                        className="border-line-strong text-ink-muted hover:border-action hover:text-action inline-flex min-h-11 items-center rounded-sm border px-4 text-sm font-medium transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p aria-live="polite" className="sr-only">
                  {workContent.filters.status(caseStudies.length, workContent.filters.all)}
                </p>
              </nav>
            ) : null}

            <ul className="border-line border-t">
              {caseStudies.map((caseStudy, index) => (
                <MotionReveal as="li" key={caseStudy.slug} index={index}>
                  <Link
                    href={`/work/${caseStudy.slug}`}
                    className="border-line hover:border-action group grid gap-4 border-b py-8 transition-colors duration-200 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16"
                  >
                    <div className="flex flex-col gap-3">
                      <p className="eyebrow">
                        {caseStudy.sector} · {caseStudy.clientName}
                      </p>
                      <h3 className="text-display-sm font-display group-hover:text-action font-normal transition-colors duration-200">
                        {caseStudy.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-ink-muted text-base/7">{caseStudy.summary}</p>
                      <p className="text-ink-muted text-sm/6">
                        {caseStudy.services
                          .map((slug) => getService(slug)?.name)
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                      <span className="text-link text-sm font-semibold underline underline-offset-4">
                        {workContent.cardCta}
                      </span>
                    </div>
                  </Link>
                </MotionReveal>
              ))}
            </ul>

            <p className="text-ink-muted measure-wide mt-8 text-sm/6">{workContent.resultsNote}</p>
          </>
        )}
      </Section>

      <Section tone="surface" rule labelledBy="work-cta-heading" spacing="normal">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 id="work-cta-heading" className="text-display-md font-display font-normal">
            {workContent.cta.heading}
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-ink-muted measure text-base/7">{workContent.cta.body}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={workContent.cta.primaryCta.href}>
                {workContent.cta.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={workContent.cta.secondaryCta.href} variant="secondary">
                {workContent.cta.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
