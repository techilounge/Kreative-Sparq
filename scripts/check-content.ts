/**
 * Static content checks that run before every build.
 *
 * These catch the failures that are easy to introduce and hard to spot in a
 * review: a raw placeholder reaching a page, a duplicated slug or title, an
 * em dash, a route without metadata, or an internal link pointing nowhere.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

import { articles } from '../content/articles';
import { caseStudies } from '../content/case-studies';
import { footer, primaryNavigation } from '../content/global';
import { aboutContent } from '../content/pages/about';
import { bookContent } from '../content/pages/book';
import { contactContent } from '../content/pages/contact';
import { homeContent } from '../content/pages/home';
import { insightsContent } from '../content/pages/insights';
import { servicesOverviewContent } from '../content/pages/services-overview';
import { startProjectContent } from '../content/pages/start-a-project';
import { workContent } from '../content/pages/work';
import { services } from '../content/services';

const failures: string[] = [];

function fail(message: string) {
  failures.push(message);
}

// ---------------------------------------------------------------------------
// Placeholder and forbidden-pattern scan over the content directory.
// ---------------------------------------------------------------------------

const FORBIDDEN: readonly { pattern: RegExp; label: string }[] = [
  { pattern: /\{\{[A-Z_]+\}\}/, label: 'an unresolved {{PLACEHOLDER}}' },
  { pattern: /CONTENT REQUIRED/, label: 'a CONTENT REQUIRED marker' },
  { pattern: /HIDE UNTIL AVAILABLE/, label: 'a HIDE UNTIL AVAILABLE marker' },
  { pattern: /lorem ipsum/i, label: 'Lorem Ipsum' },
  { pattern: /—/, label: 'an em dash' },
  { pattern: /Acme|Example Corp|Client Name|Sample Client/i, label: 'a sample client name' },
  { pattern: /\b\d+%\s+(increase|growth|uplift|ROI)\b/i, label: 'an unsourced metric' },
];

/**
 * Files whose job is to describe the markers rather than render them. The legal
 * content holds `{{PRIVACY_EMAIL}}` style tokens that are resolved at render
 * time and are covered by their own check below.
 */
const MARKER_AWARE_FILES = new Set(['content/pages/legal.ts']);

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const contentFiles = walk(join(process.cwd(), 'content')).filter((file) => file.endsWith('.ts'));

for (const file of contentFiles) {
  const rel = relative(process.cwd(), file);
  if (MARKER_AWARE_FILES.has(rel)) continue;

  const source = readFileSync(file, 'utf8');
  for (const line of source.split('\n')) {
    // Comments explain the rules and are allowed to name them.
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) continue;
    for (const { pattern, label } of FORBIDDEN) {
      if (pattern.test(line)) {
        fail(`${rel} contains ${label}: ${line.trim().slice(0, 100)}`);
      }
    }
  }
}

// Every placeholder in the legal copy must have a resolver.
const RESOLVED_LEGAL_TOKENS = new Set([
  '{{PRIVACY_EMAIL}}',
  '{{LEGAL_CONTACT_EMAIL}}',
  '{{LEGAL_BUSINESS_NAME}}',
]);
const legalSource = readFileSync(join(process.cwd(), 'content/pages/legal.ts'), 'utf8');
for (const token of legalSource.match(/\{\{[A-Z_]+\}\}/g) ?? []) {
  if (!RESOLVED_LEGAL_TOKENS.has(token)) {
    fail(`content/pages/legal.ts uses ${token}, which has no resolver in LegalDocument`);
  }
}

// ---------------------------------------------------------------------------
// Slugs, titles, and metadata.
// ---------------------------------------------------------------------------

const slugs = new Set<string>();
for (const service of services) {
  if (slugs.has(service.slug)) fail(`Duplicate service slug: ${service.slug}`);
  slugs.add(service.slug);
  if (!/^[a-z0-9-]+$/.test(service.slug)) {
    fail(`Service slug is not a clean lowercase slug: ${service.slug}`);
  }
}

for (const collection of [caseStudies, articles]) {
  const seen = new Set<string>();
  for (const record of collection) {
    if (seen.has(record.slug)) fail(`Duplicate slug: ${record.slug}`);
    seen.add(record.slug);
    if (!/^[a-z0-9-]+$/.test(record.slug)) {
      fail(`Slug is not a clean lowercase slug: ${record.slug}`);
    }
  }
}

type SeoBearing = { readonly label: string; readonly title: string; readonly description: string };

