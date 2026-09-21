# Content and configuration requirements

Phase 0 inventory, updated during Phase 1 on 21 September 2026. Nothing listed here is permission to invent a value. Items marked **release blocker** must be resolved or have an explicitly accepted, truthful fallback before the affected route or the site goes live. Items marked **hide until approved** must not appear as empty or fictional content.

## Brand, imagery, and proof

| Requirement | Current state | Safe handling and gate |
|---|---|---|
| Light logo, dark logo, favicon | Supplied and opened; see `REFERENCE_MANIFEST.md` | Available for the later authorized UI phases. Optional editable/vector master can be supplied for sharper scaling. |
| Homepage hero image | **Available:** user-supplied `Kreative_Sparq_Homepage_Image_Assets_v1/web/hero-editorial.webp` with matching PNG master in `originals/` and placement/alt guidance in `IMAGE_ASSET_GUIDE.md` | Use the WebP for implementation in an authorized UI phase; retain PNG as the source master. Subject is a fictional editorial person, never staff, client, or testimonial source. Check responsive crop and rendered quality before release. The composite screenshot remains reference-only. |
| Six homepage service images | **Available:** one optimized WebP and one PNG master for each approved service in the supplied package | Use the six WebPs in service order with individual crop/focal-point and visual-only alt text from the guide as adapted in `DESIGN_SYSTEM.md`. Keep PNG masters out of normal page delivery. Depicted people are fictional editorial subjects. |
| Other sector or page-specific imagery | No additional images beyond the nine-image homepage package | Optional for later routes. Source or create only when needed, with provenance, rights, accurate alt text, and no invented client/staff identity. |
| Client marks, metrics, awards, years, partner claims | The screenshot contains examples, but no proof or permission | **Hide until approved.** Replace the proof strip with approved copy-led capability content or omit it. Every number needs scope, period, source, and permission. |
| Featured work and case studies | No approved client names, assignments, images, results, dates, quotes, or usage rights. The package contains `featured-editorial-concept.webp`, a fictional concept visual. | **Hide client work until approved.** Use the copy deck’s Work and homepage empty states. The featured concept may be used only as a separate editorial brand visual, without a client/case-study claim or result. Case-study routes still need substantive approved facts, evidence, media rights, and publication permission. |
| Testimonial | No verified quote, person, role, organisation, headshot rights, or written approval. The package contains `brand-philosophy-editorial.webp`, a fictional portrait. | **Hide testimonial until approved.** The optional portrait may support an approved agency philosophy statement only; it cannot identify or imply a testimonial speaker, client, or staff member. Do not use the reference quote or attribution. |
| Team profiles | No approved names, roles, biographies, photographs, alt text, or LinkedIn URLs | **Hide until approved.** Keep the About page’s approved general copy without a fictional team grid. |
| Agency story and experience details | General positioning copy is supplied; specific history and credentials are not | Publish only approved general statements. Request actual details before adding a timeline, awards, credentials, or years of experience. |

## Contact, conversion, and editorial settings

