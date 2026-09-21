import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { cx } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'quiet';

/**
 * Buttons and button-styled links share one set of states so hover, focus,
 * active, disabled, and loading look deliberate in both themes.
 *
 * Height is set with padding plus `min-h`, keeping every control at or above the
 * project's 44 by 44 CSS pixel standard.
 */
const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-[0.9375rem] font-semibold leading-snug transition-[background-color,border-color,color,translate] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary: 'bg-action text-ink-on-action hover:bg-action-hover',
  secondary:
    'border border-line-strong bg-transparent text-ink hover:border-action hover:text-action',
  quiet: 'text-ink underline decoration-line-strong underline-offset-4 hover:decoration-action',
};

type ButtonLinkProps = {
  readonly href: string;
  readonly variant?: Variant;
  readonly children: ReactNode;
  readonly className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;

export function ButtonLink({
  href,
  variant = 'primary',
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a href={href} className={cx(base, variants[variant], className)} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cx(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  readonly variant?: Variant;
  readonly loading?: boolean;
  readonly loadingLabel?: string;
  readonly children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'primary',
  loading = false,
  loadingLabel,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cx(base, variants[variant], className)}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  );
}
