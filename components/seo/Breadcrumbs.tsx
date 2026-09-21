import Link from 'next/link';

import type { BreadcrumbEntry } from '@/lib/seo/structured-data';

/**
 * The visible trail. The matching `BreadcrumbList` schema is emitted by the page
 * from the same array, so the markup and the visible copy always agree.
 */
export function Breadcrumbs({ entries }: { readonly entries: readonly BreadcrumbEntry[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-ink-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-sm/6">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          return (
            <li key={entry.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {entry.name}
                </span>
              ) : (
                <Link
                  href={entry.path}
                  className="hover:text-action underline underline-offset-4 transition-colors duration-200"
                >
                  {entry.name}
                </Link>
              )}
              {isLast ? null : (
                <span aria-hidden className="text-ink-muted/70">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
