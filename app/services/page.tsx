import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";

import MobileActions from "../components/site/MobileActions";
import { AppointmentList, Breadcrumb, ClosingCheck } from "../components/site/blocks";
import {
  body,
  btnSolid,
  displayH1,
  displayH2,
  lead,
  linkQuiet,
  rule,
  shell,
  small,
  supporting,
  texturedGreen,
} from "../components/site/ui";
import { serviceLocations } from "../lib/locations";
import { appointmentTypes, referOnSigns, serviceDetails, whoWeHelp } from "../lib/services";
import { BUSINESS_ID, prices, SITE_URL } from "../lib/site";

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
      <WhoWeHelp />
      <Scope />
      <Locations />
      <ClosingCheck id="services-check-heading" source="services" />
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
      <div className={`${shell} pb-12 pt-4 md:pb-16 lg:pb-20 lg:pt-8`}>
        <h1 id="services-heading" className={displayH1}>
          Foot care services, <span className="text-brand-sage">at home.</span>
        </h1>
        <p className={`${lead} mt-4 max-w-[52ch] md:mt-6`}>
          Routine nail and skin care in your own home, from a qualified Foot Health Practitioner.
        </p>
        {/* No phone line or prices here: the header has the number and the appointments section has the prices. */}
        <Link href="/book" className={`${btnSolid} mt-7`} data-analytics-id="services-hero-book">
          Request a visit
        </Link>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section className={`bg-white ${section}`} aria-labelledby="treatments-heading">
      <div className={shell}>
        <h2 id="treatments-heading" className={displayH2}>
          What we can help with
        </h2>

        <div className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
          {serviceDetails.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className={`scroll-mt-24 border-t ${rule} py-6`}
              aria-labelledby={`${service.id}-title`}
            >
              <h3 id={`${service.id}-title`} className="font-heading text-xl font-semibold leading-7 text-brand-sageDeep">
                {service.title}
              </h3>
              <p className={`${supporting} mt-2`}>{service.summary}</p>
              <Link href={service.link.href} className={`${linkQuiet} mt-1`}>
                {service.link.label} <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </Link>
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
          <p className={`${supporting} mt-4 max-w-[52ch]`}>Any travel fee shows when you check your postcode.</p>
          <div className="mt-2 flex flex-col items-start">
            <Link href="/prices" className={linkQuiet}>
              Full price details <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/advice/what-happens-home-foot-health-appointment" className={linkQuiet}>
              What happens during a home visit <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
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
          <h3 className="font-heading text-2xl font-semibold leading-8 text-white">Visits adapted around you</h3>
          <p className="mt-3 text-[1.0625rem] leading-[1.55] text-white md:text-lg">
            Need extra time or someone with you? Just tell us when you get in touch.
          </p>
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
            Foot+ provides routine foot care. Our Foot Health Practitioners are not podiatrists, and we do not diagnose
            conditions or provide emergency care. If you need a podiatrist, GP or urgent care, we&rsquo;ll tell you.
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
