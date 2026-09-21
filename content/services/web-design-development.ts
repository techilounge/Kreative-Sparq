import type { Service } from './types';

export const webDesignDevelopment: Service = {
  slug: 'web-design-development',
  name: 'Web Design & Development',
  seo: {
    title: 'Web Design and Development in Nigeria | Kreative Sparq',
    description:
      'Build a fast, clear, responsive marketing website or landing page designed around your audience, content, search visibility, and conversions.',
    ogTitle: 'A website that makes the next step clear.',
  },
  hero: {
    h1: 'Your website should answer the question that brought people there.',
    body: 'We design and build responsive marketing websites that explain the offer clearly, earn trust, load quickly, and give visitors a useful next step on every screen.',
    primaryCta: { label: 'Discuss your website', href: '/start-a-project' },
    secondaryCta: { label: 'View web work', href: '/work' },
  },
  home: {
    description:
      'Build a fast, clear website that helps visitors understand the offer, trust the business, and take the next step.',
    linkLabel: 'Build a better website',
  },
  overview: {
    summary:
      'Marketing websites and landing pages that make the offer clear, load quickly, and guide people towards a useful next step.',
    bestFor:
      'New sites, redesigns, launch pages, campaign pages, and websites that are not producing enough inquiries.',
    linkLabel: 'Explore Web Design & Development',
  },
  finderSymptom: 'The website is slow, unclear, or not converting.',
  sections: [
    {
      kind: 'prose',
      heading: 'A redesign should solve more than appearance.',
      body: [
        'The site may look dated, but that is rarely the whole problem. Visitors may not understand the offer. Important pages may be hard to find. Mobile performance may be poor. The content may sound like everyone else. Forms may fail, search engines may struggle to understand the structure, or the internal team may be unable to make updates. We identify the real constraints before choosing a design direction.',
      ],
    },
    {
      kind: 'definitions',
      heading: 'What we deliver',
      items: [
        {
          title: 'Website strategy',
          body: 'Business goals, audience tasks, content priorities, conversion paths, search intent, page requirements, and a practical measurement plan.',
        },
        {
          title: 'Information architecture and UX',
          body: 'Sitemap, navigation, page hierarchy, user flows, wireframes, and interaction decisions shaped around real content.',
        },
        {
          title: 'Website copy',
          body: 'Page messaging, headings, calls to action, metadata, and content structure written for people first and search discovery second.',
        },
        {
          title: 'UI and visual design',
          body: 'A responsive design system that carries the brand with discipline across typography, colour, imagery, components, and states.',
        },
        {
          title: 'Development',
          body: 'Fast, accessible front-end implementation, content integration, forms, analytics, technical SEO, and deployment within the approved stack.',
        },
        {
          title: 'Launch and handover',
          body: 'Quality assurance, redirects, metadata, analytics checks, editor guidance, documentation, and an agreed post-launch support period.',
        },
      ],
    },
    {
      kind: 'list',
      heading: 'Website types',
      items: [
        'Marketing and corporate websites',
        'Campaign and product-launch pages',
        'Lead-generation landing pages',
        'Portfolio and case-study sites',
        'Event and registration sites',
        'Content-led websites',
        'Website redesigns and focused conversion improvements',
      ],
      note: 'Ecommerce, web applications, complex integrations, and authenticated portals require separate discovery and technical scoping.',
    },
    {
      kind: 'list',
      heading: 'Our standard for the work',
      items: [
        'Mobile-first responsive behaviour',
        'Clear content hierarchy',
        'Accessible navigation, forms, and interaction states',
        'Useful light and dark modes where required',
        'Sensible motion with reduced-motion support',
        'Search-friendly page structure and metadata',
        'Fast images, fonts, and front-end code',
        'Analytics tied to meaningful actions',
        'A CMS or content system the team can manage',
        'No invented testimonials, projects, statistics, or placeholder claims at launch',
      ],
    },
  ],
  faqs: [
    {
      question: 'How long does a website take?',
      answer:
        'Timing depends on the number of templates, content readiness, feedback speed, technical requirements, and integrations. We provide a delivery plan after discovery. Copy, photography, and approvals often affect the schedule as much as development.',
    },
    {
      question: 'Which platform do you use?',
      answer:
        "We choose the platform based on the site's purpose, editing needs, integrations, internal skills, budget, and expected growth. For modern marketing sites, we may recommend Next.js with a structured CMS and Vercel hosting. The proposal will explain why the selected stack fits.",
    },
    {
      question: 'Can you improve an existing website instead of rebuilding it?',
      answer:
        'Yes. An audit may show that focused changes to messaging, navigation, performance, search structure, or key landing pages are more sensible than a full rebuild.',
    },
    {
      question: 'Is SEO included?',
      answer:
        'Every build includes a sound technical and on-page foundation within scope: crawlable content, page titles, descriptions, headings, internal links, canonicals, sitemap, robots rules, structured data where appropriate, image handling, and performance work. Ongoing search research, article production, digital PR, and authority building are separate services.',
    },
    {
      question: 'Will we be able to update the site?',
      answer:
        'Yes. We define which content should be editable, build the appropriate fields, and provide handover guidance. Editable does not have to mean every visual decision can be changed without limits.',
    },
  ],
  relatedServices: ['brand-strategy', 'creative-design', 'performance-marketing'],
  cta: {
    heading: 'If the website is unclear, the campaign pays for the confusion.',
    body: 'Show us the current site, the audience, and the action you need more visitors to take.',
    primaryCta: { label: 'Start a website project', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
};
