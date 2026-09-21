import type { Service } from './types';

export const campaignsActivations: Service = {
  slug: 'campaigns-activations',
  name: 'Campaigns & Activations',
  seo: {
    title: 'Brand Activations and Campaigns in Nigeria | Kreative Sparq',
    description:
      'Plan product launches, integrated campaigns, events, and brand activations with one clear idea carried across digital and on-ground execution.',
    ogTitle: 'Campaigns built to travel across channels.',
  },
  hero: {
    h1: 'One campaign idea. Every part pulling in the same direction.',
    body: 'We plan and coordinate launches, promotions, events, and brand activations so the message survives every handoff, from the first brief to the final audience interaction.',
    primaryCta: { label: 'Plan a campaign', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
  home: {
    description:
      'Plan launches and brand moments that hold together across digital channels, live experiences, and on-ground execution.',
    linkLabel: 'Plan a campaign',
  },
  overview: {
    summary:
      'Integrated campaign planning and execution for product launches, events, promotions, and experiences online or on the ground.',
    bestFor:
      'Launches, event promotion, awareness campaigns, activations, and work that must stay consistent across several partners.',
    linkLabel: 'Explore Campaigns & Activations',
  },
  finderSymptom: 'A product, event, or offer needs a coordinated launch.',
  sections: [
    {
      kind: 'prose',
      heading: 'More channels create more chances for the idea to fall apart.',
      body: [
        'A launch can involve strategy, creative, media, content, influencers, event production, vendors, sales teams, retail materials, field staff, and reporting. Without one clear campaign logic, each part becomes a separate task. We define the idea, roles, sequence, and measures so the experience still feels like one campaign.',
      ],
    },
    {
      kind: 'list',
      heading: 'Campaign types',
      items: [
        'Product and service launches',
        'Brand awareness campaigns',
        'Event promotion and audience acquisition',
        'Experiential and on-ground activations',
        'Seasonal and promotional campaigns',
        'Market-entry campaigns',
        'Influencer-supported campaigns',
        'Integrated digital and physical campaigns',
      ],
    },
    {
      kind: 'definitions',
      heading: 'What we can handle',
      items: [
        {
          title: 'Campaign strategy',
          body: 'Objective, audience, insight, proposition, channel roles, timeline, success measures, and key decisions.',
        },
        {
          title: 'Creative platform',
          body: 'The central campaign idea, message, visual direction, naming, copy, and rules that keep execution connected.',
        },
        {
          title: 'Channel planning',
          body: 'The job of paid, owned, earned, partner, influencer, event, retail, and field activity across the campaign sequence.',
        },
        {
          title: 'Production and coordination',
          body: 'Content, design, landing pages, print, event materials, vendor briefs, run sheets, approvals, and delivery tracking within scope.',
        },
        {
          title: 'Activation support',
          body: 'Audience flow, engagement mechanics, scripts, lead capture, QR journeys, data permissions, field reporting, and experience details.',
        },
        {
          title: 'Measurement and close-out',
          body: 'Agreed indicators, campaign tracking, post-campaign review, lessons, and recommendations for the next cycle.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: 'How we protect the idea',
      items: [
        {
          title: 'One brief',
          body: 'Every partner works from the same objective, audience, promise, mandatory elements, and definition of success.',
        },
        {
          title: 'Clear ownership',
          body: 'Decision-makers, production owners, dependencies, and approval deadlines are visible before the critical path becomes urgent.',
        },
        {
          title: 'Designed handoffs',
          body: 'Assets, copy, specifications, contact points, and version control are prepared for the people who must use them.',
        },
        {
          title: 'Evidence from the field',
          body: 'Where on-ground work is included, the reporting method is agreed before launch. Photos, attendance, sampling, leads, scans, sales signals, or other indicators must be defined and collected responsibly.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can you manage the full campaign?',
      answer:
        'Yes, where the required capabilities, locations, timing, permissions, and budget are confirmed. We may lead approved specialist partners for production, media, talent, fabrication, logistics, or field execution. Responsibilities will be clear in the proposal.',
    },
    {
      question: 'Do you work outside your base city?',
      answer:
        'Kreative Sparq can plan work across Nigeria, subject to scope, partner availability, travel, logistics, safety, permits, and local requirements. We will not claim on-ground coverage in a location until it is confirmed for the project.',
    },
    {
      question: 'Can you support only the creative part?',
      answer:
        'Yes. We can develop the campaign strategy and creative system for your internal team or appointed partners to execute. Handover and review support can be included.',
    },
    {
      question: 'Do you manage influencers?',
      answer:
        'Influencer planning, shortlisting, briefing, contracts, content review, disclosure requirements, and reporting can be included. Final selection should be based on audience fit and credible performance, not follower count alone.',
    },
    {
      question: 'How early should we begin?',
      answer:
        'The earlier the work involves venues, field teams, permits, production, talent, or several approval layers, the more lead time it needs. Contact us once the objective and target date are known, even if the brief is not complete.',
    },
  ],
  relatedServices: [
    'brand-strategy',
    'creative-design',
    'performance-marketing',
    'content-social-media',
  ],
  cta: {
    heading: 'Bring us the date, the audience, and what needs to happen.',
    body: 'We will help turn the moving parts into one campaign people can understand and your team can deliver.',
    primaryCta: { label: 'Start a campaign brief', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
};
