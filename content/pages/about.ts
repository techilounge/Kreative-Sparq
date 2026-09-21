export const aboutContent = {
  seo: {
    title: 'About Kreative Sparq | Nigerian Marketing Agency',
    description:
      'Learn how Kreative Sparq approaches strategy, creative work, digital execution, client relationships, and measurable marketing.',
    ogTitle: 'Clear thinking should survive contact with the real work.',
  },
  hero: {
    h1: 'We care about the work after the presentation.',
    body: 'Kreative Sparq is a Nigerian marketing agency built around a simple standard: the strategy should be clear, the creative should have a job to do, and the work should be practical enough to ship.',
    primaryCta: { label: 'See our services', href: '/services' },
    secondaryCta: { label: 'Start a project', href: '/start-a-project' },
  },
  pointOfView: {
    eyebrow: 'Our point of view',
    heading: 'Marketing is a chain of decisions.',
    body: [
      'A campaign can fail long before it reaches the audience. The brief may be vague. The message may try to say everything. The design may win attention but lose the offer. The media may reach people who were never likely to act. Reporting may arrive without an opinion.',
      'We bring those decisions into one working process. That means asking better questions early, involving the right people, and being honest about what the budget, evidence, and timeline can support.',
    ],
  },
  beliefs: {
    heading: 'What we believe',
    items: [
      {
        title: 'Clarity is part of the creative work',
        body: 'If the audience cannot understand the value, decoration will not rescue the message.',
      },
      {
        title: 'A good idea needs an operating plan',
        body: 'The concept matters. So do approvals, formats, production, handoffs, distribution, follow-up, and measurement.',
      },
      {
        title: 'Specific beats impressive',
        body: 'We would rather explain exactly what the work will do than cover uncertainty with ambitious language.',
      },
      {
        title: 'Evidence should change the work',
        body: 'Measurement is useful when it leads to a decision. A report that nobody can act on is unfinished.',
      },
    ],
  },
  whoWeWorkWith: {
    heading: 'Teams ready to make a decision, not only request a deliverable.',
    body: 'Our clients may be launching a business, refreshing an established brand, entering Nigeria, building a stronger digital presence, or coordinating a campaign across internal teams and external partners. We are comfortable working with founders, marketing teams, leadership groups, nonprofits, schools, churches, hospitality businesses, professional services, event organisations, and diaspora-led companies.',
  },
  relationship: {
    heading: 'How the relationship works',
    items: [
      'A named lead for the engagement',
      'A written scope, responsibilities, and approval path',
      'Agreed review points instead of constant presentation cycles',
      'Direct access to the people doing the thinking and making',
      'Visible risks, dependencies, decisions, and changes',
      'Reporting tied to the objective and available evidence',
    ],
  },
  /**
   * The team section stays hidden until approved profiles and photographs exist.
   * See CONTENT_REQUIREMENTS.md.
   */
  team: {
    heading: 'Meet the people doing the work.',
    intro:
      'Strategy and execution stay close. Clients should know who is responsible for the work and how to reach them.',
  },
  serviceArea: {
    heading: 'Based in Nigeria. Built to collaborate across borders.',
    body: 'We work with organisations in Nigeria and with diaspora or international teams that need thoughtful marketing execution in the market. On-ground availability, travel, production coverage, and working hours are confirmed for each assignment.',
  },
  cta: {
    heading: 'Bring us a real business question.',
    body: 'We will listen, ask what is missing, and tell you where we believe the work should begin.',
    primaryCta: { label: 'Book a strategy call', href: '/book' },
    secondaryCta: { label: 'Start a project', href: '/start-a-project' },
  },
} as const;
