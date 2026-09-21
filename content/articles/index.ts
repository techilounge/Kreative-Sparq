import { beforeSpendingMoreOnAds } from './before-spending-more-on-ads';
import { howToBriefAMarketingAgency } from './how-to-brief-a-marketing-agency';
import { socialMediaActivityIsNotAContentStrategy } from './social-media-activity-is-not-a-content-strategy';
import type { Article } from './types';

/**
 * All three launch articles are editorial drafts. They carry the approved copy
 * but have no assigned author and no firsthand example yet, so the publishability
 * filter keeps them out of listings, the sitemap, and production metadata.
 */
export const articles: readonly Article[] = [
  beforeSpendingMoreOnAds,
  howToBriefAMarketingAgency,
  socialMediaActivityIsNotAContentStrategy,
];

export type { Article, ArticleBlock, ArticleCategory, ArticleAuthor } from './types';
