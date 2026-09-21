import type { Article } from '@/content/articles';
import type { CaseStudy } from '@/content/case-studies';

/**
 * A case study is publishable only when the client has approved it, every
 * narrative section has content, every result carries its period, source, and
 * context, and every gallery item has cleared rights and alt text.
 */
export function isCaseStudyPublishable(caseStudy: CaseStudy): boolean {
  if (caseStudy.status !== 'published') return false;
  if (!caseStudy.clientApproved) return false;
  if (!caseStudy.publishedAt) return false;

  const narrativeComplete = [
    caseStudy.brief,
    caseStudy.objective,
    caseStudy.thinking,
    caseStudy.work,
  ].every((section) => section.length > 0 && section.every((line) => line.trim().length > 0));
  if (!narrativeComplete) return false;

  const resultsComplete = caseStudy.results.every(
    (result) =>
      result.value.trim().length > 0 &&
      result.label.trim().length > 0 &&
      result.period.trim().length > 0 &&
      result.source.trim().length > 0 &&
      result.context.trim().length > 0,
  );
  if (!resultsComplete) return false;

  const galleryComplete = caseStudy.gallery.every(
    (item) => item.rightsCleared && item.alt.trim().length > 0,
  );
  if (!galleryComplete) return false;

  if (caseStudy.testimonial && !caseStudy.testimonial.approved) return false;

  return true;
}

/**
 * An article is publishable only when it has a named author, a publish date, and
 * a body with real content. Editorial requirements are tracked separately and
 * clearing them is what moves an article's status to `published`.
 */
export function isArticlePublishable(article: Article): boolean {
  if (article.status !== 'published') return false;
  if (!article.author) return false;
  if (!article.publishedAt) return false;
  return article.body.length > 0;
}

/** Roughly 220 words per minute, rounded up, with a one-minute floor. */
export function readingTimeMinutes(article: Article): number {
  const words = article.body.reduce((total, block) => {
    switch (block.kind) {
      case 'paragraph':
      case 'heading':
      case 'subheading':
      case 'quote':
        return total + block.text.split(/\s+/).length;
      case 'list':
      case 'orderedList':
        return (
          total +
          (block.intro?.split(/\s+/).length ?? 0) +
          block.items.reduce((sum, item) => sum + item.split(/\s+/).length, 0)
        );
      case 'comparison':
        return (
          total +
          block.intro.split(/\s+/).length +
          (block.outro?.split(/\s+/).length ?? 0) +
          block.items.reduce((sum, item) => sum + item.split(/\s+/).length, 0)
        );
    }
  }, 0);

  return Math.max(1, Math.ceil(words / 220));
}
