# Brand and promo

Layer 3 reference. Read `brand-guide.md` before any visual or copy work: site sections, promo graphics, Google Business Profile posts, Facebook, print.

## Files

| Path | What it is |
|---|---|
| `brand-guide.md` | Logo, colour, type, the "+" motif, imagery, promo layout, motion, voice, GBP offer fields, how to render a promo |
| `templates/promo-graphic.html` | Promo graphic template; every text element set from the command line |
| `templates/render-promo.py` | Renders the template to PNG and MP4 (Playwright and ffmpeg) |
| `templates/southampton-opening-facebook.html` | Photo promo template: Southampton launch post with Katie's photo (1080×1350) |
| `templates/render-photo-promo.py` | Renders a photo promo template to PNG and 8-second MP4 |
| `templates/logo-southampton-sagedark.svg` | Southampton logo lockup in Sage Dark for light backgrounds |
| `templates/logo-sagedark.svg` | Master logo in Sage Dark for light backgrounds |
| `examples/` | Finished renders: `new-year-new-toes` (Jan 2027 offer, code NEWTOES), `foot-plus-southampton-opening-facebook` (Southampton launch post) |

Render a new promo:

```bash
python docs/04-brand-and-promo/templates/render-promo.py <name> --eyebrow "…" --line1 "…" --line2 "…" --offer-bold "£5 off" --offer "your first home visit"
```

Output goes to `examples/<name>.png` and `.mp4`. Run `render-promo.py --help` for all options.

## Rules

- Use the real logo files in `public/images/`, never a redrawn or circle-based stand-in.
- No prices on print; the QR code leads to the website for prices.
- Every offer gets a visible promo code, so enquiries can be counted. Codes reach the enquiry email subject as `[Promo: CODE]`; `/book?promo=CODE` pre-fills it.
- Add each new campaign's render to `examples/` and a line to the guide's Examples list.
