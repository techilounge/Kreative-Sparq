# Kreative Sparq

The marketing website for Kreative Sparq, a Nigerian marketing agency.

Next.js 16 App Router, React 19, TypeScript in strict mode, Tailwind CSS 4,
deployed on Vercel.

## Getting started

```bash
nvm use            # Node 22
npm install
cp .env.example .env.local
npm run dev
```

Nothing in `.env.local` is required to run the site. Features that depend on
an unset value are hidden rather than shown broken, so a bare checkout runs
and every page renders.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier, writing changes |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright, at four widths |
| `npm run content:check` | Placeholder, link, and metadata audit |
| `npm run verify` | Everything above, in order |

`npm run verify` is the gate. Run it before pushing.

### End-to-end tests

Playwright runs against a production build, so what is tested is what
deploys. It starts `next start` itself; no server needs to be running.

```bash
npm run build
npm run test:e2e
```

Four viewport projects cover 375, 768, 1024, and 1440 pixels. The suite
includes an axe scan of nine routes in both colour schemes, form behaviour,
theme persistence, keyboard navigation, reduced motion, rendering without
JavaScript, and full-page screenshots at every width in both modes.

If your environment provides Chromium rather than letting Playwright download
it, point at it with `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chromium`.

## How the code is arranged

```
app/            Routes. (marketing) holds the public pages.
  actions/      Server Actions for the two forms.
components/     ui/ primitives, sections/ composed blocks, forms/, layout/.
content/        The approved copy, as typed data. Not prose in JSX.
lib/            Settings, validation, SEO, email, lead store, rate limiting.
scripts/        check-content.ts, run by npm run content:check.
styles/         globals.css: tokens, base layer, utilities.
tests/          unit/ (Vitest) and e2e/ (Playwright).
```

Three boundaries are worth knowing about before making changes.

**Copy lives in `content/`, not in components.** Every string on the site is
approved copy held as typed data. A component receives it as a prop. This is
what lets `npm run content:check` audit the whole site for placeholders,
broken internal links, duplicate metadata, and em dashes in one pass.

**Content is read through an adapter.** Pages call `contentSource`, not the
local files directly. Sanity can be introduced behind that interface without
touching a page. See `sanity/README.md`.

**Secrets stay on the server.** `lib/lead-store` and `lib/email` are marked
`server-only`. Anything named `NEXT_PUBLIC_` reaches the browser, so no
secret ever carries that prefix. The Supabase key used here is the secret
key, used from server code only; the browser is never given a way to read a
lead.

## Publishing rules

The site would rather show nothing than show something untrue, and that is
enforced in code rather than left to care:

- Forms render only when there is somewhere to send an inquiry.
- A submission is reported as successful only when it was stored or delivered.
- Draft articles are absent from listings, the sitemap, and production.
- Case studies publish only with a named client and sourced results.
- Legal routes publish only with entity details, every clause, and a date.
- Contact details, budget bands, and reply times appear only once supplied.

`CONTENT_REQUIREMENTS.md` lists everything currently held back and what each
item needs.

## Documentation

- `DESIGN_SYSTEM.md` — tokens, type, spacing, motion, focus, components.
- `CONTENT_REQUIREMENTS.md` — what is not published yet, and why.
- `IMPLEMENTATION_STATUS.md` — what is built, what is verified, what is next.
- `.env.example` — every environment variable, annotated.
- `sanity/README.md` — the optional CMS path.
- `supabase/README.md` — the leads table and its row-level security.
