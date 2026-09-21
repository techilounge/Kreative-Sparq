export const thankYouContent = {
  seo: {
    title: 'Thank you | Kreative Sparq',
  },
  contact: {
    h1: 'Your message is with us.',
    /**
     * The copy deck's sentence names the submitted email address. Echoing a
     * submitted value on this route is forbidden, so the confirmation states
     * that an email was sent without repeating the address.
     */
    body: 'We sent a confirmation to the email address you gave us. A member of the team will review your inquiry and reply',
    primaryCta: { label: 'Explore our services', href: '/services' },
    secondaryCta: { label: 'Return home', href: '/' },
  },
  project: {
    h1: 'We have your project brief.',
    body: 'Thank you for giving us the context. We will review the goal, scope, timing, and fit, then reply',
    bodySuffix: 'with the most useful next step.',
    primaryCta: { label: 'Book a strategy call', href: '/book' },
    secondaryCta: { label: 'View our work', href: '/work' },
  },
  newsletter: {
    h1: 'Subscription confirmed.',
    body: 'You will receive the next useful marketing note. You can unsubscribe from any email.',
    primaryCta: { label: 'Read the latest insights', href: '/insights' },
  },
} as const;
