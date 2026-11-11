import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";

import MobileActions from "../components/site/MobileActions";
import { AppointmentList, Breadcrumb, ClosingCheck, FaqList, Steps } from "../components/site/blocks";
import {
  body,
  btnSolid,
  displayH1,
  displayH2,
  focusRing,
  lead,
  linkQuiet,
  rule,
  shell,
  small,
  supporting,
  texturedGreen,
} from "../components/site/ui";
import { homeSteps } from "../lib/home";
import { serviceLocations } from "../lib/locations";
import { adaptedCare, appointmentTypes, referOnSigns, serviceDetails, servicesFaqs, whoWeHelp } from "../lib/services";
import { BUSINESS_ID, phoneDisplay, phoneHref, prices, SITE_URL } from "../lib/site";
import { travelSummaryAllLocations } from "../lib/travel";

const PAGE_URL = `${SITE_URL}/services`;
const TITLE = "Home-Visit Foot Care Services in Bristol & Southampton | Foot+";
const DESCRIPTION =
  "Toenail cutting, thickened nails, corns and routine skin care at home. Available in Bristol and Southampton.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL, title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const areaServed = [
  { "@type": "City", name: "Bristol" },
  { "@type": "City", name: "Southampton" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@type": "WebSite", name: "Foot+", url: `${SITE_URL}/` },
      about: { "@id": BUSINESS_ID },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: PAGE_URL },
      ],
    },
    ...serviceDetails.map((service) => ({
      "@type": "Service",
      "@id": `${PAGE_URL}#${service.id}`,
      name: service.title,
      serviceType: service.title,
      description: service.summary,
      areaServed,
      provider: { "@id": BUSINESS_ID },
      url: `${PAGE_URL}#${service.id}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        price: prices[1].price.replace(/[^0-9.]/g, ""),
        description: "Returning-patient routine home visit. Any travel charge is confirmed before booking.",
        url: `${SITE_URL}/prices`,
      },
    })),
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: servicesFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

const section = "py-12 md:py-20";

const locations = [
  {
    location: serviceLocations.bristol,
    text: `Home visits with ${serviceLocations.bristol.practitioner?.name} across central, north, south and east Bristol, with nearby towns considered by request.`,
    book: { label: "Request a visit in Bristol", href: "/book?location=bristol", analyticsId: "services-location-bristol-book" },
    more: { label: "Areas we cover", href: "/locations/bristol/areas-we-cover" },
  },
  {
    location: serviceLocations.southampton,
    text: `Home visits with ${serviceLocations.southampton.practitioner?.name}. ${serviceLocations.southampton.coverage}`,
    book: { label: "Request a visit in Southampton", href: "/book?location=southampton", analyticsId: "services-location-southampton" },
    more: { label: "About Foot+ Southampton", href: "/locations/southampton" },
  },
];

export default function ServicesPage() {
  return (
    <div className="pb-[calc(env(safe-area-inset-bottom)+88px)] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Hero />
      <Treatments />
      <Appointments />
      <HowItWorks />
      <WhoWeHelp />
      <Scope />
      <Locations />
      <Faq />
      <ClosingCheck id="services-check-heading" source="services" phoneAnalyticsId="services-cta-phone" />
      <MobileActions analyticsId="services" />
    </div>
  );
}

function Hero() {
  return (
    <section aria-labelledby="services-heading">
      <div className={`${shell} pt-4`}>
        <Breadcrumb current="Services" />
      </div>
      <div className={`${shell} grid gap-10 pb-12 pt-4 md:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-20 lg:pt-8`}>
        <div className="lg:col-span-7">
          <h1 id="services-heading" className={displayH1}>
            Foot care services, <span className="text-brand-sage">at home.</span>
          </h1>
          <p className={`${lead} mt-4 max-w-[52ch] md:mt-6`}>
            Toenail cutting, thickened nails, corns, callus, hard skin and cracked heels, treated in your own home by a
            qualified Foot Health Practitioner.
          </p>
          <div className="mt-7 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
            <Link href="/book" className={btnSolid} data-analytics-id="services-hero-book">
              Request a visit
            </Link>
            <a href={phoneHref} className={linkQuiet} data-analytics-id="services-hero-phone">
              Or call {phoneDisplay}
            </a>
          </div>
          <p className={`${supporting} mt-4`}>
            First visit {prices[0].price} · Routine visits {prices[1].price}
          </p>
        </div>

        <nav aria-labelledby="jump-heading" className={`rounded-lg p-6 sm:p-8 lg:col-span-5 ${texturedGreen}`}>
          <h2 id="jump-heading" className="font-heading text-2xl font-semibold leading-[1.25] text-white">
            What we treat
          </h2>
          <ul className="mt-4 border-b border-white/30">
            {serviceDetails.map((service) => (
              <li key={service.id} className="border-t border-white/30">
                <a
                  href={`#${service.id}`}
                  className="group flex min-h-12 items-center justify-between gap-3 text-lg font-medium text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{service.title}</span>
                  <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section className={`bg-white ${section}`} aria-labelledby="treatments-heading">
      <div className={shell}>
        <div className="max-w-[60ch]">
          <h2 id="treatments-heading" className={displayH2}>
            What we can help with
          </h2>
          <p className={`${body} mt-4`}>
            Every visit starts with an assessment, so your practitioner can confirm what is suitable and explain when
            another clinical service may be more appropriate.
          </p>
        </div>

        <div className={`mt-10 border-b ${rule}`}>
          {serviceDetails.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className={`grid scroll-mt-24 gap-x-10 gap-y-5 border-t ${rule} py-8 lg:grid-cols-12 lg:py-10`}
              aria-labelledby={`${service.id}-title`}
            >
              <div className="lg:col-span-4">
                <h3 id={`${service.id}-title`} className="font-heading text-2xl font-semibold leading-8 text-brand-sageDeep">
                  {service.title}
                </h3>
                <p className={`${small} mt-3`}>{service.summary}</p>
              </div>

              <div className="lg:col-span-4">
                <p className="text-base font-semibold text-brand-sageDeep">During your visit</p>
                <ul className="mt-2 grid gap-2">
                  {service.helps.map((item) => (
                    <li key={item} className={`${supporting} flex gap-2.5`}>
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-sage" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4">
                <p className="text-base font-semibold text-brand-sageDeep">Good to know</p>
                <p className={`${supporting} mt-2`}>{service.goodToKnow}</p>
                {service.guide || service.advice ? (
                  <ul className="mt-2">
                    {service.guide ? (
                      <li>
                        <Link href={service.guide.href} className={linkQuiet}>
                          {service.guide.label}
                        </Link>
                      </li>
                    ) : null}
                    {service.advice ? (
                      <li>
                        <Link href={service.advice.href} className={linkQuiet}>
                          Read: {service.advice.label}
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Appointments() {
  return (
    <section className={section} aria-labelledby="appointments-heading">
      <div className={`${shell} grid gap-8 lg:grid-cols-12 lg:gap-12`}>
        <div className="lg:col-span-5">
          <h2 id="appointments-heading" className={displayH2}>
            Two simple appointment types
          </h2>
          <p className={`${body} mt-4 max-w-[52ch]`}>
            Start with a new patient appointment, then book routine visits as often as your feet need them.
          </p>
          <p className={`${supporting} mt-4 max-w-[52ch]`}>
            {travelSummaryAllLocations} Any travel fee is confirmed before you book.
          </p>
          <Link href="/prices" className={`${linkQuiet} mt-2`}>
            Full price details <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        <div className="lg:col-span-7">
          <AppointmentList
            appointments={appointmentTypes.map((type) => ({ ...type, cta: "Request this appointment" }))}
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className={`border-t ${rule} ${section}`} aria-labelledby="how-heading">
      <div className={shell}>
        <h2 id="how-heading" className={displayH2}>
          From first message to home visit
        </h2>
        <Steps steps={homeSteps} className="mt-8 md:mt-10" />
        <Link href="/advice/what-happens-home-foot-health-appointment" className={`${linkQuiet} mt-6`}>
          What happens during a home foot-health appointment <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function WhoWeHelp() {
  const item = "flex gap-3 text-[1.0625rem] leading-[1.55] text-white md:text-lg";
  return (
    <section className={`${texturedGreen} ${section}`} aria-labelledby="who-heading">
      <div className={`${shell} grid gap-10 md:grid-cols-2 md:gap-10 lg:gap-20`}>
        <div>
          <h2
            id="who-heading"
            className="font-heading text-[1.625rem] font-semibold leading-[1.2] tracking-[-0.01em] text-white md:text-[2.125rem] md:leading-[1.15]"
          >
            Care that comes to you
          </h2>
          <ul className="mt-6 grid gap-3">
            {whoWeHelp.map((entry) => (
              <li key={entry} className={item}>
                <Check className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                {entry}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-white/40 md:border-l md:pl-10 lg:pl-20">
          <h3 className="font-heading text-2xl font-semibold leading-8 text-white">Visits adapted around the person</h3>
          <p className="mt-3 text-[1.0625rem] leading-[1.55] text-white md:text-lg">
            Visits can be planned for adults who need additional time, reassurance or communication support, while
            preserving dignity, consent and personal choice.
          </p>
          <ul className="mt-5 grid gap-3">
            {adaptedCare.map((entry) => (
              <li key={entry} className={item}>
                <Check className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                {entry}
              </li>
            ))}
          </ul>
          <Link
            href="/advice/foot-care-learning-disabilities-bristol"
            className="mt-4 inline-flex min-h-12 items-center gap-2 font-semibold text-white underline underline-offset-4 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Accessible foot care guide <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Scope() {
  return (
    <section className={`bg-white ${section}`} aria-labelledby="scope-heading">
      <div className={`${shell} grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-20`}>
        <div>
          <h2 id="scope-heading" className={displayH2}>
            When we&rsquo;ll point you elsewhere
          </h2>
          <p className={`${body} mt-4 max-w-[52ch]`}>
            Foot+ provides routine foot care. We do not diagnose medical conditions or provide emergency care, and we
            will always explain when a podiatrist, GP, urgent or emergency service is the right next step.
          </p>
          <Link href="/advice/foot-health-practitioner-podiatrist-or-chiropodist" className={`${linkQuiet} mt-2`}>
            Foot Health Practitioner, podiatrist or chiropodist? <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
          </Link>
        </div>
        {/* The one tinted block on the page: it is a safety notice, so it should not read like the rest. */}
        <div className="rounded-md border-l-4 border-[#B08A3E] bg-[#FBF6EC] p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-heading text-xl font-semibold leading-7 text-[#6E5118]">
            <TriangleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
            Seek medical advice first for
          </h3>
          <ul className="mt-4 grid gap-2.5">
            {referOnSigns.map((sign) => (
              <li key={sign} className={`${small} flex gap-2.5`}>
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B08A3E]" aria-hidden="true" />
                {sign}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className={section} aria-labelledby="where-heading">
      <div className={shell}>
        <h2 id="where-heading" className={displayH2}>
          Services in your area
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-10 lg:gap-20">
          {locations.map(({ location, text, book, more }) => (
            <article key={location.slug} className={`border-t ${rule} pt-6`}>
              <h3 className="font-heading text-2xl font-semibold leading-8 text-brand-sageDeep">
                Foot care in {location.name}
              </h3>
              <p className={`${small} mt-2 inline-flex items-center gap-2 font-semibold text-brand-sageDeep`}>
                <span className="h-2.5 w-2.5 rounded-full bg-brand-sage" aria-hidden="true" />
                {location.availability}
              </p>
              <p className={`${supporting} mt-3 max-w-[52ch]`}>{text}</p>
              <div className="mt-5 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
                <Link href={book.href} className={btnSolid} data-analytics-id={book.analyticsId}>
                  {book.label}
                </Link>
                <Link href={more.href} className={linkQuiet}>
                  {more.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className={`border-t ${rule} bg-white ${section}`} aria-labelledby="faq-heading">
      <div className={`${shell} grid gap-6 md:grid-cols-12 md:gap-10`}>
        <div className="md:col-span-3">
          <h2 id="faq-heading" className={displayH2}>
            Before you book
          </h2>
          <p className={`${supporting} mt-3`}>
            Can&rsquo;t see your question? Call{" "}
            <a
              href={phoneHref}
              className={`inline-flex min-h-11 items-center font-semibold text-brand-sageDeep underline underline-offset-4 ${focusRing}`}
            >
              {phoneDisplay}
            </a>
            .
          </p>
        </div>
        <FaqList faqs={servicesFaqs} className="md:col-span-9" />
      </div>
    </section>
  );
}
