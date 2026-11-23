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
//
// The rating (count and average) is updated from Google automatically every day
// (.github/workflows/google-reviews.yml), for locations with a `placeId`. Review
// text is still added by hand, as above.

export type Review = {
  name: string;
  /** ISO month, e.g. "2026-10" */
  month: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /**
   * Optional one-sentence cut of `text` for tight spaces (the rotating home page
   * proof line). Give one to any review longer than a sentence or two. Same
   * rules as `text`: exact wording, "…" where it has been trimmed.
   */
  excerpt?: string;
  /**
   * Optional short phrase to pick out in the review (sage highlight). Must appear
   * word for word in `text` (and in `excerpt`, if it has one); the build fails if not.
   */
  highlight?: string;
};

/**
 * Review shown on /care-homes-bristol, under Adam's quote. Empty until the
 * reviewer agrees to it being used there (Sheena B.'s review mentions her son's
 * learning disability; Adam asked her on 23 Nov 2026). Paste her exact words in
 * once she says yes; the section stays hidden while this is null.
 */
export const careSettingsReview: Review | null = null;

export type ReviewLocation = "bristol" | "southampton";
export type ReviewScope = ReviewLocation | "all";

type LocationReviews = {
  label: string;
  enabled: boolean;
  /** Google place ID, used by the daily sync. Empty skips this location. */
  placeId: string;
  /**
   * Exact Google listing name. If `placeId` is empty, the daily sync looks the
   * listing up by this name and fills `placeId` in.
   */
  placeName?: string;
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
    placeId: "ChIJocFh7_g3GqERyA37JOJh0VQ",
    rating: { average: 5.0, count: 9 },
    checked: "2026-11-19",
    readUrl: "https://maps.google.com/maps?cid=6111773793229409736",
    writeUrl: "https://search.google.com/local/writereview?placeid=ChIJocFh7_g3GqERyA37JOJh0VQ",
    // Sheena B. (Jul 2026) is deliberately left out until she has agreed to it
    // being used here, as it mentions her son's disability.
    reviews: [
      {
        // Posted by Jay on behalf of their mum.
        name: "Jay T.",
        month: "2026-11",
        rating: 5,
        text: "We cannot recommend Adam highly enough! He provides a wonderful home foot care service for my mum, and from the very first visit, his friendly, caring and professional approach has really stood out. Adam is incredibly kind, patient and attentive, always taking the time to make sure Mum feels comfortable, listened to and well looked after. It is clear that her wellbeing is genuinely at the heart of everything he does, and he goes above and beyond to provide a service that is not only professional but also personal and reassuring. Having someone you can trust to care for a loved one is so important, and Adam certainly provides that peace of mind. His warm nature and genuine compassion makes all the difference. We are so grateful for the care he provides and would wholeheartedly recommend his services to anyone looking for friendly, reliable and compassionate foot care in the comfort of their own home. Thank you, Adam, for the wonderful work you do!",
        excerpt: "… Having someone you can trust to care for a loved one is so important, and Adam certainly provides that peace of mind. …",
        highlight: "peace of mind",
      },
      {
        name: "Sara C.",
        month: "2026-08",
        rating: 5,
        text: "Adam has been really helpful and dedicated, sorting my elderly Father in Laws feet out. He is very patient and kind and I would highly recommend him.",
        excerpt: "… He is very patient and kind and I would highly recommend him.",
        highlight: "very patient and kind",
      },
      {
        // Posted by Donna on behalf of her dad, a client without a Google account.
        name: "Donna W.",
        month: "2026-11",
        rating: 5,
        text: "This is on behalf of my dad Roger Willcox who is a client of Adam's. (My dad doesn't have a Google account). My dad would like to say he has found Adam to be friendly, helpful, courteous & always up for a chat. He is always on time. He knows his job. Nothing is too much trouble for him. My dad is very happy with the service Adam provides & would highly recommend him to anyone. His feet have never looked so good!",
        excerpt: "… My dad is very happy with the service Adam provides & would highly recommend him to anyone. His feet have never looked so good!",
        highlight: "His feet have never looked so good!",
      },
      {
        name: "Helen R.",
        month: "2026-11",
        rating: 5,
        // Two typos trimmed with "…" ("made me a my neighbour", "Foot+ Bristol annd Adam's").
        text: "Having had difficulties finding a mobile foot care practitioner for my elderly neighbour, I was thrilled to come across Foot+ website. It was incredibly simple to navigate and to find all the information I needed. Having sent a request through the website, I had a message from Foot+ almost immediately to arrange a time and date for an appointment. Adam visited today for the first session and worked wonders on my neighbour’s feet. Adam was professional and friendly, knowledgeable and made … my neighbour feel very comfortable. I would highly recommend Foot+ Bristol …",
        excerpt: "… Adam visited today for the first session and worked wonders on my neighbour’s feet. …",
        highlight: "worked wonders on my neighbour’s feet",
      },
      {
        name: "Martyn H.",
        month: "2026-07",
        rating: 5,
        text: "Adam visited me this morning. I found him very polite and considerate. I was impressed by his expertise and the reassuring manner in which he carried out the treatment. I will definitely contact him again for any further treatment I need. Top marks!!!",
        excerpt: "… I was impressed by his expertise and the reassuring manner in which he carried out the treatment. …",
        highlight: "the reassuring manner",
      },
      {
        name: "Joan K.",
        month: "2026-10",
        rating: 5,
        // Original sentence mentioning "chiropodist" trimmed (protected title).
        text: "Adam was friendly and professional and delivered an excellent service. … Highly recommended.",
        excerpt: "Adam was friendly and professional and delivered an excellent service. …",
        highlight: "an excellent service",
      },
      {
        name: "Harry B.",
        month: "2026-02",
        rating: 5,
        text: "Requested services for callus remove and general foot care. Great and attentive service. Will book again.",
        excerpt: "… Great and attentive service. Will book again.",
        highlight: "Great and attentive service",
      },
      {
        name: "Dunnerz",
        month: "2026-08",
        rating: 5,
        text: "Adam was great and very happy with the finished product! Thanks!",
        highlight: "Adam was great",
      },
    ],
  },
  southampton: {
    label: "Southampton",
    enabled: false,
    // Filled in by the daily sync from `placeName`.
    placeId: "",
    placeName: "Foot+ Southampton",
    rating: { average: 0, count: 0 },
    checked: "2026-11-11",
    // Add Foot+ Southampton's Google profile and review links when it has a listing.
    readUrl: "",
    writeUrl: "https://g.page/r/CSxFOLYdDyIoEBM/review",
    reviews: [],
  },
};

