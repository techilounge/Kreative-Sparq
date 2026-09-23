import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeTextLink } from "@/components/home-text-link";
import {
  ServiceActions,
  ServiceClosing,
} from "@/components/service-page-parts";
import { content } from "@/content";
import {
  getField,
  getItems,
  getList,
  getServiceSection,
  servicesOverview,
} from "@/content/services";
import { sharedOpenGraphImage } from "@/content/metadata";
import "./services.css";

const page = servicesOverview;
export const metadata: Metadata = {
  title: page.fields["SEO title"],
  description: page.fields["Meta description"],
  alternates: { canonical: page.fields.Route },
  openGraph: {
    title: page.fields["SEO title"],
    description: page.fields["Meta description"],
    url: page.fields.Route,
    siteName: "Kreative Sparq",
    locale: "en_NG",
    type: "website",
    images: [sharedOpenGraphImage],
  },
};

export default async function ServicesOverview() {
  const home = await content.getHomeContent();
  const finder = getServiceSection(page, "Service finder");
  const finderProblems = getList(finder).items;
  const services = getItems(getServiceSection(page, "Services"));
  const engagements = getItems(getServiceSection(page, "Engagement options"));
  const closing = getServiceSection(page, "Services CTA");
  if (
    finderProblems.length !== services.length ||
    services.length !== home.services.items.length
  ) {
    throw new Error(
      "Approved service finder, overview, and imagery must each have six entries",
    );
  }

  return (
    <main
      id="main-content"
      className="services-site services-overview"
      tabIndex={-1}
    >
      <section
        className="services-overview-hero"
        aria-labelledby="services-title"
      >
        <div className="ks-container services-overview-hero__inner">
          <div>
            <p className="eyebrow">Services</p>
            <h1 id="services-title">{page.fields.H1}</h1>
          </div>
          <div className="services-overview-hero__aside">
            <p>{page.fields["Hero body"]}</p>
            <ServiceActions
              primary={page.fields["Primary CTA"]}
              secondary={page.fields["Secondary CTA"]}
            />
          </div>
        </div>
      </section>

      <section className="services-finder" aria-labelledby="finder-title">
        <div className="ks-container">
          <h2 id="finder-title">{getField(finder, "Heading")}</h2>
          <ol className="services-finder__list">
            {finderProblems.map((problem, index) => {
              const match = problem.match(/^(.*?\.) (Start with .+\.)$/);
              if (!match)
                throw new Error(
                  `Unrecognised approved finder wording: ${problem}`,
                );
              return (
                <li key={problem}>
                  <Link href={home.services.items[index].link.href}>
                    <span
                      className="services-finder__number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="services-finder__question">
                      {match[1]}
                    </span>
                    <span className="services-finder__answer">
                      {match[2]} <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="services-catalogue" aria-labelledby="catalogue-title">
        <div className="ks-container">
          <h2 id="catalogue-title">Services</h2>
          <ol className="services-catalogue__list">
            {services.map((service, index) => {
              const image = home.services.items[index].image;
              const href = home.services.items[index].link.href;
              return (
                <li className="services-catalogue__item" key={service.title}>
                  <div className="services-catalogue__media">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={1000}
                      sizes="(max-width: 399px) 36vw, (max-width: 767px) 38vw, (max-width: 1023px) 42vw, 27vw"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                  <div className="services-catalogue__copy">
                    <span
                      className="services-catalogue__number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                    <p className="services-catalogue__best">
                      <strong>Best for:</strong> {service.fields["Best for"]}
                    </p>
                    <HomeTextLink href={href} label={service.fields.Link} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        className="services-engagements"
        aria-labelledby="engagements-title"
      >
        <div className="ks-container">
          <h2 id="engagements-title">
            {getField(getServiceSection(page, "Engagement options"), "Heading")}
          </h2>
          <div className="services-engagements__grid">
            {engagements.map((engagement) => (
              <article key={engagement.title}>
                <h3>{engagement.title}</h3>
                <p>{engagement.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceClosing section={closing} id="services-closing-title" />
    </main>
  );
}
