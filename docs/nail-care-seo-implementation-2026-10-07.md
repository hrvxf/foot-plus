# Foot+ SEO implementation, 7 October 2026

Foot+ remains a broad home-visit foot-care service. Routine nail care is the main acquisition focus, led by `/toenail-cutting-bristol`.

## What changed

| Area | Implementation |
| --- | --- |
| Technical foundations | Verified existing HTTP and www redirects preserve page paths. Kept the non-www host. Removed the `/areas` redirect chain. The old Bristol practitioner URL now points to the Bristol location hub. |
| Page roles | Homepage owns brand and home nail/foot care; Bristol owns broad local care; toenail-cutting page owns Bristol nail-service intent; Services owns the full offering; Prices explains appointment costs; About establishes practitioners and standards. |
| Nail-care page | Replaced generic condition layout with service introduction, suitability, inclusions, first/returning prices, thickened-nail scope, credentials, Bristol coverage, request steps, FAQs and related guides. |
| Homepage | Leads with professional nail and foot care at home, directly links to Bristol nail cutting and prioritises relevant advice. Other services remain visible. |
| Bristol | Clear broad home-care title, nail care first in the service links, practitioner link and local provider schema. |
| Services and prices | Retained all routine treatments; explains that nail cutting uses the standard £60 first / £55 returning appointment prices, with travel supplements confirmed before booking. Removed duplicated Foot+ price-page title suffix. |
| Practitioner trust | Restored `/about` as an indexable page with Adam and Katie, documented foot-health qualifications, memberships, standards and professional scope. Links from navigation, footer, service and advice pages. No unsupported superlatives or fabricated reviews. |
| Locations | Bristol and Southampton have separate business/service entities. Southampton retains its 7 November 2026 launch status, enquiry route and distinct coverage copy. |
| Advice cluster | Linked existing thick-nail and interval guides; rewrote the home-appointment guide to remove exposed editing notes; added a guide explaining why nails can become difficult to cut. |
| Internal links and schema | Removed redirected coverage/launch links, aligned Adam’s author identity, and pointed Bristol treatment providers to the Bristol business. Nail Service offers, FAQs and breadcrumbs correspond to visible content. |
| Sitemap | Added About and the new guide. Advice last-modified values now use article dates. Legacy redirected routes remain excluded. |
| Measurement | Captures first landing page before a later CTA, supports UK Google referrals, distinguishes booking/contact clicks from `generate_lead` after an enquiry succeeds. Records location and broad service interest, without adding patient name, email, phone, postcode or clinical notes to the new event. Analytics errors cannot block enquiry completion. |

The homepage continues to serve both locations. Southampton was not removed or falsely presented as already open. Existing neighbourhood pages were retained; no new templated neighbourhood pages were added.

## Evidence and limits

The pre-change HTTP audit is in `seo-baseline-2026-10-07.json`. It confirmed the main pages already used non-www self-referencing canonicals. Historic Search Console hostname results did not justify changing working host configuration.

The previous Search Console excerpt supplied in conversation reported 157 impressions, 0 clicks, 0% CTR and position 10.3 for the Bristol nail page. Its reporting window is not available here, so it is context, not a verified comparable baseline.

No Search Console or GA4 account connector was available for fetching a fresh account baseline, submitting indexing requests or changing key-event settings. No customer enquiry was sent to test email delivery. Read-only checks cover rendered SEO output; the tracking test uses mocked analytics and storage.

## Indexing after deployment

Submit or re-submit `https://foot-plus.co.uk/sitemap.xml` in the correct Search Console property. Prioritise these URL Inspection requests:

1. https://foot-plus.co.uk/
2. https://foot-plus.co.uk/locations/bristol
3. https://foot-plus.co.uk/toenail-cutting-bristol
4. https://foot-plus.co.uk/services
5. https://foot-plus.co.uk/prices
6. https://foot-plus.co.uk/about
7. https://foot-plus.co.uk/locations/bristol/areas-we-cover
8. https://foot-plus.co.uk/advice/what-happens-home-foot-health-appointment
9. https://foot-plus.co.uk/advice/why-toenails-are-difficult-to-cut
10. https://foot-plus.co.uk/locations/southampton

The existing thickened-nail and older-adult interval guides remain in the sitemap. Do not request indexing of `/areas`, `/areas-we-cover`, `/bristol`, `/southampton`, www variants or location query-string variants.

## How to measure

Before indexing, export Search Console’s last 28 days and previous 28 days for each priority commercial page. Keep the exact date windows, device and country filters. Export query groups for nail cutting, broader Bristol care and branded searches. Historical totals cannot establish that Southampton caused a Bristol change.

Check indexing and obvious crawl problems after approximately one week. Compare the first full 28 days after release with the preceding 28 days, then assess approximately 8–12 weeks of data. Avoid repeated structural changes while collecting useful evidence.

| Measure | Question |
| --- | --- |
| Nail-query impressions and positions | Is Foot+ appearing for the intended service searches? |
| CTR and clicks by query/page | Are the new result titles and descriptions attracting visits? |
| Organic landing sessions | Which page brings visitors into the site? |
| `booking_click`, `phone_click`, `email_click`, `whatsapp_click` | Which visitors express contact intent? |
| `generate_lead` | Did the enquiry API return success? Bristol enquiries and Southampton launch interest are distinguished. |
| Practitioner booking records | Did an enquiry become a confirmed appointment and revenue? |

In GA4, consider `generate_lead` as the enquiry key event. Keep booking-click intent separate from confirmed bookings. Configure event-scoped dimensions for `service_location`, `service_interest`, `lead_type`, `source_page` and `landing_page` where useful. A successful email-service response is not proof of inbox delivery or a confirmed appointment.

Future nail content should address a distinct unmet question. Review performance and the existing thick-nail guides before adding further overlapping articles. Build relevant local business links and accurate listings as ongoing work, without claiming a qualification or service Foot+ does not provide.

## Reusable checks

- `npm run build`
- `node scripts/verify-attribution.cjs`
- Against a running local build: `python scripts/verify-seo.py`
- Against production: `python scripts/verify-seo.py https://foot-plus.co.uk`

The SEO check checks every sitemap page for HTTP 200, one self-referencing canonical, one H1, indexability and parseable JSON-LD. It also checks internal page destinations, five legacy redirects, nail-care prices/provider and practitioner anchors.
