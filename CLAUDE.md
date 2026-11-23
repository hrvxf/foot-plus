# Foot+ website

Layer 0 of this repo's ICM (Interpretable Context Methodology) map: read this first, then `CONTEXT.md` to find where to go. Read down only as far as the task needs.

## What this is

The site at https://foot-plus.co.uk for Foot+, home-visit foot care (toenail cutting and routine foot care). Next.js 16 App Router, TypeScript, Tailwind 4, hosted on Vercel. `main` deploys to production; every pushed branch gets a Vercel preview.

Two locations share the brand:
- **Bristol**: Adam James (owner). Base BS2 0QF.
- **Southampton**: Katie Preston, her own independent practice under the Foot+ name. Base SO16 5LF.

Shared pages (home, services, prices, advice) serve both and must not name one location. Location pages, `-bristol` and `-southampton` pages belong to one.

## Rules that always apply

- **Never invent** services, qualifications, prices, coverage areas, reviews or partners. Facts come from `app/lib/` (see `CONTEXT.md`) or from Adam.
- **Never imply a protected title** ("chiropodist", "podiatrist"). The practitioners are Foot Health Practitioners. Review text is checked for this at build time.
- **SEO and Google rankings are the top priority.** Keep one page per search intent; don't add near-duplicate pages.
- **Copy:** short, warm, plain, British spelling, no em dashes. No repetition between sections.
- **Design:** premium, understated, editorial. Mobile first; each section fits one phone screen. No generic healthcare templates, tile grids or stock photos. Brand colours and fonts: `docs/04-brand-and-promo/brand-guide.md`.
- **Privacy:** patient data stays in Splose. Analytics only after cookie consent. Never publish Adam's home address.
- **Adam reviews before anything goes live:** branch → PR → Vercel preview → he merges. Never push to `main`.

## Map

| Path | What's there |
|---|---|
| `CONTEXT.md` | Layer 1: task routing. Which folder and files to read for each kind of job |
| `app/` | Routes (one folder per URL), `app/api/` server routes |
| `app/lib/` | Single source of truth for content and facts: locations, prices, services, reviews, partners, advice |
| `app/components/` | UI, grouped by page (`home/`, `location/`, `site/` for shared blocks) |
| `public/images/` | Photos and logos |
| `scripts/` | SEO, attribution and Google rating checks |
| `.github/workflows/` | Daily Google rating sync (commits to `main`) |
| `docs/` | Layers 2–3: workflow contract and reference material, in numbered folders |

## Before every commit

```bash
npx tsc --noEmit -p .
npx eslint <changed paths>
npm run build
```

Then remove any stray `AGENTS.md` the Next.js tooling generates. Full workflow: `docs/01-workflow/CONTEXT.md`.
