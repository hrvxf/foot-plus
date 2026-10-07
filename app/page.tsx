import HomeContent from "./components/HomeContent";
import { homeFaqs } from "./lib/home";
import { SITE_URL } from "./lib/site";

export const metadata = {
  title: { absolute: "Foot+ | Professional Nail & Foot Care at Home" },
  description:
    "Professional toenail cutting and foot care in your home. Bristol appointments available with Adam James; Southampton opens on 7 November 2026.",
  keywords: ["Foot+", "home visit foot care", "mobile foot care"],
  openGraph: {
    title: "Foot+ | Professional Nail & Foot Care at Home",
    description: "Nail cutting, thickened nail and routine skin care at home. Bristol appointments available; Southampton opens on 7 November 2026.",
    url: "/",
    siteName: "Foot+",
  },
  twitter: {
    title: "Foot+ | Professional Nail & Foot Care at Home",
    description: "Nail cutting, thickened nail and routine skin care at home. Bristol appointments available; Southampton opens on 7 November 2026.",
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
