import type { Metadata } from "next";

import LocationChooser from "../components/site/LocationChooser";

// Where the QR code on the printed appointment cards lands. One card design is
// shared by every location, so nothing location-specific is printed on it: the
// patient picks their area here, then gets that practitioner's contact details
// and review link on /card/[location]. New locations come through
// serviceLocations, so cards already printed keep working.
//
// Kept out of search results and the sitemap: it's only useful from the card.

export const metadata: Metadata = {
  title: { absolute: "Your Foot+ visit" },
  description: "Contact your Foot+ practitioner or leave a review.",
  alternates: { canonical: "/card" },
  robots: { index: false, follow: false },
};

export default function CardPage() {
  return (
    <LocationChooser
      before="Where is your"
      after="visit?"
      hrefFor={(location) => `/card/${location.slug}`}
      analyticsPrefix="card-landing"
    />
  );
}
