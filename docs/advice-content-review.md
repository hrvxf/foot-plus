# Advice content review

Date: 13 July 2026.

Six advice guides exist as draft content in `app/lib/advice.ts`, but none are public because every guide still requires Adam's factual confirmation. Draft guides have `isPublished: false` and `approvalStatus: "awaiting_adam_confirmation"`, so they are excluded from `/advice` guide lists, article route generation, sitemap output and public related links.

| Article | Facts requiring practitioner confirmation | Foot+ procedures mentioned | Safety/professional-scope review | Missing references | Status |
|---|---|---|---|---|---|
| Corn, Callus or Verruca | Confirm corn/callus service scope wording | Corn care, callus reduction, hard-skin care | Verruca not claimed as Foot+ treatment | None known | Draft only |
| Why Do Toenails Become Thick? | Confirm thickened-nail reduction wording | Routine nail cutting and conservative thick nail reduction | Fungal infection not diagnosed | None known | Draft only |
| How Often Should Older Adults Have Their Toenails Cut? | Confirm preferred interval wording | Routine nail care home visits | Avoids universal interval | None known | Draft only |
| What Happens During a Home Foot Health Appointment? | Confirm preparation, consent, hygiene and record-keeping wording | Nail care, hard skin, callus, suitable corn care, cracked heel maintenance | Several operational TODOs remain | Operational references are internal only | Draft only |
| Hard Skin on Feet | Confirm maintenance/prevention wording | Hard-skin and callus reduction | No permanent-removal claim | None known | Draft only |
| FHP, Podiatrist or Chiropodist | Confirm professional-boundary wording | Routine FHP care only | Protected-title wording needs Adam review | None known | Draft only |

## Publication rule

A guide may be made public only after Adam confirms the factual/procedure/scope wording. To publish a guide, set `approvalStatus: "approved"` and `isPublished: true`; the existing helpers will then include it in public lists, static article route generation, sitemap output and related-guide links.
