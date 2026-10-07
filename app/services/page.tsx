import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  CircleDot,
  Droplets,
  Footprints,
  Layers,
  Phone,
  Plus,
  Scissors,
  Shapes,
  Stethoscope,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import ClosingCta from "../components/site/ClosingCta";
import MobileActions from "../components/site/MobileActions";
import { btnGhost, btnPrimary, container, eyebrow, h2, textLink } from "../components/site/ui";
import { homeSteps } from "../lib/home";
import { serviceLocations } from "../lib/locations";
import {
  adaptedCare,
  appointmentTypes,
  referOnSigns,
  serviceDetails,
  servicesFaqs,
  whoWeHelp,
  type ServiceIconKey,
} from "../lib/services";
import { BUSINESS_ID, phoneDisplay, phoneHref, prices, SITE_URL } from "../lib/site";

const PAGE_URL = `${SITE_URL}/services`;
const TITLE = "Home-Visit Foot Care Services in Bristol & Southampton | Foot+";
const DESCRIPTION =
  "Toenail cutting, thickened nails, corns and routine skin care at home. Bristol available now; Foot+ Southampton opens on 7 November 2026.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL, title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const icons: Record<ServiceIconKey, LucideIcon> = {
  nail: Scissors,
  thick: Layers,
  corn: CircleDot,
  callus: Shapes,
  skin: Droplets,
  heel: Footprints,
  check: Stethoscope,
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
        description: "Returning-patient routine home visit. Southampton launches on 7 November 2026; any travel charge is confirmed before booking.",
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

