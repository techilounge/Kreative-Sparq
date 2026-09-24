import type { Metadata } from "next";
import Image from "next/image";
import { EditorialBreadcrumb } from "@/components/editorial-breadcrumb";
import { EditorialHeroMedia } from "@/components/editorial-hero-media";
import { sharedOpenGraphImage } from "@/content/metadata";
import {
  editorialHeroImages,
  editorialSupportImages,
} from "@/content/editorial-images";
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
  robots: {
    index: false,
    follow: true,
  },
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

export default function InsightsPage() {
  const prePublication = getEditorialSection(page, "Pre-publication state");

  return (
    <main
      id="main-content"
      className="editorial-site insights-page"
      tabIndex={-1}
    >
      <section
        className="insights-hero editorial-image-hero"
        data-hero-tone="dark"
        aria-labelledby="insights-title"
      >
        <EditorialHeroMedia src={editorialHeroImages.insights} />
        <div className="ks-container">
          <EditorialBreadcrumb label="Insights" path="/insights" />
          <div className="insights-hero__grid">
            <div>
              <p className="eyebrow">Insights</p>
              <h1 id="insights-title">{page.fields.H1}</h1>
            </div>
            <div className="insights-hero__aside">
              <p>{page.fields["Hero body"]}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="insights-publication"
        className="insights-prepublication"
        aria-labelledby="insights-publication-title"
      >
        <div className="ks-container insights-prepublication__grid">
          <div className="insights-prepublication__mark">
            <Image
              src={editorialSupportImages.insights}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 767px) 100vw, 32vw"
              quality={80}
            />
            <span>Index</span>
            <strong>00</strong>
          </div>
          <div className="insights-prepublication__copy">
            <p className="eyebrow">
              {getEditorialField(prePublication, "Eyebrow")}
            </p>
            <h2 id="insights-publication-title">
              {getEditorialField(prePublication, "Heading")}
            </h2>
            <p>{getEditorialField(prePublication, "Body")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
