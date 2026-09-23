import Image from "next/image";
import Link from "next/link";
import { HomeTextLink } from "@/components/home-text-link";
import {
  getField,
  getItems,
  getList,
  type ServiceSection,
} from "@/content/services";

export type ServiceImage = {
  src: string;
  alt: string;
  position: string;
};

const serviceRoutes: Record<string, string> = {
  "Brand Strategy": "/services/brand-strategy",
  "Creative Design": "/services/creative-design",
  "Content & Social Media": "/services/content-social-media",
  "Performance Marketing": "/services/performance-marketing",
  "Web Design & Development": "/services/web-design-development",
  "Campaigns & Activations": "/services/campaigns-activations",
};

function ctaHref(label: string) {
  if (/work/i.test(label)) return "/work";
  if (/services/i.test(label)) return "/services";
  return "/contact";
}

export function ServiceActions({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  const primaryHref = ctaHref(primary);
  const secondaryHref = ctaHref(secondary);

  return (
    <div className="services-actions">
      <Link className="button button--primary" href={primaryHref}>
        {primary}
      </Link>
      {secondaryHref !== primaryHref ? (
        <HomeTextLink href={secondaryHref} label={secondary} />
      ) : null}
    </div>
  );
}

export function ServicePhoto({
  image,
  sizes,
  className = "",
  preload = false,
}: {
  image: ServiceImage;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div className={`services-photo ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={800}
        height={1000}
        sizes={sizes}
        style={{ objectPosition: image.position }}
        preload={preload}
      />
    </div>
  );
}

export function ServiceSectionIntro({
  section,
  id,
}: {
  section: ServiceSection;
  id: string;
}) {
  const heading = getField(section, "Heading");
  const body = getField(section, "Body");
  const paragraph = section.blocks.find((block) => block.type === "paragraph");
  const list = section.blocks.find((block) => block.type === "list");
  return (
    <section
      className="services-chapter services-chapter--intro"
      aria-labelledby={id}
    >
      <div className="ks-container services-chapter__split">
        <div>
          <p className="eyebrow">{section.heading}</p>
          <h2 id={id}>{heading}</h2>
        </div>
        <div className="services-chapter__body">
          <p className="services-lead">{body}</p>
          {paragraph?.type === "paragraph" && <p>{paragraph.text}</p>}
          {list?.type === "list" && (
            <ul className="services-checklist">
              {list.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export function ServiceItemChapter({
  section,
  id,
  mode,
}: {
  section: ServiceSection;
  id: string;
  mode: "capabilities" | "process";
}) {
  const items = getItems(section);
  const List = mode === "process" ? "ol" : "ul";
  return (
    <section
      className={`services-chapter services-chapter--${mode}`}
      aria-labelledby={id}
    >
      <div className="ks-container">
        <h2 id={id}>{section.heading}</h2>
        <List className={`services-items services-items--${mode}`}>
          {items.map((item, index) => (
            <li key={item.title}>
              <span className="services-items__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </List>
      </div>
    </section>
  );
}

export function ServiceListChapter({
  section,
  id,
  kind,
}: {
  section: ServiceSection;
  id: string;
  kind: "deliverables" | "checklist" | "types";
}) {
  const list = getList(section);
  const trailing = section.blocks.find((block) => block.type === "paragraph");
  const List = list.ordered ? "ol" : "ul";
  return (
    <section
      className={`services-chapter services-chapter--${kind}`}
      aria-labelledby={id}
    >
      <div className="ks-container services-chapter__split">
        <div>
          <h2 id={id}>{section.heading}</h2>
        </div>
        <div className="services-chapter__body">
          <List className="services-checklist">
            {list.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </List>
          {trailing?.type === "paragraph" && <p>{trailing.text}</p>}
        </div>
      </div>
    </section>
  );
}

export function ServiceStatement({
  section,
  id,
}: {
  section: ServiceSection;
  id: string;
}) {
  const paragraphs = section.blocks.filter(
    (block) => block.type === "paragraph",
  );
  const ordered = section.blocks.find((block) => block.type === "list");
  return (
    <section
      className="services-chapter services-chapter--statement"
      aria-labelledby={id}
    >
      <div className="ks-container services-chapter__split">
        <h2 id={id}>{section.heading}</h2>
        <div className="services-chapter__body">
          {paragraphs.map(
            (paragraph) =>
              paragraph.type === "paragraph" && (
                <p key={paragraph.text}>{paragraph.text}</p>
              ),
          )}
          {ordered?.type === "list" && (
            <ol className="services-statement-list">
              {ordered.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

export function ServiceFaq({
  section,
  id,
}: {
  section: ServiceSection;
  id: string;
}) {
  return (
    <section
      className="services-chapter services-chapter--faq"
      aria-labelledby={id}
    >
      <div className="ks-container services-chapter__split">
        <div>
          <h2 id={id}>{section.heading}</h2>
        </div>
        <div className="services-faq-list">
          {getItems(section).map((item) => (
            <details key={item.title}>
              <summary>
                {item.title}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceRelated({
  section,
  id,
  currentRoute,
}: {
  section: ServiceSection;
  id: string;
  currentRoute: string;
}) {
  const items = getList(section).items;
  return (
    <section
      className="services-chapter services-chapter--related"
      aria-labelledby={id}
    >
      <div className="ks-container">
        <div className="services-related-heading">
          <h2 id={id}>{section.heading}</h2>
          <HomeTextLink href="/services" label="Services" />
        </div>
        <ul className="services-related-list">
          {items.map((item) => {
            const route = serviceRoutes[item];
            if (!route || route === currentRoute)
              throw new Error(`Invalid related service: ${item}`);
            return (
              <li key={item}>
                <HomeTextLink href={route} label={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ServiceClosing({
  section,
  id,
}: {
  section: ServiceSection;
  id: string;
}) {
  return (
    <section className="services-closing" aria-labelledby={id}>
      <div className="ks-container services-closing__inner">
        <div>
          <h2 id={id}>{getField(section, "Heading")}</h2>
          <p>{getField(section, "Body")}</p>
        </div>
        <ServiceActions
          primary={getField(section, "Primary CTA")}
          secondary={getField(section, "Secondary CTA")}
        />
      </div>
    </section>
  );
}
