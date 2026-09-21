export type ServiceSlug =
  | 'brand-strategy'
  | 'creative-design'
  | 'content-social-media'
  | 'performance-marketing'
  | 'web-design-development'
  | 'campaigns-activations';

export type CallToAction = {
  readonly label: string;
  readonly href: string;
};

/**
 * Section shapes are deliberately varied. Each service page composes a different
 * sequence so the six pages share components without becoming the same template
 * with swapped headings.
 */
export type ServiceSection =
  | {
      readonly kind: 'prose';
      readonly heading: string;
      readonly body: readonly string[];
      readonly bullets?: { readonly intro?: string; readonly items: readonly string[] };
    }
  | {
      readonly kind: 'definitions';
      readonly heading: string;
      readonly items: readonly { readonly title: string; readonly body: string }[];
    }
  | {
      readonly kind: 'steps';
      readonly heading: string;
      readonly items: readonly { readonly title: string; readonly body: string }[];
    }
  | {
      readonly kind: 'list';
      readonly heading: string;
      readonly items: readonly string[];
      readonly note?: string;
    }
  | {
      readonly kind: 'numbered';
      readonly heading: string;
      readonly intro?: string;
      readonly items: readonly string[];
      readonly note?: string;
    };

export type ServiceFaq = {
  readonly question: string;
  readonly answer: string;
};

export type Service = {
  readonly slug: ServiceSlug;
  readonly name: string;
  readonly seo: {
    readonly title: string;
    readonly description: string;
    readonly ogTitle: string;
  };
  readonly hero: {
    readonly h1: string;
    readonly body: string;
    readonly primaryCta: CallToAction;
    readonly secondaryCta: CallToAction;
  };
  /** Home page summary and link label. */
  readonly home: {
    readonly description: string;
    readonly linkLabel: string;
  };
  /** Services overview summary, "Best for" line, and link label. */
  readonly overview: {
    readonly summary: string;
    readonly bestFor: string;
    readonly linkLabel: string;
  };
  /** The symptom that sends a visitor to this service, from the service finder. */
  readonly finderSymptom: string;
  readonly sections: readonly ServiceSection[];
  readonly faqs: readonly ServiceFaq[];
  readonly relatedServices: readonly ServiceSlug[];
  readonly cta: {
    readonly heading: string;
    readonly body: string;
    readonly primaryCta: CallToAction;
    readonly secondaryCta: CallToAction;
  };
};
