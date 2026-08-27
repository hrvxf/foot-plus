import type { Metadata } from "next";
import Link from "next/link";

import Button from "../../components/Button";
import PractitionerProfile from "../../components/PractitionerProfile";
import { serviceLocations } from "../../lib/locations";
import { SITE_URL } from "../../lib/site";

const canonical = `${SITE_URL}/locations/bristol`;

export const metadata: Metadata = {
  title: { absolute: "Mobile Foot Health Practitioner Bristol | Foot+" },
  description: "Foot+ Bristol provides professional home-visit foot care across Bristol, with routine nail, skin and preventative foot-health support.",
  alternates: { canonical },
  openGraph: {
    title: "Foot+ Bristol | Mobile Foot Health Practitioner",
    description: "Professional home-visit foot care across Bristol.",
    url: canonical,
    siteName: "Foot+",
  },
};

const bristolServices = [
  {
    title: "Nail and skin care",
    text: "Routine toenail care and support for thickened nails, hard skin, calluses, corns and cracked heels.",
  },
  {
    title: "Care at home",
    text: "Appointments in familiar surroundings for older adults, people with reduced mobility and anyone who finds travelling difficult.",
  },
  {
    title: "Clear guidance",
    text: "Practical aftercare and honest onward guidance when podiatry or medical support is more appropriate.",
  },
];

export default function BristolLocationPage() {
  const location = serviceLocations.bristol;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${canonical}#medicalbusiness`,
    name: "Foot+ Bristol",
    url: canonical,
    areaServed: { "@type": "City", name: "Bristol" },
    employee: location.practitioner ? { "@type": "Person", name: location.practitioner.name, jobTitle: location.practitioner.role } : undefined,
    priceRange: "££",
  };

  return (
    <main className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/65">
          <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/locations">Locations</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Bristol</span>
        </nav>

        <section className="relative pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="pointer-events-none absolute -right-40 -top-24 h-96 w-96 rounded-full bg-brand-sageLight/15 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-sageLight" aria-hidden="true" />
              Appointments available
            </span>
            <h1 className="mt-6 max-w-4xl font-heading text-4xl font-semibold leading-tight text-brand-sageDark md:text-6xl">
              Mobile Foot Health Practitioner in Bristol
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-charcoal/75 md:text-lg">
              Professional, respectful foot care across Bristol, provided in the comfort of your home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/book?location=bristol" variant="solid">Book in Bristol</Button>
              <Button href="/services" variant="outline">View Foot+ services</Button>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-t border-brand-sageLight/35 py-14 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16 md:py-20" aria-labelledby="bristol-practitioner">
          <div className="md:sticky md:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Your local practitioner</p>
            <h2 id="bristol-practitioner" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
              Meet your Foot+ Bristol practitioner
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-brand-charcoal/75">
              Bristol appointments are delivered with clear communication, dignity and care that remains within the practitioner’s professional training and scope.
            </p>
          </div>
          {location.practitioner ? <PractitionerProfile practitioner={location.practitioner} /> : null}
        </section>
      </div>

      <section className="border-y border-brand-sageLight/30 bg-brand-sageLight/10">
        <div className="mx-auto grid max-w-6xl gap-7 px-6 py-12 md:grid-cols-[0.75fr_1.25fr] md:items-center md:gap-16 md:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Bristol coverage</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">Home visits across Bristol</h2>
          </div>
          <div>
            <p className="max-w-3xl leading-relaxed text-brand-charcoal/75">
              Foot+ Bristol covers central, north, south and east Bristol, with nearby towns considered by request. Travel within central Bristol is included; any wider-area supplement is confirmed before booking.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/locations/bristol/areas-we-cover" variant="outline">View Bristol areas covered</Button>
              <Button href="/prices" variant="outline">View prices</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <section className="py-14 md:py-20" aria-label="Foot+ Bristol service benefits">
          <div className="grid divide-y divide-brand-sageLight/35 border-y border-brand-sageLight/35 md:grid-cols-3 md:divide-x md:divide-y-0">
            {bristolServices.map((item, index) => (
              <article key={item.title} className="py-8 md:px-8 md:py-2 first:md:pl-0 last:md:pr-0">
                <span className="text-xs font-semibold tracking-[0.18em] text-brand-sageDark/45" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-brand-sageDark">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/70">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-brand-sageDark bg-brand-sageDark px-7 py-9 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold">Book a Bristol home visit</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Tell Foot+ what support you need and provide the appointment postcode so coverage and availability can be confirmed.
            </p>
          </div>
          <div className="mt-6 shrink-0 md:mt-0">
            <Button href="/book?location=bristol" variant="primary">Book in Bristol</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
