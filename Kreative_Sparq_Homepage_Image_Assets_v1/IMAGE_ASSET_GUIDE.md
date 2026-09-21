# Kreative Sparq Homepage Image Asset Guide

This package contains nine coordinated editorial images created for the Kreative Sparq homepage. The supplied homepage concept was used only as an art-direction reference. No people, client marks, claims, text, or damaged visual effects were copied from it.

## Package structure

- `originals/`: Full-resolution PNG masters
- `web/`: Optimized WebP assets for implementation

## Asset map

| Web asset | Intended placement | Ratio | Focal-point guidance | Suggested alt text |
|---|---|---:|---|---|
| `hero-editorial.webp` | Homepage hero, right side of split layout | 4:5 | Keep the woman's face and braided updo in the upper-right safe area. On mobile, crop from the left first. | `Woman in a terracotta suit holding a laptop outside a contemporary office building.` |
| `service-brand-strategy.webp` | Brand Strategy service card | 4:5 | Keep the hand and terracotta king centered. | `Hand moving a terracotta chess piece on a dark green chessboard.` |
| `service-creative-design.webp` | Creative Design service card | 4:5 | Preserve both hands, the terracotta swatch, and the central moodboard. | `Designer arranging forest-green and terracotta materials on a brand moodboard.` |
| `service-content-social.webp` | Content and Social Media service card | 4:5 | Preserve the face, phone, camera, and upper torso. | `Content strategist checking a phone during an urban photo walk.` |
| `service-performance-marketing.webp` | Performance Marketing service card | 4:5 | Keep the laptop display and both hands visible. | `Marketing professional reviewing an analytics dashboard on a laptop.` |
| `service-web-experiences.webp` | Web Design and Development service card | 4:5 | Keep the monitor centered and allow leaves to crop naturally. | `Editorial website layout displayed on a monitor in a plant-filled design studio.` |
| `service-campaigns-activations.webp` | Campaigns and Activations service card | 4:5 | Preserve the producer and the large terracotta-and-green installation. | `Creative producer walking through an outdoor campaign installation.` |
| `featured-editorial-concept.webp` | Wide editorial feature or visual brand statement | 16:9 | Subject belongs on the right; preserve the dark negative space on the left for optional HTML copy. | `Fashion entrepreneur in a terracotta patterned headwrap and jacket outside a modern building.` |
| `brand-philosophy-editorial.webp` | Optional dark philosophy band | 16:9 | Keep the subject right of center and use the left side for approved HTML copy. | `Creative director in a dark green studio.` |

## Content-integrity rules

- Every person shown is a fictional editorial subject created for this visual system.
- Do not identify any subject as a Kreative Sparq employee, client, founder, customer, or testimonial source.
- Do not use `featured-editorial-concept.webp` as evidence of a real case study or client project.
- Do not attach a testimonial, name, company, quotation, business result, or performance claim to any image without independently verified approval.
- The optional brand-philosophy image may support an approved general agency statement. It must not be presented as a client testimonial.
- Keep all headings, service names, calls to action, labels, and captions as HTML. Do not bake text into these images.

## Implementation guidance

1. Copy the files from `web/` into `public/images/home/`.
2. Use `next/image` with correct `width`, `height`, `sizes`, and `object-position` values.
3. Give only the hero image preload or priority treatment. Lazy-load images below the fold.
4. Use `object-fit: cover` with section-specific focal points. Do not use one global crop for every asset.
5. Preserve the original aspect ratios unless an approved composition requires a controlled crop.
6. Apply overlays through CSS when needed for text contrast. Do not permanently darken the source files.
7. Test crops at 390px, 768px, 1024px, 1440px, and 1920px.
8. Review the WebP files at rendered size. Use the PNG master only if a large crop exposes visible WebP compression.
9. Do not add glitch, burn, distortion, chromatic-aberration, or artificial film-damage effects.

## Recommended usage status

| Asset group | Status |
|---|---|
| Hero image | Ready for design review and implementation |
| Six service images | Ready for design review and implementation |
| Featured editorial concept | Ready as a conceptual brand visual; not approved as a case study |
| Brand-philosophy portrait | Optional; use only with non-testimonial approved copy |

