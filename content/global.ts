/**
 * Global interface copy, taken verbatim from section 4 of the approved copy deck.
 */

export type NavLink = {
  readonly label: string;
  readonly href: string;
};

export const brand = {
  name: 'Kreative Sparq',
  tagline: 'Ideas that move people. Marketing that moves business.',
  shortDescription:
    'Strategy, creative, digital marketing, websites, and campaigns for brands ready to move with purpose.',
  positioning:
    'Kreative Sparq is a marketing agency in Nigeria that brings strategy, creative work, digital execution, and measurement into one clear plan. We help growing brands earn attention and turn it into useful business action.',
  serviceArea: 'Nigeria, with remote collaboration available for diaspora and international teams.',
} as const;

export const primaryNavigation: readonly NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const headerCta: NavLink = { label: 'Book a strategy call', href: '/book' };

export const utilityActions = {
  startProject: 'Start a project',
  viewWork: 'View our work',
  exploreServices: 'Explore services',
  readCaseStudy: 'Read the case study',
  seeHowWeWork: 'See how we work',
  readArticle: 'Read the article',
  backToInsights: 'Back to insights',
  backToAllWork: 'Back to all work',
} as const;

export const themeControl = {
  label: 'Choose colour theme',
  options: [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ],
  /** `{{THEME}}` is replaced with the chosen option label. */
  announcement: (theme: string) => `Colour theme changed to ${theme}.`,
} as const;

export const mobileMenu = {
  openLabel: 'Open menu',
  closeLabel: 'Close menu',
  heading: 'Explore Kreative Sparq',
  cta: 'Book a strategy call',
} as const;

export const footer = {
  statement: 'Clear thinking. Strong creative. Marketing built to move.',
  description:
    'Kreative Sparq is a Nigerian marketing agency working with growing businesses, startups, established organisations, and diaspora-led teams.',
  groups: [
    {
      heading: 'Services',
      links: [
        { label: 'Brand Strategy', href: '/services/brand-strategy' },
        { label: 'Creative Design', href: '/services/creative-design' },
        { label: 'Content & Social Media', href: '/services/content-social-media' },
        { label: 'Performance Marketing', href: '/services/performance-marketing' },
        { label: 'Web Design & Development', href: '/services/web-design-development' },
        { label: 'Campaigns & Activations', href: '/services/campaigns-activations' },
      ],
    },
    {
      heading: 'Agency',
      links: [
        { label: 'Work', href: '/work' },
        { label: 'About', href: '/about' },
        { label: 'Insights', href: '/insights' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      heading: 'Start',
      links: [
        { label: 'Book a strategy call', href: '/book' },
        { label: 'Start a project', href: '/start-a-project' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ],
  contactHeading: 'Contact',
  emailLabel: 'Email',
  phoneLabel: 'Phone or WhatsApp',
  serviceAreaLabel: 'Service area',
  /** `{{CURRENT_YEAR}}` is resolved at render time. */
  copyright: (year: number) => `© ${year} Kreative Sparq. All rights reserved.`,
} as const;

export const newsletter = {
  heading: 'Useful marketing notes, sent occasionally.',
  body: 'Practical ideas on brand, content, digital growth, websites, and campaigns. No daily noise.',
  fieldLabel: 'Email address',
  button: 'Subscribe',
  consent:
    'By subscribing, you agree to receive marketing emails from Kreative Sparq. You can unsubscribe at any time.',
  success: "You're on the list. Watch your inbox for the next useful note.",
  error: "We couldn't add you just now. Please try again.",
} as const;

export const insightsNewsletter = {
  heading: 'Get the useful note, not a daily interruption.',
  body: 'Occasional ideas on brand, content, digital growth, websites, and campaigns. Written for people responsible for getting the work done.',
  fieldLabel: 'Work email',
  button: 'Send me the next note',
} as const;

export const ctaBand = {
  eyebrow: 'Have a project in mind?',
  heading: "Let's find the clearest way forward.",
  body: 'Tell us what you are trying to achieve. We will help you work out the right scope, whether that is one focused project or an ongoing marketing programme.',
  primaryCta: { label: 'Start a project', href: '/start-a-project' },
  secondaryCta: { label: 'Book a strategy call', href: '/book' },
} as const;

export const loadingLabels = {
  page: 'Loading page…',
  projects: 'Loading projects…',
  articles: 'Loading articles…',
  sending: 'Sending…',
  savingProgress: 'Saving your progress…',
} as const;

export const skipLinkLabel = 'Skip to main content';
