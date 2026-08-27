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
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/65">
        <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/locations">Locations</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Bristol</span>
      </nav>

      <section className="mt-6 overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-12">
        <span className="inline-flex rounded-full bg-brand-sageLight/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-sageDark">Appointments available</span>
        <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-tight text-brand-sageDark md:text-5xl">Mobile Foot Health Practitioner in Bristol</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-charcoal/75 md:text-lg">Professional, respectful foot care across Bristol, provided in the comfort of your home.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/book?location=bristol" variant="solid">Book in Bristol</Button>
          <Button href="/services" variant="outline">View Foot+ services</Button>
        </div>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start" aria-labelledby="bristol-practitioner">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Your local practitioner</p>
          <h2 id="bristol-practitioner" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">Meet your Foot+ Bristol practitioner</h2>
          <p className="mt-4 leading-relaxed text-brand-charcoal/75">Bristol appointments are delivered with clear communication, dignity and care that remains within the practitioner’s professional training and scope.</p>
        </div>
        {location.practitioner ? <PractitionerProfile practitioner={location.practitioner} /> : null}
      </section>

      <section className="mt-12 rounded-3xl border border-brand-sageLight/30 bg-white p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Bristol coverage</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">Home visits across Bristol</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-brand-charcoal/75">Foot+ Bristol covers central, north, south and east Bristol, with nearby towns considered by request. Travel within central Bristol is included; any wider-area supplement is confirmed before booking.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/areas-we-cover" variant="outline">View Bristol areas covered</Button>
          <Button href="/prices" variant="outline">View prices</Button>
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          { title: "Nail and skin care", text: "Routine toenail care and support for thickened nails, hard skin, calluses, corns and cracked heels." },
          { title: "Care at home", text: "Appointments in familiar surroundings for older adults, people with reduced mobility and anyone who finds travelling difficult." },
          { title: "Clear guidance", text: "Practical aftercare and honest onward guidance when podiatry or medical support is more appropriate." },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-semibold text-brand-sageDark">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/70">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl bg-brand-sageDark p-7 text-white md:p-10">
        <h2 className="font-heading text-2xl font-semibold">Book a Bristol home visit</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">Tell Foot+ what support you need and provide the appointment postcode so coverage and availability can be confirmed.</p>
        <div className="mt-6"><Button href="/book?location=bristol" variant="primary">Book in Bristol</Button></div>
      </section>
    </main>
  );
}
