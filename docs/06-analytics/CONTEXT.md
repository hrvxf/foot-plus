# Analytics

Layer 3 reference. Read before adding or changing tracking, the cookie banner or the privacy page's cookie table.

## How it works now

- Nothing loads until the visitor accepts cookies: `app/components/CookieConsent.tsx` loads GA4 and the Meta Pixel after consent.
- `app/components/AnalyticsClickTracker.tsx` records taps on booking, patient form, phone, email, WhatsApp and Google review links site-wide, with the link's `data-analytics-id` as `cta_id` so you can tell which button was used. Give new buttons a `data-analytics-id`. The event helpers and session first-landing attribution live in `app/components/advice/AdviceTracker.tsx`.
- Never send names, contact details or full postcodes. Out-of-area postcodes are recorded as the outward part only (e.g. `BA1`).
- When tracking changes, update the cookie table on `/privacy` in the same PR.
- Run `node scripts/verify-attribution.cjs` after changing attribution code.

The code is the record of which events exist; search for `gtag(` and `fbq(` rather than keeping a list here.

## Files

| File | What it is |
|---|---|
| `advice-measurement-plan.md` | How to measure Advice articles in Search Console and GA4, and the scorecard to fill in |
