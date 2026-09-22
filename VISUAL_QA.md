# Visual QA and reference translation

Phase 1 translation, updated through the Phase 3 light-mode homepage review on 21 September 2026. The four required full-page light captures are recorded below; dark-mode and broader responsive QA remain for Phase 4. The homepage reference was inspected at its full 799 × 1967 px resolution. The coordinates below are approximate visual bands in the supplied image, not original layout measurements. DESIGN_SYSTEM.md is the approved implementation contract; the approved copy deck controls actual text.

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
| 01 Header | Visual height near 88/76/68–72 px by desktop/tablet/mobile; mark proportionate and legible; nav and theme control fit without overlap; all targets at least 44 × 44 px; bottom rule clear; no top-left corruption. | Built in Phase 2 and visible without overlap in the four Phase 3 light captures. Keyboard/menu smoke passes. |
| 02 Hero | At 1440 px, text/image split roughly 50/50 with image to right edge; headline has intentional line rhythm; two actions distinct; supplied WebP keeps face/updo safe; no damage or baked text. | Implemented and visually reviewed at 390/768/1024/1440. Desktop split is 50.5/49.5; tablet/mobile stack where needed. 1920 and dark review remain Phase 4. |
| 03 Capability | Exact approved heading/body; no metrics, client marks, or empty logo slots; ruled text-led chapter has enough separation from hero and Services; responsive heading/body measure. | Implemented on Soft Sage; clean split desktop and stacked mobile. |
| 04 Services | Six services, correct order and approved copy; six supplied 4:5 WebPs in the matching slots; image-led sequence at desktop, 2–3 column tablet, divided vertical mobile list; hands, faces, screens, and installation stay visible; no generic icon grid. | Implemented and visually reviewed at four widths: six columns at 1440, 3×2 at 1024, 2×3 at 768, stacked rows at 390. |
| 05 Work | Prominent split and scale comparable to the reference; approved empty state used until real work exists; no fake media, project, result, or case-study link; stack order remains clear on mobile. | Implemented as a 45/55 split and substantial ruled empty-state field; stacks at 390. |
| 06 Why | Exact four approved principles; asymmetric desktop composition; ruled text treatment rather than cards; no invented proof; mobile reading order is heading, body, four principles. | Implemented; 4/8 desktop split, two-column principles on tablet, one-column ruled list on mobile. |
| 07 Process | Four approved steps and words; numbered horizontal rhythm at wide widths, 2×2 tablet or stacked mobile; no clipping or sideways scroll; numbers and dividers align. | Implemented; 4-across at 1024/1440, 2×2 at 768, stacked at 390. |
| 08 Audience | Approved audience paragraph; no fabricated sector logos or offices; controlled line length; bridges Process and editorial band. | Implemented as text-led split; the optional concept image was omitted to avoid client/project ambiguity. |
| 09 Editorial principle | Exact approved agency statement with “Our point of view” label; no quote marks, client attribution, carousel dots, or autoplay. | Implemented as a dark text-led split. Optional portrait omitted, avoiding speaker ambiguity. Dark-theme refinement remains Phase 4. |
| 10 Insights | Show only approved articles with author/date/source and review; otherwise omit homepage section cleanly with no blank gap or fake teaser cards. | Omitted because no article meets publication requirements. |
| 11 Final CTA | Approved question/body; primary/secondary actions are visible and at least 44 px high; split on desktop, stack on mobile; no booking/form success promise before configuration. | Implemented; destinations remain the planned Phase 2 routes and show 404 until later phases. |
| 12 Footer | Dark closing field with approved matching logo; clean lower edge; grouped links, rules, adequate spacing; no unconfigured email/phone/social/newsletter controls or dead links. | Phase 2 shell is present in all Phase 3 captures; clean edge confirmed. Destination routes remain unbuilt and currently show the approved 404. |

## Required screenshot and interaction matrix

The Light captures below are completed full-homepage screenshots from Phase 3. Dark captures and broader viewport QA remain for Phase 4. Phase 2 shell captures are listed separately below.

| Width | Light full page | Dark full page | Focus of review |
|---:|---|---|---|
| 375 px | Not captured | Not captured | Narrow-phone line breaks, 44 px targets, no horizontal overflow |
| 390 px | `qa/phase3/home-light-390.png` | Not captured; Phase 4 | Mobile full page, stacked sections, image focal points and menu fit |
| 768 px | `qa/phase3/home-light-768.png` | Not captured; Phase 4 | Tablet portrait, two-column services and process |
| 1024 px | `qa/phase3/home-light-1024.png` | Not captured; Phase 4 | Small desktop, 3×2 services and full navigation |
| 1440 px | `qa/phase3/home-light-1440.png` | Not captured; Phase 4 | Desktop reference comparison, near-even hero and six-column services |
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
| No site implementation existed in Phase 1 | Informational | Design and QA contracts were written without UI code. | Phase 2 built the global shell; Phase 3 implemented the light-mode homepage sections and imagery. |

**Fixes made to production UI:** none; Phase 1 is documentation only. **Accepted deviations:** none yet. The proposed differences above require Phase 1 approval before implementation.

## Phase 2 global-shell review, 21 September 2026

Captured in Microsoft Edge on Windows with Playwright at device scale 1. These files show the intentionally minimal Phase 2 content slot, global header, theme, and footer. They do **not** establish homepage-section fidelity, image-crop approval, or release readiness.

