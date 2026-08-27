import Link from "next/link";
import type { Metadata } from "next";

import Button from "../components/Button";
import { bookingHref, BUSINESS_ID, SITE_URL } from "../lib/site";

const appointmentRoutes = [
  {
    label: "New to Foot+?",
    title: "Begin with an assessment",
    description:
      "Your first visit covers your foot health, medical history, current concerns and suitable treatment.",
    detail: "Approximately 60 minutes",
    action: "Request your first visit",
  },
  {
    label: "Already a patient?",
    title: "Continue with routine care",
    description:
      "Ongoing appointments support nail, skin, hard-skin and callus concerns that affect comfort and mobility.",
    detail: "Approximately 45 minutes",
    action: "Request routine care",
  },
];

const treatmentAreas = [
  {
    title: "Nail cutting and routine nail care",
    description: "Comfort-focused care for nails that are difficult to manage safely at home.",
  },
  {
    title: "Thickened or difficult nails",
    description: "Professional care for thicker, awkward or uncomfortable toenails.",
  },
  {
    title: "Corns and localised pressure",
    description: "Assessment and careful treatment for focused areas that feel sharp or tender.",
  },
  {
    title: "Calluses and hard skin",
    description: "Care for recurring thickened skin and pressure points that can affect walking.",
  },
  {
    title: "Cracked heels",
    description: "Support for dry, hard or fissured heel skin, with practical aftercare advice.",
  },
  {
    title: "Preventative foot-health checks",
    description: "Skin, nail, circulation and sensation observations where clinically appropriate.",
  },
];

const inclusiveCarePoints = [
  "Additional time and clear explanations",
  "Carers, relatives and support workers welcome",
  "Communication, mobility and sensory needs considered",
];

const serviceFaqs = [
  {
    question: "Can a carer or relative attend?",
    answer:
      "Yes. A relative, carer or support worker is welcome when this helps the patient feel comfortable or supports communication and practical arrangements.",
  },
  {
    question: "Can a visit be adapted for anxiety or additional needs?",
    answer:
      "Yes. Tell us about relevant communication, sensory, mobility or anxiety-related needs when enquiring so the appointment can be planned at an appropriate pace.",
  },
  {
    question: "What if my concern needs podiatry or medical care?",
    answer:
      "Foot+ will explain when a concern appears outside routine foot-health scope and advise seeking an appropriate podiatry, GP, urgent or emergency service.",
  },
];

