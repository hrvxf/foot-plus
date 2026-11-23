# Advice analytics audit

Date: 13 July 2026.

## Findings

- Framework: Next.js App Router with route folders under `app/`.
- Metadata: page-level `Metadata` exports with the root title template `%s | Foot+ Bristol` and `SITE_URL` as canonical domain.
- Sitemap: `app/sitemap.ts` returns static routes from `SITE_URL`.
- Schema: JSON-LD is emitted per page using inline scripts; root layout provides WebSite, LocalBusiness/MedicalBusiness, Organization and Person entities.
- Analytics: GA4 is installed directly in `app/layout.tsx` using `gtag.js` for measurement ID `G-7X749Z34XF`. Meta Pixel is also installed directly.
- GTM: no Google Tag Manager container was found.
- Consent management: no explicit cookie-consent gating component was found in the repository. The new advice events reuse the existing GA4 `gtag` instance and do not initialise analytics again.
- Existing event vocabulary: footer links use `data-analytics-id`, but no central click-event helper was found before this phase.
- Booking: internal `/book` route is the main booking flow. Splose patient forms are embedded on `/forms`; this phase does not modify the Splose form.
- UTM/referrer persistence: no existing attribution helper was found. A lightweight session-only helper now stores non-sensitive first-landing attribution for advice conversion events.

## Measurement caveats

`booking_click` and advice CTA clicks measure lead intent on the Foot+ website. They do not prove a completed third-party appointment unless the external booking provider exposes a supported completion event.

## Privacy review needed

The privacy wording should be reviewed to confirm it accurately describes GA4, Meta Pixel, session-level campaign/referrer attribution and ChatGPT/OpenAI referrer classification. No legal wording was silently changed.
