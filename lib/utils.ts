/** Joins class names, dropping anything falsy. */
export function cx(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}

/** Formats an ISO date for display in Nigerian English. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

/** An absolute URL for metadata, canonicals, and structured data. */
export function absoluteUrl(path: string, origin: string): string {
  return new URL(path, origin).toString();
}
