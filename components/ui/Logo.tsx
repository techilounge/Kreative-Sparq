import Image from 'next/image';

import { cx } from '@/lib/utils';

/**
 * Both approved logo files are rendered and one is hidden per theme with CSS.
 * Swapping the `src` in JavaScript would either flash the wrong mark on first
 * paint or force this into a client component, and the lettering must never be
 * recreated in CSS.
 */
const LIGHT_LOGO = '/brand/kreative-sparq-logo-light.png';
const DARK_LOGO = '/brand/kreative-sparq-logo-dark.png';

// Source artwork is 1944 x 809.
const ASPECT = 1944 / 809;

export function Logo({
  className,
  height = 36,
  priority = false,
}: {
  readonly className?: string;
  readonly height?: number;
  readonly priority?: boolean;
}) {
  const width = Math.round(height * ASPECT);

  return (
    <span className={cx('inline-flex items-center', className)}>
      <Image
        src={LIGHT_LOGO}
        alt="Kreative Sparq"
        width={width}
        height={height}
        priority={priority}
        sizes={`${width}px`}
        className="block h-auto w-auto dark:hidden"
        style={{ height, width: 'auto' }}
      />
      <Image
        src={DARK_LOGO}
        alt="Kreative Sparq"
        width={width}
        height={height}
        priority={priority}
        sizes={`${width}px`}
        className="hidden h-auto w-auto dark:block"
        style={{ height, width: 'auto' }}
        aria-hidden
      />
    </span>
  );
}
