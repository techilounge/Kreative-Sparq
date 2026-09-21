import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

type HeroEditorialProps = {
  readonly eyebrow?: string;
  readonly title: string;
  readonly body: string;
  readonly primaryCta?: { readonly label: string; readonly href: string };
  readonly secondaryCta?: { readonly label: string; readonly href: string };
  readonly supportingNote?: string;
  readonly size?: 'xl' | 'lg';
  readonly aside?: React.ReactNode;
};

/**
 * The agency hero: an asymmetric editorial composition led by the headline.
 *
 * There is no centred gradient headline, no floating screenshot, and no logo
 * cloud. Hierarchy comes from scale, alignment, and a single terracotta rule.
 */
export function HeroEditorial({
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
  supportingNote,
  size = 'xl',
  aside,
}: HeroEditorialProps) {
  return (
    <section className="border-line border-b">
      <Container className="pt-12 pb-14 md:pt-20 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            {eyebrow ? (
              <div className="flex items-center gap-3">
                <span aria-hidden className="bg-display-accent block h-px w-10" />
                <p className="eyebrow">{eyebrow}</p>
              </div>
            ) : null}
            <h1
              className={
                size === 'xl'
                  ? 'text-display-xl font-display max-w-[16ch] font-normal'
                  : 'text-display-lg font-display max-w-[20ch] font-normal'
              }
            >
              {title}
            </h1>
            <p className="text-lede measure text-ink-muted">{body}</p>
            {primaryCta || secondaryCta ? (
              <div className="mt-2 flex flex-wrap gap-3">
                {primaryCta ? (
                  <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
                ) : null}
                {secondaryCta ? (
                  <ButtonLink href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>

          {aside ?? null}
        </div>

        {supportingNote ? (
          <p className="border-line text-ink-muted mt-12 border-t pt-6 text-sm/6 md:mt-16">
            {supportingNote}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
