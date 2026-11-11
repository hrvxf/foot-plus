// Foot+ Google reviews, kept per location (each location has its own Google profile).
//
// Where they show:
// - Homepage and booking page: "all", one combined Foot+ rating and a mix of
//   reviews, with no location names.
// - Location pages: only that location's reviews.
//
// Adding a review:
// - Copy the wording exactly from Google. Only trim with "…" where the cut
//   doesn't change the meaning. Never reword it.
// - Use first name + last initial, and the month it was posted.
// - Update that location's `rating` (count and average) at the same time.
// - Leave out reviews that share someone else's health details unless they've
//   agreed to it being used here.
//
// Protected titles: reviews that call a practitioner a "chiropodist" or
// "podiatrist" must not be quoted as written, because on our own site it can
// read as though we're using a protected title. The build fails if one slips
// in. Either leave the review out, or trim that part with "…".
//
// Switching a location on: set `enabled: true`. Wait until it has about three
// reviews; "1 Google review" can look weaker than no rating at all.

export type Review = {
  name: string;
  /** ISO month, e.g. "2026-10" */
  month: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export type ReviewLocation = "bristol" | "southampton";
export type ReviewScope = ReviewLocation | "all";

type LocationReviews = {
  label: string;
  enabled: boolean;
  rating: { average: number; count: number };
  /** When the count and average were last checked against Google. */
  checked: string;
  readUrl: string;
  writeUrl: string;
  /** In display order: the first ones shown are the strongest. */
  reviews: Review[];
};

export const reviewLocations: Record<ReviewLocation, LocationReviews> = {
  bristol: {
    label: "Bristol",
    enabled: true,
    rating: { average: 5.0, count: 6 },
    checked: "2026-11-11",
    readUrl: "https://maps.google.com/maps?cid=6111773793229409736",
    writeUrl: "https://search.google.com/local/writereview?placeid=ChIJocFh7_g3GqERyA37JOJh0VQ",
    // Sheena B. (Jul 2026) is deliberately left out until she has agreed to it
    // being used here, as it mentions her son's disability.
    reviews: [
      {
        name: "Sara C.",
        month: "2026-08",
        rating: 5,
        text: "Adam has been really helpful and dedicated, sorting my elderly Father in Laws feet out. He is very patient and kind and I would highly recommend him.",
      },
      {
        name: "Martyn H.",
        month: "2026-07",
        rating: 5,
        text: "Adam visited me this morning. I found him very polite and considerate. I was impressed by his expertise and the reassuring manner in which he carried out the treatment. I will definitely contact him again for any further treatment I need. Top marks!!!",
      },
      {
        name: "Joan K.",
        month: "2026-10",
        rating: 5,
        // Original sentence mentioning "chiropodist" trimmed (protected title).
        text: "Adam was friendly and professional and delivered an excellent service. … Highly recommended.",
      },
      {
        name: "Harry B.",
        month: "2026-02",
        rating: 5,
        text: "Requested services for callus remove and general foot care. Great and attentive service. Will book again.",
      },
      {
        name: "Dunnerz",
        month: "2026-08",
        rating: 5,
        text: "Adam was great and very happy with the finished product! Thanks!",
      },
    ],
  },
  southampton: {
    label: "Southampton",
    enabled: false,
    rating: { average: 0, count: 0 },
    checked: "2026-11-11",
    // Add Foot+ Southampton's Google profile and review links when it has a listing.
    readUrl: "",
    writeUrl: "",
    reviews: [],
  },
};

const PROTECTED_TITLES = /chiropod|podiatr/i;

for (const [key, location] of Object.entries(reviewLocations)) {
  for (const review of location.reviews) {
    if (PROTECTED_TITLES.test(review.text)) {
      throw new Error(
        `${key} review from ${review.name} mentions a protected title (chiropodist/podiatrist). ` +
          `Leave it out or trim that part with "…" (see app/lib/reviews.ts).`
      );
    }
  }
}

function locationsFor(scope: ReviewScope) {
  const keys: ReviewLocation[] = scope === "all" ? ["bristol", "southampton"] : [scope];
  return keys
    .map((key) => ({ key, ...reviewLocations[key] }))
    .filter((location) => location.enabled && location.rating.count > 0);
}

/** Combined rating, weighted by each location's review count. Null if nothing to show. */
export function getRating(scope: ReviewScope) {
  const locations = locationsFor(scope);
  const count = locations.reduce((sum, location) => sum + location.rating.count, 0);
  if (!count) return null;
  const average =
    locations.reduce((sum, location) => sum + location.rating.average * location.rating.count, 0) /
    count;
  return { average: Math.round(average * 10) / 10, count };
}

/** Reviews to show, taking turns between locations so "all" gets a fair mix. */
export function getReviews(scope: ReviewScope, limit = 3) {
  const lists = locationsFor(scope).map((location) => location.reviews);
  const mixed: Review[] = [];
  for (let index = 0; mixed.length < limit && lists.some((list) => index < list.length); index++) {
    for (const list of lists) {
      if (index < list.length && mixed.length < limit) mixed.push(list[index]);
    }
  }
  return mixed;
}

/** Google links for each location in scope (one per location). */
export function getReviewLinks(scope: ReviewScope) {
  return locationsFor(scope)
    .filter((location) => location.readUrl)
    .map(({ key, label, readUrl, writeUrl }) => ({ key, label, readUrl, writeUrl }));
}

export function formatReviewMonth(month: string) {
  const [year, m] = month.split("-").map(Number);
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
