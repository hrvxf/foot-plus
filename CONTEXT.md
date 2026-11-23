# Where to go

Layer 1 of the ICM map. Find the task, read what the row lists, and stop when you have enough. Every code change also follows `docs/01-workflow/CONTEXT.md`.

## By task

| Task | Read | Facts live in |
|---|---|---|
| Any change that ships | `docs/01-workflow/CONTEXT.md` | |
| Find a page, component or data file | `docs/02-site-map/CONTEXT.md` | |
| Change prices, services or treatments | `docs/02-site-map/CONTEXT.md` | `app/lib/site.ts` (`prices`), `app/lib/services.ts`, `app/lib/treatments.ts` |
| Location, practitioner, phone, email, coverage | `docs/02-site-map/CONTEXT.md` | `app/lib/locations.ts`, `app/lib/site.ts`, `app/lib/postcodes.ts`, `app/lib/travel.ts` |
| Add a Google review | `docs/02-site-map/CONTEXT.md` | `app/lib/reviews.ts` (text by hand; rating synced daily) |
| SEO, page titles, new pages, redirects, Advice articles | `docs/03-seo-and-content/CONTEXT.md` | `app/seo.ts`, `app/sitemap.ts`, `next.config.ts`, `app/lib/advice.ts` |
| Promo graphic, campaign, brand colours and fonts | `docs/04-brand-and-promo/CONTEXT.md` | `docs/04-brand-and-promo/brand-guide.md` |
| Partners page, outreach, backlinks | `docs/05-partnerships/CONTEXT.md` | `app/lib/partners.ts` |
| Tracking, cookies, GA4, Meta Pixel | `docs/06-analytics/CONTEXT.md` | `app/components/CookieConsent.tsx`, `app/components/AnalyticsClickTracker.tsx` |
| Age UK nail clinic (paused) | `docs/02-site-map/CONTEXT.md` | `app/lib/clinic.ts`, `app/ageuk/`, `app/api/clinic-booking/` |
| Seasonal notes (Christmas hours) | | `app/lib/season.ts` |
| Old audits, for history only | `docs/_archive/CONTEXT.md` | |

## Folders

```
CLAUDE.md                 Layer 0: identity, rules, map (always read)
CONTEXT.md                Layer 1: this file
docs/
  01-workflow/            Layer 2: the change workflow, as a stage contract
  02-site-map/            Layer 3: where code and facts live
  03-seo-and-content/     Layer 3: search intents, SEO decisions, listings
  04-brand-and-promo/     Layer 3: brand guide, promo template and renders
  05-partnerships/        Layer 3: partner outreach and tracker
  06-analytics/           Layer 3: what is tracked and how to read it
  _archive/               Superseded audits; don't act on them
```

Each folder's `CONTEXT.md` says what's in it and when to use it. When you add a doc, put it in the matching folder and list it in that folder's `CONTEXT.md`. When a doc stops matching the code, update it or move it to `_archive/`.
