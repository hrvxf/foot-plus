# Change workflow

Layer 2 stage contract. Every change that ships goes through these stages in order. Adam checks the output of each stage before the next starts, usually on his phone.

| Stage | Input | Do | Output | Done when |
|---|---|---|---|---|
| 1. Brief | Adam's request | Read the relevant `app/lib/` files and the matching `docs/` folder. Ask only if a fact is missing; never fill it in. | A short plan | Adam has the plan or the request was clear enough to start |
| 2. Options (design work only) | The plan | Build 2–4 clickable prototypes as claude.ai artifacts, with an option switcher. Mobile first. | Prototype links | Adam picks one. He often rejects all of them; then try a new direction |
| 3. Build | Chosen option | New branch from `main`. Change code; reuse existing components and `app/lib/` data. | Commits on the branch | Checks below pass |
| 4. Pull request | The branch | Open a PR with a plain-language summary of what changed and why | PR link | PR is open |
| 5. Preview | The PR | Find the Vercel preview for the head commit and send it to Adam | Preview link | Adam has looked on his phone |
| 6. Merge | Adam's OK | Adam merges. Don't call anything live until the PR shows as merged | Live change | `merged` is `true` |

## Checks before each commit

```bash
npx tsc --noEmit -p .
npx eslint <changed paths>
npm run build
python scripts/verify-seo.py http://127.0.0.1:3000   # after `npm start`, when pages, titles or links change
node scripts/verify-attribution.cjs                   # when analytics attribution code changes
```

- Delete any stray `AGENTS.md` that Next.js generates; it isn't part of the repo.
- Screenshot changed pages with Playwright at 390×844 (Chrome at `/usr/bin/google-chrome`). Kill any old `next-server` before `next start`. `html` uses smooth scrolling, so set `document.documentElement.style.scrollBehavior = 'auto'` in scripts before jumping.

## GitHub commands

- `gh pr create` is blocked in Claude sessions. Open PRs with
  `gh api repos/hrvxf/foot-plus/pulls -f title=… -f head=<branch> -f base=main -f body=…`
- Adam often merges quickly. **Before pushing to an existing PR branch**, check
  `gh api repos/hrvxf/foot-plus/pulls/<n> --jq .merged` and push only if it prints `false` (use an `if`, not `&&`). If it's merged, open a new PR for the follow-up commits.
- Preview URL: `gh api "repos/hrvxf/foot-plus/deployments?sha=<sha>"`, then that deployment's `statuses`. Allow about 100 seconds after the push.
- The Google rating workflow commits to `main` daily at 07:17 UTC, so rebase long-lived branches before opening a PR.

## Review preferences Adam has given

- Less copy. No duplication between sections, including repeated photos and prices.
- Each section fits one phone screen; centred on mobile; desktop simpler.
- No heavy underlines on links. Footer links in Foot+ green.
- Smooth transitions; nothing that shifts layout as it animates or when the keyboard opens.
- Blocks no bigger or more padded than their content.
