export type SitePath = `/${string}`;

export type SiteLink = Readonly<{
  label: string;
  href: SitePath;
}>;

export type FooterGroup = Readonly<{
  heading: string;
  links: readonly SiteLink[];
}>;

export type GlobalContent = Readonly<{
  navigation: readonly SiteLink[];
  primaryAction: SiteLink;
  footerStatement: string;
  footerDescription: string;
  footerGroups: readonly FooterGroup[];
}>;

export type HomeService = Readonly<{
  title: string;
  description: string;
  link: SiteLink;
  image: Readonly<{ src: string; alt: string; position: string }>;
}>;

export type HomePrinciple = Readonly<{ title: string; description: string }>;
export type HomeStep = Readonly<{
  number: string;
  title: string;
  description: string;
}>;

export type HomeContent = Readonly<{
  hero: Readonly<{
    eyebrow: string;
    heading: string;
    description: string;
    note: string;
    primary: SiteLink;
    secondary: SiteLink;
  }>;
  capability: Readonly<{ heading: string; description: string }>;
  services: Readonly<{
    eyebrow: string;
    heading: string;
    description: string;
    items: readonly HomeService[];
  }>;
  work: Readonly<{
    eyebrow: string;
    heading: string;
    emptyState: string;
    action: SiteLink;
  }>;
  why: Readonly<{
    eyebrow: string;
    heading: string;
    description: string;
    principles: readonly HomePrinciple[];
  }>;
  process: Readonly<{
    eyebrow: string;
    heading: string;
    steps: readonly HomeStep[];
  }>;
  audience: Readonly<{ heading: string; description: string }>;
  pointOfView: Readonly<{ eyebrow: string; statement: string }>;
  finalCta: Readonly<{
    heading: string;
    description: string;
    primary: SiteLink;
    secondary: SiteLink;
  }>;
}>;

export interface ContentSource {
  getGlobalContent(): Promise<GlobalContent>;
  getHomeContent(): Promise<HomeContent>;
}
