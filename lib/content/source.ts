import type { Article } from '@/content/articles';
import type { CaseStudy } from '@/content/case-studies';
import type { Service, ServiceSlug } from '@/content/services';

/**
 * The boundary page components render against. Local typed content is the
 * baseline; a Sanity-backed implementation can replace it without touching a
 * single page component.
 */
export type ContentSource = {
  readonly name: 'local' | 'sanity';
  getServices(): Promise<readonly Service[]>;
  getService(slug: ServiceSlug | string): Promise<Service | null>;
  /** Only records that pass the publishability rules. */
  getPublishedCaseStudies(): Promise<readonly CaseStudy[]>;
  getCaseStudy(slug: string): Promise<CaseStudy | null>;
  getPublishedArticles(): Promise<readonly Article[]>;
  getArticle(slug: string): Promise<Article | null>;
};
