import type { Metadata } from "next";

import NailCuttingPage from "../components/site/NailCuttingPage";
import { serviceLocations } from "../lib/locations";
import { locationEmails, phoneDisplay, phoneHref, prices, SITE_URL } from "../lib/site";

// Southampton counterpart of /toenail-cutting-bristol. Keep it specific to
// Southampton (practitioner, coverage, travel base) rather than a copy of the
// Bristol page with the town swapped, so the two don't read as duplicates.

const canonical = `${SITE_URL}/toenail-cutting-southampton`;
const SOUTHAMPTON_BUSINESS_ID = `${SITE_URL}/locations/southampton#medicalbusiness`;
const title = "Toenail Cutting at Home in Southampton | Foot+";
const description = `Toenail cutting at home in Southampton, Romsey, Chandler's Ford and Totton with Katie Preston, Foot Health Practitioner. First visit ${prices[0].price}; returning visits ${prices[1].price}.`;
const bookingHref = "/book?location=southampton&service=nails";

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
  openGraph: { type: "website", siteName: "Foot+", url: canonical, title, description, images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    question: "Can you visit just to cut my toenails?",
    answer:
      "Yes. Toenail cutting can be the only reason for your visit. Katie checks your feet first and can help with other routine nail or skin care while she is there.",
  },
  {
    question: "Can you cut thick or hard toenails?",
    answer:
      "Where suitable, Katie can trim and carefully reduce thick nails. This manages the nail; it does not diagnose or cure what caused the thickening.",
  },
  {
    question: "Is this a pedicure or a podiatry appointment?",
    answer:
      "Neither. It is routine nail and foot care from a qualified Foot Health Practitioner, not a cosmetic pedicure or an appointment with an HCPC-registered podiatrist. Katie will tell you if something needs a podiatrist or your GP.",
  },
  {
    question: "Can I book for a parent or someone I care for?",
    answer:
      "Yes. A relative, carer or support worker can arrange the visit and be there, with the agreement of the person receiving care.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Toenail cutting at home in Southampton",
      serviceType: "Routine toenail cutting and nail care",
      description,
      url: canonical,
      areaServed: { "@type": "City", name: "Southampton" },
      provider: { "@id": SOUTHAMPTON_BUSINESS_ID },
      offers: prices.map((price, index) => ({
        "@type": "Offer",
        name: price.name,
        price: price.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "GBP",
        url: `${SITE_URL}/prices`,
        description: `${index === 0 ? "First" : "Returning patient"} home-visit appointment. Any travel fee is confirmed before booking.`,
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      name: title,
      url: canonical,
      description,
      mainEntity: { "@id": `${canonical}#service` },
      about: { "@id": SOUTHAMPTON_BUSINESS_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Foot+ Southampton", item: `${SITE_URL}/locations/southampton` },
        { "@type": "ListItem", position: 2, name: "Toenail cutting", item: canonical },
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

export default function ToenailCuttingSouthamptonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NailCuttingPage
        location={serviceLocations.southampton}
        intro="Katie Preston visits you at home to cut, file and thin difficult toenails."
        coverage={serviceLocations.southampton.coverage}
        aboutHref="/about#katie-preston"
        bookingHref={bookingHref}
        contactActions={[
          { kind: "phone", href: phoneHref, label: `Call Foot+ on ${phoneDisplay}`, analyticsId: "nails-soton-hero-phone" },
          { kind: "email", href: locationEmails.southampton.href, label: locationEmails.southampton.label, analyticsId: "nails-soton-hero-email" },
        ]}
        faqs={faqs}
        analyticsPrefix="nails-soton"
      />
    </>
  );
}
