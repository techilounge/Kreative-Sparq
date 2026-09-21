import type { Service } from './types';

export const brandStrategy: Service = {
  slug: 'brand-strategy',
  name: 'Brand Strategy',
  seo: {
    title: 'Brand Strategy Agency in Nigeria | Kreative Sparq',
    description:
      'Clarify your positioning, audience, message, and launch plan with brand strategy built for businesses growing in Nigeria and beyond.',
    ogTitle: 'A clearer brand starts with better decisions.',
  },
  hero: {
    h1: 'Give the brand a position people can understand.',
    body: 'When the offer is hard to explain, every campaign has to work too hard. We help you define who the brand is for, what it should be known for, and how to express that idea consistently.',
    primaryCta: { label: 'Discuss your brand', href: '/start-a-project' },
    secondaryCta: { label: 'View our work', href: '/work' },
  },
  home: {
    description:
      'Get clear on your audience, position, message, and next move before spending money on execution.',
    linkLabel: 'Build a clearer brand',
  },
  overview: {
    summary:
      'Research, positioning, messaging, brand architecture, and launch planning that give the rest of the work a clear direction.',
    bestFor:
      'New brands, repositioning, market entry, confusing offers, and teams with inconsistent messaging.',
    linkLabel: 'Explore Brand Strategy',
  },
  finderSymptom: 'People do not understand what makes the business different.',
  sections: [
    {
      kind: 'prose',
      heading: 'Recognition begins with clarity.',
      body: [
        'A logo can identify a business, but it cannot decide what the business should mean to customers. Brand strategy makes those decisions explicit. It gives leadership, marketing, sales, and creative teams a shared reference point for what to say, what to prioritise, and what to leave out.',
      ],
      bullets: {
        intro: 'This work is useful when:',
        items: [
          'Customers compare you mainly on price.',
          'Different teams describe the offer in different ways.',
          'The business has grown beyond its original identity.',
          'A new product or company is preparing to enter the market.',
          'Campaigns look active but do not build a recognisable position.',
          'A rebrand is being discussed before the underlying question is clear.',
        ],
      },
    },
    {
      kind: 'definitions',
      heading: 'What we can help define',
      items: [
        {
          title: 'Audience and market context',
          body: 'Who matters most, what they are trying to solve, how they choose, and what alternatives they already have.',
        },
        {
          title: 'Positioning',
          body: "The useful space the brand can own in the customer's mind, grounded in the offer and the market rather than wishful language.",
        },
        {
          title: 'Message system',
          body: 'A practical hierarchy for the main promise, supporting points, proof, objections, tone, and calls to action.',
        },
        {
          title: 'Brand architecture',
          body: 'Clear relationships between the parent brand, products, services, programmes, or sub-brands so customers can make sense of the portfolio.',
        },
        {
          title: 'Go-to-market direction',
          body: 'The audiences, messages, channels, assets, and sequence needed to bring a new offer or refreshed brand into the market.',
        },
      ],
    },
    {
      kind: 'list',
      heading: 'Typical deliverables',
      items: [
        'Stakeholder interviews and discovery workshop',
        'Audience and competitor review',
        'Positioning framework',
        'Value proposition and message hierarchy',
        'Brand story and verbal direction',
        'Brand architecture recommendations',
        'Naming support, where required',
        'Launch or repositioning plan',
        'Internal brand briefing',
        'Practical strategy document your team can use',
      ],
      note: 'The final scope depends on the decision the business needs to make. We do not include research or documents simply to make the project look larger.',
    },
    {
      kind: 'steps',
      heading: 'How the work moves',
      items: [
        {
          title: 'Listen',
          body: 'We review the offer, current materials, customer context, internal views, and previous marketing. Where useful, we speak with customers or other stakeholders.',
        },
        {
          title: 'Find the tension',
          body: 'We identify the gap between how the business sees itself and what the market is likely to notice, believe, or value.',
        },
        {
          title: 'Make the choices',
          body: 'We develop and test positioning and messaging routes. The goal is not a collection of options. It is a defensible direction.',
        },
        {
          title: 'Put it to work',
          body: 'We translate the strategy into a usable system for identity, content, sales, campaigns, websites, and launch activity.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'A good fit',
      body: [
        'This service is a strong fit when the decision-makers can take part in discovery, the business is willing to make choices, and the team wants a strategy it will actually use. It is not a good fit if the only desired outcome is a longer document that validates a direction already fixed.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Do we need brand strategy before a new identity?',
      answer:
        'If the business is changing position, entering a new market, speaking to a new audience, or struggling to explain its value, strategy should come first. If the direction is already clear and documented, we can review it and move into identity work.',
    },
    {
      question: 'Can you work with an existing brand?',
      answer:
        'Yes. The work may involve sharpening the current position and message rather than replacing everything. A useful strategy should show what to keep as clearly as what to change.',
    },
    {
      question: 'Does the process include customer research?',
      answer:
        'It can. We recommend the level of research based on the decision, access to customers, timing, and budget. We will not present assumptions as research.',
    },
    {
      question: 'What happens after the strategy is approved?',
      answer:
        'We can carry the direction into identity, content, a website, campaign planning, or a launch. You can also take the strategy to an internal team or another specialist. Handover materials will make the next step clear.',
    },
  ],
  relatedServices: ['creative-design', 'web-design-development', 'campaigns-activations'],
  cta: {
    heading: 'Is the brand harder to explain than it should be?',
    body: 'Bring us the offer, the audience, and the decisions on the table. We will help you find the clearest position to build from.',
    primaryCta: { label: 'Start a brand strategy project', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
};
