import type { Metadata } from "next";

import MeetIntro from "../../components/location/MeetIntro";
import MessageClose from "../../components/location/MessageClose";
import FaqFlipDeck from "../../components/location/FaqFlipDeck";
import { locationFaqs } from "../../lib/locationFaqs";
import PartnersStrip from "../../components/partners/PartnersStrip";
import { southamptonContactActions } from "../../components/site/ContactIcons";
import { serviceLocations } from "../../lib/locations";
import { KATIE_ID, SITE_URL, SOUTHAMPTON_BUSINESS_ID, coveragePlaces, locationEmails, locationPhones } from "../../lib/site";
import ReviewsSection from "../../components/reviews/ReviewsSection";
import TreatmentsMarquee from "../../components/location/TreatmentsMarquee";
import CoverageWall from "../../components/location/CoverageWall";
import VisitChat from "../../components/location/VisitChat";
import { portraits } from "../../components/site/blocks";

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
    telephone: locationPhones.southampton.e164,
    email: locationEmails.southampton.display,
    employee: { "@type": "Person", "@id": KATIE_ID, name: practitioner.name, jobTitle: practitioner.role },
    priceRange: "££",
    // Same as the LGBTQ+ flag in the footer, for search engines.
    amenityFeature: { "@type": "LocationFeatureSpecification", name: "LGBTQ+ friendly", value: true },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [schema, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Locations", item: `${SITE_URL}/locations` }, { "@type": "ListItem", position: 2, name: "Southampton", item: canonical } ] }, { "@type": "FAQPage", mainEntity: locationFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }) }} />

      <MeetIntro
        status="Appointments available"
        title="Home foot care in Southampton"
        portraitSrc={portraits.southampton}
        primaryAction={{ label: "Request a visit in Southampton", href: "/book?location=southampton" }}
        contactActions={southamptonContactActions({ analyticsPrefix: "southampton-hero" })}
        practitioner={practitioner}
      />

      <ReviewsSection scope="southampton" id="southampton-reviews" analyticsPrefix="southampton" />

      <TreatmentsMarquee id="southampton-services" place="Southampton" />

      <CoverageWall id="southampton-coverage" source="southampton" summary="Southampton and nearby, including Romsey, Chandler’s Ford and Totton." places={coveragePlaces.southampton} />

      <VisitChat id="southampton-process" practitioner="Katie" place="Romsey" replies="Replies within 24 hours by phone or email." />

      {/* Bristol has a "Connected care" partners section here. Add the same block once
          Southampton has published local partners. */}

      <PartnersStrip id="southampton-partners" location="southampton" />

      <FaqFlipDeck id="southampton-faqs" />

      <MessageClose
        id="southampton-closing"
        name="Katie"
        place="Foot+ Southampton"
        portraitSrc={portraits.southampton}
        messageHref={locationEmails.southampton.href}
        messageLabel="Email Katie"
        requestHref="/book?location=southampton"
        phone={locationPhones.southampton}
      />
    </div>
  );
}
