import type { Metadata } from "next";

import LocationChooser from "../components/site/LocationChooser";
import { SITE_URL } from "../lib/site";

// Same full-screen picker as /locations, sending each town to its own toenail
// cutting page. Kept out of search results: it only routes, and the town pages
// do the ranking work.

export const metadata: Metadata = {
  title: { absolute: "Toenail Cutting at Home | Choose Your Area | Foot+" },
  description: "Choose Bristol or Southampton for toenail cutting at home with Foot+.",
  alternates: { canonical: `${SITE_URL}/toenail-cutting` },
  robots: { index: false, follow: true },
};

const nailPages = {
  bristol: "/toenail-cutting-bristol",
  southampton: "/toenail-cutting-southampton",
} as const;

export default function ToenailCuttingChooserPage() {
  return (
    <LocationChooser
      before="Toenail cutting from your local"
      hrefFor={(location) => nailPages[location.slug]}
      analyticsPrefix="nails-choose"
    />
  );
}
