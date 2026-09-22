import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Kreative Sparq",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="foundation-main" tabIndex={-1}>
      <div className="ks-container foundation-intro">
        <h1>This page has moved, changed, or never existed.</h1>
        <p className="foundation-intro__body">
          Try the main navigation, browse our services, or head back to the home
          page.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
