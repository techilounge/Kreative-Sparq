/**
 * Legal copy from sections 23 and 24 of the copy deck.
 *
 * The deck marks this as a plain-language starting draft, not legal advice.
 * Blocks whose text is `null` are the `[CONTENT REQUIRED]` clauses: they must be
 * supplied by counsel through the matching environment variable. Until every
 * required clause and the legal entity details are present, the routes render an
 * honest unpublished state instead of a policy with gaps.
 */

export type LegalBlock = {
  readonly heading: string;
  /** Paragraphs already approved in the copy deck. */
  readonly body?: readonly string[];
  readonly bullets?: readonly string[];
  /**
   * Name of the counsel-supplied clause this block needs. When set, the block
   * only renders once that clause has been configured.
   */
  readonly requiredClause?: LegalClauseKey;
};

export type LegalClauseKey =
  | 'privacyLegalBasis'
  | 'privacyProviders'
  | 'privacyRetention'
  | 'privacyCookies'
  | 'termsLiability'
  | 'termsIndemnity'
  | 'termsGoverningLaw';

export const privacyContent = {
  seo: {
    title: 'Privacy Policy | Kreative Sparq',
    description:
      'How Kreative Sparq collects, uses, and protects personal information submitted through kreativesparq.com.',
  },
  h1: 'Privacy Policy',
  lastUpdatedLabel: 'Last updated',
  intro:
    'Kreative Sparq respects your privacy. This policy explains what personal information we collect through kreativesparq.com, why we collect it, how we use it, and the choices available to you.',
  responsibleHeading: 'Who is responsible for your information',
  responsibleIntro:
    'The organisation responsible for the personal information described in this policy is:',
  responsibleLabels: {
    tradingAs: 'Trading as',
    address: 'Address',
    email: 'Email',
    phone: 'Phone',
  },
  tradingAs: 'Kreative Sparq',
  blocks: [
    {
      heading: 'Information we collect',
      body: [
        'We may collect information you provide directly, including your name, work email, phone number, company, role, website or social links, service interests, project details, timing, budget band, and communication preferences.',
        'We may also collect limited technical and usage information, such as pages viewed, referring page, device and browser type, approximate location derived from an IP address, campaign parameters, form events, and site performance data. The exact information depends on the analytics and security tools enabled on the site.',
        'Do not send passwords, financial account details, identification numbers, confidential customer information, or other sensitive material through our public forms.',
      ],
    },
    {
      heading: 'How we use information',
      body: ['We use personal information to:'],
      bullets: [
        'Respond to inquiries and assess project fit',
        'Arrange and manage calls',
        'Prepare proposals or requested information',
        'Deliver services and communicate with clients',
        'Protect forms and the website from spam, abuse, and security threats',
        'Understand how the website is used and improve its content and performance',
        'Send marketing emails when a person has chosen to receive them',
        'Meet legal, accounting, and record-keeping obligations',
      ],
    },
    { heading: 'Legal basis or reason for processing', requiredClause: 'privacyLegalBasis' },
    {
      heading: 'Service providers',
      body: [
        'We may use service providers to host the website, process forms, store inquiry records, send email, prevent spam, provide analytics, and schedule meetings. These providers may process information on our behalf under their own terms and data-protection obligations.',
      ],
      requiredClause: 'privacyProviders',
    },
    {
      heading: 'International transfers',
      body: [
        'Some service providers may process information outside Nigeria or the country where the visitor is located. Where required, we will use appropriate contractual or legal safeguards for those transfers.',
      ],
    },
    {
      heading: 'Retention',
      body: [
        'We keep information only for as long as needed for the purpose it was collected, to maintain appropriate business records, resolve disputes, and meet legal obligations.',
      ],
      requiredClause: 'privacyRetention',
    },
    {
      heading: 'Marketing communications',
      body: [
        'We send marketing emails only where we have an appropriate basis to do so. You can unsubscribe using the link in any marketing email or contact us at {{PRIVACY_EMAIL}}. Unsubscribing from marketing does not stop service messages related to an active inquiry or client relationship.',
      ],
    },
    { heading: 'Cookies and similar technologies', requiredClause: 'privacyCookies' },
    {
      heading: 'Your choices and rights',
      body: [
        'Depending on the law that applies, you may have rights to request access to personal information, ask for corrections, object to or restrict certain uses, request deletion, withdraw consent, or receive a portable copy. These rights may have legal limits.',
        'To make a request, email {{PRIVACY_EMAIL}}. We may need to verify your identity before acting on the request.',
      ],
    },
    {
      heading: 'Security',
      body: [
        'We use reasonable administrative and technical measures intended to protect personal information. No online service can promise absolute security. If we become aware of an incident that requires notice, we will act in line with applicable law.',
      ],
    },
    {
      heading: 'Links to other websites',
      body: [
        'The site may link to services or websites we do not control. Their privacy practices are governed by their own policies.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may update this policy when our practices, services, or legal obligations change. The “Last updated” date will show when the current version took effect.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'Questions about this policy or personal information can be sent to {{PRIVACY_EMAIL}}.',
      ],
    },
  ] satisfies readonly LegalBlock[],
} as const;

