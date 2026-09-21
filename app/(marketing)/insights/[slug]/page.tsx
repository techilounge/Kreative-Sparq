import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { insightsContent } from '@/content/pages/insights';
import { getService } from '@/content/services';
import { ArticleBody } from '@/components/sections/ArticleBody';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { contentSource, isArticlePublishable, readingTimeMinutes } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/structured-data';
import { formatDate } from '@/lib/utils';

type PageProps = { readonly params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await contentSource.getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await contentSource.getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.seo.title,
    description: article.seo.description,
    path: `/insights/${article.slug}`,
    type: 'article',
    noindex: !isArticlePublishable(article),
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    authors: article.author ? [article.author.name] : undefined,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await contentSource.getArticle(slug);
  if (!article) notFound();

  const published = isArticlePublishable(article);

  // A draft is reachable only in a preview deployment, never in production.
  if (!published && process.env.VERCEL_ENV === 'production') {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: article.title, path: `/insights/${article.slug}` },
  ];

  const relatedService = getService(article.relatedService);
  const minutes = readingTimeMinutes(article);
  const meta = insightsContent.articleMeta;

  const allArticles = await contentSource.getPublishedArticles();
  const related = allArticles.filter((candidate) =>
    article.relatedArticles.includes(candidate.slug),
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {published && article.author && article.publishedAt ? (
        <JsonLd
          data={articleSchema({
            headline: article.title,
            description: article.excerpt,
            path: `/insights/${article.slug}`,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
            authorName: article.author.name,
          })}
        />
      ) : null}

      <Container className="pt-6">
        <Breadcrumbs entries={breadcrumbs} />
      </Container>

      {!published ? (
        <Container className="pt-6">
          <p className="border-line-strong text-ink-muted border-l-2 py-2 pl-4 text-sm/6">
            Editorial draft. This article is not published and is excluded from listings, the
            sitemap, and search indexing.
          </p>
        </Container>
      ) : null}

      <Section spacing="tight">
        <article className="flex flex-col gap-6">
          <header className="flex flex-col gap-5">
            <p className="eyebrow">{article.category}</p>
            <h1 className="text-display-lg font-display max-w-[22ch] font-normal">
              {article.title}
            </h1>
            <p className="text-lede measure text-ink-muted">{article.standfirst}</p>
            <div className="border-line text-ink-muted flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-5 text-sm/6">
              {article.author ? (
                <span>
                  {meta.bylinePrefix} {article.author.name}
                </span>
              ) : null}
              {article.publishedAt ? (
                <span>
                  {meta.publishedPrefix} {formatDate(article.publishedAt)}
                </span>
              ) : null}
              {article.updatedAt ? (
                <span>
                  · {meta.updatedPrefix} {formatDate(article.updatedAt)}
                </span>
              ) : null}
              <span>
                · {minutes} {meta.readingTimeSuffix}
              </span>
            </div>
          </header>

          <ArticleBody blocks={article.body} />

          {article.author ? (
            <footer className="border-line text-ink-muted mt-4 border-t pt-6 text-base/7">
              <p className="measure">
                {article.author.name} is {article.author.role} at Kreative Sparq, where{' '}
                {article.author.responsibility}.
              </p>
            </footer>
          ) : null}
        </article>
      </Section>

      <Section tone="muted" rule spacing="tight">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className="text-display-sm font-display font-normal">{article.ctaHeading}</h2>
          <div className="flex flex-col gap-5">
            <p className="text-ink-muted measure text-base/7">{article.ctaBody}</p>
            {relatedService ? (
              <div>
                <ButtonLink href={`/services/${relatedService.slug}`}>
                  {article.ctaLabel}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section rule spacing="tight">
          <h2 className="text-display-sm font-display mb-6 font-normal">
            {insightsContent.relatedHeading}
          </h2>
          <ul className="border-line grid border-t md:grid-cols-2 lg:grid-cols-3">
            {related.map((candidate) => (
              <li key={candidate.slug} className="border-line border-b py-5 lg:pr-8">
                <Link
                  href={`/insights/${candidate.slug}`}
                  className="hover:text-action font-display text-xl font-normal transition-colors duration-200"
                >
                  {candidate.title}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Container className="pb-16">
        <Link
          href="/insights"
          className="text-link hover:text-action-hover inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
        >
          {insightsContent.backLink}
        </Link>
      </Container>
    </>
  );
}
