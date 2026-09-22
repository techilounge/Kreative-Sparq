import source from "./services.json";

export type ServiceBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "field"; label: string; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export type ServiceSection = {
  heading: string | null;
  blocks: ServiceBlock[];
};

export type ServicePageContent = {
  sourceHeading: string;
  fields: Record<string, string>;
  sections: ServiceSection[];
};

const serviceContent = source as {
  overview: ServicePageContent;
  details: ServicePageContent[];
};

export const servicesOverview = serviceContent.overview;
export const serviceDetails = serviceContent.details;
export const serviceSlugs = serviceDetails.map((page) =>
  page.fields.Route.split("/").at(-1)!,
);

export function getService(slug: string) {
  return serviceDetails.find(
    (page) => page.fields.Route === `/services/${slug}`,
  );
}

export function getServiceSection(page: ServicePageContent, heading: string) {
  const section = page.sections.find((item) => item.heading === heading);
  if (!section) throw new Error(`Missing approved service section: ${heading}`);
  return section;
}

export function getField(section: ServiceSection, label: string) {
  const field = section.blocks.find(
    (block) => block.type === "field" && block.label === label,
  );
  if (!field || field.type !== "field") {
    throw new Error(`Missing approved service field: ${label}`);
  }
  return field.text;
}

export function getItems(section: ServiceSection) {
  const items: {
    title: string;
    body: string;
    fields: Record<string, string>;
  }[] = [];
  for (const block of section.blocks) {
    if (block.type === "subheading") {
      items.push({ title: block.text, body: "", fields: {} });
    } else if (block.type === "paragraph" && items.length) {
      items.at(-1)!.body = block.text;
    } else if (block.type === "field" && items.length) {
      items.at(-1)!.fields[block.label] = block.text;
    }
  }
  return items;
}

export function getList(section: ServiceSection) {
  const list = section.blocks.find((block) => block.type === "list");
  if (!list || list.type !== "list") {
    throw new Error(`Missing approved service list: ${section.heading}`);
  }
  return list;
}
