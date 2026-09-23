import type { Metadata } from "next";
import { AvailabilityPanel } from "@/components/availability-panel";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import {
  conversionAvailability,
  getConversionField,
  getConversionParagraphs,
  getConversionSection,
  projectPage,
} from "@/content/conversion";
import "../editorial.css";
import "../conversion.css";

const page = projectPage;
const availability = conversionAvailability.project;

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

const steps = [
  "Step 1: About you",
  "Step 2: What you may need",
  "Step 3: The business question",
  "Step 4: Timing and budget",
  "Step 5: Review and send",
] as const;

export default function StartProjectPage() {
  const privacyNote = getConversionSection(page, "Privacy note");
  const outline = steps.map((name) => {
    const section = getConversionSection(page, name);
    const body = section.blocks.find(
      (block) =>
        block.type === "field" && ["Body", "Prompt"].includes(block.label),
    );
    return {
      title: getConversionField(section, "Heading"),
      body: body?.type === "field" ? body.text : "",
    };
  });

  return (
    <main id="main-content" className="conversion-site" tabIndex={-1}>
      <section className="conversion-hero" aria-labelledby="project-title">
        <div className="ks-container">
          <EditorialBreadcrumb
            label="Start a project"
            path="/start-a-project"
          />
          <div className="conversion-hero__grid">
            <div>
              <p className="eyebrow">Project brief</p>
              <h1 id="project-title">{page.fields.H1}</h1>
            </div>
            <div className="conversion-hero__aside">
              <p>{page.fields["Hero body"]}</p>
            </div>
          </div>
        </div>
      </section>

      <AvailabilityPanel
        label="Brief status"
        mark="00"
        heading={availability.heading}
        body={availability.body}
        link={{ href: "/services", label: "Explore services" }}
      />

      <section className="conversion-section" aria-labelledby="outline-title">
        <div className="ks-container">
          <p className="eyebrow">Brief outline</p>
          <h2 id="outline-title">What the project brief will cover.</h2>
          <ol className="project-outline">
            {outline.map((step, index) => (
              <li key={step.title}>
                <span className="project-outline__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                {step.body ? <p>{step.body}</p> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="conversion-section conversion-section--dark"
        aria-labelledby="project-privacy-title"
      >
        <div className="ks-container conversion-split">
          <p className="eyebrow">Privacy note</p>
          <div className="conversion-split__body">
            <h2 id="project-privacy-title">Share only what the work needs.</h2>
            {getConversionParagraphs(privacyNote).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
