import HomeContent from "./components/HomeContent";

export const metadata = {
  title: { absolute: "Foot+ | Professional Home-Visit Foot Care" },
  description:
    "Foot+ provides professional, respectful home-visit foot care through local services in Bristol and Southampton.",
  keywords: ["Foot+", "home visit foot care", "mobile foot care"],
  openGraph: {
    title: "Foot+ | Professional Foot Care, Brought Home",
    description: "Professional home-visit foot care through trusted local Foot+ practitioners.",
    url: "/",
    siteName: "Foot+",
  },
  twitter: {
    title: "Foot+ | Professional Foot Care, Brought Home",
    description: "Professional home-visit foot care through trusted local Foot+ practitioners.",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeContent />;
}
