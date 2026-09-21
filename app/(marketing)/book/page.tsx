import type { Metadata } from 'next';

import { bookContent } from '@/content/pages/book';
import { BookingEmbed } from '@/components/booking/BookingEmbed';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';
import { siteSettings } from '@/lib/site-settings';

export const metadata: Metadata = pageMetadata({
  title: bookContent.seo.title,
  description: bookContent.seo.description,
  path: '/book',
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Book a strategy call', path: '/book' },
];

export default function BookPage() {
  const { calLink, contactEmail } = siteSettings;

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <Container className="pt-12 pb-10 md:pt-16">
        <div className="flex max-w-3xl flex-col gap-5">
          <h1 className="text-display-lg font-display font-normal">{bookContent.hero.h1}</h1>
          <p className="text-lede measure text-ink-muted">{bookContent.hero.body}</p>
        </div>
      </Container>

      <Section tone="surface" rule spacing="normal">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          {/* The explanation is plain HTML and stays useful whether or not the
              calendar ever loads. */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-display-sm font-display font-normal">
                {bookContent.covers.heading}
              </h2>
              <ul className="border-line border-t">
                {bookContent.covers.items.map((item) => (
                  <li key={item} className="border-line text-ink border-b py-3 text-base/7">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-ink text-lg font-semibold">
                {bookContent.whoShouldJoin.heading}
              </h2>
              <p className="text-ink-muted measure text-base/7">{bookContent.whoShouldJoin.body}</p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-ink text-lg font-semibold">{bookContent.whatToBring.heading}</h2>
              <p className="text-ink-muted measure text-base/7">{bookContent.whatToBring.body}</p>
            </div>

            <div className="border-rule flex flex-col gap-3 border-l-2 pl-5">
              <h2 className="text-ink text-lg font-semibold">{bookContent.reassurance.heading}</h2>
              <p className="text-ink-muted measure text-base/7">{bookContent.reassurance.body}</p>
            </div>
          </div>

          <div>
            {calLink ? (
              <BookingEmbed calLink={calLink} contactEmail={contactEmail} />
            ) : (
              <EmptyState
                heading="The booking calendar is not connected yet."
                body={
                  contactEmail
                    ? bookContent.states.unavailableWithEmail(contactEmail)
                    : bookContent.states.unavailableWithoutEmail
                }
                cta={bookContent.inquiryFallbackCta}
              />
            )}

            {calLink ? (
              <div className="mt-6">
                <ButtonLink href={bookContent.inquiryFallbackCta.href} variant="quiet">
                  {bookContent.inquiryFallbackCta.label}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
