import { articles } from '@/content/articles';
import { caseStudies } from '@/content/case-studies';
import { getService, services } from '@/content/services';

import { isArticlePublishable, isCaseStudyPublishable } from './publishable';
import type { ContentSource } from './source';

export const localContentSource: ContentSource = {
  name: 'local',

  async getServices() {
    return services;
  },

  async getService(slug) {
    return getService(String(slug)) ?? null;
  },

  async getPublishedCaseStudies() {
    return caseStudies.filter(isCaseStudyPublishable);
  },

  async getCaseStudy(slug) {
    return caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? null;
  },

  async getPublishedArticles() {
    return [...articles].filter(isArticlePublishable).sort((a, b) => {
      const left = a.publishedAt ?? '';
      const right = b.publishedAt ?? '';
      return right.localeCompare(left);
    });
  },

  async getArticle(slug) {
    return articles.find((article) => article.slug === slug) ?? null;
  },
};
