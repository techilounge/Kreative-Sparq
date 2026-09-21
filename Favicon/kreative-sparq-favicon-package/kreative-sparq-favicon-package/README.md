# Kreative Sparq favicon package

The favicon uses a compact **KS** monogram in the approved brand colors:

- Dark Forest: `#1A2421`
- Mineral White: `#F2F4F0`
- Sparq Orange: `#F06A3C`

`favicon.svg` automatically adjusts its Dark Forest and Mineral White colors to the visitor's browser theme. The orange `S` remains consistent in both modes.

## HTML setup

Copy the files to the site's public/root directory, then add these tags inside `<head>`:

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#1A2421">
```

## Next.js App Router

Place `favicon.ico` in `app/`. Place the PNG and SVG files in `public/`, then configure the icons in `app/layout.tsx` metadata if needed.
