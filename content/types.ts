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
  booking: SiteLink;
  footerStatement: string;
  footerDescription: string;
  footerGroups: readonly FooterGroup[];
}>;

export type FoundationContent = Readonly<{
  eyebrow: string;
  heading: string;
  description: string;
}>;

export interface ContentSource {
  getGlobalContent(): Promise<GlobalContent>;
  getFoundationContent(): Promise<FoundationContent>;
}
