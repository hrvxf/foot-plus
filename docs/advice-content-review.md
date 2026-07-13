# Advice content publication status

The six advice guides in `app/lib/advice.ts` are approved for publication. Each current guide has `isPublished: true` and `approvalStatus: "approved"`, so the existing helpers include them in `/advice` guide lists, article route generation, sitemap output and related-guide links.

Future guides should still use the publication gate. Draft or unconfirmed guides should remain unpublished by setting `isPublished: false` or an approval status other than `"approved"`; they will then be excluded from public lists, static article route generation, sitemap output and public related links.

## Current published guides

- `/advice/corn-callus-or-verruca`
- `/advice/why-toenails-become-thick`
- `/advice/how-often-older-adults-should-cut-toenails`
- `/advice/what-happens-home-foot-health-appointment`
- `/advice/hard-skin-on-feet`
- `/advice/foot-health-practitioner-podiatrist-or-chiropodist`
