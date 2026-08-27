import type { Metadata } from "next";
import LocationsChooser from "@/components/LocationsChooser";

export const metadata: Metadata = {
  title: "Choose a location",
  description: "Choose your local Foot+ service in Bristol or Southampton.",
  alternates: { canonical: "/locations" },
  robots: { index: true, follow: true },
};

export default function LocationsPage() {
  return <LocationsChooser />;
}
