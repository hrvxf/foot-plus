import HomeContent from "./components/HomeContent";
import { homeFaqs } from "./lib/home";
import { SITE_URL } from "./lib/site";

export const metadata = {
  title: { absolute: "Foot+ | Professional Nail & Foot Care at Home" },
  description:
    "Professional toenail cutting and foot care in your home. Appointments available in Bristol with Adam James and in Southampton with Katie Preston.",
  keywords: ["Foot+", "home visit foot care", "mobile foot care"],
  openGraph: {
    title: "Foot+ | Professional Nail & Foot Care at Home",
    description: "Nail cutting, thickened nail and routine skin care at home. Appointments available in Bristol and Southampton.",
    url: "/",
    siteName: "Foot+",
  },
  twitter: {
    title: "Foot+ | Professional Nail & Foot Care at Home",
    description: "Nail cutting, thickened nail and routine skin care at home. Appointments available in Bristol and Southampton.",
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
