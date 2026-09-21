import type { ReactNode } from 'react';

import { cx } from '@/lib/utils';

type SectionHeadingProps = {
  readonly eyebrow?: string;
  readonly title: string;
  readonly id?: string;
  readonly level?: 'h2' | 'h3';
  readonly size?: 'lg' | 'md' | 'sm';
  readonly children?: ReactNode;
  readonly className?: string;
};

const sizes = {
  lg: 'text-display-lg',
  md: 'text-display-md',
  sm: 'text-display-sm',
} as const;

export function SectionHeading({
  eyebrow,
  title,
  id,
  level: Level = 'h2',
  size = 'md',
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cx('flex flex-col gap-4', className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Level id={id} className={cx('font-display font-normal', sizes[size])}>
        {title}
      </Level>
      {children}
    </div>
  );
}
