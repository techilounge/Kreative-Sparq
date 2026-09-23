import type { Metadata } from "next";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import { sharedOpenGraphImage } from "@/content/metadata";
import {
  conversionAvailability,
  getLegalHeading,
  termsPage,
} from "@/content/conversion";
import "../editorial.css";
import "../conversion.css";

const page = termsPage;
const availability = conversionAvailability.terms;
const heading = getLegalHeading(page);

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

export default function TermsPage() {
  return (
    <main id="main-content" className="conversion-site" tabIndex={-1}>
      <section className="legal-hero" aria-labelledby="terms-title">
        <div className="ks-container">
          <EditorialBreadcrumb label={heading} path="/terms" />
          <p className="eyebrow">Legal publication status</p>
          <h1 id="terms-title">{heading}</h1>
        </div>
      </section>

      <section className="legal-status" aria-labelledby="terms-status-title">
        <div className="ks-container legal-status__grid">
          <p className="eyebrow">Publication status</p>
          <div className="legal-status__copy">
            <h2 id="terms-status-title">{availability.heading}</h2>
            <p>{availability.body}</p>
          </div>
        </div>
      </section>

      <section className="legal-current" aria-labelledby="terms-current-title">
        <div className="ks-container conversion-split">
          <p className="eyebrow">Current scope</p>
          <div className="conversion-split__body">
            <h2 id="terms-current-title">{availability.currentHeading}</h2>
            <p>{availability.currentBody}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
