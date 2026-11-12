import type { Metadata } from "next";
import Link from "next/link";

import LocationHero from "../../components/LocationHero";
import { southamptonContactActions } from "../../components/site/ContactIcons";
import { serviceLocations } from "../../lib/locations";
import { KATIE_ID, SITE_URL, SOUTHAMPTON_BUSINESS_ID, locationEmails } from "../../lib/site";
import { southamptonTravelSummary } from "../../lib/travel";
import PostcodeChecker from "../../components/home/PostcodeChecker";
import ReviewsSection from "../../components/reviews/ReviewsSection";
import MeetPractitioner from "../../components/site/MeetPractitioner";
import ServicesTiles from "../../components/site/ServicesTiles";
import { ClosingBand, FaqList, Steps } from "../../components/site/blocks";
import { body, displayH2, linkQuiet, rule, shell } from "../../components/site/ui";

// Mirrors app/locations/bristol/page.tsx section for section. Keep the two in step:
// only location details (names, coverage, contacts, partners) should differ.

const canonical = `${SITE_URL}/locations/southampton`;

export const metadata: Metadata = {
  title: { absolute: "Home Foot Care Southampton | Foot Health Practitioner | Foot+" },
  description: "Foot+ Southampton provides professional home-visit foot care across Southampton, with toenail cutting, corn care, hard skin and preventative foot-health support.",
  alternates: { canonical },
  openGraph: {
    title: "Foot+ Southampton | Mobile Foot Health Practitioner",
    description: "Professional home-visit foot care across Southampton.",
    url: canonical,
    siteName: "Foot+",
  },
};

const section = "py-12 md:py-20";

const processSteps = [
  {
    title: "Request a visit",
    text: "Tell us what support you need and provide the appointment postcode.",
  },
  {
    title: "Confirm the details",
    text: "Foot+ confirms coverage, suitability, availability and the expected cost.",
  },
  {
    title: "Care at home",
    text: "Your practitioner visits at the arranged time and provides clear aftercare guidance.",
  },
];

const faqs = [
  {
    question: "Which parts of Southampton does Foot+ cover?",
    answer: "Foot+ covers Southampton and nearby, including Romsey, Chandler's Ford, North Baddesley and Totton, with exact coverage confirmed from the appointment postcode.",
  },
  {
    question: "Can a relative or carer arrange the appointment?",
    answer: "Yes. A relative, carer or support worker can enquire or help coordinate the visit, with appropriate consent from the person receiving care.",
  },
  {
    question: "What if my concern needs podiatry or medical care?",
    answer: "Foot+ will explain when a concern appears outside routine foot-health scope and advise seeking an appropriate podiatry, GP, urgent or emergency service.",
  },
];

export default function SouthamptonLocationPage() {
  const location = serviceLocations.southampton;
  const practitioner = location.practitioner!;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": SOUTHAMPTON_BUSINESS_ID,
    name: "Foot+ Southampton",
    url: canonical,
    areaServed: { "@type": "City", name: "Southampton" },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    telephone: "+447380301555",
    email: locationEmails.southampton.display,
    employee: { "@type": "Person", "@id": KATIE_ID, name: practitioner.name, jobTitle: practitioner.role },
    priceRange: "££",
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [schema, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Locations", item: `${SITE_URL}/locations` }, { "@type": "ListItem", position: 2, name: "Southampton", item: canonical } ] }, { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }) }} />

      <LocationHero
        place="Southampton"
        status="Foot+ Southampton · Taking new patients"
        title="Home foot care in Southampton"
        description="Professional, respectful foot care in the comfort of your own home, delivered by your local Foot+ practitioner."
        primaryAction={{ label: "Request a visit in Southampton", href: "/book?location=southampton" }}
        secondaryAction={{ label: "View Southampton coverage", href: "#southampton-coverage" }}
        contactActions={southamptonContactActions({ analyticsPrefix: "southampton-hero" })}
        practitioner={practitioner}
      />

      <MeetPractitioner practitioner={practitioner} aboutHref="/about#katie-preston" className={`bg-white ${section}`} />

      <ReviewsSection scope="southampton" id="southampton-reviews" analyticsPrefix="southampton" />

      <ServicesTiles
        id="southampton-services"
        place="Southampton"
        practitioner="Katie"
        nailCuttingHref="/toenail-cutting-southampton"
        bookHref="/book?location=southampton"
        bookLabel="Request a Southampton home visit"
        className={`bg-white ${section}`}
      />

      <section id="southampton-coverage" className={`scroll-mt-24 ${section}`} aria-labelledby="southampton-coverage-heading">
        <div className={`${shell} grid gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7">
            <h2 id="southampton-coverage-heading" className={displayH2}>
              Home visits across Southampton
            </h2>
            <p className={`${body} mt-4 max-w-[52ch]`}>
              {location.coverage} {southamptonTravelSummary}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-6">
              <li>
                <Link href="/prices" className={linkQuiet}>
                  View prices
                </Link>
              </li>
            </ul>
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

      {/* Bristol has a "Connected care" partners section here. Add the same block once
          Southampton has published local partners. */}

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
        heading="Request a Southampton home visit"
        text="Share the appointment postcode and the support you need. Foot+ will confirm coverage, suitability and availability."
        action={{ label: "Request a visit in Southampton", href: "/book?location=southampton" }}
      />
    </div>
  );
}
