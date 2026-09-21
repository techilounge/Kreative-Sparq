# Content requirements

Everything the site cannot publish yet, and what each item needs before it
can. Nothing on this list is invented in the meantime: each one is hidden,
held back, or replaced by a state that says so.

## Case studies

`content/case-studies.ts` is deliberately empty. The Work index renders the
approved empty state, `/work/[slug]` produces no routes, and nothing appears
in the sitemap.

A case study can be published once it has:

- A named client, with written permission to name them.
- The business question the work answered.
- What was actually made and shipped.
- Results that a source can be pointed at. `CaseStudyResult` requires a
  `value`, a `label`, a `period`, a `source`, and a `context`, so a number
  cannot be added without saying where it came from and over what window.
- Client approval of the finished page.

Until a result carries a verified source, the case study is better published
without numbers than with estimated ones.

## Articles

Three launch articles are written and sitting at `status: 'draft'`:

- Before spending more on ads, check these five things
- How to brief a marketing agency
- Social media activity is not a content strategy

Drafts are excluded from the Insights index, from `generateStaticParams`, and
from the sitemap. Reaching one directly in production returns a 404; in
development it renders with `noindex` so it can be reviewed.

Each carries an `editorialRequirement` naming what it still needs. In every
case that is a named author and at least one firsthand example from real
work. Set `status: 'published'` and add `publishedAt` once both exist.

## Legal documents

`/privacy` and `/terms` publish only when all of the following are set:

- The entity details: `NEXT_PUBLIC_LEGAL_BUSINESS_NAME`,
  `NEXT_PUBLIC_LEGAL_ADDRESS`, `NEXT_PUBLIC_LEGAL_CONTACT_EMAIL`, and for the
  privacy policy `NEXT_PUBLIC_PRIVACY_EMAIL`.
- Every clause, supplied by a qualified adviser: the four `LEGAL_PRIVACY_*`
  values and the three `LEGAL_TERMS_*` values.
- The matching last-updated date.

Until then each route renders a short notice that the document is with
counsel. Both routes are `noindex, follow` either way, and are excluded from
the sitemap while unpublished. No clause is drafted in the repository.

## Contact details

Each of these is hidden everywhere it would appear until it is set, because a
channel nobody monitors is worse than no channel:

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_WHATSAPP_URL`
- `NEXT_PUBLIC_BUSINESS_HOURS`
- `NEXT_PUBLIC_RESPONSE_TIME`

No reply window is promised anywhere until `NEXT_PUBLIC_RESPONSE_TIME` holds
one the business will honour.

## Social profiles

`NEXT_PUBLIC_SOCIAL_PROFILES` is published as `sameAs` in the organisation
structured data, so only live, owned profiles belong there. Unset, the
property is omitted rather than emitted empty.

## Budget bands

The project brief offers "Not decided yet" and nothing else until
`NEXT_PUBLIC_BUDGET_BANDS` supplies approved bands. Bands are a commercial
decision and are not guessed.

## Booking

`/book` shows the approved alternative routes until `NEXT_PUBLIC_CAL_LINK`
points at a real scheduling link. The page never renders an empty frame, and
a booking is never reported as made unless the embed confirms it.

## Newsletter

The newsletter form does not render until `NEWSLETTER_ENDPOINT` exists, so no
address is collected with nowhere to store it.

## Inquiry forms

The contact form and the project brief render only when a lead destination is
configured: Supabase, Resend, or both. With neither, each page shows a state
saying the form is not accepting messages yet and points at the booking
route. A submission is never reported as successful unless it was stored or
delivered.

## Imagery

The only brand assets in the repository are the two logo files. The site is
text-led by design, so no photography is required to launch. Any image added
later needs a real subject and, if it shows client work, the same permission a
case study needs.

## Never invented

For the avoidance of doubt, none of the following appear anywhere on the site
unless supplied and verified: clients, case studies, results, metrics,
testimonials, awards, offices, addresses, partners, team members,
certifications, prices, response times, or years of experience.
