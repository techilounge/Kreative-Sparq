# Content and configuration requirements

Updated for Editorial Image Pack v3 on 24 September 2026.

## Approved launch facts

| Item | Approved implementation |
| --- | --- |
| Legal and trading name | Kreative Sparq |
| Jurisdiction | Nigeria |
| Public contact | `hello@kreativesparq.com`; prominent on `/contact` |
| Legal and privacy contact | `legal@kreativesparq.com` |
| Response expectation | Within two business days |
| Address, phone, WhatsApp, hours | Omitted |
| Inquiry path | Visitor opens their email application; the site has no contact or project form |
| Booking | No calendar. `/book` redirects permanently to `/contact` |
| Project brief | No web submission. `/start-a-project` redirects permanently to `/contact` |
| Confirmation | No submission flow. `/thank-you` is removed |
| CMS | Repository-local content |
| Analytics | None for the initial launch |
| Privacy and Terms | Published for the current site behavior; effective 23 September 2026 |

Supabase, Resend, Cloudflare Turnstile, Cal.com, Vercel Web Analytics, Speed Insights, GA4, Google Tag Manager, advertising pixels, consent tooling, and external CMS products are outside this launch. They are not dependencies or launch blockers because the approved release does not use them.

## Available and governed content

- The supplied hero WebP and six service WebPs are production assets. Their PNG files remain source masters. All depicted people are fictional editorial subjects and are never presented as staff, clients, customers, or testimonial sources.
- Editorial Image Pack v3 supersedes earlier non-homepage placement guidance. Its eleven optimized WebPs are available for the approved route heroes and four support placements; matching PNG files remain source masters outside public delivery.
- Do not name or identify anyone shown in the generated photographs. Do not add staff, client, testimonial, project-result, portfolio, partnership, or completed-work captions to them.
- Work imagery must remain inside the truthful pending-case-study composition and cannot substitute for an approved case study.
- The camera-led Content & Social Media image illustrates capability only. It is not campaign evidence, client work, or a photograph of the Kreative Sparq team.
- The optional featured editorial concept is not shown as completed client work.
- Services chapters 7–13, editorial routes, and launch conversion/legal chapters are extracted from `Kreative_Sparq_Website_Copy_Claude_Code.md`; `pnpm copy:check` prevents structured-content drift.
- `/work` truthfully states that no approved case studies are public. `/insights` truthfully uses the approved pre-publication state while zero articles are public.
- No client names, logos, metrics, results, awards, testimonials, case studies, team profiles, guarantees, social links, or newsletter controls are published without approved evidence.

## Future content gates

These items are optional future work and do not block the lean launch:

- Publishable work case studies with client permission, verified facts, results context, and media rights.
- Approved Insights articles with authors, review dates, original examples, and editorial approval.
- Verified team profiles and photography rights.
- Real staff photography with publication rights, client image approvals, and verified case studies if those uses are introduced later.
- Verified social profile URLs.
- Any new form, booking, newsletter, analytics, advertising, CMS, account, payment, or other data-processing feature.

Each future feature must update the source deck, Privacy Policy, Terms where relevant, CSP allowlist, accessibility coverage, metadata, sitemap rules, and operational ownership before publication.

## Launch gate

The previous integration and booking blockers are superseded by the approved email-only launch model. The remaining release step is final visual approval of the preview, followed by separate approval to merge and promote to production.
