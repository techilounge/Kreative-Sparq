import type { Metadata } from 'next';

import { insightsContent } from '@/content/pages/insights';
import { HeroEditorial } from '@/components/sections/HeroEditorial';
import { InsightCard } from '@/components/sections/InsightCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/ui/CtaBand';
import { EmptyState } from '@/components/ui/EmptyState';
import { Section } from '@/components/ui/Section';
import { contentSource } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = pageMetadata({
  title: insightsContent.seo.title,
  description: insightsContent.seo.description,
  path: '/insights',
  ogTitle: insightsContent.seo.ogTitle,
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/insights' },
];

export default async function InsightsPage() {
  const articles = await contentSource.getPublishedArticles();

  // A category with nothing behind it is not offered as a filter.
  const activeCategories = insightsContent.categories.filter((category) =>
    articles.some((article) => article.category === category),
  );

  const [featured, ...rest] = articles;

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <HeroEditorial
        title={insightsContent.hero.h1}
        body={insightsContent.hero.body}
        size="lg"
        {...(articles.length > 0 ? { primaryCta: insightsContent.hero.primaryCta } : {})}
      />

      <Section id="articles" labelledBy="articles-heading" spacing="normal">
        <h2 id="articles-heading" className="sr-only">
          Articles
        </h2>

        {articles.length === 0 ? (
          <EmptyState
            heading={insightsContent.noPublishedArticles.heading}
            body={insightsContent.noPublishedArticles.body}
            cta={insightsContent.noPublishedArticles.cta}
          />
        ) : (
          <>
            {activeCategories.length > 1 ? (
              <nav aria-label="Filter articles" className="mb-10">
                <ul className="flex flex-wrap gap-2">
                  <li>
                    <span className="border-action bg-action text-ink-on-action inline-flex min-h-11 items-center rounded-sm border px-4 text-sm font-medium">
                      {insightsContent.allLabel}
                    </span>
                  </li>
                  {activeCategories.map((category) => (
                    <li key={category}>
                      <a
                        href={`/insights?category=${encodeURIComponent(category)}`}
                        className="border-line-strong text-ink-muted hover:border-action hover:text-action inline-flex min-h-11 items-center rounded-sm border px-4 text-sm font-medium transition-colors duration-200"
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
                <p aria-live="polite" className="sr-only">
                  {insightsContent.filterStatus(articles.length, insightsContent.allLabel)}
                </p>
              </nav>
            ) : null}

            {featured ? (
              <div className="border-line-strong mb-12 border-t-2 pt-8">
                <InsightCard article={featured} />
              </div>
            ) : null}

            {rest.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
                {rest.map((article) => (
                  <InsightCard key={article.slug} article={article} />
                ))}
              </div>
            ) : null}
          </>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
