import type { ContentSource, FoundationContent, GlobalContent } from "./types";

const globalContent: GlobalContent = {
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  booking: { label: "Book a strategy call", href: "/book" },
  footerStatement: "Clear thinking. Strong creative. Marketing built to move.",
  footerDescription:
    "Kreative Sparq is a Nigerian marketing agency working with growing businesses, startups, established organisations, and diaspora-led teams.",
  footerGroups: [
    {
      heading: "Services",
      links: [
        { label: "Brand Strategy", href: "/services/brand-strategy" },
        { label: "Creative Design", href: "/services/creative-design" },
        {
          label: "Content & Social Media",
          href: "/services/content-social-media",
        },
        {
          label: "Performance Marketing",
          href: "/services/performance-marketing",
        },
        {
          label: "Web Design & Development",
          href: "/services/web-design-development",
        },
        {
          label: "Campaigns & Activations",
          href: "/services/campaigns-activations",
        },
      ],
    },
    {
      heading: "Agency",
      links: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Insights", href: "/insights" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Start",
      links: [
        { label: "Book a strategy call", href: "/book" },
        { label: "Start a project", href: "/start-a-project" },
      ],
    },
  ],
};

const foundationContent: FoundationContent = {
  eyebrow: "Marketing agency in Nigeria",
  heading: "Ideas that move people. Marketing that moves business.",
  description:
    "Kreative Sparq brings strategy, creative work, digital execution, and measurement into one clear plan. We help ambitious brands get noticed for the right reasons and turn that attention into action.",
};

export const localContentSource: ContentSource = {
  async getGlobalContent() {
    return globalContent;
  },
  async getFoundationContent() {
    return foundationContent;
  },
};
