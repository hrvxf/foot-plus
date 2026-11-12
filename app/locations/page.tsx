import type { Metadata } from "next";

import LocationChooser from "../components/site/LocationChooser";

export const metadata: Metadata = {
  title: "Choose a location",
  description: "Choose your local Foot+ service in Bristol or Southampton.",
  alternates: { canonical: "/locations" },
  robots: { index: true, follow: true },
};

export default function LocationsPage() {
  return <LocationChooser before="Choose your local" after="service" analyticsPrefix="locations-view" />;
}
