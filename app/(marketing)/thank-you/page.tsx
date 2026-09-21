import type { Metadata } from 'next';

import { thankYouContent } from '@/content/pages/thank-you';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { replyWindowFragment } from '@/lib/site-settings';

export const metadata: Metadata = {
  title: thankYouContent.seo.title,
  // The page must never become a search result.
  robots: { index: false, follow: true },
};

type PageProps = {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ThankYouPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawType = params['type'];

  // Only a known value from a fixed set is honoured. Nothing from the query
  // string is ever rendered, so a crafted URL cannot put text on this page.
  const variant =
    rawType === 'project' ? 'project' : rawType === 'newsletter' ? 'newsletter' : 'contact';

  const content = thankYouContent[variant];
  const window = replyWindowFragment();

  return (
    <Container className="flex min-h-[55vh] flex-col justify-center py-20">
      <div className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-display-lg font-display font-normal">{content.h1}</h1>

        <p className="text-ink-muted measure text-base/7">
          {variant === 'contact' ? `${content.body} ${window}.` : null}
          {variant === 'project'
            ? `${thankYouContent.project.body} ${window} ${thankYouContent.project.bodySuffix}`
            : null}
          {variant === 'newsletter' ? content.body : null}
        </p>

        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href={content.primaryCta.href}>{content.primaryCta.label}</ButtonLink>
          {'secondaryCta' in content ? (
            <ButtonLink href={content.secondaryCta.href} variant="secondary">
              {content.secondaryCta.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
