import type { Metadata } from "next";
import Link from "next/link";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import {
  getEditorialField,
  getEditorialSection,
  insightsPage,
} from "@/content/editorial";
import "../editorial.css";

const page = insightsPage;

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

export default function InsightsPage() {
  const empty = getEditorialSection(page, "Empty state");

  return (
    <main
      id="main-content"
      className="editorial-site insights-page"
      tabIndex={-1}
    >
      <section className="insights-hero" aria-labelledby="insights-title">
        <div className="ks-container">
          <EditorialBreadcrumb label="Insights" path="/insights" />
          <div className="insights-hero__grid">
            <div>
              <p className="eyebrow">Insights</p>
              <h1 id="insights-title">{page.fields.H1}</h1>
            </div>
            <div className="insights-hero__aside">
              <p>{page.fields["Hero body"]}</p>
              <Link className="button button--primary" href="#insights-empty">
                {page.fields["Primary CTA"]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="insights-empty"
        className="insights-empty"
        aria-labelledby="insights-empty-title"
      >
        <div className="ks-container insights-empty__grid">
          <div className="insights-empty__mark" aria-hidden="true">
            <span>Index</span>
            <strong>00</strong>
          </div>
          <div className="insights-empty__copy">
            <p className="eyebrow">Publication status</p>
            <h2 id="insights-empty-title">
              {getEditorialField(empty, "Heading")}
            </h2>
            <p>{getEditorialField(empty, "Body")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
