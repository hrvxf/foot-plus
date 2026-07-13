import type { Metadata } from "next";

import HomeContent from "./components/HomeContent";
import { SEARCH_PREVIEW_IMAGE_METADATA } from "./seo";

// App Router homepage route (Pages Router index removed to avoid "/" conflicts).

export const metadata: Metadata = {
  title: "Foot+ Bristol | Foot Health Practitioner | Home Visits",
  description:
    "Foot Health Practitioner in Bristol. Home visits for nail, skin, and diabetic foot care. Book with Foot+ today.",
  alternates: {
    canonical: "/",
  },
  // Repeat the image on the homepage metadata so route-level merges stay explicit.
  openGraph: {
    title: "Foot+ Bristol | Foot Health Practitioner | Home Visits",
    description:
      "Foot Health Practitioner in Bristol. Home visits for nail, skin, and diabetic foot care. Book with Foot+ today.",
    images: [SEARCH_PREVIEW_IMAGE_METADATA],
  },
  twitter: {
    title: "Foot+ Bristol | Foot Health Practitioner | Home Visits",
    description:
      "Foot Health Practitioner in Bristol. Home visits for nail, skin, and diabetic foot care. Book with Foot+ today.",
    images: [SEARCH_PREVIEW_IMAGE_METADATA],
  },
};

export default function HomePage() {
  return <HomeContent />;
}
