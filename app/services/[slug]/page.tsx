import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ServiceActions,
  ServiceClosing,
  ServiceFaq,
  ServiceItemChapter,
  ServiceListChapter,
  ServicePhoto,
  ServiceRelated,
  ServiceSectionIntro,
  ServiceStatement,
} from "@/components/service-page-parts";
import { content } from "@/content";
import { sharedOpenGraphImage } from "@/content/metadata";
import {
  getService,
  serviceSlugs,
  type ServiceSection,
} from "@/content/services";
import "../services.css";

type ServiceProps = { params: Promise<{ slug: string }> };
const publicOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreativesparq.com"
).replace(/\/$/, "");

const processHeadings = new Set([
  "How the work moves",
  "The design process",
  "A practical monthly rhythm",
  "How we protect the idea",
]);

const deliverableHeadings = new Set([
  "Typical deliverables",
  "What you receive",
]);
const typeHeadings = new Set(["Website types", "Campaign types"]);

function chapter(section: ServiceSection, id: string, route: string) {
  if (section.heading === "FAQs")
    return <ServiceFaq key={id} section={section} id={id} />;
  if (section.heading === "Related services")
    return (
      <ServiceRelated key={id} section={section} id={id} currentRoute={route} />
    );
  if (section.heading === "CTA")
    return <ServiceClosing key={id} section={section} id={id} />;
  if (
    section.blocks.some(
      (block) => block.type === "field" && block.label === "Heading",
    )
  ) {
    return <ServiceSectionIntro key={id} section={section} id={id} />;
  }
  if (section.blocks.some((block) => block.type === "subheading")) {
    return (
      <ServiceItemChapter
        key={id}
        section={section}
        id={id}
        mode={
          processHeadings.has(section.heading ?? "")
            ? "process"
            : "capabilities"
        }
      />
    );
  }
  if (section.blocks.length && section.blocks[0].type === "list") {
    const kind = deliverableHeadings.has(section.heading ?? "")
      ? "deliverables"
      : typeHeadings.has(section.heading ?? "")
        ? "types"
        : "checklist";
    return (
      <ServiceListChapter key={id} section={section} id={id} kind={kind} />
    );
  }
  return <ServiceStatement key={id} section={section} id={id} />;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServiceProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) notFound();
  return {
    title: page.fields["SEO title"],
    description: page.fields["Meta description"],
    alternates: { canonical: page.fields.Route },
    openGraph: {
      title: page.fields["Open Graph title"],
      description: page.fields["Meta description"],
      url: page.fields.Route,
      siteName: "Kreative Sparq",
      locale: "en_NG",
      type: "website",
      images: [sharedOpenGraphImage],
    },
  };
}

export default async function ServiceDetail({ params }: ServiceProps) {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) notFound();
  const home = await content.getHomeContent();
  const service = home.services.items.find(
    (item) => item.link.href === page.fields.Route,
  );
  if (!service) throw new Error(`Missing approved service image for ${slug}`);
  const name = page.sourceHeading.replace("Service page: ", "");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: publicOrigin },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${publicOrigin}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name,
          item: `${publicOrigin}${page.fields.Route}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      serviceType: name,
      description: page.fields["Hero body"],
      url: `${publicOrigin}${page.fields.Route}`,
      provider: {
        "@type": "Organization",
        name: "Kreative Sparq",
        url: publicOrigin,
      },
    },
  ];

  return (
    <main
      id="main-content"
      className={`services-site service-detail service-detail--${slug}`}
      tabIndex={-1}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
      <section className="service-detail-hero" aria-labelledby="service-title">
        <div className="ks-container service-detail-hero__inner">
          <div className="service-detail-hero__copy">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href="/services">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{name}</span>
            </nav>
            <p className="eyebrow">{name}</p>
            <h1 id="service-title">{page.fields.H1}</h1>
            <p className="service-detail-hero__lead">
              {page.fields["Hero body"]}
            </p>
            <ServiceActions
              primary={page.fields["Primary CTA"]}
              secondary={page.fields["Secondary CTA"]}
            />
          </div>
          <ServicePhoto
            image={service.image}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 48vw, 42vw"
            className="service-detail-hero__photo"
            preload
          />
        </div>
      </section>
      {page.sections.map((section, index) =>
        chapter(section, `service-section-${index}`, page.fields.Route),
      )}
    </main>
  );
}
