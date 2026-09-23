import type { Metadata } from "next";
import Link from "next/link";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import { HomeTextLink } from "@/components/home-text-link";
import {
  getEditorialField,
  getEditorialParagraphs,
  getEditorialSection,
  workPage,
} from "@/content/editorial";
import "../editorial.css";

const page = workPage;

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
  },
};

export default function WorkPage() {
  const empty = getEditorialSection(page, "Empty state");
  const results = getEditorialSection(page, "Results note");
  const closing = getEditorialSection(page, "CTA");

  return (
    <main id="main-content" className="editorial-site work-page" tabIndex={-1}>
      <section className="work-hero" aria-labelledby="work-title">
        <div className="ks-container">
          <EditorialBreadcrumb label="Work" path="/work" />
          <div className="work-hero__grid">
            <div>
              <p className="eyebrow">Work</p>
              <h1 id="work-title">{page.fields.H1}</h1>
            </div>
            <div className="work-hero__aside">
              <p>{page.fields["Hero body"]}</p>
              <Link className="button button--primary" href="/start-a-project">
                {page.fields["Primary CTA"]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="work-empty" aria-labelledby="work-empty-title">
        <div className="ks-container work-empty__grid">
          <div className="work-empty__index" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="work-empty__copy">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-empty-title">{getEditorialField(empty, "Heading")}</h2>
            <p>{getEditorialField(empty, "Body")}</p>
            <HomeTextLink
              href="/contact"
              label={getEditorialField(empty, "CTA")}
            />
          </div>
        </div>
      </section>

      <aside className="work-results-note" aria-label="Results note">
        <div className="ks-container">
          <p>{getEditorialParagraphs(results)[0]}</p>
        </div>
      </aside>

      <section
        className="editorial-closing"
        aria-labelledby="work-closing-title"
      >
        <div className="ks-container editorial-closing__grid">
          <h2 id="work-closing-title">
            {getEditorialField(closing, "Heading")}
          </h2>
          <div>
            <p>{getEditorialField(closing, "Body")}</p>
            <div className="editorial-actions">
              <Link className="button button--primary" href="/start-a-project">
                {getEditorialField(closing, "Primary CTA")}
              </Link>
              <HomeTextLink
                href="/book"
                label={getEditorialField(closing, "Secondary CTA")}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
