import type { Metadata } from "next";
import Link from "next/link";

import LocalPartnerCard from "../../components/LocalPartnerCard";
import LocationHero from "../../components/LocationHero";
import { serviceLocations } from "../../lib/locations";
import { publishedLocalPartners } from "../../lib/partners";
import { conditionPages } from "../../lib/condition-pages";
import { ADAM_ID, BRISTOL_BUSINESS_ID, SITE_URL, bristolWhatsAppHref } from "../../lib/site";
import { travelSummary } from "../../lib/travel";
import PostcodeChecker from "../../components/home/PostcodeChecker";
import ReviewsSection from "../../components/reviews/ReviewsSection";
import { ClosingBand, FaqList, Steps } from "../../components/site/blocks";
import { body, btnSolid, displayH2, displayH3, linkQuiet, rule, shell, small, supporting } from "../../components/site/ui";

const canonical = `${SITE_URL}/locations/bristol`;

export const metadata: Metadata = {
  title: { absolute: "Home Foot Care Bristol | Foot Health Practitioner | Foot+" },
  description: "Foot+ Bristol provides professional home-visit foot care across Bristol, with toenail cutting, corn care, hard skin and preventative foot-health support.",
  alternates: { canonical },
  openGraph: {
    title: "Foot+ Bristol | Mobile Foot Health Practitioner",
    description: "Professional home-visit foot care across Bristol.",
    url: canonical,
    siteName: "Foot+",
  },
};

const section = "py-12 md:py-20";
const inlineLink = "font-semibold text-brand-sageDeep underline decoration-brand-sage decoration-[1.5px] underline-offset-4 hover:text-brand-charcoal";

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
    question: "Which parts of Bristol does Foot+ cover?",
    answer: "Foot+ covers central, north, south and east Bristol. Nearby towns may be considered by request, with exact coverage confirmed from the appointment postcode.",
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
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [schema, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Locations", item: `${SITE_URL}/locations` }, { "@type": "ListItem", position: 2, name: "Bristol", item: canonical } ] }, { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }) }} />

      <LocationHero
        place="Bristol"
        status="Foot+ Bristol · Appointments available"
        title="Home foot care in Bristol"
        description="Professional, respectful foot care in the comfort of your own home, delivered by your local Foot+ practitioner."
        primaryAction={{ label: "Request a visit in Bristol", href: "/book?location=bristol" }}
        secondaryAction={{ label: "View Bristol coverage", href: "/locations/bristol/areas-we-cover" }}
        contactActions={[
          { label: "WhatsApp Adam", href: bristolWhatsAppHref, icon: "whatsapp", external: true },
          { label: "Email Foot+ Bristol", href: "mailto:bristol@foot-plus.co.uk", icon: "email" },
        ]}
        practitioner={practitioner}
      />

      <section id="meet-adam" className={`scroll-mt-24 bg-white ${section}`} aria-labelledby="meet-adam-heading">
        <div className={`${shell} grid gap-6 lg:grid-cols-12 lg:gap-12`}>
          <h2 id="meet-adam-heading" className={`${displayH2} lg:col-span-4`}>
            Meet Adam
          </h2>
          <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:col-span-8">
            <p className={body}>{practitioner.bio[0]}</p>
            <div>
              <p className={body}>{practitioner.bio[1]}</p>
              <Link href="/about#adam-james" className={`${linkQuiet} mt-2`}>
                Adam’s qualifications and approach
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection scope="bristol" id="bristol-reviews" analyticsPrefix="bristol" />

      <section id="bristol-services" className={`scroll-mt-24 bg-white ${section}`} aria-labelledby="bristol-services-heading">
        <div className={shell}>
          <h2 id="bristol-services-heading" className={displayH2}>
            Foot care services in Bristol
          </h2>
          <p className={`${body} mt-4 max-w-[60ch]`}>
            Adam provides routine toenail cutting, care for thickened nails, corns, calluses, hard skin and cracked heels
            during home visits. Care is assessed for suitability, with preventative checks and aftercare advice where
            appropriate.
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...conditionPages]
              .sort((a, b) => Number(b.slug === "toenail-cutting-bristol") - Number(a.slug === "toenail-cutting-bristol"))
              .map((service) => (
                <li key={service.slug} className={`border-t ${rule} pt-4`}>
                  <Link
                    href={`/${service.slug}`}
                    className={`${displayH3} inline-flex min-h-11 items-center underline decoration-brand-sage decoration-[1.5px] underline-offset-4`}
                  >
                    {service.title}
                  </Link>
                  <p className={`${supporting} mt-1`}>{service.description}</p>
                </li>
              ))}
          </ul>
          <p className={`${small} mt-8 max-w-[65ch]`}>
            See{" "}
            <Link href="/services" className={inlineLink}>
              all Foot+ foot care services
            </Link>{" "}
            for what each treatment involves. New patient appointments are £60; routine appointments are £55.{" "}
            <Link href="/prices" className={inlineLink}>
              View appointment details and travel charges
            </Link>
            .
          </p>
          <Link href="/book?location=bristol" className={`${btnSolid} mt-6`}>
            Request a Bristol home visit
          </Link>
        </div>
      </section>

      <section id="bristol-coverage" className={`scroll-mt-24 ${section}`} aria-labelledby="bristol-coverage-heading">
        <div className={`${shell} grid gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7">
            <h2 id="bristol-coverage-heading" className={displayH2}>
              Home visits across Bristol
            </h2>
            <p className={`${body} mt-4 max-w-[52ch]`}>
              Home visits across Bristol and nearby towns. {travelSummary}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-6">
              <li>
                <Link href="/locations/bristol/areas-we-cover" className={linkQuiet}>
                  View areas covered
                </Link>
              </li>
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
              source="bristol"
              title="Do we visit you?"
              label="Postcode for the visit"
              helper="We’ll show any travel fee for your postcode."
            />
          </div>
        </div>
      </section>

      <section className={`border-t ${rule} bg-white ${section}`} aria-labelledby="bristol-process">
        <div className={shell}>
          <h2 id="bristol-process" className={displayH2}>
            A straightforward home visit
          </h2>
          <Steps steps={processSteps.map((step) => ({ title: step.title, body: step.text }))} className="mt-8 md:mt-10" />
        </div>
      </section>

      <section className={section} aria-labelledby="bristol-partners">
        <div className={`${shell} grid gap-8 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-4">
            <h2 id="bristol-partners" className={displayH2}>
              Connected care in Bristol
            </h2>
            <p className={`${body} mt-4 max-w-[40ch]`}>
              Trusted local services Foot+ Bristol may signpost to when wider mobility or rehabilitation support could be
              helpful.
            </p>
          </div>
          <div className={`divide-y divide-brand-charcoal/15 border-y ${rule} lg:col-span-8`}>
            {publishedLocalPartners.map((partner) => (
              <LocalPartnerCard key={partner.website} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      <section className={`border-t ${rule} bg-white ${section}`} aria-labelledby="bristol-faqs">
        <div className={`${shell} grid gap-6 md:grid-cols-12 md:gap-10`}>
          <h2 id="bristol-faqs" className={`${displayH2} md:col-span-4`}>
            Questions about Foot+ Bristol
          </h2>
          <FaqList faqs={faqs} className="md:col-span-8" />
        </div>
      </section>

      <ClosingBand
        id="bristol-closing"
        heading="Request a Bristol home visit"
        text="Share the appointment postcode and the support you need. Foot+ will confirm coverage, suitability and availability."
        action={{ label: "Request a visit in Bristol", href: "/book?location=bristol" }}
      />
    </div>
  );
}
