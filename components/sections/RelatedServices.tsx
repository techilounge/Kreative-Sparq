import Link from 'next/link';

import { getService, type ServiceSlug } from '@/content/services';

export function RelatedServices({
  slugs,
  headingId,
}: {
  readonly slugs: readonly ServiceSlug[];
  readonly headingId: string;
}) {
  const related = slugs.map((slug) => getService(slug)).filter((service) => service !== undefined);

  if (related.length === 0) return null;

  return (
    <>
      <h2 id={headingId} className="text-display-sm font-display mb-6 font-normal">
        Related services
      </h2>
      <ul className="border-line grid border-t sm:grid-cols-2 lg:grid-cols-3">
        {related.map((service) => (
          <li key={service.slug} className="border-line border-b">
            <Link
              href={`/services/${service.slug}`}
              className="hover:text-action group flex min-h-20 flex-col justify-center gap-1 py-5 transition-colors duration-200 sm:pr-8"
            >
              <span className="font-display text-xl font-normal">{service.name}</span>
              <span className="text-ink-muted group-hover:text-action text-sm/6">
                {service.overview.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
