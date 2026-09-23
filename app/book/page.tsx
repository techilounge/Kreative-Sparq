import type { Metadata } from "next";
import { AvailabilityPanel } from "@/components/availability-panel";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import {
  bookingPage,
  conversionAvailability,
  getConversionList,
  getConversionParagraphs,
  getConversionSection,
} from "@/content/conversion";
import "../editorial.css";
import "../conversion.css";

const page = bookingPage;
const availability = conversionAvailability.booking;

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
  },
};

export default function BookPage() {
  const callCovers = getConversionSection(page, "What the call covers");
  const notes = ["Who should join", "What to bring", "Booking reassurance"].map(
    (heading) => ({
      heading,
      body: getConversionParagraphs(getConversionSection(page, heading))[0],
    }),
  );

  return (
    <main id="main-content" className="conversion-site" tabIndex={-1}>
      <section className="conversion-hero" aria-labelledby="booking-title">
        <div className="ks-container">
          <EditorialBreadcrumb label="Book a call" path="/book" />
          <div className="conversion-hero__grid">
            <div>
              <p className="eyebrow">Strategy call</p>
              <h1 id="booking-title">{page.fields.H1}</h1>
            </div>
            <div className="conversion-hero__aside">
              <p>{page.fields["Hero body"]}</p>
            </div>
          </div>
        </div>
      </section>

      <AvailabilityPanel
        label="Calendar status"
        mark="30"
        heading={availability.heading}
        body={availability.body}
        link={{ href: "/services", label: "Explore services" }}
      />

      <section
        className="conversion-section conversion-section--dark"
        aria-labelledby="call-covers-title"
      >
        <div className="ks-container">
          <p className="eyebrow">The conversation</p>
          <h2 id="call-covers-title">What the call covers</h2>
          <ul className="conversion-list">
            {getConversionList(callCovers).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="conversion-section" aria-label="Call preparation">
        <div className="ks-container booking-notes">
          {notes.map((note) => (
            <article className="booking-note" key={note.heading}>
              <h3>{note.heading}</h3>
              <p>{note.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
