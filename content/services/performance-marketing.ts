import type { Service } from './types';

export const performanceMarketing: Service = {
  slug: 'performance-marketing',
  name: 'Performance Marketing',
  seo: {
    title: 'Performance Marketing Agency in Nigeria | Kreative Sparq',
    description:
      'Plan and manage paid search and social campaigns with stronger creative, landing pages, measurement, and decisions tied to business goals.',
    ogTitle: 'Paid campaigns that produce answers, not only reports.',
  },
  hero: {
    h1: 'Spend with a question. Measure for the next decision.',
    body: 'We plan and manage paid campaigns around a defined audience, offer, action, and cost the business can support. Then we use the results to improve the work.',
    primaryCta: { label: 'Discuss a paid campaign', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
  home: {
    description:
      'Run paid campaigns with defined audiences, purposeful creative, sensible landing pages, and reporting tied to decisions.',
    linkLabel: 'Improve paid performance',
  },
  overview: {
    summary:
      'Paid search and social campaigns shaped around audience intent, strong creative, landing-page fit, and useful reporting.',
    bestFor:
      'Lead generation, sales, launch support, retargeting, and improving inefficient ad spend.',
    linkLabel: 'Explore Performance Marketing',
  },
  finderSymptom: 'Paid campaigns are spending without enough insight.',
  sections: [
    {
      kind: 'prose',
      heading: 'Advertising exposes the strength of the whole path.',
      body: [
        'Targeting matters, but it is only one part of performance. The offer, creative, landing page, follow-up process, tracking, sales capacity, and customer economics all affect the result. We review that path before asking the budget to do more.',
      ],
    },
    {
      kind: 'definitions',
      heading: 'Capabilities',
      items: [
        {
          title: 'Paid social',
          body: 'Campaign planning and management across approved platforms such as Meta, LinkedIn, TikTok, or X, selected according to the audience and objective.',
        },
        {
          title: 'Paid search',
          body: 'Search campaign structure, keyword intent, ad copy, extensions, landing-page fit, negative keywords, budget control, and ongoing search-term review.',
        },
        {
          title: 'Campaign creative',
          body: 'Concepts, copy, static assets, motion, video cut-downs, and variation plans built for testing without producing random versions.',
        },
        {
          title: 'Landing pages',
          body: 'Focused pages that carry the promise from the ad, answer the next questions, and make the desired action easy to complete.',
        },
        {
          title: 'Measurement',
          body: 'Conversion definitions, UTM standards, platform events, analytics checks, dashboard or reporting setup, and source-aware lead tracking where the technical environment allows it.',
        },
        {
          title: 'Optimisation',
          body: 'Budget shifts, audience refinement, creative iteration, landing-page tests, and recommendations based on enough evidence to make a responsible call.',
        },
      ],
    },
    {
      kind: 'numbered',
      heading: 'How we define performance',
      intro:
        'We agree on the business action before launch. That might be a qualified inquiry, purchase, booking, registration, application, download, or another observable step. Platform metrics can explain delivery, but they are not a substitute for the outcome.',
      items: [
        'What happened?',
        'What probably influenced it?',
        'What do we know, and what is still uncertain?',
        'What should we do next?',
      ],
      note: 'Reports answer four questions.',
    },
    {
      kind: 'list',
      heading: 'Before we launch',
      items: [
        'The offer and audience are clear.',
        'The destination page matches the ad promise.',
        'Conversion tracking has been tested.',
        'The client can respond to leads or fulfil demand.',
        'Budget, run time, learning period, and decision points are understood.',
        'Creative approval and account access are complete.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Which advertising platforms do you manage?',
      answer:
        'We recommend platforms after reviewing the audience, offer, buying behaviour, available creative, and measurement setup. Common options include Google Ads, Meta Ads, LinkedIn Ads, and TikTok Ads.',
    },
    {
      question: 'Is ad spend included in your fee?',
      answer:
        'No, unless the proposal states otherwise. Media spend is normally paid directly by the client to the platform. Our fees cover the agreed strategy, setup, management, creative, reporting, and related work.',
    },
    {
      question: 'Can you guarantee a return?',
      answer:
        'No responsible agency can guarantee a return before the offer, market, sales process, and campaign have been tested. We can define the assumptions, build reliable measurement, manage the budget carefully, and show what the data supports.',
    },
    {
      question: 'How much budget do we need?',
      answer:
        'That depends on the objective, market, audience size, sales value, expected conversion rate, campaign length, and how quickly the business needs to learn. We will recommend a working range after discovery rather than quote a universal minimum on this page.',
    },
    {
      question: 'Do you fix tracking?',
      answer:
        'Tracking setup and troubleshooting can be included. We will state what can be measured reliably, what depends on third-party platforms, and where privacy or technical limits affect attribution.',
    },
  ],
  relatedServices: ['content-social-media', 'web-design-development', 'creative-design'],
  cta: {
    heading: 'Before you increase the budget, improve the path.',
    body: 'Share the objective, current campaigns, landing page, and what a useful customer action is worth to the business.',
    primaryCta: { label: 'Request a campaign review', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
};