export const termsContent = {
  seo: {
    title: 'Terms of Use | Kreative Sparq',
    description: 'The terms that apply to your use of kreativesparq.com.',
  },
  h1: 'Terms of Use',
  lastUpdatedLabel: 'Last updated',
  intro:
    'These terms apply to your use of kreativesparq.com. By using the site, you agree to these terms. If you do not agree, please do not use the site.',
  blocks: [
    {
      heading: 'About the site',
      body: [
        'The site provides information about Kreative Sparq, its services, work, and published insights. It also allows visitors to contact us, submit a project brief, subscribe to updates, or book a call where those features are available.',
      ],
    },
    {
      heading: 'No professional or performance guarantee',
      body: [
        'Website content is general information. It is not legal, financial, or other regulated professional advice. Marketing examples, opinions, and case-study results depend on their stated context and do not guarantee the same outcome for another business.',
      ],
    },
    {
      heading: 'Inquiries and bookings',
      body: [
        'Submitting a form or booking a call does not create a client relationship, reserve project capacity, or require either party to proceed. A client relationship begins only when the parties sign an agreement or otherwise confirm the engagement in writing.',
      ],
    },
    {
      heading: 'Acceptable use',
      body: ['You must not:'],
      bullets: [
        'Use the site unlawfully or to harm another person',
        'Attempt to gain unauthorised access to the site, systems, or data',
        "Interfere with the site's operation or security",
        'Submit malicious code, automated spam, or deceptive information',
        'Scrape, reproduce, or exploit site content in violation of applicable law or these terms',
        'Misrepresent your identity or authority to act for an organisation',
      ],
    },
    {
      heading: 'Intellectual property',
      body: [
        'Unless otherwise stated, the site and its original content, design, branding, graphics, and code are owned by or licensed to {{LEGAL_BUSINESS_NAME}}. Client work remains subject to the rights, permissions, and attribution stated in the relevant case study or agreement.',
        "You may view and share links to public pages for personal or legitimate business reference. You may not reproduce, adapt, sell, license, or present the site's content or design as your own without written permission.",
      ],
    },
    {
      heading: 'Third-party services and links',
      body: [
        'The site may contain embedded services or links operated by third parties. We do not control their availability, content, security, or terms. Your use of those services is subject to their own policies.',
      ],
    },
    {
      heading: 'Site availability and accuracy',
      body: [
        'We aim to keep the site useful and accurate, but we do not promise that it will always be available, error-free, or complete. We may update, suspend, or remove content or features without notice.',
      ],
    },
    { heading: 'Limitation of liability', requiredClause: 'termsLiability' },
    { heading: 'Indemnity', requiredClause: 'termsIndemnity' },
    { heading: 'Governing law and disputes', requiredClause: 'termsGoverningLaw' },
    {
      heading: 'Changes to these terms',
      body: [
        'We may update these terms when the site or our legal obligations change. The “Last updated” date will show when the current version took effect.',
      ],
    },
    {
      heading: 'Contact',
      body: ['Questions about these terms can be sent to {{LEGAL_CONTACT_EMAIL}}.'],
    },
  ] satisfies readonly LegalBlock[],
} as const;

/** Rendered in place of a legal page that has not completed counsel review. */
export const legalUnpublished = {
  heading: 'This policy is with counsel.',
  body: 'We will not publish a privacy or terms page that still has unresolved clauses. Once the review is complete the full policy will appear here.',
  contactIntro: 'For a question about how we handle your information, contact us directly.',
  cta: { label: 'Contact Kreative Sparq', href: '/contact' },
  homeCta: { label: 'Return home', href: '/' },
} as const;
