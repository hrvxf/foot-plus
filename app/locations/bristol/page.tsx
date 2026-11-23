import type { Metadata } from "next";

import MeetIntro from "../../components/location/MeetIntro";
import MessageClose from "../../components/location/MessageClose";
import FaqFlipDeck from "../../components/location/FaqFlipDeck";
import { locationFaqs } from "../../lib/locationFaqs";
import PartnersStrip from "../../components/partners/PartnersStrip";
import { bristolContactActions } from "../../components/site/ContactIcons";
import { serviceLocations } from "../../lib/locations";
import { ADAM_ID, BRISTOL_BUSINESS_ID, SITE_URL, bristolWhatsAppHref, coveragePlaces, locationEmails, locationPhones, DEFAULT_SOCIAL_IMAGE } from "../../lib/site";
import { googleRatingLine } from "../../lib/reviews";
import ReviewsSection from "../../components/reviews/ReviewsSection";
import TreatmentsMarquee from "../../components/location/TreatmentsMarquee";
import CoverageWall from "../../components/location/CoverageWall";
import VisitChat from "../../components/location/VisitChat";
import { portraits } from "../../components/site/blocks";

const TITLE = "Foot Care at Home in Bristol | Foot+";
const DESCRIPTION = `We come to you. Toenail cutting and routine foot care in your own home across Bristol. ${googleRatingLine("bristol")}Check your postcode and request a visit.`;

const canonical = `${SITE_URL}/locations/bristol`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical },
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: canonical,
    siteName: "Foot+",
  },
};


export default function BristolLocationPage() {
  const location = serviceLocations.bristol;
  const practitioner = location.practitioner!;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": BRISTOL_BUSINESS_ID,
    name: "Foot+ Bristol",
    url: canonical,
    areaServed: { "@type": "City", name: "Bristol" },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    telephone: "+447380301555",
    email: "bristol@foot-plus.co.uk",
    employee: { "@type": "Person", "@id": ADAM_ID, name: practitioner.name, jobTitle: practitioner.role },
    priceRange: "££",
    // Same as the LGBTQ+ flag in the footer, for search engines.
    amenityFeature: { "@type": "LocationFeatureSpecification", name: "LGBTQ+ friendly", value: true },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [schema, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Locations", item: `${SITE_URL}/locations` }, { "@type": "ListItem", position: 2, name: "Bristol", item: canonical } ] }, { "@type": "FAQPage", mainEntity: locationFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }) }} />

      <MeetIntro
        status="Appointments available"
        title="Home foot care in Bristol"
        portraitSrc={portraits.bristol}
        primaryAction={{ label: "Request a visit", href: "/book?location=bristol" }}
        contactActions={bristolContactActions({
          analyticsPrefix: "bristol-hero",
          email: locationEmails.bristol,
        })}
        practitioner={practitioner}
      />

      <ReviewsSection scope="bristol" id="bristol-reviews" analyticsPrefix="bristol" />

      <TreatmentsMarquee id="bristol-services" place="Bristol" />

      <CoverageWall id="bristol-coverage" source="bristol" summary="Central, north, south and east Bristol." places={coveragePlaces.bristol}
        areasHref="/locations/bristol/areas-we-cover"
        areasLabel="Every area we cover in Bristol"
      />

      <VisitChat id="bristol-process" practitioner="Adam" place="BS6" replies="Replies within 24 hours by WhatsApp or email." />

      <PartnersStrip id="bristol-partners" location="bristol" />

      <FaqFlipDeck id="bristol-faqs" />

      <MessageClose
        id="bristol-closing"
        name="Adam"
        place="Foot+ Bristol"
        portraitSrc={portraits.bristol}
        messageHref={bristolWhatsAppHref}
        messageLabel="Message Adam on WhatsApp"
        phone={locationPhones.bristol}
      />
    </div>
  );
}
