'use client';

import { useEffect } from 'react';

import { errorContent } from '@/content/pages/states';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { siteSettings } from '@/lib/site-settings';

export default function Error({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only identifier that is safe to log here. Nothing about
    // the visitor or the failing request is recorded, and the stack trace and
    // digest are never shown on the page.
    console.error('Unhandled route error', { digest: error.digest });
  }, [error.digest]);

  const email = siteSettings.contactEmail;

  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <div className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-display-lg font-display font-normal">{errorContent.h1}</h1>
        <p className="text-ink-muted measure text-base/7">
          {email ? errorContent.bodyWithEmail(email) : errorContent.bodyWithoutEmail}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button onClick={reset}>{errorContent.primaryCta}</Button>
          <ButtonLink href={errorContent.secondaryCta.href} variant="secondary">
            {errorContent.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
