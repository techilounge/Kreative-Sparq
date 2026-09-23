import source from "./conversion.json";

export type ConversionBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "field"; label: string; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export type ConversionSection = {
  heading: string | null;
  blocks: ConversionBlock[];
};

export type ConversionPageContent = {
  sourceHeading: string;
  fields: Record<string, string>;
  sections: ConversionSection[];
};

const conversion = source as {
  contact: ConversionPageContent;
  project: ConversionPageContent;
  booking: ConversionPageContent;
  thankYou: ConversionPageContent;
  privacy: ConversionPageContent;
  terms: ConversionPageContent;
};

export const contactPage = conversion.contact;
export const projectPage = conversion.project;
export const bookingPage = conversion.booking;
export const thankYouPage = conversion.thankYou;
export const privacyPage = conversion.privacy;
export const termsPage = conversion.terms;

export const conversionAvailability = {
  contact: {
    heading: "Online inquiries are not available yet.",
    body: "A monitored destination, verified public contact details, and an approved response window must be in place before the inquiry form can open.",
  },
  project: {
    heading: "Project brief submissions are not available yet.",
    body: "The brief will open after its budget choices, monitored destination, privacy handling, spam protection, and response process are approved.",
  },
  booking: {
    heading: "Online booking is not available yet.",
    body: "Available times will appear here after the approved 30-minute booking calendar and its privacy settings are connected.",
  },
  thankYou: {
    heading: "No submission has been recorded.",
    body: "A confirmation appears only after a configured inquiry, project brief, or booking succeeds. Opening this page directly does not submit information.",
  },
  privacy: {
    heading: "The privacy policy is in review.",
    body: "It will be published after the legal business details, actual data flows, providers, retention periods, rights process, and applicable legal grounds are confirmed and reviewed.",
    currentHeading: "Current review-build behavior",
    currentBody:
      "This review build does not accept contact or project submissions, load a booking embed, or enable analytics or marketing pixels. A visitor's colour-theme choice is stored on their device.",
  },
  terms: {
    heading: "The terms of use are in review.",
    body: "They will be published after the legal entity, site features, liability position, governing law, dispute process, and effective date are confirmed and reviewed.",
    currentHeading: "Current review-build scope",
    currentBody:
      "The site currently provides marketing information and clearly labelled availability states. No online inquiry, project submission, booking, newsletter, payment, or client-service transaction is active.",
  },
} as const;

export function getConversionSection(
  page: ConversionPageContent,
  heading: string,
) {
  const section = page.sections.find((item) => item.heading === heading);
  if (!section)
    throw new Error(`Missing approved conversion section: ${heading}`);
  return section;
}

export function getConversionField(section: ConversionSection, label: string) {
  const field = section.blocks.find(
    (block) => block.type === "field" && block.label === label,
  );
  if (!field || field.type !== "field") {
    throw new Error(`Missing approved conversion field: ${label}`);
  }
  return field.text;
}

export function getConversionParagraphs(section: ConversionSection) {
  return section.blocks
    .filter((block) => block.type === "paragraph")
    .map((block) => block.text);
}

export function getConversionList(section: ConversionSection) {
  const list = section.blocks.find((block) => block.type === "list");
  if (!list || list.type !== "list") {
    throw new Error(`Missing approved conversion list: ${section.heading}`);
  }
  return list.items;
}

export function getLegalHeading(page: ConversionPageContent) {
  const heading = page.sections.find((section) =>
    section.heading?.startsWith("H1:"),
  )?.heading;
  if (!heading) throw new Error(`Missing legal H1 for ${page.sourceHeading}`);
  return heading.replace(/^H1:\s*/, "");
}
