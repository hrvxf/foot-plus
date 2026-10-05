import HomeContent from "./components/HomeContent";
import { homeFaqs } from "./lib/home";
import { SITE_URL } from "./lib/site";

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomeContent />
    </>
  );
}
