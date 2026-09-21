import type { Article } from './types';

export const beforeSpendingMoreOnAds: Article = {
  slug: 'before-spending-more-on-ads',
  // Draft until an author is assigned and the firsthand example is approved.
  status: 'draft',
  category: 'Performance',
  title: 'Before you spend more on ads, fix the path after the click.',
  standfirst:
    'More budget sends more people through the system you already have. If that system is unclear, slow, or difficult to measure, advertising will expose the problem faster.',
  excerpt:
    'Before increasing your advertising budget, check the offer, landing page, lead response, tracking, campaign economics, and creative supply.',
  seo: {
    title: 'What to Fix Before Spending More on Ads | Kreative Sparq',
    description:
      'Before increasing your advertising budget, check the offer, landing page, lead response, tracking, campaign economics, and creative supply.',
  },
  editorialRequirement:
    'Add at least one approved firsthand or anonymised example before publishing.',
  relatedService: 'performance-marketing',
  ctaHeading: 'Need an honest review before increasing spend?',
  ctaBody:
    'We can examine the campaign path, identify the weakest links, and recommend the next sensible test.',
  ctaLabel: 'Explore Performance Marketing',
  relatedArticles: ['how-to-brief-a-marketing-agency'],
  body: [
    {
      kind: 'paragraph',
      text: 'Paid advertising is easy to scale in one sense. You can increase the budget in a few clicks. The harder question is whether the business is ready for the extra attention.',
    },
    {
      kind: 'paragraph',
      text: 'When a campaign is underperforming, the ad account is often the first place people look. Sometimes the setup is the problem. But the cause may sit earlier in the offer or later in the customer journey. Before spending more, check the six parts below.',
    },
    { kind: 'heading', text: '1. Can someone understand the offer in one sentence?' },
    {
      kind: 'paragraph',
      text: 'An ad has limited time to earn attention. If the offer takes several paragraphs to explain, the campaign starts with a disadvantage.',
    },
    {
      kind: 'list',
      intro: 'Write one sentence that answers:',
      items: [
        'What are you offering?',
        'Who is it for?',
        'What useful change does it provide?',
        'Why should someone consider it now?',
      ],
    },
    {
      kind: 'paragraph',
      text: 'This sentence does not need to be clever. It needs to be understood. Test it with someone close to the intended customer but outside the project team. Ask them to explain it back in their own words. If their answer changes the meaning, keep working.',
    },
    { kind: 'heading', text: '2. Does the landing page continue the same promise?' },
    {
      kind: 'paragraph',
      text: 'The ad and landing page are one conversation. A person should not click a specific promise and arrive on a general home page that asks them to search for the relevant information.',
    },
    {
      kind: 'list',
      intro: 'Check whether the destination page:',
      items: [
        'Repeats the core offer in plain language',
        'Shows who the offer is for',
        'Answers the main questions and objections',
        'Provides enough proof for the decision',
        'Makes the next action easy to see and complete',
        'Works properly on a phone and a slower connection',
      ],
    },
    {
      kind: 'paragraph',
      text: 'Removing unnecessary choices often helps more than adding another block of persuasive copy.',
    },
    { kind: 'heading', text: '3. Can the business respond when interest arrives?' },
    {
      kind: 'paragraph',
      text: 'A lead is not a result if nobody follows up. A purchase is not healthy growth if fulfilment breaks under demand.',
    },
    {
      kind: 'list',
      intro: 'Before increasing spend, define:',
      items: [
        'Who receives each inquiry',
        'How quickly that person is expected to respond',
        'What information they need',
        'How the lead will be qualified',
        'Where the outcome will be recorded',
        'What happens when the owner is unavailable',
      ],
    },
    {
      kind: 'paragraph',
      text: 'Test the process yourself. Submit the form on a phone. Check the confirmation. Follow the notification. See how long it takes to reach a person who can act.',
    },
    { kind: 'heading', text: '4. Is the important action being measured?' },
    {
      kind: 'paragraph',
      text: 'Clicks and impressions explain delivery. They do not tell you whether the campaign produced useful business action.',
    },
    {
      kind: 'paragraph',
      text: 'Choose the event closest to value that can be measured responsibly. Depending on the business, that may be a completed purchase, qualified inquiry, booking, application, registration, or phone call.',
    },
    {
      kind: 'list',
      intro: 'Then check the basics:',
      items: [
        'Does the event fire only when the action succeeds?',
        'Is the same action counted twice by different tools?',
        'Can the business connect a lead to its source?',
        'Are test submissions excluded where possible?',
        'Is consent handled correctly?',
        'Can the sales or service team record what happened after the initial inquiry?',
      ],
    },
    {
      kind: 'paragraph',
      text: 'Attribution will never be perfect. The goal is evidence good enough to support a decision, with the limits understood.',
    },
    { kind: 'heading', text: '5. Do the numbers make commercial sense?' },
    {
      kind: 'paragraph',
      text: 'A low cost per click can still produce an expensive customer. A high cost per lead can still be acceptable for a valuable, profitable service. Platform averages cannot answer the business question on their own.',
    },
    {
      kind: 'orderedList',
      intro: 'Work backwards from the economics:',
      items: [
        'What is a completed sale or qualified opportunity worth?',
        'What proportion of qualified leads usually become customers?',
        'What gross margin or contribution is available after delivery costs?',
        'How long does it take for the value to arrive?',
        'What acquisition cost can the business carry?',
      ],
    },
    {
      kind: 'paragraph',
      text: 'If those numbers are unknown, use a documented estimate and label it as an assumption. The first campaign can help replace assumptions with evidence.',
    },
    { kind: 'heading', text: '6. Is there enough creative to learn from?' },
    {
      kind: 'paragraph',
      text: 'Running one image and one headline for months is not a testing plan. Producing dozens of random variations is not one either.',
    },
    {
      kind: 'list',
      intro: 'Build variations around useful questions:',
      items: [
        'Which customer problem deserves the lead?',
        'Does a demonstration work better than a claim?',
        'Which proof reduces hesitation?',
        'Does the audience respond to the outcome, the process, or the offer terms?',
        'Which format suits the platform and stage of awareness?',
      ],
    },
    {
      kind: 'paragraph',
      text: 'Change one meaningful variable at a time where practical. Keep a record of the reason for each variation so the result teaches the team something.',
    },
    { kind: 'heading', text: 'A quick readiness check' },
    {
      kind: 'list',
      intro: 'Increase the budget only when you can answer yes to most of these questions:',
      items: [
        'The offer is easy to explain.',
        'The landing page matches the ad.',
        'The desired action works on mobile.',
        'The response owner and process are clear.',
        'Conversion tracking has been tested.',
        'The business knows what it can afford to acquire a customer or qualified lead.',
        'There is a plan for creative testing.',
        'Fulfilment can handle additional demand.',
      ],
    },
    {
      kind: 'paragraph',
      text: 'If several answers are no, the next investment may belong in the path rather than the media budget.',
    },
    { kind: 'heading', text: 'Closing' },
    {
      kind: 'paragraph',
      text: 'Advertising does not sit above the business. It runs through the offer, page, people, systems, and economics. Fixing those parts gives the campaign a fairer test and gives the team better information about what to do next.',
    },
  ],
};
