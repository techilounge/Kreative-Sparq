export const workContent = {
  seo: {
    title: 'Selected Marketing Work and Case Studies | Kreative Sparq',
    description:
      'See how Kreative Sparq approaches brand, content, digital marketing, websites, launches, and campaigns through approved client case studies.',
    ogTitle: 'The work, the choices, and what changed.',
  },
  hero: {
    h1: 'Work with a reason behind it.',
    body: 'A finished asset tells only part of the story. Our case studies explain the business question, the decisions that shaped the work, how it was delivered, and what the available evidence shows.',
    primaryCta: { label: 'Start a project', href: '/start-a-project' },
  },
  filters: {
    all: 'All work',
    /** Filters that would produce an empty category are hidden. */
    labels: {
      'brand-strategy': 'Brand Strategy',
      'creative-design': 'Creative Design',
      'content-social-media': 'Content & Social',
      'performance-marketing': 'Performance Marketing',
      'web-design-development': 'Web',
      'campaigns-activations': 'Campaigns & Activations',
    },
    /** `{{COUNT}}` and `{{CATEGORY}}` are resolved at render time. */
    status: (count: number, category: string) => `Showing ${count} projects in ${category}.`,
  },
  cardCta: 'Read the case study',
  emptyState: {
    heading: 'Approved case studies are on the way.',
    body: 'We are preparing project stories with the context and client permissions they deserve. If you have a specific need, contact us and we can explain the most relevant capabilities without disclosing confidential work.',
    cta: { label: 'Tell us what you need', href: '/contact' },
  },
  resultsNote:
    'Results shown in case studies apply to the stated project, period, conditions, and source. They are not a promise that every project will produce the same outcome.',
  cta: {
    heading: 'Your project will have its own constraints.',
    body: 'Share the challenge, the audience, and what success would mean for the business. We will help you define the work from there.',
    primaryCta: { label: 'Start a project', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
  caseStudy: {
    sectionHeadings: {
      brief: 'What the business needed.',
      objective: 'What needed to change.',
      thinking: 'The decision behind the work.',
      work: 'How the idea was carried through.',
      results: 'What the evidence shows.',
    },
    backLink: 'Back to all work',
    closing: {
      heading: 'Need help with a similar challenge?',
      body: 'Your audience, timing, budget, and starting point will be different. Tell us what you need to change and we will help you define the right scope.',
      primaryCta: { label: 'Start a project', href: '/start-a-project' },
      /** `{{RELATED_SERVICE}}` is resolved from the case study's primary service. */
      secondaryCtaLabel: (serviceName: string) => `Explore ${serviceName}`,
    },
  },
} as const;
