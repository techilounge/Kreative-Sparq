import { ctaBand } from '@/content/global';

import { ButtonLink } from './Button';
import { Container } from './Container';

/**
 * The site-wide dual-path band. It uses a tonal surface and a heavy top rule
 * rather than a rounded card, so it reads as a change of register on the page.
 */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-band-heading" className="bg-surface-muted border-rule border-t-2">
      <Container className="py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{ctaBand.eyebrow}</p>
            <h2 id="cta-band-heading" className="text-display-md font-display font-normal">
              {ctaBand.heading}
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-ink-muted measure text-base/7">{ctaBand.body}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={ctaBand.primaryCta.href}>{ctaBand.primaryCta.label}</ButtonLink>
              <ButtonLink href={ctaBand.secondaryCta.href} variant="secondary">
                {ctaBand.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
