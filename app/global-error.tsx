"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en-NG">
      <head>
        <title>Site error | Kreative Sparq</title>
      </head>
      <body
        style={{
          margin: 0,
          background: "#F2F4F0",
          color: "#242424",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <p
              style={{
                color: "#A63B1C",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Site error
            </p>
            <h1
              style={{
                margin: "20px 0",
                color: "#2A371B",
                fontFamily: "Georgia, serif",
                fontSize: "clamp(48px, 8vw, 88px)",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              The site could not finish loading.
            </h1>
            <p style={{ maxWidth: 620, fontSize: 18, lineHeight: 1.65 }}>
              Try once more. If the problem continues, return to the homepage
              and choose another page.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                marginTop: 32,
              }}
            >
              <button
                type="button"
                onClick={() => reset()}
                style={{
                  minHeight: 48,
                  border: 0,
                  background: "#CE5129",
                  color: "#FFFFFF",
                  padding: "12px 22px",
                  font: "inherit",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  minHeight: 48,
                  display: "inline-flex",
                  alignItems: "center",
                  color: "#2A371B",
                  fontWeight: 700,
                }}
              >
                Return home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
