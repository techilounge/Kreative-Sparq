export const servicesOverviewContent = {
  seo: {
    title: 'Marketing Services in Nigeria | Kreative Sparq',
    description:
      'Explore brand strategy, creative design, social media, performance marketing, web design, and campaign services from Kreative Sparq.',
  },
  hero: {
    h1: 'The right mix of thinking and making.',
    body: 'You may need one focused piece of work or a team that can carry an idea across several channels. We start with the business need, then recommend the smallest useful scope that can do the job properly.',
    primaryCta: { label: 'Start a project', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
  finder: {
    heading: 'Start with what needs to change.',
    /** Each symptom links to the matching service. "Start with" is the shared prefix. */
    prefix: 'Start with',
  },
  engagement: {
    heading: 'A working model that fits the assignment.',
    options: [
      {
        title: 'Focused project',
        body: 'A defined piece of work with a clear start, finish, scope, and handover. Best for brand strategy, identity, websites, launch plans, and campaign development.',
      },
      {
        title: 'Campaign partnership',
        body: 'Planning and execution around a specific launch, promotion, event, or growth objective. The team and channels are shaped around the campaign.',
      },
      {
        title: 'Ongoing support',
        body: 'A recurring engagement for content, social media, performance marketing, design, reporting, or a coordinated mix. Scope and service levels are agreed before work begins.',
      },
    ],
  },
  cta: {
    heading: 'Not sure which service fits?',
    body: 'Tell us the problem in your own words. You do not need to diagnose it before speaking with us.',
    primaryCta: { label: 'Tell us about the project', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
} as const;
