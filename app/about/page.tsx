import type { Metadata } from "next";
import Link from "next/link";
import { HomeTextLink } from "@/components/home-text-link";
import { sharedOpenGraphImage } from "@/content/metadata";
import {
  aboutPage,
  getEditorialField,
  getEditorialItems,
  getEditorialList,
  getEditorialParagraphs,
  getEditorialSection,
} from "@/content/editorial";
import "../editorial.css";

const page = aboutPage;

export const metadata: Metadata = {
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

export default function AboutPage() {
  const pointOfView = getEditorialSection(page, "Our point of view");
  const beliefs = getEditorialItems(
    getEditorialSection(page, "What we believe"),
  );
  const audience = getEditorialSection(page, "Who we work with");
  const relationship = getEditorialSection(page, "How the relationship works");
  const serviceArea = getEditorialSection(page, "Service area");
  const closing = getEditorialSection(page, "CTA");

  return (
    <main id="main-content" className="editorial-site about-page" tabIndex={-1}>
      <section className="about-hero" aria-labelledby="about-title">
        <div className="ks-container about-hero__inner">
          <div className="about-hero__number" aria-hidden="true">
            About / 01
          </div>
          <div className="about-hero__copy">
            <p className="eyebrow">About Kreative Sparq</p>
            <h1 id="about-title">{page.fields.H1}</h1>
            <p className="about-hero__body">{page.fields["Hero body"]}</p>
            <div className="editorial-actions">
              <Link className="button button--primary" href="/services">
                {page.fields["Primary CTA"]}
              </Link>
              <HomeTextLink
                href="/contact"
                label={page.fields["Secondary CTA"]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about-view" aria-labelledby="about-view-title">
        <div className="ks-container about-view__grid">
          <div>
            <p className="eyebrow">Our point of view</p>
            <h2 id="about-view-title">
              {getEditorialField(pointOfView, "Heading")}
            </h2>
          </div>
          <div className="about-view__body">
            <p>{getEditorialField(pointOfView, "Body")}</p>
            {getEditorialParagraphs(pointOfView).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-beliefs" aria-labelledby="beliefs-title">
        <div className="ks-container">
          <h2 id="beliefs-title">What we believe</h2>
          <ol className="about-beliefs__list">
            {beliefs.map((belief, index) => (
              <li key={belief.title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{belief.title}</h3>
                <p>{belief.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-audience" aria-labelledby="audience-title">
        <div className="ks-container about-audience__grid">
          <p className="eyebrow">Who we work with</p>
          <div>
            <h2 id="audience-title">
              {getEditorialField(audience, "Heading")}
            </h2>
            <p>{getEditorialField(audience, "Body")}</p>
            <HomeTextLink href="/work" label="View our work" />
          </div>
        </div>
      </section>

      <section
        className="about-relationship"
        aria-labelledby="relationship-title"
      >
        <div className="ks-container about-relationship__grid">
          <h2 id="relationship-title">How the relationship works</h2>
          <ul>
            {getEditorialList(relationship).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="about-service-area"
        aria-labelledby="service-area-title"
      >
        <div className="ks-container about-service-area__grid">
          <p className="eyebrow">Service area</p>
          <div>
            <h2 id="service-area-title">
              {getEditorialField(serviceArea, "Heading")}
            </h2>
            <p>{getEditorialField(serviceArea, "Body")}</p>
          </div>
        </div>
      </section>

      <section
        className="editorial-closing"
        aria-labelledby="about-closing-title"
      >
        <div className="ks-container editorial-closing__grid">
          <h2 id="about-closing-title">
            {getEditorialField(closing, "Heading")}
          </h2>
          <div>
            <p>{getEditorialField(closing, "Body")}</p>
            <div className="editorial-actions">
              <Link className="button button--primary" href="/contact">
                {getEditorialField(closing, "Primary CTA")}
              </Link>
              <HomeTextLink
                href="/services"
                label={getEditorialField(closing, "Secondary CTA")}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
