export const insightsContent = {
  seo: {
    title: 'Marketing Insights for Growing Nigerian Brands | Kreative Sparq',
    description:
      'Practical articles on brand strategy, social media, digital advertising, websites, campaigns, launches, and marketing decisions in Nigeria.',
    ogTitle: 'Useful answers for the work in front of you.',
  },
  hero: {
    h1: 'Useful answers for the work in front of you.',
    body: 'We write about the decisions behind better marketing: what to fix first, what to ask before spending, how to judge the work, and where common advice stops being useful.',
    primaryCta: { label: 'Browse the latest articles', href: '#articles' },
  },
  categories: [
    'Brand',
    'Content & Social',
    'Performance',
    'Websites',
    'Campaigns',
    'Running Marketing',
  ],
  allLabel: 'All topics',
  /** `{{COUNT}}` and `{{CATEGORY}}` are resolved at render time. */
  filterStatus: (count: number, category: string) => `Showing ${count} articles in ${category}.`,
  cardCta: 'Read the article',
  backLink: 'Back to insights',
  relatedHeading: 'Keep reading',
  emptyState: {
    heading: 'No article matches that filter yet.',
    body: 'Try another topic or view all insights.',
    cta: { label: 'View all insights', href: '/insights' },
  },
  /** Shown when nothing is publishable at all, rather than a filter miss. */
  noPublishedArticles: {
    heading: 'The first articles are in editorial review.',
    body: 'We publish an article once it has a named author, a firsthand example, and a review. Until then, the services pages explain how we approach each area of the work.',
    cta: { label: 'Explore services', href: '/services' },
  },
  inArticleCta: {
    heading: 'Need help applying this to your business?',
    body: 'We can review the situation, identify the most useful starting point, and help you define the work.',
    /** `{{RELATED_SERVICE}}` is resolved from the article's related service. */
    ctaLabel: (serviceName: string) => `Explore ${serviceName}`,
  },
  articleMeta: {
    bylinePrefix: 'By',
    publishedPrefix: 'Published',
    updatedPrefix: 'Updated',
    readingTimeSuffix: 'min read',
  },
} as const;