const servicesSchema = [
  "New patient foot-health assessment",
  "Routine foot care",
  "Nail and skin care",
  "Preventative foot-health checks",
].map((name) => ({
  "@type": "Service",
  "@id": `${SITE_URL}/services#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name,
  serviceType: name,
  areaServed: [
    { "@type": "City", name: "Bristol" },
    { "@type": "City", name: "Southampton" },
  ],
  provider: { "@id": BUSINESS_ID },
  url: `${SITE_URL}/services`,
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    ...servicesSchema,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/services#faq`,
      mainEntity: serviceFaqs.map((faq) => ({
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

export const metadata: Metadata = {
  title: "Home-Visit Foot Care Services",
  description:
    "Explore Foot+ home-visit foot care, including assessments, routine nail and skin care, preventative checks and adaptable appointments.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    url: `${SITE_URL}/services`,
    title: "Home-Visit Foot Care Services | Foot+",
    description:
      "Professional foot-health assessment, treatment and practical advice through your local Foot+ service.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-brand-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="border-b border-brand-sageLight/30 bg-linear-to-br from-brand-offwhite via-white to-brand-sageLight/10">
        <div className="mx-auto max-w-[1360px] px-6 pb-14 pt-8 md:px-10 md:pb-20 md:pt-10 xl:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/60">
            <Link
              className="font-semibold text-brand-sageDark underline underline-offset-4"
              href="/"
            >
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Services</span>
          </nav>

          <div className="grid gap-12 pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-20 lg:pt-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">
                Home-visit foot care
              </p>
              <h1 className="mt-5 max-w-4xl font-heading text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-brand-sageDark">
                Foot care at home
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-charcoal/72 md:text-xl">
                Professional treatment, assessment and practical advice from your local Foot+
                practitioner.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={bookingHref} variant="solid">
                  Request a home visit
                </Button>
                <Button href="/prices" variant="outline">
                  View prices
                </Button>
              </div>
            </div>

            <div className="border-y border-brand-sageLight/45">
              <p className="border-b border-brand-sageLight/35 py-5 font-heading text-xl font-semibold text-brand-sageDark">
                Assessment
              </p>
              <p className="border-b border-brand-sageLight/35 py-5 font-heading text-xl font-semibold text-brand-sageDark">
                Treatment
              </p>
              <p className="py-5 font-heading text-xl font-semibold text-brand-sageDark">
                Clear aftercare
              </p>
              <p className="pb-5 text-sm leading-relaxed text-brand-charcoal/62">
                Available through Foot+ Bristol and Foot+ Southampton.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1360px] px-6 py-14 md:px-10 md:py-20 xl:px-14"
        aria-labelledby="appointments-heading"
      >
        <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">
              Where to begin
            </p>
            <h2
              id="appointments-heading"
              className="mt-3 font-heading text-3xl font-semibold tracking-tight text-brand-sageDark md:text-4xl"
            >
              Choose the right starting point
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-brand-charcoal/68">
              Diabetic foot observations, including circulation and sensation checks, are
              included where clinically appropriate.
            </p>
          </div>

          <div className="border-y border-brand-sageLight/40">
            {appointmentRoutes.map((route, index) => (
              <article
                key={route.title}
                className="grid gap-5 border-b border-brand-sageLight/40 py-7 last:border-b-0 md:grid-cols-[3rem_1fr_auto] md:items-start md:gap-7"
              >
                <span className="font-heading text-2xl font-semibold text-brand-sageDark/35">
                  0{index + 1}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sageDark/65">
                    {route.label}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-brand-sageDark">
                    {route.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-brand-charcoal/70">
                    {route.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-brand-sageDark">{route.detail}</p>
                </div>
                <Link
                  href={bookingHref}
                  className="text-sm font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4 md:mt-8 md:whitespace-nowrap"
                >
                  {route.action} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-brand-sageLight/30 bg-white"
        aria-labelledby="treatments-heading"
      >
        <div className="mx-auto max-w-[1360px] px-6 py-14 md:px-10 md:py-20 xl:px-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">
              Treatment and support
            </p>
            <h2
              id="treatments-heading"
              className="mt-3 font-heading text-3xl font-semibold tracking-tight text-brand-sageDark md:text-4xl"
            >
              What we can help with
            </h2>
            <p className="mt-5 leading-relaxed text-brand-charcoal/68">
              Your practitioner will assess what is suitable during the visit and explain when
              another clinical service may be more appropriate.
            </p>
          </div>

          <div className="mt-10 grid border-y border-brand-sageLight/40 md:grid-cols-2 md:divide-x md:divide-brand-sageLight/40">
            {treatmentAreas.map((treatment, index) => (
              <article
                key={treatment.title}
                className={`grid grid-cols-[2.5rem_1fr] gap-4 border-b border-brand-sageLight/35 py-6 md:px-8 ${index % 2 === 0 ? "md:pl-0" : "md:pr-0"}`}
              >
                <span className="pt-0.5 text-xs font-semibold tracking-[0.16em] text-brand-sageDark/40">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-brand-sageDark">
                    {treatment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/66">
                    {treatment.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <nav
            aria-label="Bristol treatment guides"
            className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-brand-charcoal/65"
          >
            <span className="font-semibold text-brand-sageDark">Bristol treatment guides:</span>
            <Link className="underline underline-offset-4" href="/toenail-cutting-bristol">
              Nail care
            </Link>
            <Link className="underline underline-offset-4" href="/corn-removal-bristol">
              Corns
            </Link>
            <Link className="underline underline-offset-4" href="/hard-skin-treatment-bristol">
              Hard skin
            </Link>
            <Link className="underline underline-offset-4" href="/cracked-heels-bristol">
              Cracked heels
            </Link>
          </nav>
        </div>
      </section>

      <section
        className="border-b border-brand-sageLight/30 bg-brand-sageLight/14"
        aria-labelledby="inclusive-care-heading"
      >
        <div className="mx-auto grid max-w-[1360px] gap-10 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24 xl:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">
              Adaptable home visits
            </p>
            <h2
              id="inclusive-care-heading"
              className="mt-3 font-heading text-3xl font-semibold tracking-tight text-brand-sageDark md:text-4xl"
            >
              Care adapted around the person
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-brand-charcoal/70">
              Visits can be planned for adults who need additional time, reassurance or
              communication support, while preserving dignity, consent and personal choice.
            </p>
            <div className="mt-7">
              <Link
                href="/advice/foot-care-learning-disabilities-bristol"
                className="text-sm font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4"
              >
                Read the Bristol accessible-care guide →
              </Link>
            </div>
          </div>

          <ul className="border-y border-brand-sageLight/50">
            {inclusiveCarePoints.map((point) => (
              <li
                key={point}
                className="flex gap-4 border-b border-brand-sageLight/40 py-5 last:border-b-0"
              >
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sageDark text-[10px] font-semibold text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="font-heading text-lg font-semibold text-brand-sageDark">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1360px] px-6 py-14 md:px-10 md:py-20 xl:px-14"
        aria-labelledby="services-faq-heading"
      >
        <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">
              Common questions
            </p>
            <h2
              id="services-faq-heading"
              className="mt-3 font-heading text-3xl font-semibold tracking-tight text-brand-sageDark md:text-4xl"
            >
              Before you enquire
            </h2>
          </div>

          <div className="border-b border-brand-sageLight/40">
            {serviceFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-t border-brand-sageLight/40 py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-brand-sageDark [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span
                    className="text-2xl font-light leading-none text-brand-sageDark/60 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pt-3 text-sm leading-relaxed text-brand-charcoal/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