| Requirement | Current state | Safe handling and gate |
|---|---|---|
| Actively monitored contact email and recipient/lead owner | `{{CONTACT_EMAIL}}` and form destination unresolved | **Release blocker for inquiry submission and truthful fallback.** Verify the public address, receiving mailbox, owner, and test delivery. Hide unusable contact methods. |
| Phone or WhatsApp | `{{CONTACT_PHONE}}` unresolved | Optional. Publish only if actively monitored and approved; otherwise hide everywhere. |
| Business hours and response time | `{{BUSINESS_HOURS}}` and `{{VERIFIED_RESPONSE_TIME}}` unresolved | **Release blocker for any promise using these fields.** Verify values or remove/hide the promise through an approved content decision. |
| Service area/city and on-ground coverage | Nigeria and remote collaboration copy supplied; no city or fixed coverage details | General approved wording can be used. Do not add an office, address, city page, travel coverage, or working hours without verification. |
| Project form budget bands | `{{APPROVED_BUDGET_BANDS}}` unresolved | **Decision needed before that field is enabled.** Keep the deck’s “Not decided yet” option; do not invent ranges. |
| Form processing and lead destination | No app or configured Resend/Supabase/other destination exists | **Release blocker for live forms.** Choose a real receiving/storage path; verify success, failure, anti-spam, retention, and notification ownership. Never simulate success. |
| Booking calendar and fallback | `{{CAL_COM_EMBED_URL}}` unresolved; no account or event link supplied | **Release blocker for a working booking CTA.** Supply approved 30-minute event URL and test it, or approve a truthful contact-based alternative. |
| Newsletter | Copy exists; no list provider, subscriber store, consent flow, or sending plan | **Hide until configured.** No signup control or success message without real subscription handling and unsubscribe. |
| Social links | No approved public profile URLs supplied | **Hide until verified.** Do not use reference image icons as evidence of active accounts. |
| Insights articles | Three full drafts supplied, but `{{ARTICLE_AUTHOR}}` and approved firsthand/anonymised examples are missing; optional reviewer is unresolved | **Hide until editorial approval.** Add a real author/byline, dates, original example required by each draft, fact/source review, and final publication approval. Do not publish them as finished merely because the drafts exist. |
| Other insights records | No additional publishable articles or media supplied | Use approved index empty state as appropriate; no sample cards or dates. |

## Legal, privacy, and integrations

| Requirement | Current state | Safe handling and gate |
|---|---|---|
| Legal entity and publication details | `{{LEGAL_BUSINESS_NAME}}`, `{{REGISTERED_OR_CONTACT_ADDRESS}}`, `{{LEGAL_CONTACT_EMAIL}}`, `{{PRIVACY_EMAIL}}`, optional privacy phone, and policy dates unresolved | **Release blocker for final legal pages.** Confirm the actual entity, lawful contact details, address publication decision, and dates. |
| Privacy policy | Starting draft only; lawful grounds, actual providers/data flows, international transfers, retention periods, cookies/local storage, rights process, and counsel review unresolved | **Release blocker.** Match the implemented services and analytics, then obtain review under applicable law. Do not publish placeholders. |
| Terms of Use | Starting draft only; counsel-approved liability, possible indemnity, governing law/dispute wording, entity details, and date unresolved | **Release blocker.** Confirm against actual site features and obtain legal review. |
| CMS | Sanity recommended, typed local content allowed; no decision or credentials | Decision for a later technical phase. A build without CMS is permitted if editable content needs and ownership are documented. Do not create an account automatically. |
| Email, lead storage, spam controls, booking | Resend, Supabase, Turnstile, and Cal.com are proposed but unconfigured | Select and approve only services needed for the chosen conversion flow. Obtain server credentials securely in the relevant phase; never commit secrets or expose server keys as `NEXT_PUBLIC_`. |
| Analytics and measurement | Vercel Analytics/Speed Insights, Search Console/Bing, and optional GA4 proposed; no decision or property access | Decide tools, event ownership, privacy wording, and consent behavior before enabling. No tracking pixels or consent banner by assumption. |
| Future third-party photography, video, embeds, fonts beyond specified web fonts | No additional licensing/approval records supplied | Record source and usage rights before publication. The new homepage package is user-supplied generated editorial imagery, separately inventoried in `REFERENCE_MANIFEST.md`. No hotlinked production media. |

## Current launch-critical path

1. **Hero and six service images are now available.** Place the supplied WebPs with guide-led crops/alt text, retain PNG masters, and verify quality at required viewports. This is an implementation/QA task, no longer a missing-imagery blocker.
2. A monitored inquiry destination and booking route or approved truthful alternatives, with confirmed public contact values.
3. Final privacy and terms details reviewed against actual data flows.
4. A content decision for all hidden proof, work, testimonial, team, and article blocks; the supplied editorial concepts do not resolve missing client or testimonial proof.

These remaining requirements are tracked for their relevant phases. The Phase 1 image-package update does not approve production UI, Phase 2, or release.
