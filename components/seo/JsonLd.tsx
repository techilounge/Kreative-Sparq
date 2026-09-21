/**
 * Structured data is serialised server side. Only fields backed by visible,
 * verified content are ever passed in.
 */
export function JsonLd({ data }: { readonly data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from typed content in this repository, never from
      // visitor input, so there is no untrusted string to escape here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
