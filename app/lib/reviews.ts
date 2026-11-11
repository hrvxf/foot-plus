// Foot+ Bristol Google reviews shown on the site.
//
// Adding a review:
// - Copy the wording exactly from Google. Only trim with "…" where the cut
//   doesn't change the meaning. Never reword it.
// - Use first name + last initial, and the month it was posted.
// - Update `googleRating` (count and average) at the same time.
//
// Protected titles: reviews that call Adam a "chiropodist" or "podiatrist"
// must not be quoted as written, because on our own site it can read as
// though we're using a protected title. The build fails if one slips in.
// Either leave the review out, or trim that part with "…".

export type Review = {
  name: string;
  /** ISO month, e.g. "2026-10" */
  month: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export const googleRating = {
  average: 5.0,
  count: 6,
  /** When the count and average were last checked against Google. */
  checked: "2026-11-11",
};

export const googleReviewsUrl = "https://maps.google.com/maps?cid=6111773793229409736";
export const googleWriteReviewUrl =
  "https://search.google.com/local/writereview?placeid=ChIJocFh7_g3GqERyA37JOJh0VQ";

/**
 * In display order: the first three appear in review sections.
 * Sheena B. (Jul 2026) is deliberately left out until she has agreed to it
 * being used here, as it mentions her son's disability.
 */
export const reviews: Review[] = [
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
];

const PROTECTED_TITLES = /chiropod|podiatr/i;

for (const review of reviews) {
  if (PROTECTED_TITLES.test(review.text)) {
    throw new Error(
      `Review from ${review.name} mentions a protected title (chiropodist/podiatrist). ` +
        `Leave it out or trim that part with "…" (see app/lib/reviews.ts).`
    );
  }
}

export function formatReviewMonth(month: string) {
  const [year, m] = month.split("-").map(Number);
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
