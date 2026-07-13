# Location page content audit

Audited `/areas-we-cover` plus every `LocalServicePage` route in `app/lib/location-pages.ts`. Original counts are from the pre-edit `HEAD` version; revised counts are from the completed data/component pass. Counts are approximate visible-copy counts from content data, before shared component chrome.

## Architecture identified

- Hub route: `/areas-we-cover` in `app/areas-we-cover/page.tsx`.
- Individual location routes: static route folders under `app/foot-health-practitioner-*` that call `getLocationPage(...)` and render `LocalServicePage`.
- Shared component: `app/components/locations/LocationPage.tsx`.
- Location content source, nearby relationships and metadata values: `app/lib/location-pages.ts`.
- Shared services, appointment process, safety notice and pricing display: `app/components/locations/LocationPage.tsx`, with price values from `app/lib/site.ts`.
- FAQ data: `faqs` on each location entry in `app/lib/location-pages.ts`; visible FAQs match `FAQPage` schema because route files map `page.faqs`.
- Schema generation: individual route files generate `Service`, `BreadcrumbList` and `FAQPage`; provider now uses the Foot+ organization ID on location pages.
- No location-specific practitioner/author component was found in the location page architecture.

## Route audit table

| Route | Area | Original words | Original intro words | Revised words | Revised intro words | Local information present | Repeated sections | Nearby links | FAQ count | Adam refs before→after | Metadata uniqueness | Recommended changes/status |
|---|---:|---:|---:|---:|---:|---|---|---:|---:|---:|---|---|
| /foot-health-practitioner-clifton | Clifton | 554 | 122 | 476 | 86 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 2 | 4 | 2→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-redland | Redland | 527 | 111 | 501 | 92 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 1→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-cotham | Cotham | 553 | 112 | 495 | 90 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 2→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-bishopston | Bishopston | 527 | 115 | 477 | 87 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 2 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-henleaze | Henleaze | 335 | 12 | 476 | 87 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 2 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-westbury-on-trym | Westbury-on-Trym | 309 | 13 | 475 | 85 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 2 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-stoke-bishop | Stoke Bishop | 382 | 15 | 509 | 92 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-sneyd-park | Sneyd Park | 365 | 14 | 509 | 92 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-st-philips | St Philips | 387 | 15 | 512 | 93 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-old-market | Old Market | 367 | 15 | 513 | 93 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-redcliffe | Redcliffe | 367 | 14 | 498 | 92 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-easton | Easton | 362 | 16 | 498 | 92 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-barton-hill | Barton Hill | 367 | 14 | 516 | 94 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-totterdown | Totterdown | 358 | 14 | 495 | 91 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 3 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-southville | Southville | 522 | 114 | 485 | 90 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 2 | 4 | 1→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |
| /foot-health-practitioner-bedminster | Bedminster | 519 | 111 | 482 | 89 | Unique intro, coverage, access note, nearby links and local FAQs. | Duplicate service intro and common-reasons list removed/merged. | 2 | 4 | 0→0 | Unique title and area-specific description. | Revised to concise shared structure; local details retained for review. |

## Nearby-area relationship map

- `/foot-health-practitioner-clifton` → Redland, Cotham
- `/foot-health-practitioner-redland` → Clifton, Cotham, Bishopston
- `/foot-health-practitioner-cotham` → Clifton, Redland, Bishopston
- `/foot-health-practitioner-bishopston` → Redland, Cotham
- `/foot-health-practitioner-henleaze` → Bishopston, Westbury-on-Trym
- `/foot-health-practitioner-westbury-on-trym` → Henleaze, Stoke Bishop
- `/foot-health-practitioner-stoke-bishop` → Sneyd Park, Westbury-on-Trym, Clifton
- `/foot-health-practitioner-sneyd-park` → Stoke Bishop, Clifton, Westbury-on-Trym
- `/foot-health-practitioner-st-philips` → Old Market, Redcliffe, Barton Hill
- `/foot-health-practitioner-old-market` → St Philips, Easton, Redcliffe
- `/foot-health-practitioner-redcliffe` → St Philips, Old Market, Totterdown
- `/foot-health-practitioner-easton` → Old Market, Barton Hill, Totterdown
- `/foot-health-practitioner-barton-hill` → Easton, St Philips, Old Market
- `/foot-health-practitioner-totterdown` → Bedminster, Southville, Redcliffe
- `/foot-health-practitioner-southville` → Bedminster, Totterdown
- `/foot-health-practitioner-bedminster` → Southville, Totterdown

## Summary metrics

- Original average content-data word count: 425 words.
- Revised average content-data word count: 495 words.
- Shared visible page structure now follows: breadcrumbs, eyebrow, H1, one intro, CTAs, services, local coverage/access, who home visits help, appointment process, pricing, nearby areas, FAQs, safety notice and final CTA.
- Pricing wording used: “An initial appointment covering relevant health information, foot-health observations and appropriate routine treatment.” Routine appointment wording remains shared from `app/lib/site.ts`.
- Practitioner confirmation: the former “full neurovascular assessment” claim was replaced with safer wording pending explicit confirmation.
- Schema impact: `FAQPage` continues to be generated from the visible `page.faqs`; `Service` provider references now point to `https://foot-plus.co.uk/#organization`; `BreadcrumbList` patterns remain unchanged.
