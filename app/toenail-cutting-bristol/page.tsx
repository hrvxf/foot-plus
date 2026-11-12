import type { Metadata } from "next";

import { bristolContactActions } from "../components/site/ContactIcons";
import NailCuttingPage from "../components/site/NailCuttingPage";
import { serviceLocations } from "../lib/locations";
import { ADAM_ID, BRISTOL_BUSINESS_ID, prices, SITE_URL } from "../lib/site";

const canonical = `${SITE_URL}/toenail-cutting-bristol`;
const title = "Toenail Cutting at Home in Bristol | Foot+";
const description = `Professional toenail cutting at home across Bristol by a qualified Foot Health Practitioner. First visit ${prices[0].price}; returning visits from ${prices[1].price}. Request a visit.`;
// Route-level openGraph/twitter objects replace the layout's, so restate the
// site-wide social image, site name and card type here.
const socialImage = {
  url: "/images/social-card.png",
  width: 1200,
  height: 630,
  alt: "Foot+ professional home-visit foot care",
};
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: {
    type: "website",
    siteName: "Foot+",
    url: canonical,
    title,
    description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage.url],
  },
  robots: { index: true, follow: true },
};
const faqs = [
  {
    question: "Can you visit just to cut my toenails?",
    answer:
      "Yes. Toenail cutting can be the only reason for your visit. Adam checks your feet first and can help with other routine nail or skin care while he is there.",
  },
  {
    question: "Can you cut thickened toenails?",
    answer:
      "Where suitable, Adam can trim and conservatively reduce thickened nails. Routine reduction manages the nail; it does not diagnose or cure every underlying cause.",
  },
  {
    question: "Is this a pedicure or a podiatry appointment?",
    answer:
      "This is routine nail and foot care from a qualified Foot Health Practitioner. It is not a cosmetic pedicure or an appointment with an HCPC-registered podiatrist. Foot+ will explain when podiatry or medical care is more appropriate.",
  },
  {
    question: "How often will I need my toenails cut?",
    answer: "It depends on nail growth, footwear and mobility. Adam can suggest a routine that suits you.",
  },
  {
    question: "Can a relative or carer arrange and attend the visit?",
    answer:
      "Yes. A relative, carer or support worker can help enquire, coordinate access and be present, with appropriate consent from the person receiving care.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Toenail cutting at home in Bristol",
      serviceType: "Routine toenail cutting and nail care",
      description,
      url: canonical,
      areaServed: { "@type": "City", name: "Bristol" },
      provider: { "@id": BRISTOL_BUSINESS_ID },
      offers: prices.map((price, index) => ({
        "@type": "Offer",
        name: price.name,
        price: price.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "GBP",
        url: `${SITE_URL}/prices`,
        description: `${index === 0 ? "First" : "Returning patient"} home-visit appointment. Any travel supplement is confirmed before booking.`,
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      name: title,
      url: canonical,
      description,
      mainEntity: { "@id": `${canonical}#service` },
      about: { "@id": BRISTOL_BUSINESS_ID },
      author: { "@id": ADAM_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Foot+ Bristol",
          item: `${SITE_URL}/locations/bristol`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Toenail cutting",
          item: canonical,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};
export default function ToenailCuttingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NailCuttingPage
        location={serviceLocations.bristol}
        intro="Adam James visits you at home to cut, file and thin difficult toenails."
        coverage="Central, north, south and east Bristol, including Clifton, Redland, Bishopston, Henleaze, Bedminster, Southville and Easton. Nearby towns by request."
        aboutHref="/about#adam-james"
        bookingHref="/book?location=bristol&service=nails"
        contactActions={bristolContactActions({ analyticsPrefix: "nails-hero" })}
        faqs={faqs}
        analyticsPrefix="nails"
      />
    </>
  );
}
