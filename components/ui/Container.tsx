import type { ElementType, ReactNode } from 'react';

import { cx } from '@/lib/utils';

export function Container({
  as: Component = 'div',
  className,
  children,
}: {
  readonly as?: ElementType;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  return <Component className={cx('container-editorial', className)}>{children}</Component>;
}
