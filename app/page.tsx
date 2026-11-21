import HomeContent from "./components/HomeContent";
import { DEFAULT_SOCIAL_IMAGE } from "./lib/site";

export const metadata = {
  title: { absolute: "Foot+ | Professional Nail & Foot Care at Home" },
  description:
    "Professional toenail cutting and foot care in your home. Appointments available in Bristol with Adam James and in Southampton with Katie Preston.",
  keywords: ["Foot+", "home visit foot care", "mobile foot care"],
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE],
    title: "Foot+ | Professional Nail & Foot Care at Home",
    description: "Nail cutting, thickened nail and routine skin care at home. Appointments available in Bristol and Southampton.",
    url: "/",
    siteName: "Foot+",
  },
  twitter: {
    images: [DEFAULT_SOCIAL_IMAGE.url],
    title: "Foot+ | Professional Nail & Foot Care at Home",
    description: "Nail cutting, thickened nail and routine skin care at home. Appointments available in Bristol and Southampton.",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeContent />
    </>
  );
}
