# Visual QA and reference translation

Phase 1 plan, 21 September 2026. **No production UI exists yet, so there are no site screenshots or browser comparison results.** The homepage reference was inspected at its full 799 × 1967 px resolution. The coordinates below are approximate visual bands in the supplied image, not original layout measurements. DESIGN_SYSTEM.md is the proposed implementation contract; the approved copy deck controls actual text.

## Reference map

| Approximate image y range | Reference composition | Translation and factual treatment |
|---|---|---|
| 0–55 | One-row logo/navigation/booking header | Keep the thin, proportionate header. Use approved logo and labels; add theme control and accessible mobile menu. Exclude top-left image damage. |
| 55–395 | Nearly 50/50 text/portrait hero; large serif heading and two actions | Preserve split, hierarchy, crop, and CTA relationship. Use copy-deck wording with the supplied hero-editorial.webp, keeping face and updo in the upper-right safe area. Exclude all burnt, glitched, and colour-banded pixels. The subject is fictional. |
| 395–496 | Three large metric/proof blocks within hero's lower area | Replace with a copy-led capability statement, with no numbers. Integrate into a calmer post-hero chapter so the hero does not claim proof it lacks. |
| 496–616 | Recognizable client-logo strip | Omit logos. Use the approved capability paragraph and rules without suggesting client endorsement. |
| 616–766 | Services introduction: eyebrow, large H2, compact explanatory text | Keep asymmetric heading and intro with exact approved copy. |
| 766–1032 | Six image-led service columns | Use the six supplied 4:5 WebPs in approved service order; preserve the guide's focal elements at narrow widths. Do not use generic icon cards. |
| 1032–1325 | Featured project: strong text/media split, landscape image | Use an equally prominent text-led approved empty state until a real project and imagery are approved. No fictional fashion client, outcome, or stock image as work. |
| 1325–1455 | Four numbered process steps | Retain horizontal rhythm on wide screens; use Discover, Decide, Make, Improve from copy deck. |
| 1455–1660 | Dark testimonial band with portrait, attribution, carousel dots | No testimonial. Use the exact approved agency principle as a labelled point of view. The optional brand-philosophy-editorial.webp can support it as a fictional editorial subject, without quote attribution or carousel controls. |
| 1660–1830 | Light final CTA split | Use the approved final question/body and two conversion paths, with one clear primary action. |
| 1830–1967 | Dark footer with wordmark/navigation and damaged lower edge | Keep dark closing weight and grouped navigation. Remove all damage/noise; hide unconfigured contact, social and newsletter controls. |

The clean reference omits three approved-copy chapters: **Why Kreative Sparq**, **Audience**, and **Insights**. Why and Audience are planned between Work, Process, and the editorial band as specified in DESIGN_SYSTEM.md. Insights appears only after an article meets the copy deck's publication conditions. These additions and the truthful substitutions will make the finished page taller than the reference; preserve its alternating large/small section rhythm rather than forcing the same page height.

## Section-by-section fidelity checklist

“Pending” means the criterion has been defined but cannot be passed before UI exists. Inspect at every required width and in both themes during the authorized UI phases. The light/dark surface choices are specified in DESIGN_SYSTEM.md.

| Section | Measurable visual and content checks | Current state |
|---|---|---|
| 01 Header | Visual height near 88/76/68–72 px by desktop/tablet/mobile; mark proportionate and legible; nav and theme control fit without overlap; all targets at least 44 × 44 px; bottom rule clear; no top-left corruption. | Pending UI |
| 02 Hero | At 1440 px, text/image split roughly 50/50 with image to right edge; headline has intentional 2–4 line rhythm, not one-word widows; body 52–60 characters per line maximum; two actions distinct; supplied WebP keeps face/updo safe at 390/768/1024/1440/1920; no damage, banding, or unapproved text baked into image. | Image available; crop pending UI |
| 03 Capability | Exact approved heading/body; no metrics, client marks, or empty logo slots; ruled text-led chapter has enough separation from hero and Services; responsive heading/body measure. | Pending UI |
| 04 Services | Six services, correct order and approved copy; six supplied 4:5 WebPs in the matching slots; image-led sequence at desktop, 2–3 column tablet, divided vertical mobile list; hands, faces, screens, and installation stay visible; no generic icon grid. | Images available; layout/crops pending UI |
| 05 Work | Prominent split and scale comparable to the reference; approved empty state used until real work exists; no fake media, project, result, or case-study link; stack order remains clear on mobile. | Pending UI; current truthful state is empty |
| 06 Why | Exact four approved principles; asymmetric desktop composition; ruled text treatment rather than cards; no invented proof; mobile reading order is heading, body, four principles. | Pending UI; deliberate addition |
| 07 Process | Four approved steps and words; numbered horizontal rhythm at wide widths, 2×2 tablet or stacked mobile; no clipping or sideways scroll; numbers and dividers align. | Pending UI |
| 08 Audience | Approved audience paragraph; no fabricated sector logos or offices; controlled line length; bridges Process and editorial band. If the optional featured editorial concept is placed here, it reads only as a brand visual, never as a completed project or client. | Pending UI; optional concept image |
| 09 Editorial principle | Exact approved agency statement with “Our point of view” label; no quote marks, client attribution, carousel dots, or autoplay. Optional fictional portrait must not imply a real speaker, client, or staff member; maintain text contrast in both themes. | Pending UI; truthful testimonial replacement |
| 10 Insights | Show only approved articles with author/date/source and review; otherwise omit homepage section cleanly with no blank gap or fake teaser cards. | Pending approved editorial content |
| 11 Final CTA | Approved question/body; primary/secondary actions are visible and at least 44 px high; split on desktop, stack on mobile; no booking/form success promise before configuration. | Pending UI and conversion setup |
| 12 Footer | Dark closing field with approved matching logo; clean lower edge; grouped links, rules, adequate spacing; no unconfigured email/phone/social/newsletter controls or dead links. | Pending UI and verified details |

