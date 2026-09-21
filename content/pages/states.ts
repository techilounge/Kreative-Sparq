export const notFoundContent = {
  seo: { title: 'Page Not Found | Kreative Sparq' },
  h1: 'This page has moved, changed, or never existed.',
  body: 'Try the main navigation, browse our services, or head back to the home page.',
  primaryCta: { label: 'Return home', href: '/' },
  secondaryCta: { label: 'Explore services', href: '/services' },
} as const;

export const errorContent = {
  h1: 'Something interrupted the page.',
  /** The email sentence is appended only when a monitored inbox is configured. */
  body: 'Try again. If the problem continues, return home',
  bodyWithEmail: (email: string) =>
    `Try again. If the problem continues, return home or email us at ${email}.`,
  bodyWithoutEmail: 'Try again. If the problem continues, return home or send an inquiry.',
  primaryCta: 'Try again',
  secondaryCta: { label: 'Return home', href: '/' },
} as const;

export const offlineContent = {
  heading: 'You appear to be offline.',
  body: 'Check your connection and try again. Any unsent form entries on this page will remain until you refresh or close it.',
  button: 'Try again',
} as const;
