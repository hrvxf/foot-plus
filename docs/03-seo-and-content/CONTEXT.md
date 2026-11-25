# SEO and content

Layer 3 reference. SEO and Google rankings are the site's top priority. Read this before adding or renaming a page, changing a title or description, adding redirects, or writing Advice.

## Rules

- One page per search intent. Before adding a page, check nothing already covers the intent; extend that page instead. 16 near-identical area pages were removed for this reason.
- Shared pages stay location-neutral; town-specific intent goes on `-bristol` / `-southampton` pages or the location pages.
- Every moved or removed URL gets a permanent redirect in `next.config.ts`, kept indefinitely.
- Visible FAQs and FAQPage structured data must match.
- When a page's visible content changes, bump its date in `app/sitemap.ts` (Advice uses `dateModified` in `app/lib/advice.ts`). Routing and utility pages (`/locations`, `/forms`, `/toenail-cutting`) are `noindex` and stay out of the sitemap.
- Google titles: keep under about 60 characters and end with `| Foot+` (never "Foot Plus" or "Foot+ Bristol" on shared pages). Put town names in the description when they would push the title over.
- Run `python scripts/verify-seo.py http://127.0.0.1:3000` against a local `npm start` after SEO changes.

## Files

| File | Use it for | Status |
|---|---|---|
| `advice-content-review.md` | Intent map: which Advice article is primary for each search intent | Current (21 Oct 2026). Update when an article is added or merged |
| `area-pages-consolidation.md` | Why the 16 Bristol area pages became one hub, and the evidence | Done (Nov 2026). Record of the decision |
| `nail-care-seo-implementation-2026-10-07.md` | Page roles and changes from the October SEO pass | Dated record. The home and location pages have since been redesigned; check the code for current layout |
| `seo-baseline-2026-10-07.json` | Titles, canonicals and status codes captured 7 Oct 2026, for before/after comparison | Snapshot. Don't edit |
| `seo-third-party-listings.md` | Checklist for keeping external listings consistent | Current (23 Nov 2026) |

## Where SEO lives in code

- `app/seo.ts`: shared metadata helpers. `app/sitemap.ts`, `app/robots.ts`.
- Structured data: root `app/layout.tsx` (Organization, WebSite, Person), location pages (MedicalBusiness, Service, FAQPage from `app/lib/locationFaqs.ts`). Nail-cutting, treatment and Advice pages carry their own FAQPage data.
- Advice articles: `app/lib/advice.ts`, rendered by `app/advice/[slug]/`.
