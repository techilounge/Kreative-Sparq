import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourcePath = join(root, "Kreative_Sparq_Website_Copy_Claude_Code.md");
const outputPath = join(root, "content", "services.json");
const source = readFileSync(sourcePath, "utf8").replaceAll("\r\n", "\n");
const chapterMatches = [
  ...source.matchAll(/^## (\d+)\. (Services overview|Service page: .+)$/gm),
];
const chapters = chapterMatches
  .filter((match) => Number(match[1]) >= 7 && Number(match[1]) <= 13)
  .map((match, index, matches) => ({
    title: match[2],
    text: source.slice(
      match.index + match[0].length,
      matches[index + 1]?.index ?? source.indexOf("\n## 14.", match.index),
    ),
  }));

if (chapters.length !== 7) {
  throw new Error(`Expected seven services chapters, found ${chapters.length}`);
}

function plain(value) {
  return value
    .replaceAll(/\*\*(.*?)\*\*/g, "$1")
    .replaceAll(/`(.*?)`/g, "$1")
    .trim();
}

function parseChapter(chapter) {
  const page = { sourceHeading: chapter.title, fields: {}, sections: [] };
  let section = { heading: null, blocks: [] };
  let list = null;

  function flushList() {
    if (list) section.blocks.push(list);
    list = null;
  }
  function flushSection() {
    flushList();
    if (section.heading || section.blocks.length) page.sections.push(section);
  }

  for (const rawLine of chapter.text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line === "---") {
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushSection();
      section = { heading: plain(line.slice(4)), blocks: [] };
      continue;
    }
    if (line.startsWith("#### ")) {
      flushList();
      section.blocks.push({ type: "subheading", text: plain(line.slice(5)) });
      continue;
    }
    const field = line.match(/^\*\*([^*]+):\*\*\s*(.*)$/);
    if (field) {
      flushList();
      const target = section.heading ? section.blocks : page.fields;
      if (Array.isArray(target))
        target.push({ type: "field", label: field[1], text: plain(field[2]) });
      else target[field[1]] = plain(field[2]);
      continue;
    }
    const bullet = line.match(/^(?:- |(\d+)\. )(.*)$/);
    if (bullet) {
      const ordered = Boolean(bullet[1]);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { type: "list", ordered, items: [] };
      }
      list.items.push(plain(bullet[2]));
      continue;
    }
    flushList();
    section.blocks.push({ type: "paragraph", text: plain(line) });
  }
  flushSection();
  return page;
}

const result = {
  overview: parseChapter(chapters[0]),
  details: chapters.slice(1).map(parseChapter),
};
const output = `${JSON.stringify(result, null, 2)}\n`;

if (process.argv.includes("--check")) {
  if (readFileSync(outputPath, "utf8") !== output) {
    throw new Error(
      "content/services.json is out of date with the approved copy deck",
    );
  }
  process.stdout.write("Services content matches the approved copy deck.\n");
} else {
  writeFileSync(outputPath, output);
  process.stdout.write(`Wrote ${outputPath}\n`);
}
