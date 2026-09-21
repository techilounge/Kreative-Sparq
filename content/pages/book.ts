export const bookContent = {
  seo: {
    title: 'Book a Marketing Strategy Call | Kreative Sparq',
    description:
      'Book a 30-minute call with Kreative Sparq to discuss your marketing challenge, timing, fit, and the most sensible next step.',
  },
  hero: {
    h1: "Let's use 30 minutes well.",
    body: 'Tell us what you are trying to change. We will use the call to understand the situation, test whether we are a good fit, and agree on a sensible next step.',
  },
  covers: {
    heading: 'What the call covers',
    items: [
      'The business and audience',
      'The immediate challenge or opportunity',
      'What has already been tried',
      'Timing, constraints, and decision process',
      'Whether Kreative Sparq is the right fit',
      'The next useful step, if there is one',
    ],
  },
  whoShouldJoin: {
    heading: 'Who should join',
    body: 'Invite the person closest to the business goal and anyone whose approval is needed to move the work forward. A large meeting is not necessary for the first conversation.',
  },
  whatToBring: {
    heading: 'What to bring',
    body: 'You do not need a formal presentation. A current website, social profile, campaign, product page, or short written brief can help us understand the context faster.',
  },
  reassurance: {
    heading: 'Booking reassurance',
    body: 'This is a working conversation, not a pressure call. If the assignment is outside our scope, too early, or better handled another way, we will say so.',
  },
  states: {
    loading: 'Loading available times…',
    /** `{{CONTACT_EMAIL}}` is resolved from settings; the sentence changes when absent. */
    unavailableWithEmail: (email: string) =>
      `The booking calendar is unavailable right now. Email ${email} and we will arrange a time.`,
    unavailableWithoutEmail:
      'The booking calendar is unavailable right now. Send an inquiry and we will arrange a time.',
    noSlots:
      'No suitable time showing? Send an inquiry and include your time zone and preferred windows.',
    complete:
      'Your call is booked. Check your email for the calendar invitation and meeting details.',
  },
  inquiryFallbackCta: { label: 'Send an inquiry', href: '/contact' },
} as const;
