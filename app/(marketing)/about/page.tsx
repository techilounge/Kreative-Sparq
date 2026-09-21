import type { Metadata } from 'next';

import { aboutContent } from '@/content/pages/about';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { HeroEditorial } from '@/components/sections/HeroEditorial';
import { ReasonGrid } from '@/components/sections/ReasonGrid';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = pageMetadata({
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
  path: '/about',
  ogTitle: aboutContent.seo.ogTitle,
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <HeroEditorial
        title={aboutContent.hero.h1}
        body={aboutContent.hero.body}
        primaryCta={aboutContent.hero.primaryCta}
        secondaryCta={aboutContent.hero.secondaryCta}
        size="lg"
      />

      <Section tone="muted" labelledBy="pov-heading" spacing="normal">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <SectionHeading
            eyebrow={aboutContent.pointOfView.eyebrow}
            title={aboutContent.pointOfView.heading}
            id="pov-heading"
            size="md"
          />
          <div className="flex flex-col gap-5">
            {aboutContent.pointOfView.body.map((paragraph) => (
              <p key={paragraph} className="text-ink measure text-base/7">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="beliefs-heading" spacing="normal">
        <SectionHeading
          title={aboutContent.beliefs.heading}
          id="beliefs-heading"
          size="md"
          className="mb-8 md:mb-12"
        />
        <ReasonGrid items={aboutContent.beliefs.items} />
      </Section>

      <Section tone="surface" rule labelledBy="clients-heading" spacing="normal">
        <div className="border-rule max-w-4xl border-l-2 pl-6 md:pl-10">
          <h2 id="clients-heading" className="text-display-md font-display font-normal">
            {aboutContent.whoWeWorkWith.heading}
          </h2>
          <p className="text-ink-muted measure-wide mt-5 text-base/7">
            {aboutContent.whoWeWorkWith.body}
          </p>
        </div>
      </Section>

      <Section labelledBy="relationship-heading" spacing="normal">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <h2 id="relationship-heading" className="text-display-md font-display font-normal">
            {aboutContent.relationship.heading}
          </h2>
          <ul className="border-line border-t">
            {aboutContent.relationship.items.map((item, index) => (
              <MotionReveal
                as="li"
                key={item}
                index={index}
                className="border-line text-ink border-b py-4 text-base/7"
              >
                {item}
              </MotionReveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* The team section is hidden until approved profiles and photographs
          exist. No invented people, and no AI-generated portraits. See
          CONTENT_REQUIREMENTS.md. */}

      <Section tone="muted" rule labelledBy="service-area-heading" spacing="tight">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <h2 id="service-area-heading" className="text-display-sm font-display font-normal">
            {aboutContent.serviceArea.heading}
          </h2>
          <p className="text-ink-muted measure text-base/7">{aboutContent.serviceArea.body}</p>
        </div>
      </Section>

      <Section rule labelledBy="about-cta-heading" spacing="normal">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 id="about-cta-heading" className="text-display-md font-display font-normal">
            {aboutContent.cta.heading}
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-ink-muted measure text-base/7">{aboutContent.cta.body}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={aboutContent.cta.primaryCta.href}>
                {aboutContent.cta.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={aboutContent.cta.secondaryCta.href} variant="secondary">
                {aboutContent.cta.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
