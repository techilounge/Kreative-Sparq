import type { Metadata } from 'next';

import { notFoundContent } from '@/content/pages/states';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: notFoundContent.seo.title,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <div className="flex max-w-2xl flex-col gap-6">
        <p className="eyebrow">404</p>
        <h1 className="text-display-lg font-display font-normal">{notFoundContent.h1}</h1>
        <p className="text-ink-muted measure text-base/7">{notFoundContent.body}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href={notFoundContent.primaryCta.href}>
            {notFoundContent.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={notFoundContent.secondaryCta.href} variant="secondary">
            {notFoundContent.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
