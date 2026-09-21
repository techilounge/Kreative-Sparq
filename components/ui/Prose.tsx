import type { ReactNode } from 'react';

import { cx } from '@/lib/utils';

/** Body copy at a readable measure. Display faces never carry long passages. */
export function Lede({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return <p className={cx('text-lede measure text-ink-muted', className)}>{children}</p>;
}

export function Body({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return <p className={cx('measure text-base/7 text-ink-muted', className)}>{children}</p>;
}
