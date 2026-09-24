# Kreative Sparq Editorial Image Pack

## Authority and version

This manifest belongs to Editorial Image Pack v3. For imagery implementation, it supersedes earlier image-placement instructions and any earlier instruction to reuse the old Content & Social Media service image. The definitive implementation instructions are in `KREATIVE_SPARQ_EDITORIAL_IMAGERY_MASTER_PROMPT.md`.

## Purpose

This pack adds a consistent editorial photography layer to every public hero except the homepage, four restrained supporting images, and a dedicated Content & Social Media service image. All depicted people are fictional editorial subjects. They must never be described as Kreative Sparq staff, clients, partners, testimonial sources, or examples of completed work.

Use the optimized files in `web/` for the website. Preserve `originals/` as source masters outside normal page delivery. Copy the production assets to `public/images/editorial/` using the filenames in this manifest.

## Hero assets

| File | Intended route | Composition | Recommended treatment |
| --- | --- | --- | --- |
| `services-overview-hero.webp` | `/services` | 1672 × 941, activity at right, light negative space at left | Full hero background with a light surface-to-transparent gradient in Light mode and a Dark Forest gradient in Dark mode. |
| `work-hero.webp` | `/work` | 1672 × 941, concept wall at right, dark negative space at left | Full hero background with white copy and a Dark Forest overlay. Do not imply the displayed materials are client work. |
| `about-hero.webp` | `/about` | 1672 × 941, workshop at right, light negative space at left | Full hero background with a light gradient in Light mode and dark gradient in Dark mode. Decorative image only. |
| `insights-hero.webp` | `/insights` | 1672 × 941, strategist at right, dark negative space at left | Full hero background with white copy and a Dark Forest overlay. Do not identify the person as an author or employee. |
| `contact-hero.webp` | `/contact` | 1672 × 941, consultation at right, light negative space at left | Full hero background with a light gradient in Light mode and dark gradient in Dark mode. Decorative image only. |
| `legal-shared-hero.webp` | `/privacy`, `/terms` | 1672 × 941, paper detail at right, dark negative space at left | Shared full hero background with white copy and a subtle Dark Forest overlay. |

Five service-detail routes should reuse their existing service-specific WebPs as hero background media:

- `/services/brand-strategy`
- `/services/creative-design`
- `/services/performance-marketing`
- `/services/web-design-development`
- `/services/campaigns-activations`

Keep those images visually concentrated on the right side at desktop. Preserve the existing service catalogue cards and do not duplicate an image twice in the same viewport.

### Content & Social Media replacement

Use `service-content-social-v2.webp` for both the Content & Social Media catalogue card and the `/services/content-social-media` hero. It shows a fictional African creative team producing campaign photography with a professional camera, set styling, and live image review. This more directly communicates content production than the previous phone-led image.

The earlier Content & Social Media image is deprecated for these two placements. Do not leave the old image on the catalogue card while using the new image in the detail hero.

For the service-detail hero, preserve the light negative space on the left and keep the camera, stylist, and review monitor visible on the right. Begin with an `object-position` near `72% 50%` on desktop and tune mobile independently. Do not render the same image twice within the initial viewport.

## Supporting assets

| File | Placement | Use |
| --- | --- | --- |
| `work-process-support.webp` | `/work`, inside the current empty index frame | Replace the blank ruled block with this fictional editorial still life. It is not client work or evidence. |
| `about-relationship-support.webp` | `/about`, paired with the working-relationship chapter or used as a full-width editorial break immediately before it | Decorative. Do not label the people as the Kreative Sparq team. |
| `insights-notes-support.webp` | `/insights`, inside the current `00` publication-status panel | Use as the panel image while retaining the `00` as an overlaid status mark if it remains readable. |
| `contact-collaboration-support.webp` | `/contact`, paired with the “What happens next?” chapter | Decorative supporting media. Keep the email address as the primary conversion element. |

## Implementation rules

- Copy optimized files to `public/images/editorial/`.
- Use `next/image` with `fill`, `sizes="100vw"`, and `preload` only for the current page hero.
- Hero images are decorative because adjacent headings describe the page. Use `alt=""` and `aria-hidden="true"`.
- Supporting images may use concise descriptive alt text only when they add meaning. Otherwise use empty alt text.
- Add an absolutely positioned media layer and overlay layer rather than CSS `background-image`, preserving Next.js image optimization.
- Keep text, buttons, and breadcrumbs above the media layer with an explicit stacking context.
- Maintain at least WCAG AA contrast in both themes. Test contrast on the rendered image, not only against a design token.
- Desktop focal point: approximately `82% 50%` for the five people-based heroes. Legal can use `85% 50%`.
- Mobile focal point: begin near `72% 50%`, then tune each page from screenshots. Do not crop faces, hands, or important materials.
- On small screens, apply a stronger top-to-bottom and left-to-right overlay so image detail never competes with the heading.
- Preserve current headline wording, route metadata, theme behavior, reduced-motion behavior, and responsive section order.
- No parallax, Ken Burns effect, background video, scroll-jacking, or constant image motion.
- A subtle 300–450 ms first-load reveal is acceptable only if it respects `prefers-reduced-motion`.
- Keep originals out of the public delivery directory.
- Record every generated person as a fictional editorial subject in `REFERENCE_MANIFEST.md` and `CONTENT_REQUIREMENTS.md`.
- Apply the documentation changes listed in `MARKDOWN_DOCUMENTATION_UPDATES.md` during the same implementation checkpoint.

## Suggested overlay starting points

Light-left heroes (`services`, `about`, `contact`):

```css
linear-gradient(90deg, rgb(245 246 241 / 0.98) 0%, rgb(245 246 241 / 0.92) 43%, rgb(245 246 241 / 0.48) 66%, rgb(245 246 241 / 0.08) 100%)
```

Dark-left heroes (`work`, `insights`, `privacy`, `terms`):

```css
linear-gradient(90deg, rgb(18 31 24 / 0.96) 0%, rgb(18 31 24 / 0.9) 46%, rgb(18 31 24 / 0.46) 72%, rgb(18 31 24 / 0.12) 100%)
```

These are starting points, not fixed values. Adjust from screenshots while preserving text contrast and visible photography.