const bristol = serviceLocations.bristol;
const southampton = serviceLocations.southampton;

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
      <ClosingCta
        analyticsId="services"
        title="Book a home foot-care visit"
        text="Bristol appointments are available now. Foot+ Southampton opens on 7 November 2026."
      />
      <MobileActions analyticsId="services" />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-brand-line" aria-labelledby="services-heading">
      <div className={`${container} grid gap-10 pb-12 pt-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14 md:pb-16 md:pt-8`}>
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="font-medium text-brand-sageDeep underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Services</li>
            </ol>
          </nav>
          <p className={`${eyebrow} mt-8`}>Home-visit foot care · Bristol &amp; Southampton</p>
          <h1
            id="services-heading"
            className="mt-3 font-heading text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.01em] text-brand-sageDeep sm:text-5xl lg:text-[3.25rem]"
          >
            Foot care services, <span className="text-brand-sage">at home.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-muted sm:text-xl">
            Toenail cutting, thickened nails, corns, callus, hard skin and cracked heels, treated in your own home by a
            qualified Foot Health Practitioner.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className={btnPrimary} data-analytics-id="services-hero-book">
              Book a home visit
            </Link>
            <a href={phoneHref} className={btnGhost} data-analytics-id="services-hero-phone">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {phoneDisplay}
            </a>
          </div>
          <p className="mt-5 text-[15px] text-brand-muted">
            First visit {prices[0].price} · Routine visits {prices[1].price}
          </p>
        </div>

        <nav
          aria-label="Jump to a treatment"
          className="relative isolate overflow-hidden rounded-[2rem] bg-brand-sage bg-[url('/images/footplus-texture.png')] bg-size-[600px_600px] p-5 text-white sm:p-7"
        >
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-brand-sage/20 to-brand-sageDeep/70" aria-hidden="true" />
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85">What we treat</p>
          <ul className="mt-4 grid gap-2">
            {serviceDetails.map((service) => {
              const Icon = icons[service.icon];
              return (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 font-medium transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="flex-1">{service.title}</span>
                    <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section className="py-14 md:py-20" aria-labelledby="treatments-heading">
      <div className={container}>
        <div className="max-w-3xl">
          <p className={eyebrow}>Treatments</p>
          <h2 id="treatments-heading" className={h2}>
            What we can help with
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            Every visit starts with an assessment, so your practitioner can confirm what is suitable and explain when
            another clinical service may be more appropriate.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {serviceDetails.map((service, index) => {
            const Icon = icons[service.icon];
            const spanFull = serviceDetails.length % 2 === 1 && index === serviceDetails.length - 1;
            return (
              <article
                key={service.id}
                id={service.id}
                className={`flex scroll-mt-28 flex-col rounded-3xl border border-brand-line bg-white p-6 sm:p-8 ${spanFull ? "lg:col-span-2" : ""}`}
                aria-labelledby={`${service.id}-title`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-wash text-brand-sageDark">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 id={`${service.id}-title`} className="pt-2 font-heading text-[1.35rem] font-semibold leading-snug text-brand-sageDeep">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-brand-charcoal/85">{service.summary}</p>

                <p className="mt-5 text-sm font-semibold text-brand-sageDeep">During your visit</p>
                <ul className="mt-2 grid gap-2">
                  {service.helps.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15.5px] leading-snug text-brand-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-sage" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 rounded-2xl bg-brand-offwhite px-4 py-3 text-[15px] leading-snug text-brand-muted">
                  <span className="font-semibold text-brand-sageDeep">Good to know: </span>
                  {service.goodToKnow}
                </p>

                {service.guide || service.advice ? (
                  <div className="mt-auto flex flex-col gap-2 pt-5 text-[15px]">
                    {service.guide ? (
                      <Link href={service.guide.href} className={textLink}>
                        {service.guide.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : null}
                    {service.advice ? (
                      <Link href={service.advice.href} className="font-medium text-brand-sageDark underline underline-offset-4 hover:text-brand-sageDeep">
                        Read: {service.advice.label}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Appointments() {
  return (
    <section className="border-y border-brand-line bg-white py-14 md:py-20" aria-labelledby="appointments-heading">
      <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14`}>
        <div>
          <p className={eyebrow}>Appointments and prices</p>
          <h2 id="appointments-heading" className={h2}>
            Two simple appointment types
          </h2>
          <p className="mt-4 leading-relaxed text-brand-muted">
            Start with a new patient appointment, then book routine visits as often as your feet need them. Travel within
            central Bristol is included; any wider-area supplement is confirmed before booking.
          </p>
          <Link href="/prices" className={`${textLink} mt-5`}>
            Full price details <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {appointmentTypes.map((type) => (
            <li
              key={type.title}
              className={`flex flex-col rounded-3xl bg-brand-offwhite p-6 sm:p-7 ${
                type.featured ? "border-2 border-brand-sage" : "border border-brand-line"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand-sage">{type.tag}</p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-brand-sageDeep">{type.title}</h3>
              <p className="mt-3 font-heading text-[2.6rem] font-semibold leading-none text-brand-sageDeep">{type.price}</p>
              <p className="mt-1 text-sm text-brand-muted">{type.duration}</p>
              <ul className="mb-6 mt-5 grid gap-2 border-t border-brand-line pt-5">
                {type.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[15px] leading-snug text-brand-charcoal/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-sage" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={type.href} className={`${type.featured ? btnPrimary : btnGhost} mt-auto w-full`}>
                Book this appointment
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-14 md:py-20" aria-labelledby="how-heading">
      <div className={container}>
        <p className={eyebrow}>How it works</p>
        <h2 id="how-heading" className={h2}>
          From first message to home visit
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {homeSteps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-brand-line bg-white p-6">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-brand-sageLight font-heading text-lg font-semibold text-brand-sageDark"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-brand-sageDeep">{step.title}</h3>
              <p className="mt-1 text-[15.5px] leading-relaxed text-brand-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/advice/what-happens-home-foot-health-appointment" className={`${textLink} mt-6 text-[15px]`}>
          What happens during a home foot-health appointment <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function WhoWeHelp() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-sage bg-[url('/images/footplus-texture.png')] bg-size-[600px_600px] text-white"
      aria-labelledby="who-heading"
    >
      <div className="absolute inset-0 -z-10 bg-brand-sageDeep/75" aria-hidden="true" />
      <div className={`${container} grid gap-10 py-14 md:grid-cols-2 md:gap-16 md:py-20`}>
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85">Who we help</p>
          <h2 id="who-heading" className="mt-2 font-heading text-[1.9rem] font-semibold leading-tight sm:text-4xl">
            Care that comes to you
          </h2>
          <ul className="mt-6 grid gap-3">
            {whoWeHelp.map((item) => (
              <li key={item} className="flex gap-3 text-[17px]">
                <Check className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/25 bg-white/10 p-6 sm:p-8">
          <h3 className="font-heading text-2xl font-semibold">Visits adapted around the person</h3>
          <p className="mt-3 leading-relaxed text-white/90">
            Visits can be planned for adults who need additional time, reassurance or communication support, while
            preserving dignity, consent and personal choice.
          </p>
          <ul className="mt-5 grid gap-2.5">
            {adaptedCare.map((item) => (
              <li key={item} className="flex gap-3 font-medium">
                <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/advice/foot-care-learning-disabilities-bristol"
            className="mt-6 inline-flex items-center gap-2 font-semibold underline underline-offset-4"
          >
            Accessible foot care guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Scope() {
  return (
    <section className="py-14 md:py-20" aria-labelledby="scope-heading">
      <div className={`${container} grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-14`}>
        <div>
          <p className={eyebrow}>Your safety</p>
          <h2 id="scope-heading" className={h2}>
            When we&rsquo;ll point you elsewhere
          </h2>
          <p className="mt-4 leading-relaxed text-brand-muted">
            Foot+ provides routine foot care. We do not diagnose medical conditions or provide emergency care, and we
            will always explain when a podiatrist, GP, urgent or emergency service is the right next step.
          </p>
          <Link href="/advice/foot-health-practitioner-podiatrist-or-chiropodist" className={`${textLink} mt-5 text-[15px]`}>
            Foot Health Practitioner, podiatrist or chiropodist? <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="rounded-3xl border border-[#EAD9B8] bg-[#FBF6EC] p-6 sm:p-8">
          <p className="flex items-center gap-2 font-heading text-lg font-semibold text-[#6E5118]">
            <TriangleAlert className="h-5 w-5" aria-hidden="true" />
            Seek medical advice first for
          </p>
          <ul className="mt-4 grid gap-2.5">
            {referOnSigns.map((sign) => (
              <li key={sign} className="flex gap-2.5 text-[15.5px] leading-snug text-brand-charcoal">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B08A3E]" aria-hidden="true" />
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
    <section className="border-y border-brand-line bg-white py-14 md:py-20" aria-labelledby="where-heading">
      <div className={container}>
        <p className={eyebrow}>Where we visit</p>
        <h2 id="where-heading" className={h2}>
          Services in your area
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-brand-line bg-brand-offwhite p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-wash px-3 py-1 text-[13px] font-semibold text-brand-sageDeep">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Taking new patients
            </span>
            <h3 className="mt-4 font-heading text-2xl font-semibold text-brand-sageDeep">Foot care in Bristol</h3>
            <p className="mt-2 leading-relaxed text-brand-muted">
              Home visits with {bristol.practitioner?.name} across central, north, south and east Bristol, with nearby towns
              considered by request.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/book?location=bristol" className={btnPrimary} data-analytics-id="services-location-bristol-book">
                Book in Bristol
              </Link>
              <Link href="/locations/bristol/areas-we-cover" className={btnGhost}>
                Areas we cover
              </Link>
            </div>
          </article>
          <article className="rounded-3xl border border-brand-line bg-brand-offwhite p-6 sm:p-8">
            <span className="inline-flex rounded-full bg-[#F4EBD8] px-3 py-1 text-[13px] font-semibold text-[#6E5118]">
              Opening {southampton.launchDate}
            </span>
            <h3 className="mt-4 font-heading text-2xl font-semibold text-brand-sageDeep">Foot care in Southampton</h3>
            <p className="mt-2 leading-relaxed text-brand-muted">
              Home visits with {southampton.practitioner?.name}. Register your interest to hear first when appointments open.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/book?location=southampton" className={btnPrimary} data-analytics-id="services-location-southampton">
                Register your interest
              </Link>
              <Link href="/locations/southampton" className={btnGhost}>
                About Foot+ Southampton
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="py-14 md:py-20" aria-labelledby="faq-heading">
      <div className={`${container} grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16`}>
        <div>
          <p className={eyebrow}>Questions</p>
          <h2 id="faq-heading" className={h2}>
            Before you book
          </h2>
          <p className="mt-4 text-brand-muted">
            Can&rsquo;t see your question? Call{" "}
            <a href={phoneHref} className="font-semibold text-brand-sageDeep underline underline-offset-4">
              {phoneDisplay}
            </a>
            .
          </p>
        </div>
        <div className="border-t border-brand-line">
          {servicesFaqs.map((faq, index) => (
            <details key={faq.question} className="group border-b border-brand-line" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg font-semibold text-brand-sageDeep [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-wash transition group-open:rotate-45" aria-hidden="true">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-relaxed text-brand-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
