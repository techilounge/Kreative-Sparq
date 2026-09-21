export const homeContent = {
  seo: {
    title: 'Kreative Sparq | Marketing Agency in Nigeria',
    description:
      'Kreative Sparq brings strategy, creative, digital marketing, websites, and campaigns into one clear plan for growing brands in Nigeria and beyond.',
    ogTitle: 'Ideas that move people. Marketing that moves business.',
    ogDescription:
      'Meet Kreative Sparq, a Nigerian marketing agency built for brands that want clear strategy, strong creative work, and accountable execution.',
  },
  hero: {
    eyebrow: 'Marketing agency in Nigeria',
    h1: 'Ideas that move people. Marketing that moves business.',
    body: 'Kreative Sparq brings strategy, creative work, digital execution, and measurement into one clear plan. We help ambitious brands get noticed for the right reasons and turn that attention into action.',
    primaryCta: { label: 'Book a strategy call', href: '/book' },
    secondaryCta: { label: 'View our work', href: '/work' },
    supportingNote:
      'Brand strategy, creative design, content, media, websites, launches, and activations.',
  },
  capability: {
    heading: 'Marketing works better when the pieces agree.',
    body: 'A strong identity cannot fix a weak offer. More posts cannot fix an unclear message. Paid media cannot rescue a page that gives people no reason to act. We look at the whole path, find the part holding growth back, and build from there.',
  },
  servicesOverview: {
    eyebrow: 'What we do',
    heading: 'The right work for the problem in front of you.',
    intro:
      'Some clients need a sharper brand. Others need a reliable content system, a better website, stronger campaigns, or a team that can connect all of it. We shape the engagement around the outcome, not a fixed menu.',
  },
  work: {
    eyebrow: 'Selected work',
    heading: 'The thinking should be as clear as the result.',
    body: 'Our case studies show the problem, the choices we made, the work delivered, and what changed. No unexplained numbers. No polished reveal without the reasoning behind it.',
    cta: { label: 'See all work', href: '/work' },
    emptyState: {
      body: 'Our first public case studies are being prepared with client approval. In the meantime, tell us what you are working on and we can walk you through the most relevant capabilities.',
      cta: { label: 'Start a conversation', href: '/contact' },
    },
  },
  why: {
    eyebrow: 'Why clients choose us',
    heading: 'Less theatre. More useful thinking and well-made work.',
    body: 'We care about the idea, but we also care about what it takes to ship it. Strategy has to survive the budget. Design has to work outside the presentation. Reporting has to help someone make a decision.',
    points: [
      {
        title: 'We start with the business question',
        body: 'Before choosing channels or deliverables, we define what needs to change and whose behaviour matters.',
      },
      {
        title: 'We connect the work',
        body: 'Your message, content, media, website, and campaign materials are planned as parts of the same job.',
      },
      {
        title: 'We keep decisions visible',
        body: 'You will know what is being made, who owns the next action, and how feedback affects the scope or schedule.',
      },
      {
        title: 'We measure what can guide action',
        body: 'We agree on useful indicators early and report them in plain language. Vanity numbers do not get to hide weak performance.',
      },
    ],
  },
  process: {
    eyebrow: 'How we work',
    heading: 'A clear path from question to outcome.',
    steps: [
      {
        number: '01',
        title: 'Discover',
        body: 'We learn how the business works, what the audience needs, what has already been tried, and where the real constraint sits.',
      },
      {
        number: '02',
        title: 'Decide',
        body: 'We turn the findings into a focused plan: audience, message, channels, scope, success measures, owners, and timing.',
      },
      {
        number: '03',
        title: 'Make',
        body: 'Our team develops the creative and production work, with clear review points and enough context for useful feedback.',
      },
      {
        number: '04',
        title: 'Improve',
        body: 'We launch, observe what happens, and use the evidence to refine the work or decide what should happen next.',
      },
    ],
  },
  audience: {
    heading: 'Built for teams with something worth growing.',
    body: 'We work with Nigerian businesses, startups preparing to launch or enter a market, established organisations that need stronger execution, and diaspora-led teams looking for a capable partner in Nigeria. Our experience is especially relevant to professional services, technology, hospitality, education, nonprofits, churches, events, and consumer-facing brands.',
  },
  insights: {
    eyebrow: 'Useful thinking',
    heading: 'Marketing advice you can use before hiring us.',
    body: 'Clear answers to the questions growing teams face when budgets, channels, and priorities start competing.',
    cta: { label: 'Browse all insights', href: '/insights' },
  },
  finalCta: {
    heading: 'What are you trying to move?',
    body: 'A launch, a brand, a campaign, a website, or the way your marketing team works. Give us the context and we will help you find the right starting point.',
    primaryCta: { label: 'Start a project', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
} as const;
