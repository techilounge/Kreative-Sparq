import Link from 'next/link';

import type { Article } from '@/content/articles';
import { insightsContent } from '@/content/pages/insights';
import { readingTimeMinutes } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export function InsightCard({ article }: { readonly article: Article }) {
  const minutes = readingTimeMinutes(article);

  return (
    <article className="border-line hover:border-action group flex h-full flex-col gap-3 border-t pt-6 transition-colors duration-200">
      <p className="eyebrow">{article.category}</p>
      <h3 className="font-display text-2xl leading-snug font-normal">
        <Link
          href={`/insights/${article.slug}`}
          className="group-hover:text-action transition-colors duration-200"
        >
          {article.title}
        </Link>
      </h3>
      <p className="text-ink-muted text-base/7">{article.excerpt}</p>
      <p className="text-ink-muted mt-auto pt-2 text-sm/6">
        {article.publishedAt ? formatDate(article.publishedAt) : null}
        {article.publishedAt ? ' · ' : null}
        {minutes} {insightsContent.articleMeta.readingTimeSuffix}
      </p>
    </article>
  );
}
