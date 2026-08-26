import UmbrellaHome from "./components/UmbrellaHome";

// App Router homepage route (Pages Router index removed to avoid "/" conflicts).

export const metadata = {
  title: { absolute: "Foot+ | Home-Visit Foot Care" },
  description:
    "Foot+ provides professional home-visit foot care through local services in Bristol and Southampton.",
  keywords: [
    "Foot+",
    "home visit foot care",
    "Foot Health Practitioner Bristol",
    "Foot Health Practitioner Southampton",
  ],
  openGraph: {
    title: "Foot+ | Professional Foot Care, Brought Home",
    description:
      "Professional home-visit foot care in Bristol and Southampton.",
    url: "/",
    siteName: "Foot+",
  },
  twitter: {
    title: "Foot+ | Professional Foot Care, Brought Home",
    description:
      "Professional home-visit foot care in Bristol and Southampton.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <UmbrellaHome />;
}
