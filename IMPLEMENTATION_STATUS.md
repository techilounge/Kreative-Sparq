# Implementation status

What is built, what was verified and how, and what is waiting on someone else.

## Built

### Routes

All twenty public routes render, each with one H1, a canonical, and a unique
title and description.

| Route | Notes |
| --- | --- |
| `/` | Home |
| `/services` | Service index, a ruled list rather than cards |
| `/services/[slug]` | Six service pages, statically generated |
| `/work` | Renders the approved empty state; no case studies yet |
| `/work/[slug]` | No routes generated while the collection is empty |
| `/about` | |
| `/insights` | Drafts are excluded, so the index is empty for now |
| `/insights/[slug]` | Three articles held at draft |
| `/contact` | Form or the honest unavailable state |
| `/start-a-project` | Five-step brief, or the unavailable state |
| `/book` | Booking embed, or the approved alternatives |
| `/thank-you` | Rendered per request, `noindex` |
| `/privacy`, `/terms` | Published only with counsel's clauses |
| `/404` | |

Plus `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, the Open Graph
image, and the icon set.

### Design system

Tokens for both colour schemes with contrast measured rather than estimated,
a fluid type scale, a single focus style, one reveal component, and a theme
switcher that defaults to the operating system and can hand control back.
`DESIGN_SYSTEM.md` has the detail.

### Forms

A contact form and a five-step project brief. Both validate with Zod schemas
that reject unexpected fields, both carry a honeypot, a timing check, and
Turnstile when it is configured, and both run through a rate limiter that
reports honestly whether it is durable.

The brief keeps every fieldset in the DOM and hides the ones that are not
current, so it works without JavaScript and survives back and forward
navigation. A server-side validation error returns the visitor to the
earliest step holding a failing field, with their answers in place.

### Integrations

| Integration | State |
| --- | --- |
| Supabase | Migration and row-level security written; needs a project |
| Resend | Implemented; needs an API key and a verified sender |
| Turnstile | Implemented with server-side Siteverify; needs both keys |
| Upstash | Implemented; falls back to non-durable memory when unset |
| Cal.com | Implemented, lazily loaded; needs a link |
| Sanity | Adapter boundary and schemas in place; optional |
| Vercel Analytics, Speed Insights | Wired, each inside its own boundary |

## Verified

`npm run verify` runs format, lint, typecheck, the content audit, unit tests,
and a production build. All pass.

- **Unit tests**: 38, covering validation, publishability, SEO metadata,
  the sitemap, settings resolution, and the analytics event union.
- **Content audit**: no placeholders, no em dashes, no unsourced metrics,
  unique slugs, unique titles and descriptions, and every internal link
  resolving.
- **End-to-end**: 358 tests across 375, 768, 1024, and 1440 pixels.
- **Accessibility**: axe against WCAG 2.2 AA on nine routes in both colour
  schemes at all four widths, plus the open mobile menu. No violations.
- **Screenshots**: nine pages at four widths in both schemes, 72 captures,
  each asserting no horizontal overflow.

### Defects found and fixed during verification

Three worth recording, because each would have shipped silently:

1. **Every page needed JavaScript to show any content.** The Vercel Analytics
   and Speed Insights components read the search parameters, which opts them
   out of server rendering. Without a boundary of their own, that opt-out
   applied to the whole document. Each is now inside its own `Suspense`.
2. **A root `loading.tsx` put every prerendered page behind a Suspense
   boundary**, so the served HTML carried "Loading page…" and the real content
   arrived only through client-side hydration. The loading state is now scoped
   to `/thank-you`, the one route rendered per request.
3. **The reveal animation hid content when it could not run.** Its starting
   state is written inline during the first render, so a visitor without
   JavaScript, and a visitor who asked for reduced motion, were both left with
   content that was transparent and offset. Both cases are now cancelled in
   CSS, before first paint.

## Not done, and why

- **No case studies.** The collection is empty and the Work index says so.
  Publishing one needs a named client, approval, and sourced results.
- **Three articles held at draft.** Each needs a named author and a firsthand
  example.
- **Legal routes unpublished.** They need counsel's clauses, the entity
  details, and a date.
- **No contact details, budget bands, reply time, or social profiles.** Each
  is hidden until supplied.
- **The forms are not live.** Neither Supabase nor Resend is configured, so
  both pages show the state that says so rather than a form that would discard
  messages.
- **The rate limiter is not durable** until an Upstash endpoint is set. In
  that state it is a per-instance guard, and the code says so rather than
  implying otherwise.

`CONTENT_REQUIREMENTS.md` is the full list.

## Deployment

Nothing has been deployed. The branch carries verified commits, and no
deployment authorisation has been given in this session.

To deploy:

1. Create the Vercel project from this repository.
2. Set the environment variables from `.env.example` for preview and
   production. At minimum, set `NEXT_PUBLIC_SITE_URL`.
3. Apply `supabase/migrations/0001_leads.sql` if leads will be stored.
4. Point `kreativesparq.com` at the project. `vercel.json` already redirects
   `www` to the apex host.
5. Merge to the production branch.

The build command is the default. `npm run verify` should pass before any
merge.
