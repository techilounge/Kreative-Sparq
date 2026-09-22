import { content } from "@/content";

export default async function Home() {
  const intro = await content.getFoundationContent();

  return (
    <main id="main-content" className="foundation-main" tabIndex={-1}>
      <div className="ks-container foundation-intro">
        <p className="eyebrow">{intro.eyebrow}</p>
        <h1>{intro.heading}</h1>
        <p className="foundation-intro__body">{intro.description}</p>
      </div>
    </main>
  );
}
