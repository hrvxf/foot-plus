# Foot+ brand guide

Working brand guide for Foot+. It starts from the January 2027 "New Year, New Toes" Google offer, the first graphic made to this standard, and covers what that piece set down. Add to it as new materials are made.

**Feel:** premium, calm, understated, editorial. A few well-made elements with a clear hierarchy. Not a generic healthcare template.

---

## 1. Logo

| File | Use |
|---|---|
| `public/images/footplus-generic-logo_MASTER_FINAL.svg` | **Master logo, no location.** Use for anything shared across Bristol and Southampton. White fill, so put it on a dark background or recolour it. |
| `docs/04-brand-and-promo/templates/logo-sagedark.svg` | The master logo recoloured to Sage Dark `#4F6F5F`, for light backgrounds. |
| `public/images/footplus-logo-green.svg` | Logo with BRISTOL lockup, in green. Bristol-only materials. |
| `public/images/footplus-logo-white.svg` | Logo with BRISTOL lockup, in white. Bristol-only, on dark green. |
| `public/images/footplus-logo-southampton-green.svg` / `-white.svg` | Logo with SOUTHAMPTON lockup. Southampton-only materials. |
| `docs/04-brand-and-promo/templates/logo-southampton-sagedark.svg` | The Southampton lockup recoloured to Sage Dark, for light backgrounds. |

Rules:
- Always use the drawn wordmark. Never type "Foot+" in a font as a stand-in for the logo.
- Shared materials use the generic logo with no location.
- Only two colourways: Sage Dark on Off-white, or white on Sage Dark or Sage Deep.
- Keep it small and confident: about 150px wide on a 1200px graphic, near the bottom, with a short uppercase tagline under it.
- Don't stretch it, outline it, add effects, or put it on photos.

## 2. Colour

These match the tokens in `app/globals.css`.

| Name | Hex | Role |
|---|---|---|
| Off-white | `#F7F6F2` | Default background. Most graphics are mostly this colour. |
| Charcoal | `#243028` | Main text and the first line of headlines. |
| Sage | `#6C917B` | The accent: second headline line, rules, "+" marks. |
| Sage Dark | `#4F6F5F` | Offer pills, buttons, eyebrow text, logo on light backgrounds. |
| Sage Deep | `#3E5A4C` | Darkest green, for dark-background versions. |
| Sage Light | `#8FB39C` | Soft borders and faint decorative marks. |
| Wash | `#E8EFE9` | Pale tint panels. |
| Line | `#DCE5DE` | Hairlines and dividers. |
| Muted | `#55625A` | Secondary text. |
| Gold | `#E3AA33` / `#EDBE4F` | **Review stars only.** The lighter gold is for dark backgrounds. |

Balance: about 80% Off-white, one strong Sage Dark block (the offer), and Sage accents. Use a single colour of text per line. Don't use gradients.

## 3. Typography

- **Poppins** (600, 700) for headlines, offers and anything that has to land at a glance. Tight tracking (−0.02em) at large sizes.
- **Inter** (400, 500, 600) for supporting lines, body copy and small print.
- **Eyebrows and taglines:** Inter 500/600, UPPERCASE, wide letter-spacing (0.18–0.32em), in Sage Dark or Charcoal at 60% opacity.
- Montserrat is the fallback only.

Scale on a 1200×900 graphic:

| Element | Font | Size |
|---|---|---|
| Eyebrow | Inter 600, uppercase, 0.32em | 22px |
| Headline (two lines) | Poppins 700, line-height 1.02 | ~118px |
| Offer pill | Poppins 600/700 | 44px |
| Supporting line | Inter 400, 75% opacity | 24px |
| Tagline under logo | Inter 500, uppercase, 0.18em | 16px |

**Two-tone headline:** line one in Charcoal, line two in Sage. It's the main move that gives hierarchy, so use it on every headline. End the headline with a full stop ("New Toes.") for a confident, editorial tone.

## 4. The "+" motif

The "+" from the wordmark, scattered as a light confetti pattern. It's the brand's signature decoration.

- Poppins 600 "+" characters in Sage, sized 22–80px.
- Opacity varies from 0.3 to 0.9. Bigger marks are stronger.
- Keep them in the outer margins and corners, away from the text block.
- Use around 10–12 on a 1200×900 graphic. It should look sprinkled, not patterned.
- Use it instead of icons, illustrations or stock imagery.

## 5. Imagery

- **No stock photos of feet or people.** Type, colour and the "+" motif do the work.
- Real photos of the practitioners (Adam, Katie) are fine for practitioner and location pages. Keep them out of offer graphics.
- **Exception: location launch and "meet the practitioner" posts.** These can use the practitioner's own photo, set in an arch frame (rounded top, 26px bottom corners) at the top of the post with a small "Meet <name>" pill overlapping its base. The logo never sits on the photo. Template: `templates/southampton-opening-facebook.html`.
- `public/images/footplus-texture.png` is a sage paper texture for print and backgrounds. Use it sparingly.

## 6. Promo graphic layout

Centred and stacked, with plenty of space around it:

```
            [ + marks in the corners ]
                 EYEBROW (uppercase)
                 Headline line one
                 Headline line two      ← Sage
                     ────               ← 90×4px Sage rule
          (  £5 off  your first home visit  )   ← Sage Dark pill
            Supporting line, 75% opacity
                    [ logo ]
                 TAGLINE (uppercase)
```

