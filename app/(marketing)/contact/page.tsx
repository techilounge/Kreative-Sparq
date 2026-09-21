import type { Metadata } from 'next';
import Link from 'next/link';

import { contactContent } from '@/content/pages/contact';
import { leadDestinationConfigured } from '@/lib/lead-destination';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';
import { replyWindowSentence, siteSettings } from '@/lib/site-settings';

export const metadata: Metadata = pageMetadata({
  title: contactContent.seo.title,
  description: contactContent.seo.description,
  path: '/contact',
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

export default function ContactPage() {
  const { contactEmail, contactPhone, responseTime, turnstileSiteKey } = siteSettings;
  const details = contactContent.details;

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <Container className="pt-12 pb-10 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <h1 className="text-display-lg font-display max-w-[18ch] font-normal">
              {contactContent.hero.h1}
            </h1>
            <p className="text-lede measure text-ink-muted">{contactContent.hero.body}</p>
            <p className="text-ink text-base/7">
              {contactContent.hero.alternativeCta.text}{' '}
              <Link
                href={contactContent.hero.alternativeCta.href}
                className="text-link hover:text-action-hover underline underline-offset-4"
              >
                {contactContent.hero.alternativeCta.label}
              </Link>
            </p>
          </div>

          {/* Only monitored channels are shown. An unconfigured method is
              omitted rather than displayed with a placeholder. */}
          <dl className="border-line flex flex-col gap-6 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {contactEmail ? (
              <div>
                <dt className="eyebrow mb-1.5">{details.emailLabel}</dt>
                <dd>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-link hover:text-action-hover inline-flex min-h-11 items-center underline underline-offset-4"
                  >
                    {contactEmail}
                  </a>
                </dd>
              </div>
            ) : null}

            {contactPhone ? (
              <div>
                <dt className="eyebrow mb-1.5">{details.phoneLabel}</dt>
                <dd>
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                    className="text-link hover:text-action-hover inline-flex min-h-11 items-center underline underline-offset-4"
                  >
                    {contactPhone}
                  </a>
                </dd>
              </div>
            ) : null}

            <div>
              <dt className="eyebrow mb-1.5">{details.serviceAreaLabel}</dt>
              <dd className="text-ink-muted text-base/7">{details.serviceArea}</dd>
            </div>

            {responseTime ? (
              <div>
                <dt className="eyebrow mb-1.5">{details.responseLabel}</dt>
                <dd className="text-ink-muted text-base/7">{replyWindowSentence()}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </Container>

      <Section tone="surface" rule labelledBy="contact-form-heading" spacing="normal">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="flex flex-col gap-4">
            <h2 id="contact-form-heading" className="text-display-md font-display font-normal">
              {contactContent.form.heading}
            </h2>
            <p className="text-ink-muted measure text-base/7">{contactContent.form.intro}</p>
          </div>

          <div>
            {leadDestinationConfigured ? (
              <ContactForm turnstileSiteKey={turnstileSiteKey} />
            ) : (
              <EmptyState
                heading={contactContent.unavailable.heading}
                body={contactContent.unavailable.body}
                cta={contactContent.unavailable.cta}
              />
            )}
          </div>
        </div>
      </Section>

      <Section rule labelledBy="contact-next-heading" spacing="tight">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <h2 id="contact-next-heading" className="text-display-sm font-display font-normal">
            {contactContent.reassurance.heading}
          </h2>
          <div className="flex flex-col gap-5">
            <p className="text-ink-muted measure text-base/7">{contactContent.reassurance.body}</p>
            <div>
              <ButtonLink href="/start-a-project" variant="secondary">
                Start a project
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
