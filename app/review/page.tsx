import type { Metadata } from "next";

import LocationChooser from "../components/site/LocationChooser";
import { getWriteReviewUrl } from "../lib/reviews";

// A link to send after a visit (text, email): the patient picks their area on the
// same full-screen chooser as /locations and lands on that location's Google
// review form. The printed appointment cards use /card instead, which also
// offers contact details.
//
// Kept out of search results and the sitemap.

export const metadata: Metadata = {
  title: { absolute: "Leave Foot+ a review" },
  description: "Leave a Google review for your Foot+ appointment.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <LocationChooser
      before="Leave"
      after="a review?"
      hrefFor={(location) => getWriteReviewUrl(location.slug, location.displayName)}
      analyticsPrefix="review-landing"
    />
  );
}
