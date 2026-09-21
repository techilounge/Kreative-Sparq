import type { ReactNode } from 'react';

import { ButtonLink } from './Button';

type EmptyStateProps = {
  readonly heading?: string;
  readonly body: string;
  readonly cta?: { readonly label: string; readonly href: string };
  readonly children?: ReactNode;
};

/**
 * Used wherever approved content does not exist yet. It is a composed editorial
 * block rather than a dashed placeholder box, so a section with nothing to show
 * still reads as designed.
 */
export function EmptyState({ heading, body, cta, children }: EmptyStateProps) {
  return (
    <div className="border-line border-t pt-8 md:pt-10">
      <div className="flex flex-col gap-5">
        {heading ? <h3 className="text-display-sm font-display font-normal">{heading}</h3> : null}
        <p className="measure text-base/7 text-ink-muted">{body}</p>
        {children}
        {cta ? (
          <div>
            <ButtonLink href={cta.href} variant="secondary">
              {cta.label}
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
