// Daily Google rating sync for app/lib/reviews.ts (run by .github/workflows/google-reviews.yml).
//
// Updates each location's `rating` (count and average) and `checked` date from
// Google, for every location with a `placeId`. Review text is still added by hand.
//
// Needs GOOGLE_PLACES_API_KEY. Sets `changed=true|false` in $GITHUB_OUTPUT.

import fs from "node:fs";

const FILE = "app/lib/reviews.ts";
const key = process.env.GOOGLE_PLACES_API_KEY;
if (!key) {
  console.error("GOOGLE_PLACES_API_KEY is not set.");
  process.exit(1);
}

let source = fs.readFileSync(FILE, "utf8");

/** Each location's block of source text, from `  key: {` to the next location or the end of the object. */
function locationBlocks(text) {
  const start = text.indexOf("export const reviewLocations");
  const end = text.indexOf("\n};", start);
  const heads = [...text.slice(start, end).matchAll(/^ {2}(\w+): \{$/gm)];
  return heads.map((head, i) => {
    const from = start + head.index;
    const to = i + 1 < heads.length ? start + heads[i + 1].index : end;
    return { from, to, text: text.slice(from, to) };
  });
}

async function fetchRating(placeId) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount" },
  });
  if (!res.ok) throw new Error(`Places API ${res.status} for ${placeId}: ${await res.text()}`);
  const place = await res.json();
  return { average: Math.round((place.rating ?? 0) * 10) / 10, count: place.userRatingCount ?? 0 };
}

const today = new Date().toISOString().slice(0, 10);
const summary = [];

// Last block first, so earlier offsets stay valid as text is edited.
for (const block of locationBlocks(source).reverse()) {
  const placeId = block.text.match(/placeId: "([^"]*)"/)?.[1];
  if (!placeId) continue;
  const label = block.text.match(/label: "([^"]*)"/)?.[1];
  const current = block.text.match(/rating: \{ average: ([\d.]+), count: (\d+) \}/);
  const { average, count } = await fetchRating(placeId);
  if (count === Number(current[2]) && average === Number(current[1])) continue;

  const text = block.text
    .replace(current[0], `rating: { average: ${average.toFixed(1)}, count: ${count} }`)
    .replace(/checked: "[^"]*"/, `checked: "${today}"`);
  source = source.slice(0, block.from) + text + source.slice(block.to);
  summary.push(`${label}: ${Number(current[1]).toFixed(1)} from ${current[2]} → ${average.toFixed(1)} from ${count} reviews`);
}

if (summary.length) fs.writeFileSync(FILE, source);
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=${summary.length > 0}\n`);
console.log(summary.join("\n") || "Rating unchanged.");