const PROTECTED_TITLES = /chiropod|podiatr/i;

for (const [key, location] of Object.entries(reviewLocations)) {
  for (const review of location.reviews) {
    if (PROTECTED_TITLES.test(`${review.text} ${review.excerpt ?? ""}`)) {
      throw new Error(
        `${key} review from ${review.name} mentions a protected title (chiropodist/podiatrist). ` +
          `Leave it out or trim that part with "…" (see app/lib/reviews.ts).`
      );
    }
    if (
      review.highlight &&
      (!review.text.includes(review.highlight) ||
        (review.excerpt && !review.excerpt.includes(review.highlight)))
    ) {
      throw new Error(
        `${key} review from ${review.name}: highlight "${review.highlight}" must appear word for word in its text and excerpt.`
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

/** "Rated 5★ on Google. " for search snippets, or "" when there's no strong rating to show. */
export function googleRatingLine(scope: ReviewScope) {
  const rating = getRating(scope);
  if (!rating || rating.average < 4.5) return "";
  const stars = rating.average === 5 ? "5" : rating.average.toFixed(1);
  return `Rated ${stars}★ on Google. `;
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

/**
 * Where "leave a review" goes for a location: its Google review form, or a Google
 * Maps search for the listing until its `writeUrl` is filled in.
 */
export function getWriteReviewUrl(location: ReviewLocation, displayName: string) {
  const { writeUrl } = reviewLocations[location];
  if (writeUrl) return writeUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayName)}`;
}

export function formatReviewMonth(month: string) {
  const [year, m] = month.split("-").map(Number);
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
