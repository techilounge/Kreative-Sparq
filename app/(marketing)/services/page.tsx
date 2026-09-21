import type { Metadata } from 'next';
import Link from 'next/link';

import { servicesOverviewContent } from '@/content/pages/services-overview';
import { services } from '@/content/services';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { HeroEditorial } from '@/components/sections/HeroEditorial';
import { ServiceIndex } from '@/components/sections/ServiceIndex';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = pageMetadata({
  title: servicesOverviewContent.seo.title,
  description: servicesOverviewContent.seo.description,
  path: '/services',
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <HeroEditorial
        title={servicesOverviewContent.hero.h1}
        body={servicesOverviewContent.hero.body}
        primaryCta={servicesOverviewContent.hero.primaryCta}
        secondaryCta={servicesOverviewContent.hero.secondaryCta}
        size="lg"
      />

      {/* The service finder leads with the symptom, so a visitor who cannot name
          the service they need still has a route in. */}
      <Section tone="muted" labelledBy="finder-heading" spacing="normal">
        <SectionHeading
          title={servicesOverviewContent.finder.heading}
          id="finder-heading"
          size="md"
          className="mb-8 md:mb-10"
        />
        <ul className="border-line-strong border-t">
          {services.map((service, index) => (
            <MotionReveal as="li" key={service.slug} index={index}>
              <Link
                href={`/services/${service.slug}`}
                className="border-line hover:border-action group grid gap-2 border-b py-5 transition-colors duration-200 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-baseline md:gap-8"
              >
                <p className="text-ink text-lg font-medium">{service.finderSymptom}</p>
                <p className="text-link group-hover:text-action-hover text-base/7 font-semibold">
                  {servicesOverviewContent.finder.prefix} {service.name}.
                </p>
              </Link>
            </MotionReveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="services-index-heading" spacing="normal">
        <h2 id="services-index-heading" className="sr-only">
          Services
        </h2>
        <ServiceIndex services={services} variant="overview" />
      </Section>

      <Section tone="surface" rule labelledBy="engagement-heading" spacing="normal">
        <SectionHeading
          title={servicesOverviewContent.engagement.heading}
          id="engagement-heading"
          size="md"
          className="mb-8 md:mb-12"
        />
        <dl className="border-line grid border-t lg:grid-cols-3">
          {servicesOverviewContent.engagement.options.map((option, index) => (
            <MotionReveal
              key={option.title}
              index={index}
              className="border-line flex flex-col gap-3 border-b py-7 lg:border-r lg:px-8 lg:last:border-r-0 lg:first:pl-0"
            >
              <dt className="font-display text-2xl font-normal">{option.title}</dt>
              <dd className="text-ink-muted text-base/7">{option.body}</dd>
            </MotionReveal>
          ))}
        </dl>
      </Section>

      <Section tone="muted" rule labelledBy="services-cta-heading" spacing="normal">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 id="services-cta-heading" className="text-display-md font-display font-normal">
            {servicesOverviewContent.cta.heading}
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-ink-muted measure text-base/7">{servicesOverviewContent.cta.body}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={servicesOverviewContent.cta.primaryCta.href}>
                {servicesOverviewContent.cta.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={servicesOverviewContent.cta.secondaryCta.href} variant="secondary">
                {servicesOverviewContent.cta.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
