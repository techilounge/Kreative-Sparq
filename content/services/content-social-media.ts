import type { Service } from './types';

export const contentSocialMedia: Service = {
  slug: 'content-social-media',
  name: 'Content & Social Media',
  seo: {
    title: 'Social Media Management in Nigeria | Kreative Sparq',
    description:
      'Build a practical content system with strategy, copy, design, production, publishing, community support, and social media reporting.',
    ogTitle: 'Content people recognise, remember, and act on.',
  },
  hero: {
    h1: 'Stop posting to fill space. Start publishing with a reason.',
    body: 'We help brands decide what to say, create content people can recognise, and build a publishing rhythm the team can sustain.',
    primaryCta: { label: 'Plan your content', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
  home: {
    description:
      'Replace scattered posting with useful content, a workable rhythm, and a voice that sounds like your brand.',
    linkLabel: 'Plan better content',
  },
  overview: {
    summary:
      'Strategy, production, publishing, and community support that make consistent communication possible.',
    bestFor:
      'Teams that need a clearer voice, stronger content, and a sustainable social presence.',
    linkLabel: 'Explore Content & Social Media',
  },
  finderSymptom: 'Publishing feels random and hard to sustain.',
  sections: [
    {
      kind: 'prose',
      heading: 'Consistency is easier when the decisions are made early.',
      body: [
        'Many teams do not have a content shortage. They have an unclear message, too many last-minute requests, slow approvals, and no shared view of what the content is meant to achieve. We fix the system around the posts, not only the posts themselves.',
      ],
    },
    {
      kind: 'definitions',
      heading: 'What we can manage',
      items: [
        {
          title: 'Content strategy',
          body: 'Audience priorities, content themes, channel roles, formats, publishing rhythm, conversion paths, and measures that match the business goal.',
        },
        {
          title: 'Editorial planning',
          body: 'Monthly or campaign calendars with clear briefs, owners, review dates, and room for timely content when it genuinely matters.',
        },
        {
          title: 'Copy and design',
          body: "Captions, scripts, carousels, static graphics, email copy, articles, and campaign assets written and designed in the brand's voice.",
        },
        {
          title: 'Photography and video',
          body: 'Production planning, shot lists, filming, editing, motion graphics, interviews, short-form video, and content cut-downs within the agreed scope.',
        },
        {
          title: 'Publishing and community support',
          body: 'Scheduling, quality checks, comment and message workflows, escalation rules, and community responses based on approved guidance.',
        },
        {
          title: 'Reporting and review',
          body: 'Clear reporting on what people saw, how they responded, what action followed, and what the evidence suggests we should change.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: 'A practical monthly rhythm',
      items: [
        {
          title: 'Plan',
          body: 'Agree priorities, offers, events, audience questions, and production needs before the calendar becomes urgent.',
        },
        {
          title: 'Produce',
          body: 'Create content in batches where possible, leaving space for relevant updates and audience response.',
        },
        {
          title: 'Publish and respond',
          body: 'Schedule approved work, monitor the channels in scope, and route customer-service or sensitive issues to the right person.',
        },
        {
          title: 'Learn',
          body: 'Review performance in context. A high-reach post and a high-converting post may be doing different jobs. Both need the right measure.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'What this service does not promise',
      body: [
        'We will not guarantee virality, follower counts, or sales from social media alone. We will set a clear role for each channel, improve the quality and consistency of the work, and connect content to the wider marketing path.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Which platforms do you manage?',
      answer:
        'The channel mix depends on the audience and the content the business can support. Common channels include Instagram, Facebook, LinkedIn, TikTok, YouTube, and X. We will not recommend every platform by default.',
    },
    {
      question: 'Do you create all the content?',
      answer:
        'We can handle strategy and production, work with material supplied by your team, or use a shared model. The proposal will state who provides access, subject-matter input, approvals, photography, filming locations, products, and spokespeople.',
    },
    {
      question: 'How quickly will content be approved?',
      answer:
        'We agree an approval schedule and named decision-maker before the first cycle. Delayed approvals can affect publishing dates, so the working process will include clear cut-off points.',
    },
    {
      question: 'Can you handle comments and direct messages?',
      answer:
        "Yes, within agreed hours, platforms, and escalation rules. Customer support, complaints, legal matters, and sensitive issues must have an approved route back to the client's team.",
    },
    {
      question: 'Can paid promotion be included?',
      answer:
        'Yes. Paid social can be added through our Performance Marketing service. Organic content and paid distribution will share the same message while being designed for different behaviours.',
    },
  ],
  relatedServices: ['creative-design', 'performance-marketing', 'campaigns-activations'],
  cta: {
    heading: 'Build a content rhythm your team can keep.',
    body: 'Show us what you publish now, where the process breaks down, and what the business needs content to accomplish.',
    primaryCta: { label: 'Start a content project', href: '/start-a-project' },
    secondaryCta: { label: 'Discuss ongoing support', href: '/contact' },
  },
};
