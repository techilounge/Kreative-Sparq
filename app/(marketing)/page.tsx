import type { Metadata } from 'next';

import { homeContent } from '@/content/pages/home';
import { services } from '@/content/services';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { HeroEditorial } from '@/components/sections/HeroEditorial';
import { InsightCard } from '@/components/sections/InsightCard';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ReasonGrid } from '@/components/sections/ReasonGrid';
import { ServiceIndex } from '@/components/sections/ServiceIndex';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { contentSource } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
import { organizationSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = pageMetadata({
  title: homeContent.seo.title,
  description: homeContent.seo.description,
  path: '/',
  ogTitle: homeContent.seo.ogTitle,
  ogDescription: homeContent.seo.ogDescription,
});

export default async function HomePage() {
  const [caseStudies, articles] = await Promise.all([
    contentSource.getPublishedCaseStudies(),
    contentSource.getPublishedArticles(),
  ]);

  const featuredCaseStudies = caseStudies.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      <JsonLd data={organizationSchema()} />

      <HeroEditorial
        eyebrow={homeContent.hero.eyebrow}
        title={homeContent.hero.h1}
        body={homeContent.hero.body}
        primaryCta={homeContent.hero.primaryCta}
        secondaryCta={homeContent.hero.secondaryCta}
        supportingNote={homeContent.hero.supportingNote}
      />

      {/* Capability statement. A single wide passage on a tonal surface, set
          against the hero's asymmetry so two consecutive sections do not share
          the same rhythm. */}
      <Section tone="muted" spacing="tight" labelledBy="capability-heading">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <h2 id="capability-heading" className="text-display-md font-display font-normal">
            {homeContent.capability.heading}
          </h2>
          <p className="text-lede measure text-ink">{homeContent.capability.body}</p>
        </div>
      </Section>

      <Section labelledBy="services-heading" spacing="normal">
        <SectionHeading
          eyebrow={homeContent.servicesOverview.eyebrow}
          title={homeContent.servicesOverview.heading}
          id="services-heading"
          size="md"
          className="mb-8 max-w-3xl md:mb-12"
        >
          <p className="text-ink-muted measure text-base/7">{homeContent.servicesOverview.intro}</p>
        </SectionHeading>
        <ServiceIndex services={services} variant="home" />
      </Section>

      <Section tone="surface" rule labelledBy="work-heading" spacing="normal">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <SectionHeading
            eyebrow={homeContent.work.eyebrow}
            title={homeContent.work.heading}
            id="work-heading"
            size="md"
          />
          <div className="flex flex-col gap-8">
            <p className="text-ink-muted measure text-base/7">{homeContent.work.body}</p>

            {featuredCaseStudies.length > 0 ? (
              <>
                <ul className="flex flex-col">
                  {featuredCaseStudies.map((caseStudy, index) => (
                    <MotionReveal
                      as="li"
                      key={caseStudy.slug}
                      index={index}
                      className="border-line border-t py-6"
                    >
                      <p className="eyebrow mb-2">
                        {caseStudy.sector} · {caseStudy.clientName}
                      </p>
                      <h3 className="font-display text-2xl font-normal">
                        <a
                          href={`/work/${caseStudy.slug}`}
                          className="hover:text-action transition-colors duration-200"
                        >
                          {caseStudy.title}
                        </a>
                      </h3>
                      <p className="text-ink-muted mt-2 text-base/7">{caseStudy.summary}</p>
                    </MotionReveal>
                  ))}
                </ul>
                <div>
                  <ButtonLink href={homeContent.work.cta.href} variant="secondary">
                    {homeContent.work.cta.label}
                  </ButtonLink>
                </div>
              </>
            ) : (
              <EmptyState
                body={homeContent.work.emptyState.body}
                cta={homeContent.work.emptyState.cta}
              />
            )}
          </div>
        </div>
      </Section>

      <Section labelledBy="why-heading" spacing="normal">
        <SectionHeading
          eyebrow={homeContent.why.eyebrow}
          title={homeContent.why.heading}
          id="why-heading"
          size="md"
          className="mb-8 max-w-3xl md:mb-12"
        >
          <p className="text-ink-muted measure text-base/7">{homeContent.why.body}</p>
        </SectionHeading>
        <ReasonGrid items={homeContent.why.points} />
      </Section>

      <Section tone="muted" labelledBy="process-heading" spacing="normal">
        <SectionHeading
          eyebrow={homeContent.process.eyebrow}
          title={homeContent.process.heading}
          id="process-heading"
          size="md"
          className="mb-8 md:mb-12"
        />
        <ProcessSteps steps={homeContent.process.steps} />
      </Section>

      {/* Audience. One wide statement, deliberately the quietest section on the
          page so the process and services sections keep their weight. */}
      <Section labelledBy="audience-heading" spacing="tight">
        <div className="border-rule max-w-4xl border-l-2 pl-6 md:pl-10">
          <h2 id="audience-heading" className="text-display-sm font-display font-normal">
            {homeContent.audience.heading}
          </h2>
          <p className="text-ink-muted measure-wide mt-4 text-base/7">
            {homeContent.audience.body}
          </p>
        </div>
      </Section>

      {/* The testimonial section is hidden until a verified quote with written
          approval exists. See CONTENT_REQUIREMENTS.md. */}

      {latestArticles.length > 0 ? (
        <Section tone="surface" rule labelledBy="insights-heading" spacing="normal">
          <SectionHeading
            eyebrow={homeContent.insights.eyebrow}
            title={homeContent.insights.heading}
            id="insights-heading"
            size="md"
            className="mb-8 max-w-3xl md:mb-12"
          >
            <p className="text-ink-muted measure text-base/7">{homeContent.insights.body}</p>
          </SectionHeading>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {latestArticles.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href={homeContent.insights.cta.href} variant="secondary">
              {homeContent.insights.cta.label}
            </ButtonLink>
          </div>
        </Section>
      ) : null}

      <Section tone="muted" rule labelledBy="final-cta-heading" spacing="normal">
        <Container className="!px-0">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h2 id="final-cta-heading" className="text-display-lg font-display font-normal">
              {homeContent.finalCta.heading}
            </h2>
            <div className="flex flex-col gap-6">
              <p className="text-ink-muted measure text-base/7">{homeContent.finalCta.body}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={homeContent.finalCta.primaryCta.href}>
                  {homeContent.finalCta.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={homeContent.finalCta.secondaryCta.href} variant="secondary">
                  {homeContent.finalCta.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
