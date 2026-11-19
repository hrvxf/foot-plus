// Daily Google reviews sync for app/lib/reviews.ts (run by .github/workflows/google-reviews.yml).
//
//   node scripts/sync-google-reviews.mjs rating    -> updates each location's rating (count, average)
//   node scripts/sync-google-reviews.mjs reviews   -> drafts new Google reviews into the list
//
// Needs GOOGLE_PLACES_API_KEY. Writes a short summary for the workflow to
// $SYNC_SUMMARY (default: .sync-summary.md) and sets outputs in $GITHUB_OUTPUT.
//
// Google's Places API only returns up to 5 reviews per place, so a new review
// may not show up here. If the count goes up but no new review is found, the
// summary says so and the workflow opens an issue instead.

import fs from "node:fs";

const FILE = "app/lib/reviews.ts";
const PROTECTED_TITLES = /chiropod|podiatr/i;
const mode = process.argv[2];
const key = process.env.GOOGLE_PLACES_API_KEY;

if (!["rating", "reviews"].includes(mode)) {
  console.error("Usage: node scripts/sync-google-reviews.mjs rating|reviews");
  process.exit(1);
}
if (!key) {
  console.error("GOOGLE_PLACES_API_KEY is not set.");
  process.exit(1);
}

let source = fs.readFileSync(FILE, "utf8");

/** Each location's block of source text, from `  key: {` to the next location or the end of the object. */
function locationBlocks(text) {
  const start = text.indexOf("export const reviewLocations");
  const end = text.indexOf("\n};", start);
  const body = text.slice(start, end);
  const heads = [...body.matchAll(/^ {2}(\w+): \{$/gm)];
  return heads.map((head, i) => {
    const from = start + head.index;
    const to = i + 1 < heads.length ? start + heads[i + 1].index : end;
    return { key: head[1], from, to, text: text.slice(from, to) };
  });
}

function field(block, name) {
  const match = block.match(new RegExp(`${name}: "([^"]*)"`));
  return match ? match[1] : "";
}

/** "Jay Tee" -> "Jay T.", "Dunnerz" -> "Dunnerz" (matches how names are written in reviews.ts). */
function shortName(displayName) {
  const parts = displayName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

async function fetchPlace(placeId) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
  });
  if (!res.ok) throw new Error(`Places API ${res.status} for ${placeId}: ${await res.text()}`);
  return res.json();
}

const today = new Date().toISOString().slice(0, 10);
const summary = [];
let changed = false;
let missing = false;

// Work from the last block back so earlier offsets stay valid as text is edited.
for (const block of locationBlocks(source).reverse()) {
  const placeId = field(block.text, "placeId");
  if (!placeId) continue;
  const label = field(block.text, "label") || block.key;
  const place = await fetchPlace(placeId);
  let text = block.text;

  const ratingMatch = text.match(/rating: \{ average: ([\d.]+), count: (\d+) \}/);
  const oldAverage = Number(ratingMatch[1]);
  const oldCount = Number(ratingMatch[2]);
  const average = Math.round((place.rating ?? 0) * 10) / 10;
  const count = place.userRatingCount ?? 0;

  const known = new Set(
    [
      ...[...text.matchAll(/name: "([^"]*)"/g)].map((m) => m[1]),
      ...[...(text.match(/notShown: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([^"]*)"/g)].map((m) => m[1]),
    ].map(normalise)
  );
  const knownText = normalise(text);
  const fresh = (place.reviews ?? []).filter((review) => {
    const name = shortName(review.authorAttribution?.displayName ?? "");
    const body = (review.originalText ?? review.text)?.text ?? "";
    const opening = normalise(body).split(" ").slice(0, 8).join(" ");
    return !known.has(normalise(name)) && !(opening && knownText.includes(opening));
  });


  if (mode === "rating") {
    if (count !== oldCount || average !== oldAverage) {
      text = text
        .replace(ratingMatch[0], `rating: { average: ${average.toFixed(1)}, count: ${count} }`)
        .replace(/checked: "[^"]*"/, `checked: "${today}"`);
      summary.push(`- ${label}: ${oldAverage.toFixed(1)} from ${oldCount} → ${average.toFixed(1)} from ${count} reviews`);
      changed = true;
    }
    if (count > oldCount && !fresh.length) {
      summary.push(`- ${label}: Google shows ${count} reviews (site had ${oldCount}), but the new one isn't in Google's feed of 5, so it needs adding by hand.`);
      missing = true;
    }
  }

  if (mode === "reviews") {
    if (fresh.length) {
      const entries = fresh
        .map((review) => {
          const name = shortName(review.authorAttribution.displayName);
          const body = ((review.originalText ?? review.text)?.text ?? "").replace(/\s*\n+\s*/g, " ").trim();
          const flag = PROTECTED_TITLES.test(body)
            ? "        // TODO: mentions a protected title, trim that part with \"…\" before merging.\n"
            : "";
          summary.push(
            `- **${name}** (${label}, ${review.rating}★)${PROTECTED_TITLES.test(body) ? " ⚠️ mentions chiropodist/podiatrist: trim before merging" : ""}\n  > ${body}`
          );
          return [
            "      {",
            "        // Added by the daily Google sync. Check before merging.",
            flag + `        name: ${JSON.stringify(name)},`,
            `        month: "${(review.publishTime ?? today).slice(0, 7)}",`,
            `        rating: ${review.rating},`,
            `        text: ${JSON.stringify(body)},`,
            "      },",
          ].join("\n");
        })
        .join("\n");
      text = text.replace(/reviews: \[\n/, `reviews: [\n${entries}\n`).replace(/reviews: \[\],/, `reviews: [\n${entries}\n    ],`);
      changed = true;
    }
  }

  source = source.slice(0, block.from) + text + source.slice(block.to);
}

if (changed) fs.writeFileSync(FILE, source);
fs.writeFileSync(process.env.SYNC_SUMMARY ?? ".sync-summary.md", summary.join("\n") + "\n");
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\nmissing=${missing}\n`);
}
console.log(summary.join("\n") || "No changes.");
