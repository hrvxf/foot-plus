import type { Metadata } from "next";
import ConditionPage from "../components/conditions/ConditionPage";
import { canonicalFor, getConditionPage } from "../lib/condition-pages";
import { BUSINESS_ID } from "../lib/site";

const page = getConditionPage("foot-health-practitioner-bristol")!;

if (!page) {
  throw new Error("Missing condition page data for foot-health-practitioner-bristol");
}

const canonical = canonicalFor(page.slug);

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: {
    canonical,
  },
  openGraph: {
    url: canonical,
    title: page.metaTitle,
    description: page.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: page.title,
      description: page.description,
      serviceType: "Home visit foot care",
      areaServed: {
        "@type": "City",
        name: "Bristol",
      },
      provider: {
        "@id": BUSINESS_ID,
      },
      url: canonical,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://foot-plus.co.uk/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://foot-plus.co.uk/services" },
        { "@type": "ListItem", position: 3, name: page.title, item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ConditionPage page={page} />
    </>
  );
}
