import type { ReactNode } from 'react';

import { cx } from '@/lib/utils';

import { Container } from './Container';

type Tone = 'page' | 'surface' | 'muted';

const tones: Record<Tone, string> = {
  page: 'bg-background',
  surface: 'bg-surface',
  muted: 'bg-surface-muted',
};

type SectionProps = {
  readonly children: ReactNode;
  readonly tone?: Tone;
  /** A top rule reads as an editorial divider instead of a card edge. */
  readonly rule?: boolean;
  readonly id?: string;
  readonly className?: string;
  readonly labelledBy?: string;
  readonly spacing?: 'tight' | 'normal' | 'loose';
};

const spacingClasses = {
  tight: 'py-12 md:py-16',
  normal: 'py-16 md:py-24',
  loose: 'py-20 md:py-32',
} as const;

export function Section({
  children,
  tone = 'page',
  rule = false,
  id,
  className,
  labelledBy,
  spacing = 'normal',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(tones[tone], rule && 'border-t border-line', className)}
    >
      <Container className={spacingClasses[spacing]}>{children}</Container>
    </section>
  );
}
