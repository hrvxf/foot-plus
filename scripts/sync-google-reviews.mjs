// Daily Google rating sync for app/lib/reviews.ts (run by .github/workflows/google-reviews.yml).
//
// Updates each location's `rating` (count and average) and `checked` date from
// Google, for every location with a `placeId`. A location with no `placeId` but a
// `placeName` is looked up by name first, and its ID saved. If its `writeUrl` is a
// g.page review link, only the listing that link points to is accepted (the link
// and the place ID both contain the listing's number), so a similar name can't
// be picked by mistake. Review text is still added by hand.
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

const normalise = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

/** The listing number in a g.page/r/<code>/review link, or null. */
function listingFromReviewLink(url) {
  const code = url.match(/g\.page\/r\/([\w-]+)/)?.[1];
  if (!code) return null;
  const bytes = Buffer.from(code, "base64url");
  return bytes[0] === 0x09 && bytes.length >= 9 ? bytes.readBigUInt64LE(1) : null;
}

/** The listing number in a "ChIJ…" place ID, or null. */
function listingFromPlaceId(id) {
  const bytes = Buffer.from(id, "base64url");
  return bytes[0] === 0x0a && bytes[11] === 0x11 && bytes.length >= 20 ? bytes.readBigUInt64LE(12) : null;
}

/**
 * The place ID for `name`: the result matching `listing` if given, otherwise the
 * one result named exactly `name`. Null if there isn't one.
 */
async function findPlaceId(name, listing) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id,places.displayName",
    },
    body: JSON.stringify({ textQuery: name, regionCode: "GB" }),
  });
  if (!res.ok) throw new Error(`Places search ${res.status} for "${name}": ${await res.text()}`);
  const matches = ((await res.json()).places ?? []).filter((place) =>
    listing
      ? listingFromPlaceId(place.id) === listing
      : normalise(place.displayName?.text ?? "") === normalise(name)
  );
  return matches.length === 1 ? matches[0].id : null;
}

const today = new Date().toISOString().slice(0, 10);
const summary = [];

// Last block first, so earlier offsets stay valid as text is edited.
for (const block of locationBlocks(source).reverse()) {
  const label = block.text.match(/label: "([^"]*)"/)?.[1];
  let text = block.text;
  let placeId = text.match(/placeId: "([^"]*)"/)?.[1];
  let found = false;
  if (!placeId) {
    const name = text.match(/placeName: "([^"]*)"/)?.[1];
    if (!name) continue;
    const listing = listingFromReviewLink(text.match(/writeUrl: "([^"]*)"/)?.[1] ?? "");
    placeId = await findPlaceId(name, listing);
    if (!placeId) {
      console.log(
        listing
          ? `${label}: the listing in its review link isn't in Google's search results for "${name}" yet.`
          : `${label}: no single Google listing named "${name}" yet.`
      );
      continue;
    }
    text = text.replace(/placeId: ""/, `placeId: "${placeId}"`);
    summary.push(`${label}: found Google listing "${name}" (${placeId})`);
    found = true;
  }
  const current = text.match(/rating: \{ average: ([\d.]+), count: (\d+) \}/);
  const { average, count } = await fetchRating(placeId);
  if (count === Number(current[2]) && average === Number(current[1])) {
    if (found) source = source.slice(0, block.from) + text + source.slice(block.to);
    continue;
  }

  text = text
    .replace(current[0], `rating: { average: ${average.toFixed(1)}, count: ${count} }`)
    .replace(/checked: "[^"]*"/, `checked: "${today}"`);
  source = source.slice(0, block.from) + text + source.slice(block.to);
  summary.push(`${label}: ${Number(current[1]).toFixed(1)} from ${current[2]} → ${average.toFixed(1)} from ${count} reviews`);
}

if (summary.length) fs.writeFileSync(FILE, source);
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=${summary.length > 0}\n`);
console.log(summary.join("\n") || "Rating unchanged.");
