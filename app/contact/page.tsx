import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import { EditorialHeroMedia } from "@/components/editorial-hero-media";
import {
  contactPage,
  getConversionField,
  getConversionParagraphs,
  getConversionSection,
} from "@/content/conversion";
import { sharedOpenGraphImage } from "@/content/metadata";
import {
  editorialHeroImages,
  editorialSupportImages,
} from "@/content/editorial-images";
import "../editorial.css";
import "../conversion.css";

const page = contactPage;
const contactDetails = getConversionSection(page, "Contact details");
const email = getConversionField(contactDetails, "Email");

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

export default function ContactPage() {
  const next = getConversionSection(page, "What happens next?");
  const privacy = getConversionSection(page, "Email and privacy");
  const response = getConversionField(contactDetails, "Response expectation");
  const serviceArea = getConversionField(contactDetails, "Service area");

  return (
    <main id="main-content" className="conversion-site" tabIndex={-1}>
      <section
        className="conversion-hero editorial-image-hero"
        aria-labelledby="contact-title"
      >
        <EditorialHeroMedia src={editorialHeroImages.contact} />
        <div className="ks-container">
          <EditorialBreadcrumb label="Contact" path="/contact" />
          <div className="conversion-hero__grid">
            <div>
              <p className="eyebrow">Contact</p>
              <h1 id="contact-title">{page.fields.H1}</h1>
            </div>
            <div className="conversion-hero__aside">
              <p>{page.fields["Hero body"]}</p>
              <a className="button button--primary" href={`mailto:${email}`}>
                {page.fields["Primary CTA"]}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="contact-primary"
        aria-labelledby="contact-email-title"
      >
        <div className="ks-container contact-primary__grid">
          <div>
            <p className="eyebrow">Email</p>
            <h2 id="contact-email-title">Start a conversation.</h2>
          </div>
          <div className="contact-primary__details">
            <a className="contact-email" href={`mailto:${email}`}>
              {email}
            </a>
            <p>
              <strong>Response expectation</strong>
              {response}
            </p>
          </div>
        </div>
      </section>

      <section
        className="conversion-section"
        aria-labelledby="contact-next-title"
      >
        <div className="ks-container conversion-split">
          <div className="contact-next__intro">
            <p className="eyebrow">Service area</p>
            <h2>{serviceArea}</h2>
            <div className="contact-next__media">
              <Image
                src={editorialSupportImages.contact}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 767px) 100vw, 40vw"
                quality={80}
              />
            </div>
          </div>
          <div className="conversion-split__body">
            <p className="eyebrow">What happens next?</p>
            <h2 id="contact-next-title">
              A useful reply, within two business days.
            </h2>
            {getConversionParagraphs(next).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="conversion-section conversion-section--dark"
        aria-labelledby="contact-privacy-title"
      >
        <div className="ks-container conversion-split">
          <p className="eyebrow">Email and privacy</p>
          <div className="conversion-split__body">
            <h2 id="contact-privacy-title">Share only what the work needs.</h2>
            {getConversionParagraphs(privacy).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="home-text-link" href="/privacy">
              Read the Privacy Policy <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
