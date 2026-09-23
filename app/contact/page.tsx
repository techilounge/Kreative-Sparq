import type { Metadata } from "next";
import { AvailabilityPanel } from "@/components/availability-panel";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import { HomeTextLink } from "@/components/home-text-link";
import { sharedOpenGraphImage } from "@/content/metadata";
import {
  contactPage,
  conversionAvailability,
  getConversionField,
  getConversionParagraphs,
  getConversionSection,
} from "@/content/conversion";
import "../editorial.css";
import "../conversion.css";

const page = contactPage;
const availability = conversionAvailability.contact;

export const metadata: Metadata = {
  title: page.fields["SEO title"],
  description: availability.body,
  alternates: { canonical: page.fields.Route },
  robots: { index: false, follow: true },
  openGraph: {
    title: page.fields["SEO title"],
    description: availability.body,
    url: page.fields.Route,
    siteName: "Kreative Sparq",
    locale: "en_NG",
    type: "website",
    images: [sharedOpenGraphImage],
  },
};

export default function ContactPage() {
  const details = getConversionSection(page, "Contact details");
  const serviceArea = getConversionParagraphs(details).find((paragraph) =>
    paragraph.startsWith("Based in Nigeria"),
  );
  const reassurance = getConversionSection(page, "Contact reassurance");

  if (!serviceArea) throw new Error("Missing approved contact service area");

  return (
    <main id="main-content" className="conversion-site" tabIndex={-1}>
      <section className="conversion-hero" aria-labelledby="contact-title">
        <div className="ks-container">
          <EditorialBreadcrumb label="Contact" path="/contact" />
          <div className="conversion-hero__grid">
            <div>
              <p className="eyebrow">Contact</p>
              <h1 id="contact-title">{page.fields.H1}</h1>
            </div>
            <div className="conversion-hero__aside">
              <p>{page.fields["Hero body"]}</p>
              <HomeTextLink
                href="/book"
                label={page.fields["Alternative CTA"]}
              />
            </div>
          </div>
        </div>
      </section>

      <AvailabilityPanel
        label="Contact status"
        mark="00"
        heading={availability.heading}
        body={availability.body}
        link={{ href: "/services", label: "Explore services" }}
      />

      <section className="conversion-section" aria-labelledby="next-title">
        <div className="ks-container conversion-split">
          <div>
            <p className="eyebrow">Service area</p>
            <h2>{serviceArea}</h2>
          </div>
          <div className="conversion-split__body">
            <p className="eyebrow">Contact reassurance</p>
            <h2 id="next-title">
              {getConversionField(reassurance, "Heading")}
            </h2>
            <p>{getConversionField(reassurance, "Body")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
