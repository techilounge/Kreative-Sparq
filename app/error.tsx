"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="foundation-main" tabIndex={-1}>
      <div className="ks-container foundation-intro">
        <p className="eyebrow">Page error</p>
        <h1>Something interrupted this page.</h1>
        <p className="foundation-intro__body">
          Try loading it again. If the problem continues, use the main
          navigation to choose another page.
        </p>
        <div className="foundation-actions">
          <button
            className="button button--primary"
            type="button"
            onClick={() => reset()}
          >
            Try again
          </button>
          <Link className="home-text-link" href="/">
            Return home <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
