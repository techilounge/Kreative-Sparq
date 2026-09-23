import source from "./editorial.json";

export type EditorialBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "field"; label: string; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export type EditorialSection = {
  heading: string | null;
  blocks: EditorialBlock[];
};

export type EditorialPageContent = {
  sourceHeading: string;
  fields: Record<string, string>;
  sections: EditorialSection[];
};

const editorial = source as {
  work: EditorialPageContent;
  about: EditorialPageContent;
  insights: EditorialPageContent;
};

export const workPage = editorial.work;
export const aboutPage = editorial.about;
export const insightsPage = editorial.insights;

export function getEditorialSection(
  page: EditorialPageContent,
  heading: string,
) {
  const section = page.sections.find((item) => item.heading === heading);
  if (!section)
    throw new Error(`Missing approved editorial section: ${heading}`);
  return section;
}

export function getEditorialField(section: EditorialSection, label: string) {
  const field = section.blocks.find(
    (block) => block.type === "field" && block.label === label,
  );
  if (!field || field.type !== "field") {
    throw new Error(`Missing approved editorial field: ${label}`);
  }
  return field.text;
}

export function getEditorialParagraphs(section: EditorialSection) {
  return section.blocks
    .filter((block) => block.type === "paragraph")
    .map((block) => block.text);
}

export function getEditorialList(section: EditorialSection) {
  const list = section.blocks.find((block) => block.type === "list");
  if (!list || list.type !== "list") {
    throw new Error(`Missing approved editorial list: ${section.heading}`);
  }
  return list.items;
}

export function getEditorialItems(section: EditorialSection) {
  const items: { title: string; body: string }[] = [];
  for (const block of section.blocks) {
    if (block.type === "subheading") {
      items.push({ title: block.text, body: "" });
    } else if (block.type === "paragraph" && items.length) {
      items.at(-1)!.body = block.text;
    }
  }
  return items;
}
