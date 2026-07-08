import HomeContent from "./components/HomeContent";

// App Router homepage route (Pages Router index removed to avoid "/" conflicts).

export const metadata = {
  title: "Foot+ Bristol | Foot Health Practitioner Bristol",
  description:
    "Foot+ Bristol provides mobile foot health care and home visits in Bristol for nail, skin, and diabetic foot care.",
  openGraph: {
    title: "Foot+ Bristol | Foot Health Practitioner Bristol",
    description:
      "Foot+ Bristol provides mobile foot health care and home visits in Bristol for nail, skin, and diabetic foot care.",
    url: "/",
    siteName: "Foot+ Bristol",
  },
  twitter: {
    title: "Foot+ Bristol | Foot Health Practitioner Bristol",
    description:
      "Foot+ Bristol provides mobile foot health care and home visits in Bristol for nail, skin, and diabetic foot care.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
