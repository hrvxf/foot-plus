import type { Metadata } from "next";
import LocalServicePage from "../components/locations/LocationPage";
import { getLocationPage, locationCanonical } from "../lib/location-pages";
import { BUSINESS_ID, SITE_URL } from "../lib/site";

const page = getLocationPage("foot-health-practitioner-stoke-bishop")!;
const canonical = locationCanonical(page.slug);

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical },
  openGraph: { url: canonical, title: page.metaTitle, description: page.metaDescription },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${canonical}#service`, name: page.title, description: page.metaDescription, serviceType: "Home visit foot care", areaServed: { "@type": "Place", name: page.area }, provider: { "@id": BUSINESS_ID }, url: canonical },
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Areas We Cover", item: `${SITE_URL}/areas-we-cover` },
      { "@type": "ListItem", position: 3, name: page.area, item: canonical },
    ]},
    { "@type": "FAQPage", "@id": `${canonical}#faq`, mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LocalServicePage page={page} />
    </>
  );
}
