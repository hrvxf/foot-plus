import type { Metadata } from "next";
import Link from "next/link";

import Button from "../../components/Button";
import PractitionerProfile from "../../components/PractitionerProfile";
import { serviceLocations } from "../../lib/locations";
import { SITE_URL } from "../../lib/site";

const canonical = `${SITE_URL}/locations/southampton`;

export const metadata: Metadata = {
  title: { absolute: "Mobile Foot Health Practitioner Southampton | Foot+" },
  description:
    "Foot+ Southampton launches professional home-visit foot care on 20 October 2026. Learn about the service and register your interest.",
  alternates: { canonical },
  openGraph: {
    title: "Foot+ Southampton | Launching 20 October 2026",
    description:
      "Professional home-visit foot care is coming to Southampton.",
    url: canonical,
    siteName: "Foot+",
  },
};

export default function SouthamptonPage() {
  const location = serviceLocations.southampton;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Foot+ Southampton home-visit foot care",
    description: "Professional home-visit foot care launching in Southampton on 20 October 2026.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Southampton" },
    url: canonical,
  };

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/65">
        <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/locations">
          Locations
        </Link>{" "}\n        <span aria-hidden="true">/</span> Southampton
      </nav>

      <section className="mt-6 overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-12">
        <span className="inline-flex rounded-full bg-brand-sageLight/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-sageDark">
          Launching 20 October 2026
        </span>
        <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-tight text-brand-sageDark md:text-5xl">
          Home-visit foot care is coming to Southampton.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-charcoal/75 md:text-lg">
          Foot+ Southampton will provide professional foot-health appointments in the comfort of home from 20 October 2026.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/book?location=southampton" variant="solid">Register your interest</Button>
          <Button href="/services" variant="outline">View Foot+ services</Button>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="southampton-services">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Services</p>
        <h2 id="southampton-services" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">
          Home-visit foot care in Southampton
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-brand-charcoal/75">
          Foot+ Southampton will support routine foot-health needs at home, with calm explanations, appropriate care and practical aftercare guidance.
        </p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
        {[
          { title: "Nail and skin care", text: "Routine toenail care and support for thickened nails, hard skin, calluses and cracked heels." },
          { title: "Care at home", text: "Appointments in familiar surroundings for people who find travelling or reaching their feet difficult." },
          { title: "Clear professional guidance", text: "Straightforward explanations, aftercare and onward guidance when another service is more appropriate." },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-semibold text-brand-sageDark">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/70">{item.text}</p>
          </article>
        ))}
        </div>
      </section>

      {location.practitioner ? (
        <section className="mt-12 grid gap-10 md:grid-cols-2 md:items-start" aria-labelledby="southampton-practitioner">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Your local practitioner</p>
            <h2 id="southampton-practitioner" className="font-heading text-3xl font-semibold text-brand-sageDark">
              Meet your Foot+ Southampton practitioner
            </h2>
            <p className="leading-relaxed text-brand-charcoal/75">
              Professional home visits are built around trust, clear communication, dignity and care that remains within the practitioner’s training and scope.
            </p>
          </div>
          <PractitionerProfile practitioner={location.practitioner} />
        </section>
      ) : null}

      <section className="mt-12 grid gap-5 md:grid-cols-3" aria-labelledby="southampton-process">
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">How it works</p>
          <h2 id="southampton-process" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">A straightforward home-visit service</h2>
        </div>
        {[
          { title: "1. Register your interest", text: "Share your postcode, contact details and the support you are looking for." },
          { title: "2. Confirm suitability", text: "Foot+ will confirm coverage, availability and whether the service is appropriate for your needs." },
          { title: "3. Arrange your visit", text: "Southampton appointments will begin from 20 October 2026." },
        ].map((step) => (
          <article key={step.title} className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-semibold text-brand-sageDark">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/70">{step.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-brand-sageLight/30 bg-white p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Southampton coverage</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">Coverage details are being finalised</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-brand-charcoal/75">
          Register with the appointment postcode and Foot+ will confirm whether it falls within the Southampton launch area. Specific districts and any travel supplements will be published once confirmed.
        </p>
      </section>

      <section className="mt-12 rounded-3xl border border-brand-sageLight/30 bg-brand-sageLight/10 p-7 md:p-9">
        <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">Questions about Foot+ Southampton</h2>
        <div className="mt-5 space-y-3">
          {[
            { question: "When does Foot+ Southampton launch?", answer: "Home-visit appointments are planned to begin on 20 October 2026." },
            { question: "Can I register before the launch?", answer: "Yes. Send your postcode and the type of care you are looking for so Foot+ can contact you about availability." },
            { question: "Will appointments take place at home?", answer: "Yes. Foot+ Southampton is being developed as a home-visit foot-care service." },
          ].map((faq) => (
            <details key={faq.question} className="rounded-xl border border-brand-sageLight/25 bg-white p-4">
              <summary className="cursor-pointer font-semibold text-brand-sageDark">{faq.question}</summary>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-brand-sageDark p-7 text-white md:p-10">
        <h2 className="font-heading text-2xl font-semibold">Register for Southampton launch updates</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
          Tell us your postcode and the type of support you are looking for. We will contact you about Southampton availability ahead of launch.
        </p>
        <div className="mt-6">
          <Button href="/book?location=southampton" variant="primary">Register your interest</Button>
        </div>
      </section>
    </main>
  );
}
