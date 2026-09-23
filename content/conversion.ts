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
  privacy: ConversionPageContent;
  terms: ConversionPageContent;
};

export const contactPage = conversion.contact;
export const privacyPage = conversion.privacy;
export const termsPage = conversion.terms;

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
