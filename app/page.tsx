import HomeContent from "./components/HomeContent";
import { SITE_URL, BUSINESS_ID } from "./lib/site";

const canonical = `${SITE_URL}/`;

const faqs = [
  {
    question: "Do you provide home visits throughout Bristol?",
    answer:
      "Foot+ provides home visits across Bristol from a central BS2 base. Coverage includes central, north, east and south Bristol, with wider nearby areas confirmed by postcode before booking.",
  },
  {
    question: "How much does a home foot-care appointment cost?",
    answer:
      "Current Foot+ prices are listed on the prices page. The cost depends on whether you are booking a new patient appointment or a routine follow-up appointment.",
  },
  {
    question: "Can someone book an appointment for a relative?",
    answer:
      "Yes. A relative, carer or support worker can help enquire or arrange an appointment, with appropriate consent from the person receiving care.",
  },
  {
    question: "What information should I provide before a home visit?",
    answer:
      "Please share the appointment postcode, parking details, stairs, lift access, entry codes, intercom instructions and whether a relative, carer or support worker will be present.",
  },
  {
    question: "Do you provide toenail cutting at home in Bristol?",
    answer:
      "Yes. Foot+ provides toenail cutting at home in Bristol as part of professional foot and nail care, including support for nails that are difficult to reach, thickened or awkward to cut.",
  },
];

export const metadata = {
  title: { absolute: "Mobile Foot Health Practitioner Bristol | Foot+" },
  description:
    "Mobile foot health practitioner in Bristol providing professional home visits for routine foot care, toenail cutting, hard skin and practical advice.",
  keywords: [
    "foot health practitioner Bristol",
    "mobile foot health practitioner Bristol",
    "home visit foot care Bristol",
    "foot care at home Bristol",
    "toenail cutting service Bristol",
    "professional foot care Bristol",
  ],
  openGraph: {
    title: "Mobile Foot Health Practitioner Bristol | Foot+",
    description:
      "Professional foot health appointments at home across Bristol, including routine foot care, toenail cutting, hard skin care and practical advice.",
    url: canonical,
    siteName: "Foot+ Bristol",
  },
  twitter: {
    title: "Mobile Foot Health Practitioner Bristol | Foot+",
    description:
      "Professional foot health appointments at home across Bristol, including routine foot care, toenail cutting, hard skin care and practical advice.",
  },
  alternates: {
    canonical,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Mobile Foot Health Practitioner Bristol",
      description:
        "Foot+ provides mobile foot health practitioner appointments and professional foot care home visits across Bristol.",
      serviceType: "Home visit foot care",
      areaServed: { "@type": "City", name: "Bristol" },
      provider: { "@id": BUSINESS_ID },
      url: canonical,
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeContent />
    </>
  );
}
