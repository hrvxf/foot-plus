import type { Metadata } from "next";

import HomeContent from "../components/HomeContent";
import { SITE_URL } from "../lib/site";

const canonical = `${SITE_URL}/bristol`;

export const metadata: Metadata = {
  title: { absolute: "Foot+ Bristol | Foot Health Practitioner Bristol" },
  description:
    "Foot+ Bristol provides mobile foot health care and home visits in Bristol for nail, skin and routine preventative foot care.",
  alternates: { canonical },
  openGraph: {
    title: "Foot+ Bristol | Foot Health Practitioner Bristol",
    description:
      "Professional home-visit foot health care across Bristol.",
    url: canonical,
    siteName: "Foot+",
  },
};

export default function BristolPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${canonical}#medicalbusiness`,
    name: "Foot+ Bristol",
    description: "Professional mobile foot-health care and home visits in Bristol.",
    url: canonical,
    areaServed: { "@type": "City", name: "Bristol" },
    priceRange: "££",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <HomeContent />
    </>
  );
}