const seoRecords: SeoBearing[] = [
  { label: '/', ...homeContent.seo },
  { label: '/services', ...servicesOverviewContent.seo },
  { label: '/work', ...workContent.seo },
  { label: '/about', ...aboutContent.seo },
  { label: '/insights', ...insightsContent.seo },
  { label: '/contact', ...contactContent.seo },
  { label: '/start-a-project', ...startProjectContent.seo },
  { label: '/book', ...bookContent.seo },
  ...services.map((service) => ({ label: `/services/${service.slug}`, ...service.seo })),
  ...articles.map((article) => ({ label: `/insights/${article.slug}`, ...article.seo })),
];

const titles = new Map<string, string>();
const descriptions = new Map<string, string>();

for (const record of seoRecords) {
  if (!record.title?.trim()) fail(`${record.label} has no SEO title`);
  if (!record.description?.trim()) fail(`${record.label} has no meta description`);

  const existingTitle = titles.get(record.title);
  if (existingTitle) fail(`Duplicate SEO title on ${record.label} and ${existingTitle}`);
  titles.set(record.title, record.label);

  const existingDescription = descriptions.get(record.description);
  if (existingDescription) {
    fail(`Duplicate meta description on ${record.label} and ${existingDescription}`);
  }
  descriptions.set(record.description, record.label);
}

// ---------------------------------------------------------------------------
// Internal links point at routes that exist.
// ---------------------------------------------------------------------------

const staticRoutes = new Set([
  '/',
  '/services',
  '/work',
  '/about',
  '/insights',
  '/contact',
  '/start-a-project',
  '/book',
  '/thank-you',
  '/privacy',
  '/terms',
  ...services.map((service) => `/services/${service.slug}`),
  ...caseStudies.map((caseStudy) => `/work/${caseStudy.slug}`),
  ...articles.map((article) => `/insights/${article.slug}`),
]);

const linkSources: { readonly where: string; readonly href: string }[] = [
  ...primaryNavigation.map((link) => ({ where: 'primary navigation', href: link.href })),
  ...footer.groups.flatMap((group) =>
    group.links.map((link) => ({ where: `footer / ${group.heading}`, href: link.href })),
  ),
  ...services.flatMap((service) => [
    { where: `${service.slug} hero primary`, href: service.hero.primaryCta.href },
    { where: `${service.slug} hero secondary`, href: service.hero.secondaryCta.href },
    { where: `${service.slug} cta primary`, href: service.cta.primaryCta.href },
    { where: `${service.slug} cta secondary`, href: service.cta.secondaryCta.href },
  ]),
  { where: 'home hero primary', href: homeContent.hero.primaryCta.href },
  { where: 'home hero secondary', href: homeContent.hero.secondaryCta.href },
  { where: 'home work cta', href: homeContent.work.cta.href },
  { where: 'home work empty state', href: homeContent.work.emptyState.cta.href },
  { where: 'home insights cta', href: homeContent.insights.cta.href },
  { where: 'home final primary', href: homeContent.finalCta.primaryCta.href },
  { where: 'home final secondary', href: homeContent.finalCta.secondaryCta.href },
  { where: 'work empty state', href: workContent.emptyState.cta.href },
  { where: 'contact alternative', href: contactContent.hero.alternativeCta.href },
  { where: 'book fallback', href: bookContent.inquiryFallbackCta.href },
];

for (const { where, href } of linkSources) {
  if (!staticRoutes.has(href)) {
    fail(`Internal link in ${where} points at a route that does not exist: ${href}`);
  }
}

// Related services must reference real services.
for (const service of services) {
  for (const related of service.relatedServices) {
    if (!slugs.has(related)) {
      fail(`${service.slug} lists a related service that does not exist: ${related}`);
    }
  }
}

// Related articles must reference real articles.
const articleSlugs = new Set(articles.map((article) => article.slug));
for (const article of articles) {
  if (!articleSlugs.has(article.relatedService) && !slugs.has(article.relatedService)) {
    fail(`${article.slug} names a related service that does not exist: ${article.relatedService}`);
  }
  for (const related of article.relatedArticles) {
    if (!articleSlugs.has(related)) {
      fail(`${article.slug} lists a related article that does not exist: ${related}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Report.
// ---------------------------------------------------------------------------

if (failures.length > 0) {
  console.error(`Content check failed with ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `Content check passed: ${services.length} services, ${caseStudies.length} case studies, ${articles.length} articles, ${seoRecords.length} metadata records.`,
);
