import type { Metadata } from "next";
import { AvailabilityPanel } from "@/components/availability-panel";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import { sharedOpenGraphImage } from "@/content/metadata";
import { conversionAvailability, thankYouPage } from "@/content/conversion";
import "../editorial.css";
import "../conversion.css";

const page = thankYouPage;
const availability = conversionAvailability.thankYou;

export const metadata: Metadata = {
  title: "Submission Status | Kreative Sparq",
  description: availability.body,
  alternates: { canonical: page.fields.Route },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Submission Status | Kreative Sparq",
    description: availability.body,
    url: page.fields.Route,
    siteName: "Kreative Sparq",
    locale: "en_NG",
    type: "website",
    images: [sharedOpenGraphImage],
  },
};

export default function ThankYouPage() {
  return (
    <main id="main-content" className="conversion-site" tabIndex={-1}>
      <section className="legal-hero" aria-label="Submission status">
        <div className="ks-container">
          <EditorialBreadcrumb label="Submission status" path="/thank-you" />
          <p className="eyebrow">Confirmation status</p>
          <h1>Submission status</h1>
        </div>
      </section>

      <AvailabilityPanel
        className="thank-you-status"
        label="Confirmation"
        mark="—"
        heading={availability.heading}
        body={availability.body}
        link={{ href: "/", label: "Return home" }}
      />
    </main>
  );
}
