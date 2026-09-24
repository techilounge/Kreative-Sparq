export const editorialHeroImages = {
  services: "/images/editorial/services-overview-hero.webp",
  work: "/images/editorial/work-hero.webp",
  about: "/images/editorial/about-hero.webp",
  insights: "/images/editorial/insights-hero.webp",
  contact: "/images/editorial/contact-hero.webp",
  legal: "/images/editorial/legal-shared-hero.webp",
} as const;

export const editorialSupportImages = {
  work: "/images/editorial/work-process-support.webp",
  about: "/images/editorial/about-relationship-support.webp",
  insights: "/images/editorial/insights-notes-support.webp",
  contact: "/images/editorial/contact-collaboration-support.webp",
} as const;

export const contentSocialImage = {
  src: "/images/editorial/service-content-social-v2.webp",
  alt: "A fictional creative team producing campaign photography with a camera, set styling, and live image review.",
  position: "72% 50%",
} as const;

export const serviceHeroPositions: Record<
  string,
  { desktop: string; mobile: string }
> = {
  "brand-strategy": { desktop: "78% 50%", mobile: "68% 50%" },
  "creative-design": { desktop: "78% 50%", mobile: "68% 50%" },
  "content-social-media": { desktop: "72% 50%", mobile: "70% 50%" },
  "performance-marketing": { desktop: "78% 55%", mobile: "68% 52%" },
  "web-design-development": { desktop: "78% 50%", mobile: "68% 50%" },
  "campaigns-activations": { desktop: "76% 50%", mobile: "68% 50%" },
};
