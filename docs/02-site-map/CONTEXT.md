# Site map: where code and facts live

Layer 3 reference. Use it to find the file to change. If a path here no longer exists, the code has moved on: find the new place and update this file in the same PR.

## Facts (`app/lib/`)

Content comes from these files, never typed straight into a page. Change the fact here and every page that uses it follows.

| File | Holds |
|---|---|
| `site.ts` | `SITE_URL`, schema IDs, social images, phones and emails per location, `prices`, `phoneForPath` / `emailForPath` |
| `locations.ts` | Bristol and Southampton: practitioner, credentials, bio, intro, availability, coverage line, status |
| `postcodes.ts` | Postcode validation and which location covers a postcode |
| `travel.ts` | Travel bases (BS2 0QF, SO16 5LF) and fee bands by driving distance |
| `services.ts` | Services, appointment types, who we help, refer-on signs |
| `treatments.ts` | Content for the shared treatment pages (corn, hard skin and callus, cracked heels) |
| `reviews.ts` | Google reviews per location. Text added by hand; rating and count synced daily. Build fails on protected titles |
| `locationFaqs.ts` | Location page FAQs; also feeds FAQPage structured data |
| `partners.ts` | Local partners shown on `/partners` and location pages |
| `advice.ts` | Advice articles |
| `about.ts`, `home.ts` | About and home page copy (`home.ts` also feeds the home treatment spotlight) |
| `season.ts` | Christmas availability window and notes |
| `clinic.ts`, `clinicStripe.ts` | Age UK clinic: sessions, price, slots, screening. Booking stays closed while there are no sessions |

## Pages (`app/`)

| URL | Role |
|---|---|
| `/` | Brand front door for both locations: why a home visit, treatments, prices, reviews, routing to a practitioner. `app/components/HomeContent.tsx` + `app/components/home/` |
| `/locations/bristol`, `/locations/southampton` | Meeting the practitioner. `app/components/location/` |
| `/locations/bristol/areas-we-cover` | Bristol coverage hub with postcode checker (replaced 16 area pages; see `docs/03-seo-and-content/area-pages-consolidation.md`) |
| `/toenail-cutting-bristol`, `/toenail-cutting-southampton` | Main search-intent pages for nail cutting (`app/components/site/NailCuttingPage.tsx`) |
| `/corn-treatment`, `/hard-skin-and-callus`, `/cracked-heels` | Shared treatment pages (`app/components/site/TreatmentPage.tsx`) |
| `/foot-care-services` (was `/services`, 301), `/prices`, `/about`, `/advice`, `/advice/[slug]`, `/partners` | Shared pages |
| `/supported-living-foot-care` | Shared care settings page (supported living, learning disabilities and autism, care homes) for managers and support teams. Paired with `/foot-care-services` by the switch at the top of both (`app/components/services/AudienceSwitch.tsx`). No prices. Effects in `app/components/care/`. Replaced `/care-homes-bristol` (redirected). Bristol's group-booking button opens the Splose care home referral form (`bristolReferralForms` in `app/lib/site.ts`) |
| `/book` | Enquiry as five short steps (`app/book/StepsEnquiry.tsx`, sends via `app/api/contact/`). `?postcode=` checks the postcode on arrival, `?service=nails` preselects toenail cutting. `?promo=CODE` pre-fills a promo code. Professional referrals with a Bristol postcode are sent to the Splose referral form (`bristolReferralForms.professional`) |
| `/forms` | Splose patient form, sent to patients after an enquiry |
| `/locations`, `/toenail-cutting`, `/card`, `/review` | Location choosers (`app/components/site/LocationChooser.tsx`); not indexed. `/card` is the appointment-card QR target, `/review` the post-visit review link |
| `/ageuk`, `/ageuk/booked` | Age UK clinic screening and booking. Hidden (link only, noindex). Paused |
| `/privacy`, `/terms` | Legal |
| `/bristol`, `/southampton`, `/areas-we-cover` | Redirects to the pages above |

Other redirects (old area and treatment URLs) are in `next.config.ts`. Keep them indefinitely.

## Shared UI

- `app/components/Header.tsx`, `Footer.tsx`, `site/Doormat.tsx` (footer doorstep scene)
- `app/components/site/`: contact icons, call button, mobile actions, closing CTA, appointment cards
- `app/components/CookieConsent.tsx`: cookie banner; loads GA4 and Meta Pixel only after consent
- `app/seo.ts`, `app/sitemap.ts`, `app/robots.ts`: metadata helpers, sitemap, robots

## Server routes (`app/api/`)

- `contact/`: enquiry email via Resend, plus the patient confirmation email
- `clinic-booking/`, `clinic-booking/slots`, `clinic-booking/webhook`: Age UK clinic, Stripe Checkout and its webhook

Environment variables (set in Vercel): `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_CLINIC_WEBHOOK_SECRET`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. The GitHub workflow uses the secret `GOOGLE_PLACES_API_KEY`.

## Known leftovers

- `components/BrandSeal.jsx` (repo root) isn't imported anywhere.
- Some old home components (`home/RotatingReview.tsx` and others) may be unused since the home redesign. Check imports before deleting.
