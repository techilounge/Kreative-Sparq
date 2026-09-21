import type { ServiceSlug } from './services';

export type PublishStatus = 'draft' | 'review' | 'published';

/**
 * Every number shown in a case study carries its own period, source, and
 * context. A result without all five fields cannot be rendered.
 */
export type CaseStudyResult = {
  readonly value: string;
  readonly label: string;
  readonly period: string;
  readonly source: string;
  readonly context: string;
};

export type CaseStudyTestimonial = {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly organisation: string;
  readonly approved: boolean;
};

export type CaseStudyGalleryItem = {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly width: number;
  readonly height: number;
  readonly rightsCleared: boolean;
};

export type CaseStudy = {
  readonly slug: string;
  readonly status: PublishStatus;
  readonly clientName: string;
  readonly sector: string;
  readonly title: string;
  readonly summary: string;
  readonly year: string;
  readonly services: readonly ServiceSlug[];
  readonly seo: { readonly title: string; readonly description: string };
  readonly brief: readonly string[];
  readonly objective: readonly string[];
  readonly thinking: readonly string[];
  readonly work: readonly string[];
  readonly results: readonly CaseStudyResult[];
  readonly testimonial?: CaseStudyTestimonial;
  readonly gallery: readonly CaseStudyGalleryItem[];
  readonly featuredImage?: CaseStudyGalleryItem;
  readonly clientApproved: boolean;
  readonly publishedAt?: string;
};

/**
 * No case study has client approval yet, so the Work index renders the approved
 * empty state. Adding an entry here (or enabling Sanity) populates the section
 * without any component change. See CONTENT_REQUIREMENTS.md.
 */
export const caseStudies: readonly CaseStudy[] = [];
