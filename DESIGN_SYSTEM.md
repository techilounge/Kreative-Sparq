# Kreative Sparq design system

The site is editorial rather than card-driven. Structure comes from rules,
spacing, and type scale; colour is used sparingly and carries meaning. This
document records the decisions a future change has to respect, and the
reasoning behind the ones that are not obvious.

## Colour

The palette lives in `styles/globals.css`. Raw brand values are declared once,
then mapped to semantic tokens for each mode, then exposed to Tailwind through
`@theme inline`. Components reference the semantic names (`--color-ink`,
`--color-action`) and never the raw brand values, so a mode change is a single
edit in one place.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `background` | `#F2F4F0` | `#1A2421` | Page background |
| `surface` | `#E9EDE6` | `#20302B` | Sections that need separation |
| `surface-muted` | `#DFE5DB` | `#1E2A26` | Alternating section bands |
| `ink` | `#16211D` | `#EDF1EA` | Primary text |
| `ink-muted` | `#4C574F` | `#B6C2BA` | Secondary text |
| `line` | `#CBD3C7` | `#33443D` | Hairlines and separators |
| `line-strong` | `#79857E` | `#7C8A84` | Borders that must meet 3:1 |
| `action` | `#D9531E` | `#F06A3C` | Buttons, links, focus |

### Contrast

Every pair was measured rather than estimated, and the measurements are what
fixed the values above. Two of them are worth keeping in mind:

- Muted text is `#4C574F` in light mode, not the lighter grey the brand
  direction started from, which measured 3.9:1 against the page. The value
  here is 7.0:1.
- Sparq Orange reaches 5.18:1 on the dark page background, but only 4.47:1 on
  `surface` and 3.88:1 on `surface-raised`. So in dark mode an inline link
  sits on the page background. On a raised surface, links use primary text
  with an underline, and orange is kept for focus and hover, where it is a
  supporting signal rather than the only one.

Meaning is never carried by colour alone. Field errors add a `!` marker, the
active navigation item is underlined as well as recoloured, and form status
messages state their own condition in words.

## Typography

- Display: Newsreader, 400 and 500, normal and italic.
- Text and UI: Plus Jakarta Sans, 400, 500, 600.

Both load through `next/font/google`, so they are self-hosted, preloaded, and
carry a matched fallback that keeps layout shift near zero.

The scale is fluid. Each step is a `clamp()` between its smallest and largest
size, so there is no breakpoint at which the type jumps. Line length is capped
by `.measure` (65ch) and `.measure-tight` (48ch) rather than by fixed widths,
which keeps prose readable at any window size.

## Spacing and layout

`.container-editorial` is the single content container: a maximum width with a
gutter that grows with the viewport. Sections use a consistent vertical
rhythm through the `Section` component, which also owns the tone
(`page`, `surface`, `muted`) and the optional top rule. Nothing sets its own
section padding, so the rhythm cannot drift page to page.

Radii are small and deliberate: 2, 4, 8, and 12 pixels. The editorial
direction does not want soft, pill-shaped surfaces.

## Motion

Reveals are handled by one component, `MotionReveal`, so the timing is
identical everywhere: a 0.55s fade and 16px rise, staggered by 55ms within a
group, capped at six steps, and run once.

Two constraints shape the implementation:

- **Reduced motion means no reveal at all.** The animation library writes the
  starting state inline during the first render, before it can read the
  motion preference, so cancelling it in JavaScript would come too late. A CSS
  rule under `prefers-reduced-motion: reduce` sets `opacity: 1` and
  `transform: none` on every `[data-motion-reveal]`, which lands before first
  paint. The visitor gets the content in place rather than a fade to wait out.
- **No scripting means no hidden content.** The same inline starting state
  would otherwise leave the page invisible. The document element carries a
  `no-js` class, removed by an inline script in the head, and a matching CSS
  rule cancels the starting state while that class is present.

Hover and focus transitions are 200ms and limited to colour and border
properties. Nothing animates layout.

## Focus

A single focus style applies everywhere: a 2px outline in the action colour
with a 3px offset, on `:focus-visible` only. It is defined once in the base
layer, so no component can quietly remove it.

Interactive targets are at least 44×44 CSS pixels. Inline links inside a
paragraph are exempt, as WCAG 2.2 allows, and the test suite encodes that
exemption rather than leaving it to judgement.

## Components

`components/ui` holds the primitives: `Button`, `Container`, `Section`,
`SectionHeading`, `Prose`, `Field`, `FieldError`, `FormStatus`, `EmptyState`,
`CtaBand`, `Logo`. `components/sections` holds the composed blocks used by
pages. A page assembles sections; it does not reach for raw styles.

Server Components are the default. A component becomes a Client Component only
where interaction requires it: the theme switcher, the mobile menu, the forms,
the booking embed, and the reveal wrapper.

## Themes

`next-themes` sets a class on the document element before paint, so there is
no flash of the wrong theme. The switcher is a radio group with three options,
and the choice is announced through a live region. The default is System, and
choosing System hands control back to the operating system rather than
freezing the current appearance.

The logo is a raster asset with a light and a dark variant. Both are rendered
and swapped in CSS, so the correct one is present before hydration.
