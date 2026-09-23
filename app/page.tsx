import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeTextLink } from "@/components/home-text-link";
import { content } from "@/content";
import "./home.css";

const publicOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreativesparq.com"
).replace(/\/$/, "");
const title = "Kreative Sparq | Strategy, Creative & Digital Marketing";
const description =
  "Kreative Sparq brings strategy, creative work, digital marketing, websites, and campaigns into one clear plan for ambitious brands.";
const socialDescription =
  "A strategy, creative, and digital marketing agency helping ambitious brands turn attention into meaningful business action.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ideas that move people. Marketing that moves business.",
    description: socialDescription,
    url: "/",
    siteName: "Kreative Sparq",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideas that move people. Marketing that moves business.",
    description: socialDescription,
  },
};

export default async function Home() {
  const home = await content.getHomeContent();
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kreative Sparq",
    url: publicOrigin,
    logo: `${publicOrigin}/icon-512.png`,
    description,
  };

  return (
    <main id="main-content" className="home" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replaceAll("<", "\\u003c"),
        }}
      />
      <section className="home-hero" aria-labelledby="hero-heading">
        <div className="home-hero__copy">
          <div className="home-hero__copy-inner">
            <p className="eyebrow">{home.hero.eyebrow}</p>
            <h1 id="hero-heading">{home.hero.heading}</h1>
            <p className="home-hero__lead">{home.hero.description}</p>
            <div className="home-actions">
              <Link
                className="button button--primary"
                href={home.hero.primary.href}
              >
                {home.hero.primary.label}
              </Link>
              <HomeTextLink {...home.hero.secondary} />
            </div>
            <p className="home-hero__note">{home.hero.note}</p>
          </div>
        </div>
        <div className="home-hero__media">
          <Image
            src="/images/home/hero-editorial.webp"
            alt="Woman in a terracotta suit holding a laptop outside a contemporary office building."
            width={1122}
            height={1402}
            sizes="(max-width: 1023px) 100vw, 50vw"
            preload
          />
        </div>
      </section>

      <section className="home-capability" aria-labelledby="capability-heading">
        <div className="ks-container home-capability__inner">
          <h2 id="capability-heading">{home.capability.heading}</h2>
          <p>{home.capability.description}</p>
        </div>
      </section>

      <section className="home-services" aria-labelledby="services-heading">
        <div className="ks-container">
          <div className="home-section-intro home-services__intro">
            <div>
              <p className="eyebrow">{home.services.eyebrow}</p>
              <h2 id="services-heading">{home.services.heading}</h2>
            </div>
            <p>{home.services.description}</p>
          </div>
          <ol className="home-services__list">
            {home.services.items.map((service, index) => (
              <li className="home-service" key={service.title}>
                <div className="home-service__media">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={800}
                    height={1000}
                    sizes="(max-width: 399px) calc((100vw - 40px) * .38), (max-width: 767px) calc((100vw - 40px) * .42), (max-width: 1023px) 43vw, (max-width: 1439px) 29vw, 15vw"
                    style={{ objectPosition: service.image.position }}
                    loading="lazy"
                  />
                </div>
                <div className="home-service__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <HomeTextLink {...service.link} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-work" aria-labelledby="work-heading">
        <div className="ks-container home-work__inner">
          <div className="home-work__intro">
            <p className="eyebrow">{home.work.eyebrow}</p>
            <h2 id="work-heading">{home.work.heading}</h2>
          </div>
          <div className="home-work__empty">
            <p>{home.work.emptyState}</p>
            <HomeTextLink {...home.work.action} />
          </div>
        </div>
      </section>

      <section className="home-why" aria-labelledby="why-heading">
        <div className="ks-container home-why__inner">
          <div className="home-why__intro">
            <p className="eyebrow">{home.why.eyebrow}</p>
            <h2 id="why-heading">{home.why.heading}</h2>
            <p>{home.why.description}</p>
          </div>
          <ol className="home-why__list">
            {home.why.principles.map((principle, index) => (
              <li key={principle.title}>
                <span className="home-small-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-process" aria-labelledby="process-heading">
        <div className="ks-container">
          <div className="home-process__intro">
            <p className="eyebrow">{home.process.eyebrow}</p>
            <h2 id="process-heading">{home.process.heading}</h2>
          </div>
          <ol className="home-process__list">
            {home.process.steps.map((step) => (
              <li key={step.number}>
                <span className="home-process__number" aria-hidden="true">
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-audience" aria-labelledby="audience-heading">
        <div className="ks-container home-audience__inner">
          <h2 id="audience-heading">{home.audience.heading}</h2>
          <p>{home.audience.description}</p>
        </div>
      </section>

      <section className="home-view" aria-labelledby="view-heading">
        <div className="ks-container home-view__inner">
          <div className="home-view__label">
            <p className="eyebrow">{home.pointOfView.eyebrow}</p>
          </div>
          <h2 id="view-heading">{home.pointOfView.statement}</h2>
        </div>
      </section>

      <section className="home-final" aria-labelledby="final-heading">
        <div className="ks-container home-final__inner">
          <h2 id="final-heading">{home.finalCta.heading}</h2>
          <div>
            <p>{home.finalCta.description}</p>
            <div className="home-actions">
              <Link
                className="button button--primary"
                href={home.finalCta.primary.href}
              >
                {home.finalCta.primary.label}
              </Link>
              <HomeTextLink {...home.finalCta.secondary} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
