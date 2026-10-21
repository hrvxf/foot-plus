# Advice content: search intents and primary articles

Last reviewed: 21 October 2026.

Each informational search intent has one primary Advice article. Other articles may mention the topic briefly, but they link to the primary article instead of repeating its explanation. Safety signposting (when to seek medical, podiatry or urgent help) is the one exception: every article keeps its own, because a reader may land on any of them.

## Intent map

| Search intent | Primary article | Supporting articles (link to primary, do not repeat it) |
|---|---|---|
| Thick or thickened toenails: causes, treatment, is it fungal, when to worry | `/advice/thickened-toenails-causes-treatment-and-when-to-worry` | difficult-to-cut, older-adult intervals |
| Struggling to cut my own toenails; how to cut toenails safely; who should not | `/advice/why-toenails-are-difficult-to-cut` | thickened toenails, older-adult intervals, maintain good foot health |
| How often toenails should be cut (older adults) | `/advice/how-often-older-adults-should-cut-toenails` | difficult-to-cut, maintain good foot health |
| Everyday foot-care routine (checking, washing, moisturising, footwear) | `/advice/maintain-good-foot-health` | — (hub that points to the nail and skin primaries) |
| Hard skin and callus: causes, prevention, safe care, professional reduction | `/advice/hard-skin-on-feet` | corn/callus/verruca, maintain good foot health |
| Is it a corn, callus or verruca? (telling them apart) | `/advice/corn-callus-or-verruca` | hard skin |
| Heel pain on first steps in the morning | `/advice/why-does-my-heel-hurt-when-i-get-out-of-bed` | — |
| What happens at a home foot-health appointment | `/advice/what-happens-home-foot-health-appointment` | accessible foot care |
| Foot Health Practitioner vs podiatrist vs chiropodist | `/advice/foot-health-practitioner-podiatrist-or-chiropodist` | accessible foot care |
| Accessible foot care for adults with learning disabilities or support needs | `/advice/foot-care-learning-disabilities-bristol` | — |

## Consolidation, 21 October 2026

- `/advice/why-toenails-become-thick` was merged into `/advice/thickened-toenails-causes-treatment-and-when-to-worry`. Both targeted the same intent; the longer guide already covered almost everything. Unique points (big toenail most affected, no power tools, the "Can Foot+ cure thick toenails?" FAQ, service and price links) were carried across. The old URL 301-redirects to the primary (`next.config.ts`), and all internal links were updated.
- Safe home toenail cutting, and the list of people who should not cut their own nails, now live in `/advice/why-toenails-are-difficult-to-cut`. The thickened-toenail guide keeps only thick-nail-specific tips; the intervals guide and the everyday foot-care guide summarise and link.
- The intervals guide no longer re-explains mobility, eyesight and dexterity or thick-nail care; it covers how those affect timing and links out.
- The corn/callus/verruca guide keeps callus to a short definition and links to the hard-skin guide; the hard-skin guide links back for identification.

## Before adding a new guide

Check this table first. If the question is already a primary intent, improve that article instead of publishing a new one. If it is genuinely new, add a row here when it is published.

## Publication gate

Guides only appear publicly when `isPublished: true` and `approvalStatus: "approved"`. Anything else is excluded from `/advice`, article routes, the sitemap and related links.
