import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { services } from '@/content/services';
import { FaqList } from '@/components/sections/FaqList';
import { HeroEditorial } from '@/components/sections/HeroEditorial';
import { RelatedServices } from '@/components/sections/RelatedServices';
import { ServiceSectionBlocks } from '@/components/sections/ServiceSectionBlocks';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { contentSource } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

type PageProps = { readonly params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await contentSource.getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    ogTitle: service.seo.ogTitle,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await contentSource.getService(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <Container className="pt-6">
        <Breadcrumbs entries={breadcrumbs} />
      </Container>

      <HeroEditorial
        eyebrow={service.name}
        title={service.hero.h1}
        body={service.hero.body}
        primaryCta={service.hero.primaryCta}
        secondaryCta={service.hero.secondaryCta}
        size="lg"
      />

      <ServiceSectionBlocks sections={service.sections} />

      <Section
        tone={service.sections.length % 2 === 1 ? 'surface' : 'page'}
        rule
        labelledBy="service-faqs"
        spacing="normal"
      >
        <FaqList faqs={service.faqs} headingId="service-faqs" />
      </Section>

      <Section tone="muted" rule labelledBy="related-services" spacing="tight">
        <RelatedServices slugs={service.relatedServices} headingId="related-services" />
      </Section>

      <Section rule labelledBy="service-cta" spacing="normal">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 id="service-cta" className="text-display-md font-display font-normal">
            {service.cta.heading}
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-ink-muted measure text-base/7">{service.cta.body}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={service.cta.primaryCta.href}>
                {service.cta.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={service.cta.secondaryCta.href} variant="secondary">
                {service.cta.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
