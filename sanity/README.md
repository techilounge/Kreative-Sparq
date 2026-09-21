# Sanity

The site runs entirely on the typed content in `content/`. Sanity is optional,
and this directory describes the path to it rather than a dependency the site
has.

## How the boundary works

Pages never import `content/` directly. They call `contentSource`, defined in
`lib/content/source.ts`, which today resolves to `localContentSource`. The
interface is small on purpose: list and fetch case studies, list and fetch
articles. Adding a Sanity-backed implementation of that interface is the whole
integration, and no page changes.

`sanityConfigured` is true when both `NEXT_PUBLIC_SANITY_PROJECT_ID` and
`NEXT_PUBLIC_SANITY_DATASET` are set. Until a Sanity source exists, that flag
only reports configuration; it does not switch anything.

## Schemas

`schemas.ts` holds the document definitions, with field names matching the
types in `content/`. Nothing imports it at runtime. It sits here so that the
Studio definition and the application types cannot drift apart unnoticed.

## Publishing rules still live in the application

`lib/content/publishable.ts` decides what appears: a case study needs a named
client, client approval, and results that each carry a source and a period; an
article needs a named author and no outstanding editorial requirement.

Those checks stay in the application rather than in the CMS. A required field
in a Studio can be worked around; a filter between the data and the page
cannot. The schema descriptions say the same things so that whoever is filling
in the fields knows what the page will require.

## If you connect it

1. Create the project and dataset, and set the two environment variables.
2. Stand up a Studio using `schemaTypes` from `schemas.ts`.
3. Add `lib/content/sanity.ts` implementing `ContentSource`, reading through
   the CDN for published content.
4. Switch `contentSource` in `lib/content/index.ts` to prefer it when
   `sanityConfigured` is true.
5. Keep the publishability filters in place. They are what stops an unfinished
   draft reaching the public site.
