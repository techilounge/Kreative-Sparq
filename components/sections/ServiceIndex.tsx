import Link from 'next/link';

import type { Service } from '@/content/services';
import { MotionReveal } from '@/components/motion/MotionReveal';

/**
 * A text-led index, not a grid of icon cards. Each row is a rule, an index
 * number, a name at display scale, and the outcome sentence. The only motion on
 * hover is a colour and border change.
 */
export function ServiceIndex({
  services,
  variant = 'home',
}: {
  readonly services: readonly Service[];
  readonly variant?: 'home' | 'overview';
}) {
  return (
    <ul className="border-line border-t">
      {services.map((service, index) => {
        const copy = variant === 'home' ? service.home : service.overview;
        const description =
          variant === 'home' ? service.home.description : service.overview.summary;

        return (
          <MotionReveal as="li" key={service.slug} index={index}>
            <Link
              href={`/services/${service.slug}`}
              className="border-line hover:border-action group grid gap-4 border-b py-7 transition-colors duration-200 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8 md:py-9"
            >
              <span aria-hidden className="text-ink-muted font-display text-lg">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-display-sm font-display group-hover:text-action font-normal transition-colors duration-200">
                {service.name}
              </h3>
              <div className="flex flex-col gap-3">
                <p className="text-ink-muted text-base/7">{description}</p>
                {variant === 'overview' ? (
                  <p className="text-ink-muted text-sm/6">
                    <span className="text-ink font-medium">Best for: </span>
                    {service.overview.bestFor}
                  </p>
                ) : null}
                <span className="text-link group-hover:text-action-hover text-sm font-semibold underline underline-offset-4">
                  {copy.linkLabel}
                </span>
              </div>
            </Link>
          </MotionReveal>
        );
      })}
    </ul>
  );
}
