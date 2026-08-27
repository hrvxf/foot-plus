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

const southamptonServices = [
  {
    title: "Nail and skin care",
    text: "Routine toenail care and support for thickened nails, hard skin, calluses and cracked heels.",
  },
  {
    title: "Care at home",
    text: "Appointments in familiar surroundings for people who find travelling or reaching their feet difficult.",
  },
  {
    title: "Clear professional guidance",
    text: "Straightforward explanations, aftercare and onward guidance when another service is more appropriate.",
  },
];

const processSteps = [
  {
    title: "Register your interest",
    text: "Share your postcode, contact details and the support you are looking for.",
  },
  {
    title: "Confirm suitability",
    text: "Foot+ will confirm coverage, availability and whether the service is appropriate for your needs.",
  },
  {
    title: "Arrange your visit",
    text: "Southampton appointments will begin from 20 October 2026.",
  },
];

const faqs = [
  {
    question: "When does Foot+ Southampton launch?",
    answer: "Home-visit appointments are planned to begin on 20 October 2026.",
  },
  {
    question: "Can I register before the launch?",
    answer: "Yes. Send your postcode and the type of care you are looking for so Foot+ can contact you about availability.",
  },
  {
    question: "Will appointments take place at home?",
    answer: "Yes. Foot+ Southampton is being developed as a home-visit foot-care service.",
  },
];

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
    <main className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/65">
          <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/locations">Locations</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Southampton</span>
        </nav>

        <section className="relative pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="pointer-events-none absolute -right-40 -top-24 h-96 w-96 rounded-full bg-brand-sageLight/15 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-sageLight" aria-hidden="true" />
              Launching 20 October 2026
            </span>
            <h1 className="mt-6 max-w-4xl font-heading text-4xl font-semibold leading-tight text-brand-sageDark md:text-6xl">
              Home-visit foot care is coming to Southampton.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-charcoal/75 md:text-lg">
              Foot+ Southampton will provide professional foot-health appointments in the comfort of home from 20 October 2026.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/book?location=southampton" variant="solid">Register your interest</Button>
              <Button href="/services" variant="outline">View Foot+ services</Button>
            </div>
          </div>
        </section>

        <section className="border-t border-brand-sageLight/35 py-14 md:py-20" aria-labelledby="southampton-services">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Services</p>
          <div className="mt-3 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <h2 id="southampton-services" className="font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
              Home-visit foot care in Southampton
            </h2>
            <p className="max-w-3xl leading-relaxed text-brand-charcoal/75">
              Foot+ Southampton will support routine foot-health needs at home, with calm explanations, appropriate care and practical aftercare guidance.
            </p>
          </div>

          <div className="mt-10 grid divide-y divide-brand-sageLight/35 border-y border-brand-sageLight/35 md:grid-cols-3 md:divide-x md:divide-y-0">
            {southamptonServices.map((item, index) => (
              <article key={item.title} className="py-8 md:px-8 md:py-8 first:md:pl-0 last:md:pr-0">
                <span className="text-xs font-semibold tracking-[0.18em] text-brand-sageDark/45" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-brand-sageDark">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/70">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {location.practitioner ? (
          <section className="grid gap-10 border-t border-brand-sageLight/35 py-14 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16 md:py-20" aria-labelledby="southampton-practitioner">
            <div className="md:sticky md:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Your local practitioner</p>
              <h2 id="southampton-practitioner" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
                Meet your Foot+ Southampton practitioner
              </h2>
              <p className="mt-5 leading-relaxed text-brand-charcoal/75">
                Professional home visits are built around trust, clear communication, dignity and care that remains within the practitioner’s training and scope.
              </p>
            </div>
            <PractitionerProfile practitioner={location.practitioner} />
          </section>
        ) : null}
      </div>

      <section className="border-y border-brand-sageLight/30 bg-brand-sageLight/10">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16" aria-labelledby="southampton-process">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">How it works</p>
          <h2 id="southampton-process" className="mt-3 max-w-xl font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
            A straightforward home-visit service
          </h2>

          <ol className="relative mt-10 grid gap-0 md:grid-cols-3 md:gap-10">
            <span className="absolute left-4 top-4 h-[calc(100%-2rem)] w-px bg-brand-sageLight/60 md:left-0 md:right-0 md:top-4 md:h-px md:w-auto" aria-hidden="true" />
            {processSteps.map((step, index) => (
              <li key={step.title} className="relative pb-10 pl-12 last:pb-0 md:pb-0 md:pl-0 md:pt-12">
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand-sageLight/70 bg-white text-xs font-semibold text-brand-sageDark md:top-0">
                  {index + 1}
                </span>
                <h3 className="font-heading text-xl font-semibold text-brand-sageDark">{step.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-charcoal/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <section className="grid gap-6 border-b border-brand-sageLight/35 py-14 md:grid-cols-[0.7fr_1.3fr] md:gap-16 md:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">Southampton coverage</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">Coverage details are being finalised</h2>
          </div>
          <p className="border-l-2 border-brand-sageLight/70 pl-6 leading-relaxed text-brand-charcoal/75">
            Register with the appointment postcode and Foot+ will confirm whether it falls within the Southampton launch area. Specific districts and any travel supplements will be published once confirmed.
          </p>
        </section>

        <section className="py-14 md:py-16" aria-labelledby="southampton-faqs">
          <h2 id="southampton-faqs" className="font-heading text-3xl font-semibold text-brand-sageDark">Questions about Foot+ Southampton</h2>
          <div className="mt-7 border-b border-brand-sageLight/40">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-t border-brand-sageLight/40 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-brand-sageDark [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="text-2xl font-light leading-none text-brand-sageDark/60 transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pt-3 text-sm leading-relaxed text-brand-charcoal/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-y border-brand-sageDark bg-brand-sageDark px-7 py-9 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold">Register for Southampton launch updates</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Tell us your postcode and the type of support you are looking for. We will contact you about Southampton availability ahead of launch.
            </p>
          </div>
          <div className="mt-6 shrink-0 md:mt-0">
            <Button href="/book?location=southampton" variant="primary">Register your interest</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
