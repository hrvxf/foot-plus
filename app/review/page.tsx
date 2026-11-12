import type { Metadata } from "next";

import LocationChooser from "../components/site/LocationChooser";
import type { ServiceLocation } from "../lib/locations";
import { reviewLocations } from "../lib/reviews";

// Landing page for the QR code on the printed appointment cards. One card design
// is shared by every location, so the patient picks their area here (same
// full-screen chooser as /locations) and goes straight to that location's
// Google review form. The QR code never needs to change: new locations come
// through serviceLocations, with their `writeUrl` in app/lib/reviews.ts.
//
// Kept out of search results and the sitemap: it's only useful from the card.

export const metadata: Metadata = {
  title: { absolute: "Leave Foot+ a review" },
  description: "Leave a Google review for your Foot+ appointment.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: false },
};

/** That location's Google review form, or its Google Maps listing until the link is added. */
function reviewHref(location: ServiceLocation) {
  const { writeUrl } = reviewLocations[location.slug];
  if (writeUrl) return writeUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.displayName)}`;
}

export default function ReviewPage() {
  return (
    <LocationChooser before="Leave" after="a review?" hrefFor={reviewHref} analyticsPrefix="review-landing" />
  );
}
