import HomeContent from "./components/HomeContent";
import PreferredImage from "./components/site/PreferredImage";
import { DEFAULT_SOCIAL_IMAGE, searchImages } from "./lib/site";
import { googleRatingLine } from "./lib/reviews";

const TITLE = "Toenail Cutting & Foot Care at Home | Foot+";
const DESCRIPTION = `We come to you. Toenail cutting and routine foot care in your own home, across Bristol and Southampton. ${googleRatingLine("all")}Check your postcode and request a visit.`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["Foot+", "home visit foot care", "mobile foot care"],
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Foot+",
  },
  twitter: {
    images: [DEFAULT_SOCIAL_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <PreferredImage path="/" image={searchImages.both} />
      <HomeContent />
    </>
  );
}
