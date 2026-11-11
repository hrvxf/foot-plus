# Bristol area pages: consolidation plan

**Status:** done (Nov 2026). All 16 pages redirect to the hub.

**Evidence (Search Console via Windsor.ai, last 30 days):** about 200 impressions and 5 clicks across all 16 pages. Easton had 88 impressions and 1 click, Sneyd Park 38 and 1, Bedminster 30 and 0. St Philips, Old Market and Totterdown had none. The only neighbourhood-specific search was "easton podiatry", with 1 impression. Most impressions came from broad searches like "podiatrist bristol", where the area pages were competing with `/locations/bristol`.

## Why

The 16 `/foot-health-practitioner-*` pages share one template. Services, pricing, process, safety notice and most FAQs are identical, and only the area name, intro, coverage line and nearby links change. Google's spam policies call this a doorway pattern: many similar pages aimed at different place names, all leading to the same booking flow. The usual outcome is not a penalty. Google tends to leave most of these pages out of the index, or treats the site as lower value overall.

The redesigned hub at `/locations/bristol/areas-we-cover` now answers the question these pages target ("do you visit my area?") with a postcode checker, zones, postcode districts and FAQs.

## Step 1: check the evidence (done, see above)

1. **Performance → Pages**, filter URL contains `foot-health-practitioner-`. Note clicks and impressions for each page.
2. **Pages (indexing)**: check whether each URL is indexed, "Crawled – currently not indexed" or "Duplicate, Google chose different canonical".
3. **Security & Manual actions**: confirm there are none.

Fill in the table:

| Page | Indexed? | Impressions | Clicks | Decision |
|---|---|---:|---:|---|
| clifton | | | | |
| redland | | | | |
| cotham | | | | |
| bishopston | | | | |
| henleaze | | | | |
| westbury-on-trym | | | | |
| stoke-bishop | | | | |
| sneyd-park | | | | |
| st-philips | | | | |
| old-market | | | | |
| redcliffe | | | | |
| easton | | | | |
| barton-hill | | | | |
| totterdown | | | | |
| southville | | | | |
| bedminster | | | | |

**Rule of thumb:** keep a page only if it gets real impressions or clicks, **or** you can add content that only makes sense for that area (local partners, reviews from local patients, care homes you visit, specific access issues). Redirect the rest.

## Step 2: redirect map

Each page redirects to its area section on the hub:

| From | To |
|---|---|
| /foot-health-practitioner-clifton | /locations/bristol/areas-we-cover#west |
| /foot-health-practitioner-redland | /locations/bristol/areas-we-cover#north |
| /foot-health-practitioner-cotham | /locations/bristol/areas-we-cover#north |
| /foot-health-practitioner-st-philips | /locations/bristol/areas-we-cover#central |
| /foot-health-practitioner-old-market | /locations/bristol/areas-we-cover#central |
| /foot-health-practitioner-redcliffe | /locations/bristol/areas-we-cover#central |
| /foot-health-practitioner-bishopston | /locations/bristol/areas-we-cover#north |
| /foot-health-practitioner-henleaze | /locations/bristol/areas-we-cover#north |
| /foot-health-practitioner-westbury-on-trym | /locations/bristol/areas-we-cover#north |
| /foot-health-practitioner-stoke-bishop | /locations/bristol/areas-we-cover#north |
| /foot-health-practitioner-sneyd-park | /locations/bristol/areas-we-cover#north |
| /foot-health-practitioner-easton | /locations/bristol/areas-we-cover#east |
| /foot-health-practitioner-barton-hill | /locations/bristol/areas-we-cover#east |
| /foot-health-practitioner-totterdown | /locations/bristol/areas-we-cover#south |
| /foot-health-practitioner-southville | /locations/bristol/areas-we-cover#south |
| /foot-health-practitioner-bedminster | /locations/bristol/areas-we-cover#south |

Note: Google drops the `#anchor` when indexing, so every redirect consolidates into the hub URL. The anchor only scrolls visitors to the right section.

## Step 3: switch on (for each page you're redirecting)

1. Add an entry to `redirects()` in `next.config.ts`:

   ```ts
   {
     source: "/foot-health-practitioner-clifton",
     destination: "/locations/bristol/areas-we-cover#west",
     permanent: true,
   },
   ```

2. Delete the route folder `app/foot-health-practitioner-<area>/`. A route that still exists is matched before the redirect.
3. Remove the URL from `app/sitemap.ts`.
4. Remove its entry from `locationPages` in `app/lib/location-pages.ts`. Its name becomes a plain chip on the hub automatically, and `nearby` links on any remaining pages need updating.
5. Update internal links that point at the old URL (`grep -rn "foot-health-practitioner-<area>" app`).

## Step 4: after launch

- In Search Console, use URL Inspection on the hub and request indexing.
- Recheck **Performance** for the hub after 4 to 6 weeks. Neighbourhood queries should show up against the hub.
- Keep the old redirects in place indefinitely.
