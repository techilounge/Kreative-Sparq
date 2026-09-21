import type { Article } from './types';

export const howToBriefAMarketingAgency: Article = {
  slug: 'how-to-brief-a-marketing-agency',
  // Draft until an author is assigned and the rewritten-brief example is approved.
  status: 'draft',
  category: 'Running Marketing',
  title: 'How to brief a marketing agency without writing 30 pages.',
  standfirst:
    'A useful brief does not need polished marketing language. It needs enough context for the agency to understand the decision, the constraints, and what a good outcome would change.',
  excerpt:
    'Write a useful marketing agency brief without a long document. Cover the business context, audience, desired change, constraints, evidence, timing, and decisions.',
  seo: {
    title: 'How to Brief a Marketing Agency | Kreative Sparq',
    description:
      'Write a useful marketing agency brief without a long document. Cover the business context, audience, desired change, constraints, evidence, timing, and decisions.',
  },
  editorialRequirement:
    'Add one approved example of a weak brief rewritten into a useful brief before publishing.',
  relatedService: 'brand-strategy',
  ctaHeading: 'Have a challenge but not a finished brief?',
  ctaBody:
    'Use our short project form. We will ask for the context needed to find a sensible starting point.',
  ctaLabel: 'Start a Project',
  relatedArticles: [
    'before-spending-more-on-ads',
    'social-media-activity-is-not-a-content-strategy',
  ],
  body: [
    {
      kind: 'paragraph',
      text: 'Some briefs are too thin to guide the work. Others are so detailed that they leave no room to diagnose the problem. The best briefs sit between those extremes.',
    },
    {
      kind: 'paragraph',
      text: 'They tell the agency what the business knows, what it assumes, what has already been decided, and where help is needed. The eight sections below are enough for most first conversations.',
    },
    { kind: 'heading', text: '1. Start with the business situation' },
    {
      kind: 'paragraph',
      text: 'Explain what is happening now and why the project matters at this moment.',
    },
    {
      kind: 'list',
      intro: 'Useful context might include:',
      items: [
        'The company is entering a new market.',
        'A product is launching on a fixed date.',
        'Sales have grown, but the brand no longer reflects the business.',
        'Marketing activity has increased without enough qualified inquiries.',
        'Several teams are communicating the same offer differently.',
      ],
    },
    {
      kind: 'paragraph',
      text: 'Avoid beginning with a deliverable if you are not sure it is the answer. “We need 20 social posts” tells the agency what to make. “Our target customers do not understand that we now serve businesses, not only individuals” explains the problem those posts would need to solve.',
    },
    { kind: 'heading', text: '2. Describe the audience as people making a decision' },
    {
      kind: 'paragraph',
      text: 'Demographics may be relevant, but they are rarely enough. Explain the situation the audience is in.',
    },
    {
      kind: 'list',
      items: [
        'What are they trying to accomplish?',
        'What triggers them to look for help?',
        'What alternatives do they consider?',
        'What makes them hesitate?',
        'Who influences or approves the decision?',
        'Where do they already look for information?',
      ],
    },
    {
      kind: 'paragraph',
      text: 'If the answers are uncertain, say so. Research can be part of the assignment.',
    },
    { kind: 'heading', text: '3. State what needs to change' },
    {
      kind: 'paragraph',
      text: 'Good objectives describe a change in understanding, behaviour, or business performance. They do not simply restate the activity.',
    },
    {
      kind: 'comparison',
      intro: 'Compare these two lines:',
      items: [
        'We need a product launch campaign across social media.',
        'We need existing customers to understand why the new product is different and join the waitlist before the November launch.',
      ],
      outro: 'The second version gives the agency something to solve and eventually measure.',
    },
    { kind: 'heading', text: '4. Share what has already been tried' },
    { kind: 'paragraph', text: 'Previous work saves time, even when it failed.' },
    {
      kind: 'paragraph',
      text: 'Include relevant campaigns, research, customer feedback, landing pages, sales material, analytics, content, or internal proposals. Explain what the team believes worked, what did not, and how confident it is in that interpretation.',
    },
    {
      kind: 'paragraph',
      text: 'Do not hide a previous failure to make the new project feel like a clean start. The failure may contain the most useful evidence in the brief.',
    },
    { kind: 'heading', text: '5. Separate fixed decisions from open questions' },
    { kind: 'paragraph', text: 'Make three short lists:' },
    { kind: 'subheading', text: 'Fixed' },
    {
      kind: 'paragraph',
      text: 'Decisions or constraints that cannot change, such as a regulatory requirement, launch date, product name, approved market, or signed partnership.',
    },
    { kind: 'subheading', text: 'Preferred' },
    {
      kind: 'paragraph',
      text: 'Directions the team likes but can reconsider if the agency has a stronger reason.',
    },
    { kind: 'subheading', text: 'Open' },
    { kind: 'paragraph', text: 'Questions the agency is expected to help answer.' },
    {
      kind: 'paragraph',
      text: 'This distinction prevents time being wasted on impossible options while protecting room for better thinking.',
    },
    { kind: 'heading', text: '6. Be direct about budget' },
    {
      kind: 'paragraph',
      text: 'A budget is part of the design problem. It affects research, production, channels, talent, media, timing, geography, and how much can be tested.',
    },
    {
      kind: 'paragraph',
      text: 'If the exact amount is not approved, give a realistic range or explain the approval process. An agency can then propose a scope that fits the decision. Hiding the budget often produces proposals that cannot be compared because each supplier has imagined a different assignment.',
    },
    {
      kind: 'paragraph',
      text: 'Separate agency fees, production, media spend, printing, venues, travel, talent, technology, and other third-party costs where possible.',
    },
    { kind: 'heading', text: '7. Explain the timing and the reason behind it' },
    {
      kind: 'paragraph',
      text: 'Give the desired start date, fixed milestones, launch date, internal review windows, procurement steps, and external dependencies.',
    },
    {
      kind: 'paragraph',
      text: 'If a date is flexible, say so. If it is fixed, explain why. A public event date and an internal preference do not carry the same risk.',
    },
    { kind: 'heading', text: '8. Name the decision-makers' },
    {
      kind: 'paragraph',
      text: 'The agency needs to know who provides input, who consolidates feedback, who approves the work, and who signs the commercial agreement.',
    },
    {
      kind: 'paragraph',
      text: 'This does not require a complicated governance chart. Role names and a simple approval path are enough at the start.',
    },
    { kind: 'heading', text: 'A brief you can copy' },
    {
      kind: 'orderedList',
      intro: 'Use this structure:',
      items: [
        'Business situation: What is happening, and why now?',
        'Audience: Who needs to understand, believe, or do something?',
        'Desired change: What should be different after the work?',
        'Current evidence: What do we know, and where did it come from?',
        'Previous attempts: What has already been tried?',
        'Scope clues: What work may be needed, without treating it as final?',
        'Constraints: Budget, date, approvals, legal, technical, and operational limits.',
        'Decision process: Who gives input and who approves?',
        'Open questions: What do we need the agency to help decide?',
      ],
    },
    {
      kind: 'paragraph',
      text: 'The brief can be one or two pages. Links and appendices can carry supporting detail.',
    },
    { kind: 'heading', text: 'Closing' },
    {
      kind: 'paragraph',
      text: 'A good brief does not remove every unknown. It puts the right unknowns on the table. That gives the agency a fair chance to diagnose the assignment, propose the right scope, and explain the trade-offs before production begins.',
    },
  ],
};
