import { localContentSource } from './local';
import type { ContentSource } from './source';

/**
 * The typed local content is the active source. It is the safe baseline the
 * public build needs, and it requires no credentials.
 *
 * Sanity is prepared but not wired: `sanity/schemas.ts` holds the document
 * schemas and `sanity/README.md` lists the exact steps to switch this export to
 * a Sanity-backed `ContentSource`. Page components read through this boundary,
 * so that switch does not change a single page.
 */
export const contentSource: ContentSource = localContentSource;

export const sanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET);

export { isArticlePublishable, isCaseStudyPublishable, readingTimeMinutes } from './publishable';
export type { ContentSource } from './source';
