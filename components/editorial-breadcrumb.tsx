import Link from "next/link";

const publicOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreativesparq.com"
).replace(/\/$/, "");

export function EditorialBreadcrumb({
  label,
  path,
}: {
  label: string;
  path: string;
}) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: publicOrigin },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${publicOrigin}${path}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs).replaceAll("<", "\\u003c"),
        }}
      />
      <nav className="editorial-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{label}</span>
      </nav>
    </>
  );
}
