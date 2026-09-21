/** Every public route, with the heading each one must render exactly once. */
export const PUBLIC_ROUTES = [
  { path: '/', h1: 'Ideas that move people. Marketing that moves business.' },
  { path: '/services', h1: 'The right mix of thinking and making.' },
  { path: '/services/brand-strategy', h1: 'Give the brand a position people can understand.' },
  {
    path: '/services/creative-design',
    h1: 'Make the brand recognisable before the name is read.',
  },
  {
    path: '/services/content-social-media',
    h1: 'Stop posting to fill space. Start publishing with a reason.',
  },
  {
    path: '/services/performance-marketing',
    h1: 'Spend with a question. Measure for the next decision.',
  },
  {
    path: '/services/web-design-development',
    h1: 'Your website should answer the question that brought people there.',
  },
  {
    path: '/services/campaigns-activations',
    h1: 'One campaign idea. Every part pulling in the same direction.',
  },
  { path: '/work', h1: 'Work with a reason behind it.' },
  { path: '/about', h1: 'We care about the work after the presentation.' },
  { path: '/insights', h1: 'Useful answers for the work in front of you.' },
  { path: '/contact', h1: 'Tell us what you are working on.' },
  { path: '/start-a-project', h1: 'Give us the useful version of the brief.' },
  { path: '/book', h1: "Let's use 30 minutes well." },
  { path: '/privacy', h1: 'Privacy Policy' },
  { path: '/terms', h1: 'Terms of Use' },
] as const;

/** Routes that carry a form or a large amount of prose, scanned by axe. */
export const AXE_ROUTES = [
  '/',
  '/services',
  '/services/brand-strategy',
  '/about',
  '/contact',
  '/start-a-project',
  '/book',
  '/privacy',
  '/terms',
] as const;

/** Strings that must never appear in rendered text, matched case-sensitively. */
export const FORBIDDEN_STRINGS = [
  '{{',
  'CONTENT REQUIRED',
  'HIDE UNTIL AVAILABLE',
  'Lorem ipsum',
  'lorem ipsum',
  'NaN',
] as const;

/**
 * Leaked JavaScript values, matched as whole words. A plain substring check
 * would flag ordinary copy: "unannounced" contains "nan".
 */
export const FORBIDDEN_PATTERNS = [/\bundefined\b/, /\bnull\b/, /\[object Object\]/] as const;
