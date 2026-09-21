import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { workContent } from '@/content/pages/work';
import { getService } from '@/content/services';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { contentSource, isCaseStudyPublishable } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

type PageProps = { readonly params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const caseStudies = await contentSource.getPublishedCaseStudies();
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await contentSource.getCaseStudy(slug);
  if (!caseStudy) return {};

  return pageMetadata({
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    path: `/work/${caseStudy.slug}`,
    // A draft that is reachable by direct URL must never be indexed.
    noindex: !isCaseStudyPublishable(caseStudy),
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await contentSource.getCaseStudy(slug);
  if (!caseStudy) notFound();

  // Drafts are reachable only in a preview deployment, never in production.
  if (!isCaseStudyPublishable(caseStudy) && process.env.VERCEL_ENV === 'production') {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: caseStudy.title, path: `/work/${caseStudy.slug}` },
  ];

  const primaryService = getService(caseStudy.services[0] ?? '');
  const headings = workContent.caseStudy.sectionHeadings;

  const narrative = [
    { heading: headings.brief, paragraphs: caseStudy.brief },
    { heading: headings.objective, paragraphs: caseStudy.objective },
    { heading: headings.thinking, paragraphs: caseStudy.thinking },
    { heading: headings.work, paragraphs: caseStudy.work },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <Container className="pt-6">
        <Breadcrumbs entries={breadcrumbs} />
      </Container>

      <Section spacing="tight">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">
            {caseStudy.sector} · {primaryService?.name ?? caseStudy.services[0]}
          </p>
          <h1 className="text-display-lg font-display max-w-[20ch] font-normal">
            {caseStudy.title}
          </h1>
          <p className="text-lede measure text-ink-muted">{caseStudy.summary}</p>
        </div>

        <dl className="border-line mt-10 grid gap-x-10 gap-y-6 border-t pt-6 sm:grid-cols-3">
          <div>
            <dt className="eyebrow mb-1.5">Client</dt>
            <dd className="text-ink">{caseStudy.clientName}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Year</dt>
            <dd className="text-ink">{caseStudy.year}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Services</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1">
              {caseStudy.services.map((serviceSlug) => {
                const service = getService(serviceSlug);
                if (!service) return null;
                return (
                  <Link
                    key={serviceSlug}
                    href={`/services/${service.slug}`}
                    className="text-link hover:text-action-hover underline underline-offset-4"
                  >
                    {service.name}
                  </Link>
                );
              })}
            </dd>
          </div>
        </dl>
      </Section>

      {narrative.map((block, index) => (
        <Section
          key={block.heading}
          tone={index % 2 === 1 ? 'surface' : 'page'}
          rule
          spacing="normal"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
            <h2 className="text-display-md font-display font-normal">{block.heading}</h2>
            <div className="flex flex-col gap-5">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-ink-muted measure text-base/7">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {caseStudy.results.length > 0 ? (
        <Section tone="muted" rule spacing="normal">
          <h2 className="text-display-md font-display mb-8 font-normal">{headings.results}</h2>
          <ul className="border-line grid border-t md:grid-cols-2 xl:grid-cols-3">
            {caseStudy.results.map((result) => (
              <li
                key={result.label}
                className="border-line flex flex-col gap-2 border-b py-7 xl:border-r xl:px-8 xl:last:border-r-0 xl:first:pl-0"
              >
                <p className="text-display-accent font-display text-4xl leading-none">
                  {result.value}
                </p>
                <p className="text-ink font-medium">{result.label}</p>
                <dl className="text-ink-muted mt-2 flex flex-col gap-1 text-sm/6">
                  <div className="flex gap-2">
                    <dt className="font-medium">Period:</dt>
                    <dd>{result.period}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Source:</dt>
                    <dd>{result.source}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Context:</dt>
                    <dd>{result.context}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <p className="text-ink-muted measure-wide mt-6 text-sm/6">{workContent.resultsNote}</p>
        </Section>
      ) : null}

      {caseStudy.testimonial?.approved ? (
        <Section rule spacing="normal">
          <figure className="border-rule max-w-4xl border-l-2 pl-6 md:pl-10">
            <blockquote className="text-display-sm font-display font-normal">
              {caseStudy.testimonial.quote}
            </blockquote>
            <figcaption className="text-ink-muted mt-4 text-sm/6">
              {caseStudy.testimonial.name}, {caseStudy.testimonial.role},{' '}
              {caseStudy.testimonial.organisation}
            </figcaption>
          </figure>
        </Section>
      ) : null}

      {caseStudy.gallery.length > 0 ? (
        <Section tone="surface" rule spacing="normal">
          <h2 className="sr-only">Gallery</h2>
          <ul className="grid gap-8 md:grid-cols-2">
            {caseStudy.gallery.map((item) => (
              <li key={item.src} className="flex flex-col gap-3">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="border-line h-auto w-full rounded-sm border"
                />
                {item.caption ? <p className="text-ink-muted text-sm/6">{item.caption}</p> : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tone="muted" rule spacing="normal">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className="text-display-md font-display font-normal">
            {workContent.caseStudy.closing.heading}
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-ink-muted measure text-base/7">
              {workContent.caseStudy.closing.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={workContent.caseStudy.closing.primaryCta.href}>
                {workContent.caseStudy.closing.primaryCta.label}
              </ButtonLink>
              {primaryService ? (
                <ButtonLink href={`/services/${primaryService.slug}`} variant="secondary">
                  {workContent.caseStudy.closing.secondaryCtaLabel(primaryService.name)}
                </ButtonLink>
              ) : null}
            </div>
            <Link
              href="/work"
              className="text-link hover:text-action-hover inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
            >
              {workContent.caseStudy.backLink}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
