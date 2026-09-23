import type { ContentSource, GlobalContent, HomeContent } from "./types";

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
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
};

const homeContent: HomeContent = {
  hero: {
    eyebrow: "Marketing agency in Nigeria",
    heading: "Ideas that move people. Marketing that moves business.",
    description:
      "Kreative Sparq brings strategy, creative work, digital execution, and measurement into one clear plan. We help ambitious brands get noticed for the right reasons and turn that attention into action.",
    primary: { label: "Book a strategy call", href: "/book" },
    secondary: { label: "View our work", href: "/work" },
    note: "Brand strategy, creative design, content, media, websites, launches, and activations.",
  },
  capability: {
    heading: "Marketing works better when the pieces agree.",
    description:
      "A strong identity cannot fix a weak offer. More posts cannot fix an unclear message. Paid media cannot rescue a page that gives people no reason to act. We look at the whole path, find the part holding growth back, and build from there.",
  },
  services: {
    eyebrow: "What we do",
    heading: "The right work for the problem in front of you.",
    description:
      "Some clients need a sharper brand. Others need a reliable content system, a better website, stronger campaigns, or a team that can connect all of it. We shape the engagement around the outcome, not a fixed menu.",
    items: [
      {
        title: "Brand Strategy",
        description:
          "Get clear on your audience, position, message, and next move before spending money on execution.",
        link: {
          label: "Build a clearer brand",
          href: "/services/brand-strategy",
        },
        image: {
          src: "/images/home/service-brand-strategy.webp",
          alt: "Hand moving a terracotta chess piece on a dark green chessboard.",
          position: "50% 50%",
        },
      },
      {
        title: "Creative Design",
        description:
          "Create a visual system people can recognise and your team can use consistently across real marketing work.",
        link: {
          label: "Strengthen your visual identity",
          href: "/services/creative-design",
        },
        image: {
          src: "/images/home/service-creative-design.webp",
          alt: "Hands arranging forest-green and terracotta materials on a brand moodboard.",
          position: "50% 50%",
        },
      },
      {
        title: "Content & Social Media",
        description:
          "Replace scattered posting with useful content, a workable rhythm, and a voice that sounds like your brand.",
        link: {
          label: "Plan better content",
          href: "/services/content-social-media",
        },
        image: {
          src: "/images/home/service-content-social.webp",
          alt: "Woman checking a phone during a city photo walk, with a camera at her side.",
          position: "52% 46%",
        },
      },
      {
        title: "Performance Marketing",
        description:
          "Run paid campaigns with defined audiences, purposeful creative, sensible landing pages, and reporting tied to decisions.",
        link: {
          label: "Improve paid performance",
          href: "/services/performance-marketing",
        },
        image: {
          src: "/images/home/service-performance-marketing.webp",
          alt: "Person reviewing abstract charts on a laptop at a desk.",
          position: "50% 55%",
        },
      },
      {
        title: "Web Design & Development",
        description:
          "Build a fast, clear website that helps visitors understand the offer, trust the business, and take the next step.",
        link: {
          label: "Build a better website",
          href: "/services/web-design-development",
        },
        image: {
          src: "/images/home/service-web-experiences.webp",
          alt: "Editorial website layout displayed on a monitor in a plant-filled studio.",
          position: "50% 50%",
        },
      },
      {
        title: "Campaigns & Activations",
        description:
          "Plan launches and brand moments that hold together across digital channels, live experiences, and on-ground execution.",
        link: {
          label: "Plan a campaign",
          href: "/services/campaigns-activations",
        },
        image: {
          src: "/images/home/service-campaigns-activations.webp",
          alt: "Person walking near a terracotta-and-green outdoor installation.",
          position: "51% 50%",
        },
      },
    ],
  },
  work: {
    eyebrow: "Selected work",
    heading: "The thinking should be as clear as the result.",
    emptyState:
      "Our first public case studies are being prepared with client approval. In the meantime, tell us what you are working on and we can walk you through the most relevant capabilities.",
    action: { label: "Start a conversation", href: "/contact" },
  },
  why: {
    eyebrow: "Why clients choose us",
    heading: "Less theatre. More useful thinking and well-made work.",
    description:
      "We care about the idea, but we also care about what it takes to ship it. Strategy has to survive the budget. Design has to work outside the presentation. Reporting has to help someone make a decision.",
    principles: [
      {
        title: "We start with the business question",
        description:
          "Before choosing channels or deliverables, we define what needs to change and whose behaviour matters.",
      },
      {
        title: "We connect the work",
        description:
          "Your message, content, media, website, and campaign materials are planned as parts of the same job.",
      },
      {
        title: "We keep decisions visible",
        description:
          "You will know what is being made, who owns the next action, and how feedback affects the scope or schedule.",
      },
      {
        title: "We measure what can guide action",
        description:
          "We agree on useful indicators early and report them in plain language. Vanity numbers do not get to hide weak performance.",
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    heading: "A clear path from question to outcome.",
    steps: [
      {
        number: "01",
        title: "Discover",
        description:
          "We learn how the business works, what the audience needs, what has already been tried, and where the real constraint sits.",
      },
      {
        number: "02",
        title: "Decide",
        description:
          "We turn the findings into a focused plan: audience, message, channels, scope, success measures, owners, and timing.",
      },
      {
        number: "03",
        title: "Make",
        description:
          "Our team develops the creative and production work, with clear review points and enough context for useful feedback.",
      },
      {
        number: "04",
        title: "Improve",
        description:
          "We launch, observe what happens, and use the evidence to refine the work or decide what should happen next.",
      },
    ],
  },
  audience: {
    heading: "Built for teams with something worth growing.",
    description:
      "We work with Nigerian businesses, startups preparing to launch or enter a market, established organisations that need stronger execution, and diaspora-led teams looking for a capable partner in Nigeria. Our experience is especially relevant to professional services, technology, hospitality, education, nonprofits, churches, events, and consumer-facing brands.",
  },
  pointOfView: {
    eyebrow: "Our point of view",
    statement:
      "We do not begin with a list of deliverables. We begin with the business problem, decide what the audience needs to see or understand, then build the right mix of work around it.",
  },
  finalCta: {
    heading: "What are you trying to move?",
    description:
      "A launch, a brand, a campaign, a website, or the way your marketing team works. Give us the context and we will help you find the right starting point.",
    primary: { label: "Start a project", href: "/start-a-project" },
    secondary: { label: "Book a strategy call", href: "/book" },
  },
};

export const localContentSource: ContentSource = {
  async getGlobalContent() {
    return globalContent;
  },
  async getHomeContent() {
    return homeContent;
  },
};