- Canvas 1200×900 (4:3), which Google Business Profile recommends. Keep the important content in the centre, because Google crops thumbnails.
- One offer per graphic, in the pill, with the value in bold ("**£5 off**").
- Don't show prices other than the offer value. Prices are on the website.

## 7. Motion

The video versions use the same layout, built up in about 3 seconds and then held so the post is readable:

1. "+" marks pop in one by one (scale 0.4→1, rotate 90°→0, ease-out), then drift gently up and down.
2. Text elements fade up 30px in order: eyebrow → headline → rule → offer → supporting line → logo. Each takes 0.7s with a cubic ease-out.
3. Hold until 7 seconds. No sound, no cuts.

## 8. Voice and copy

- Warm, plain and reassuring, in short sentences. Write to the patient, or to a relative arranging care for someone ("or arranging care for a parent").
- Lead with the benefit of a home visit: no travelling, no waiting rooms.
- Light wordplay is fine in headlines ("New Year, New Toes."). Keep body copy straightforward.
- **Never** imply a protected title such as "chiropodist" or "podiatrist".
- **Never** invent services, qualifications, prices or coverage areas.
- Trust points we can state: fully qualified, insured and DBS-checked; diabetic foot care; replies within 24 hours by WhatsApp or email.
- British spelling. Use "home visit" rather than "appointment" where it fits.

## 9. Google Business Profile offers

| Field | Guidance |
|---|---|
| Image | 1200×900 PNG, or the MP4 version, from the template below |
| Title | 58 characters max. Pattern: `<Hook> – <Value> Off Your First Home Visit` |
| Description | Hook line, two sentences of benefit, ✓ trust list, how to enquire |
| Coupon code | Short, uppercase, memorable (e.g. `NEWTOES`) |
| Redeem link | `https://foot-plus.co.uk/book?promo=<CODE>`, which pre-fills the promo code on the enquiry form |
| Terms | New patients only, dates, one per patient, not combinable, travel fees still apply |

The enquiry form has an optional promo code field. Codes appear in the enquiry email subject as `[Promo: CODE]`, so each campaign can be counted.

## 10. Making a new promo graphic

The template is `docs/04-brand-and-promo/templates/promo-graphic.html`, and every text element is set from the command line:

```bash
pip install playwright && playwright install chromium   # once
python docs/04-brand-and-promo/templates/render-promo.py spring-feet \
  --eyebrow "Spring offer" --line1 "Spring into" --line2 "Happy Feet." \
  --offer-bold "£5 off" --offer "your first home visit"
```

This writes `docs/04-brand-and-promo/examples/<name>.png` and `.mp4`. Add `--no-video` for the image only. Needs ffmpeg for the video.

### Photo promo (launch posts)

For a location opening, the 1080×1350 Facebook layout is: arch photo → eyebrow → two-tone headline → rule → Sage Dark pill → one contact line → location logo and tagline. There's no offer, so the pill carries the news ("**Home visits** now booking") and the line under it is just the practitioner's phone number. Keep it that sparse. Copy is edited in the HTML; render with:

```bash
python docs/04-brand-and-promo/templates/render-photo-promo.py southampton-opening-facebook
```

This writes `examples/foot-plus-<template>.png` and an 8-second `.mp4` (photo reveals upward with a slow settle, then the text builds as in section 7). To make one for another location, copy the HTML and swap the photo, logo, headline and phone number.

Tagline: "Foot care in your chair" is the preferred line under the logo on these posts.

## 11. Website share and search images

Two jobs, two images (Nov 2026):

- **Link previews (WhatsApp, Facebook, iMessage):** `public/images/foot-plus-share.jpg`, 1200×630, set as `og:image` on every shared page via `DEFAULT_SOCIAL_IMAGE`. Dark theme: white foot mark, "Foot care / in your chair.", "Bristol · Southampton", logo. Advice pages use `foot-plus-advice-share.jpg`.
- **Google search thumbnails:** square, text-free practitioner portraits, set per page with `primaryImageOfPage` (`PreferredImage` component, `searchImages` in `app/lib/site.ts`): `foot-plus-practitioners.jpg` (shared pages), `adam-james-square.jpg` (Bristol pages and advice), `katie-preston-square.jpg` (Southampton pages). Google's guidance is to avoid logos or text in this image, and a 1.91:1 image gets shrunk with grey bars in its square thumbnail.
- **Logo for Google:** `foot-plus-logo.png`, 512×512, Sage Dark foot mark on white (the master SVG is white, so invisible on white).

Template and script: `docs/04-brand-and-promo/templates/share/` (`python docs/04-brand-and-promo/templates/share/render.py` rewrites all four JPGs). Adam's schema photo is the plain portrait (`adam-james.webp`), not the one with the SMAE badge.

## Examples

- `examples/new-year-new-toes.png` / `.mp4`: January 2027 Google offer, £5 off the first home visit, code NEWTOES.
- `examples/foot-plus-southampton-opening-facebook.png` / `.mp4`: November 2026 Facebook post announcing Foot+ Southampton, with Katie's photo. Headline "Hello, Southampton.", pill "Home visits now booking", Katie's number, tagline "Foot care in your chair".