## Required screenshot and interaction matrix

These are **planned file names, not screenshots that exist now**. Create actual captures in the authorized UI phases and replace “Not captured” with absolute paths. At minimum capture full page at 390, 768, 1024, and 1440 px in Light and Dark. Capture the hero separately if the full page makes detailed comparison difficult.

| Width | Light full page | Dark full page | Focus of review |
|---:|---|---|---|
| 375 px | Not captured | Not captured | Narrow-phone line breaks, 44 px targets, no horizontal overflow |
| 390 px | Not captured; planned visual-qa/home-light-390.png | Not captured; planned visual-qa/home-dark-390.png | Required mobile full-page comparison, menu and crop |
| 768 px | Not captured; planned visual-qa/home-light-768.png | Not captured; planned visual-qa/home-dark-768.png | Required tablet portrait, section recomposition |
| 1024 px | Not captured; planned visual-qa/home-light-1024.png | Not captured; planned visual-qa/home-dark-1024.png | Required tablet/small laptop, navigation fit and service grid |
| 1440 px | Not captured; planned visual-qa/home-light-1440.png | Not captured; planned visual-qa/home-dark-1440.png | Required desktop reference comparison, spacing and image scale |
| 1920 px | Not captured | Not captured | Wide-screen container cap and controlled text measure |
| Hero crops at 390/768/1024/1440 px | Not captured | Not captured | Headline wrap, first fold, portrait focal point, CTA placement |

When UI exists, record browser, OS, viewport height, device scale if relevant, theme, screenshot path, and capture date. Compare side by side with the reference's *clean design beneath the damage*. Never mark a section “matches” from code inspection alone.

## Interaction and accessibility checks for later UI phases

- Hard reload and client navigation in Light, Dark, and System; no wrong-theme flash; explicit choice persists; changed OS preference affects System mode.
- Header and mobile menu by keyboard and touch; Escape closes, focus returns, no focus covered by sticky elements; 44 × 44 px targets.
- Hero and service links reachable in meaningful DOM order. Images have accurate alt text or intentionally empty decorative alt.
- Reduced-motion mode exposes all content immediately; no layout shift or keyboard confusion from reveals.
- Hover, focus, pressed, disabled, loading, success, and error states in both themes; text, links, and controls meet WCAG 2.2 AA contrast.
- No horizontal overflow at 360, 375, 390, 768, 1024, 1440, or 1920 px; verify 200% zoom, long heading wraps, and image crop changes.
- Work, testimonial, team, and insights sections obey their approval/empty-state rules in every theme; no visible template placeholders.

## Phase 1 issues, fixes, and remaining deviations

| Finding | Severity | Phase 1 response | Remaining work |
|---|---|---|---|
| Reference hero top-left and footer lower edge contain burnt/glitched bands | High | Explicit clean surface/rule replacements specified; damage is excluded from every theme. | Verify in screenshots during UI phases. |
| Reference metrics and client logos are unverified | High | One approved copy-led capability chapter replaces both proof devices. | Obtain verifiable proof only if the user wants a later proof section. |
| Featured project and testimonial have no approval | High | Work uses the exact approved empty state; dark band uses a labelled agency principle. | Replace only with approved case study or testimonial and rights. |
| Hero and service images were missing at initial Phase 1 review | Resolved availability | User supplied nine editorial WebPs and matching PNG masters. Hero and six service WebPs now have placement, crop, alt-text, and performance rules in DESIGN_SYSTEM.md. | Inspect actual rendered crops and quality; use WebPs in UI phase and retain PNG masters. |
| Supplied optional wides depict fictional people | High content-integrity risk | Featured concept stays outside case-study proof; philosophy image cannot become testimonial portrait. All subjects are fictional editorial people. | Verify captions, alt text, links, layout context, and any HTML overlay do not imply real client/staff/testimonial identities. |
| Reference lacks Why, Audience, and publishable Insights | Medium | Approved copy additions placed in the narrative; Insights stays conditional. | Tune page rhythm in browser; approve real articles before listing them. |
| Logos include large transparent margins; favicon SVG uses font families | Low | Sizing and browser verification requirement recorded. | Check actual rendered mark and favicon across browsers in the UI phases. |
| No site implementation exists | Informational | Design and QA contracts written without UI code. | All browser checks and screenshots remain pending. |

**Fixes made to production UI:** none; Phase 1 is documentation only. **Accepted deviations:** none yet. The proposed differences above require Phase 1 approval before implementation.
