import type { ServiceSlug } from '../services';
import type { PublishStatus } from '../case-studies';

export type ArticleCategory =
  'Brand' | 'Content & Social' | 'Performance' | 'Websites' | 'Campaigns' | 'Running Marketing';

export type ArticleBlock =
  | { readonly kind: 'paragraph'; readonly text: string }
  | { readonly kind: 'heading'; readonly text: string }
  | { readonly kind: 'subheading'; readonly text: string }
  | { readonly kind: 'list'; readonly items: readonly string[]; readonly intro?: string }
  | {
      readonly kind: 'orderedList';
      readonly items: readonly string[];
      readonly intro?: string;
    }
  | { readonly kind: 'quote'; readonly text: string }
  | {
      readonly kind: 'comparison';
      readonly intro: string;
      readonly items: readonly string[];
      readonly outro?: string;
    };

export type ArticleAuthor = {
  readonly name: string;
  readonly role: string;
  readonly responsibility: string;
};

export type Article = {
  readonly slug: string;
  readonly status: PublishStatus;
  readonly category: ArticleCategory;
  readonly title: string;
  readonly standfirst: string;
  readonly excerpt: string;
  readonly seo: { readonly title: string; readonly description: string };
  readonly body: readonly ArticleBlock[];
  readonly relatedService: ServiceSlug;
  readonly ctaHeading: string;
  readonly ctaBody: string;
  readonly ctaLabel: string;
  readonly relatedArticles: readonly string[];
  /** Present only once an author has been assigned and approved. */
  readonly author?: ArticleAuthor;
  readonly publishedAt?: string;
  readonly updatedAt?: string;
  /** Editorial work that must finish before this article can be published. */
  readonly editorialRequirement: string;
};
