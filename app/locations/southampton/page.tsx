import type { Metadata } from "next";
import Link from "next/link";

import LocationHero from "../../components/LocationHero";
import { serviceLocations } from "../../lib/locations";
import { SITE_URL } from "../../lib/site";
import { southamptonTravelSummary } from "../../lib/travel";
import PostcodeChecker from "../../components/home/PostcodeChecker";
import ReviewsSection from "../../components/reviews/ReviewsSection";
import { ClosingBand, FaqList, Steps } from "../../components/site/blocks";
import { body, btnSolid, displayH2, linkQuiet, rule, shell } from "../../components/site/ui";

const canonical = `${SITE_URL}/locations/southampton`;

export const metadata: Metadata = {
  title: { absolute: "Mobile Foot Health Practitioner Southampton | Foot+" },
  description: "Professional home-visit nail and foot care in Southampton with Katie Preston, Foot Health Practitioner. Check your postcode and request an appointment.",
  alternates: { canonical },
  openGraph: {
    title: "Foot+ Southampton | Home-visit foot care",
    description: "Professional home-visit nail and foot care in Southampton.",
    url: canonical,
    siteName: "Foot+",
  },
};

const section = "py-12 md:py-20";

const processSteps = [
  {
    title: "Send your enquiry",
    text: "Share your postcode, contact details and the support you are looking for.",
  },
  {
    title: "Confirm suitability",
    text: "Foot+ confirms coverage, availability and whether the service is appropriate.",
  },
  {
    title: "Arrange your visit",
    text: "Katie visits you at home at an agreed time.",
  },
];

const faqs = [
  {
    question: "Is Foot+ Southampton taking new patients?",
    answer: "Yes. Send your postcode and the type of care you are looking for, and Foot+ will confirm coverage and availability.",
  },
  {
    question: "Who will visit me?",
    answer: "Southampton home visits are provided by Katie Preston, a Foot Health Practitioner.",
  },
  {
    question: "Will appointments take place at home?",
    answer: "Yes. Foot+ Southampton is a home-visit foot-care service.",
  },
];

export default function SouthamptonPage() {
  const location = serviceLocations.southampton;
  const practitioner = location.practitioner!;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Foot+ Southampton home-visit foot care",
    description: "Professional home-visit nail and foot care in Southampton.",
    provider: { "@id": `${canonical}#medicalbusiness` },
    areaServed: { "@type": "City", name: "Southampton" },
    url: canonical,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [serviceSchema, { "@type": "MedicalBusiness", "@id": `${canonical}#medicalbusiness`, name: "Foot+ Southampton", description: "Home-visit nail and foot care in Southampton.", url: canonical, areaServed: { "@type": "City", name: "Southampton" }, parentOrganization: { "@id": `${SITE_URL}/#organization` }, employee: { "@id": `${SITE_URL}/about#katie-preston` } }, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Locations", item: `${SITE_URL}/locations` }, { "@type": "ListItem", position: 2, name: "Southampton", item: canonical } ] }, { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }) }} />

      <LocationHero
        place="Southampton"
        status="Foot+ Southampton · Taking new patients"
        title="Home-visit foot care in Southampton"
        description="Professional foot care in the comfort of your own home, delivered with expertise, dignity and genuine care."
        primaryAction={{ label: "Request a home visit", href: "/book?location=southampton" }}
        secondaryAction={{ label: "View coverage", href: "#southampton-coverage" }}
        practitioner={practitioner}
      />

      <ReviewsSection scope="southampton" id="southampton-reviews" analyticsPrefix="southampton" />

      <section id="southampton-services" className={`scroll-mt-24 bg-white ${section}`} aria-labelledby="southampton-services-heading">
        <div className={shell}>
          <h2 id="southampton-services-heading" className={displayH2}>
            Foot care services in Southampton
          </h2>
          <p className={`${body} mt-4 max-w-[60ch]`}>
            Foot+ Southampton offers routine nail and skin care at home with Katie Preston. Share the care you need and
            your postcode so we can confirm suitability and availability.
          </p>
          <div className="mt-6 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
            <Link href="/book?location=southampton" className={btnSolid}>
              Request a home visit
            </Link>
            <Link href="/toenail-cutting-southampton" className={linkQuiet}>
              Toenail cutting in Southampton
            </Link>
            <Link href="/services" className={linkQuiet}>
              Explore home-visit care
            </Link>
          </div>
        </div>
      </section>

      <section id="southampton-coverage" className={`scroll-mt-24 ${section}`} aria-labelledby="southampton-coverage-heading">
        <div className={`${shell} grid gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7">
            <h2 id="southampton-coverage-heading" className={displayH2}>
              Check your postcode
            </h2>
            <p className={`${body} mt-4 max-w-[52ch]`}>
              {serviceLocations.southampton.coverage} {southamptonTravelSummary}
            </p>
          </div>
          <div className="lg:col-span-5">
            <PostcodeChecker
              tone="panel"
              source="southampton"
              title="Do we visit you?"
              label="Postcode for the visit"
              helper="We’ll show any travel fee for your postcode."
            />
          </div>
        </div>
      </section>

      <section className={`border-t ${rule} bg-white ${section}`} aria-labelledby="southampton-process">
        <div className={shell}>
          <h2 id="southampton-process" className={displayH2}>
            A straightforward home visit
          </h2>
          <Steps steps={processSteps.map((step) => ({ title: step.title, body: step.text }))} className="mt-8 md:mt-10" />
        </div>
      </section>

      <section className={section} aria-labelledby="southampton-faqs">
        <div className={`${shell} grid gap-6 md:grid-cols-12 md:gap-10`}>
          <h2 id="southampton-faqs" className={`${displayH2} md:col-span-4`}>
            Questions about Foot+ Southampton
          </h2>
          <FaqList faqs={faqs} className="md:col-span-8" />
        </div>
      </section>

      <ClosingBand
        id="southampton-closing"
        heading="Request a home visit in Southampton"
        text="Tell us your postcode and the support you are looking for. We will confirm coverage, suitability and availability."
        action={{ label: "Request a home visit", href: "/book?location=southampton" }}
      />
    </div>
  );
}