| Viewport and mode | Screenshot | Review result |
|---|---|---|
| 1440 × 900, Light | `qa/phase2/desktop-light.png` | Approved light logo, clear navigation/theme/CTA spacing, typography, clean dark footer. No damaged reference effects. |
| 1440 × 900, Dark | `qa/phase2/desktop-dark.png` | Approved dark logo, distinct footer field, legible controls and body. Theme persists after reload. |
| 1024 × 768, Light | `qa/phase2/compact-desktop-light.png` | Desktop navigation remains visible without overlap or horizontal overflow. Footer Start link wraps within its column. |
| 768 × 1024, Dark | `qa/phase2/tablet-dark.png` | Header switches to the menu, footer groups recompose, no horizontal overflow. Footer bottom row was stacked after review to avoid cramped wrapping. |
| 390 × 844, Light | `qa/phase2/mobile-light.png` | Logo/menu fit; introductory copy and footer remain readable with no horizontal overflow. |
| 390 × 844, Dark | `qa/phase2/mobile-dark.png` | Dark typography and footer boundary remain distinct; the visible menu-button ring is keyboard focus after Escape, as intended. |
| 390 × 844, Dark menu open | `qa/phase2/mobile-menu-dark.png` | Modal menu fills the viewport; links, theme control, close button, and CTA remain visible. The screenshot is viewport-only because a full-document capture would include page content below the modal. |

**Interaction evidence:** Playwright confirmed theme reload persistence, System mode responding to changed OS preference, mode-specific browser theme-color, the light/dark header logo, skip-link focus, menu initial focus, Escape close and trigger-focus restoration, body scroll lock, and icon/manifest responses. The first browser run exposed a CSS rule that displayed the closed dialog; limiting the display rule to `[open]` fixed it. The final two smoke tests pass.

**Intentional Phase 2 differences from the reference:** The page contains only approved introductory copy in a simple content slot. There is no split hero, metric strip, client logos, image-led services, featured project, testimonial, or damaged graphic treatment. The reference's burnt hero and footer effects are excluded completely. The full homepage translation remains specified above for Phase 3 and later phases. Secondary route links currently lead to the approved 404 page until their routes are built; the booking CTA is not a live booking flow.

**Remaining after Phase 2:** Full homepage captures in both modes at the matrix widths above, supplied WebP crops and compression at rendered size, favicon appearance in browser tabs across engines, 360/375/1920 px sweeps, 200% zoom, axe, reduced-motion review, and route/content checks remain for their authorized phases. Phase 3 resolves the required light-mode captures and crop review, as documented next.

## Phase 3 light-mode homepage review, 21 September 2026

Captured with bundled Playwright Chromium on Windows at device scale 1 and viewport heights 844 (390 width), 1024 (768), 768 (1024), and 900 (1440). All four files are full-page. They were inspected against the clean editorial composition beneath the reference's damaged areas, and browser assertions confirmed seven rendered homepage images loaded, the approved section sequence, theme state, and no horizontal overflow at these widths.

| Chapter | Comparison and finding |
|---|---|
| Header and hero | Clean mineral-white header/hero field replaces the corrupted top edge. At 1440 the split is 50.5/49.5, the right image reaches the viewport edge, and the headline, lead, actions, and note create the reference's editorial hierarchy. At 1024 the split remains readable; at 768 and 390 it stacks. The woman is a fictional editorial subject, with face/updo safe in each crop. |
| Capability | Soft Sage and a thin ruled 4/6 text split carry the reference's small bridging-chapter rhythm. Exact approved text replaces all sample statistics and client marks; no logo slots remain. |
| Services | Large Newsreader introduction leads into six 4:5 WebPs in approved order. Thin top rules, numbers, text and links replace floating cards. The grid moves from six columns to 3×2, 2×3 and one per row; focal subjects and objects are visible in all four captures. |
| Work | The reference's large feature becomes a 45/55 text/panel composition, with the exact approved case-study empty state and conversation action. No fictional concept image, project, outcome, or client identity appears. The normal case-study body and “See all work” link are withheld while the empty state is active. |
| Why and Process | Why adds the approved four principles in a ruled asymmetric chapter, absent from the reference. Process retains the reference's numbered editorial sequence with the approved Discover/Decide/Make/Improve wording. |
| Audience and point of view | The approved Audience paragraph adds a quiet text bridge. The dark band keeps the reference's contrast and split rhythm but contains only the approved, labelled agency statement. The fictional portrait is omitted so no person appears to speak it. |
| Final CTA and footer | Final CTA returns to a spacious white split with the two approved actions. The Phase 2 dark footer closes the page with a clean solid edge, without the reference's burnt/noisy damage. |

**Intentional differences:** The approved Why and Audience chapters lengthen the page; Insights is absent until an article is publishable. The proof strip, featured project, and testimonial are replaced by the truthful compositions above. No damaged hero/footer effects, sample logos, fake metrics, fake work, or attributed fictional people are present. The service rows use controlled 4:5 WebPs rather than the composite screenshot as imagery. The optional wide concept and portrait assets were intentionally omitted. Approved copy is unchanged; the conditional Work body/action is hidden in favor of its exact empty state.

**Phase 3 limits:** This is light-mode approval evidence only. Dark-mode art direction, finished motion, 360/375/1920 px and 200% zoom sweeps, axe, reduced-motion review, and final interaction/detail refinement are deferred to Phase 4. Planned secondary navigation destinations still show the approved 404 until later route phases; the CTA links do not claim a working booking or form flow.
