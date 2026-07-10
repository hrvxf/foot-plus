import Link from "next/link";
import type { Metadata } from "next";
import { Activity, Footprints, HeartPulse, Scissors, ShieldCheck } from "lucide-react";
import { BUSINESS_ID, SITE_URL } from "../lib/site";

const serviceSections = [
  {
    title: "New Patient Assessment",
    symptom: "A first appointment to understand your needs and foot health history.",
    treatment: "Assessment, neurovascular checks where appropriate, treatment and tailored advice.",
    forWho: "New patients arranging home visit foot care with Foot+.",
  },
  {
    title: "Routine Foot Care",
    symptom: "Ongoing nail, skin, hard skin or callus concerns affecting comfort.",
    treatment: "Regular professional foot care to maintain comfort, mobility and healthy skin and nails.",
    forWho: "Adults needing safe, practical foot maintenance at home.",
  },
  {
    title: "Diabetic Foot Checks",
    symptom: "Reduced sensation, fragile skin, or concern about risk changes.",
    treatment: "Structured skin and nail review with circulation and sensation guidance.",
    forWho: "People with diabetes wanting prevention-focused home foot care support.",
  },
];

const conditionCards = [
  {
    title: "Hard Skin & Calluses",
    description: "Support for thickened skin, pressure points and recurring callus that can make walking uncomfortable.",
    href: "/hard-skin-treatment-bristol",
    icon: Footprints,
  },
  {
    title: "Corns",
    description: "Assessment and careful care for focused pressure points that may feel sharp or tender in shoes.",
    href: "/corn-removal-bristol",
    icon: Activity,
  },
  {
    title: "Cracked Heels",
    description: "Help with dry, hard or fissured heel skin, including practical moisturising and aftercare advice.",
    href: "/cracked-heels-bristol",
    icon: HeartPulse,
  },
  {
    title: "Thickened Toenails",
    description: "Professional nail care for thicker or awkward nails that are difficult to manage safely at home.",
    href: "/toenail-cutting-bristol",
    icon: ShieldCheck,
  },
  {
    title: "Toenail Cutting and Nail Care",
    description: "Routine toenail cutting and foot care in your home, focused on comfort rather than cosmetic pedicure.",
    href: "/toenail-cutting-bristol",
    icon: Scissors,
  },
];

const servicesSchema = serviceSections.map((section) => ({
  "@type": "Service",
  "@id": `${SITE_URL}/services#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name: section.title,
  serviceType: section.title,
  areaServed: {
    "@type": "City",
    name: "Bristol",
  },
  provider: {
    "@id": BUSINESS_ID,
  },
  url: `${SITE_URL}/services`,
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": BUSINESS_ID,
      name: "Foot+ Bristol",
      url: SITE_URL,
      areaServed: {
        "@type": "City",
        name: "Bristol",
      },
      makesOffer: servicesSchema.map((service) => ({ "@id": service["@id"] })),
    },
    ...servicesSchema,
  ],
};

export const metadata: Metadata = {
  title: "Foot Care Services in Bristol | Home Visits",
  description:
    "Foot+ Bristol home visit services, including new patient assessments, routine foot care, diabetic foot checks, and common foot and nail concerns treated at home.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    url: `${SITE_URL}/services`,
    title: "Foot Care Services in Bristol | Home Visits",
    description:
      "Explore Foot+ Bristol home visit foot care services and common foot and nail conditions treated at home.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-brand-sageLight/25 bg-brand-sageLight/10 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-sageDark/70">{label}</p>
      <p className="mt-1 text-sm text-brand-charcoal/75">{value}</p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">Services</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">Foot Care Services in Bristol</h1>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
          Home-visit foot care for adults who need safe, practical treatment in Bristol. We help with routine foot care, diabetic foot checks, and common skin and nail concerns, with clear advice you can follow between visits.
        </p>
      </div>

      <section className="mt-8" aria-labelledby="services-heading">
        <h2 id="services-heading" className="font-heading text-2xl font-semibold text-brand-sageDark">Services</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {serviceSections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm md:p-6">
              <h3 className="font-heading text-xl font-semibold text-brand-sageDark">{section.title}</h3>
              <div className="mt-4 space-y-3">
                <DetailRow label="Focus" value={section.symptom} />
                <DetailRow label="Care" value={section.treatment} />
                <DetailRow label="Who It Is For" value={section.forWho} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-brand-sageLight/10 p-5 md:p-7" aria-labelledby="conditions-heading">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Conditions We Treat</p>
          <h2 id="conditions-heading" className="mt-2 font-heading text-2xl font-semibold text-brand-sageDark">Conditions We Treat</h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
            Explore some of the common foot and nail concerns that can be assessed and treated during a Foot+ home visit.
          </p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditionCards.map((condition) => {
            const Icon = condition.icon;
            return (
              <Link key={`${condition.title}-${condition.href}`} href={condition.href} className="group rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-sageLight/60 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-sageLight/15 text-brand-sageDark" aria-hidden="true"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-sageDark">{condition.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">{condition.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-brand-sageDark underline underline-offset-4">Learn more<span className="sr-only"> about {condition.title}</span></span>
              </Link>
            );
          })}
        </div>
        <div className="mt-5 flex flex-col gap-2 text-sm font-semibold text-brand-sageDark sm:flex-row sm:flex-wrap sm:gap-4">
          <Link href="/callus-removal-bristol" className="underline underline-offset-4">
            Learn about localised callus removal
          </Link>
          <Link href="/foot-health-practitioner-bristol" className="underline underline-offset-4">
            Learn about Foot Health Practitioner home visits in Bristol
          </Link>
        </div>
      </section>

      <div className="mt-10 rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
        <p className="text-sm text-brand-charcoal/80 md:text-base">Ready to book? Arrange your home-visit appointment now, or check pricing first.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link className="inline-flex items-center justify-center rounded-full bg-brand-sageDark px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-sageDark/90" href="/book">Book appointment</Link>
          <Link className="inline-flex items-center justify-center rounded-full border border-brand-sageDark/30 px-6 py-3 text-sm font-semibold text-brand-sageDark transition hover:border-brand-sageDark" href="/prices">View prices</Link>
        </div>
      </div>
    </section>
  );
}
