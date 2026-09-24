import type { ReactNode } from "react";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import { EditorialHeroMedia } from "@/components/editorial-hero-media";
import type { ConversionPageContent } from "@/content/conversion";
import { editorialHeroImages } from "@/content/editorial-images";

const approvedEmail = "legal@kreativesparq.com";

function linkedEmail(text: string): ReactNode {
  const parts = text.split(approvedEmail);
  if (parts.length === 1) return text;

  return parts.flatMap((part, index) => [
    part,
    index < parts.length - 1 ? (
      <a key={`email-${index}`} href={`mailto:${approvedEmail}`}>
        {approvedEmail}
      </a>
    ) : null,
  ]);
}

export function LegalPage({ page }: { page: ConversionPageContent }) {
  const heading = page.fields.H1;
  const effectiveDate = page.fields["Effective date"];

  return (
    <main id="main-content" className="conversion-site" tabIndex={-1}>
      <section
        className="legal-hero editorial-image-hero"
        data-hero-tone="dark"
        aria-labelledby="legal-title"
      >
        <EditorialHeroMedia
          src={editorialHeroImages.legal}
          desktopPosition="85% 50%"
          mobilePosition="76% 50%"
        />
        <div className="ks-container">
          <EditorialBreadcrumb label={heading} path={page.fields.Route} />
          <p className="eyebrow">Effective {effectiveDate}</p>
          <h1 id="legal-title">{heading}</h1>
        </div>
      </section>

      <div className="legal-document">
        {page.sections.map((section, index) => (
          <section
            className="legal-section"
            aria-labelledby={`legal-section-${index}`}
            key={section.heading}
          >
            <div className="ks-container legal-section__grid">
              <p className="legal-section__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="legal-section__copy">
                <h2 id={`legal-section-${index}`}>{section.heading}</h2>
                {section.blocks.map((block, blockIndex) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={`${block.text}-${blockIndex}`}>
                        {linkedEmail(block.text)}
                      </p>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={`list-${blockIndex}`}>
                        {block.items.map((item) => (
                          <li key={item}>{linkedEmail(item)}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
