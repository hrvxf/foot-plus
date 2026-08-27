import type { Metadata } from "next";
import Link from "next/link";

import Button from "../../components/Button";
import LocationHero from "../../components/LocationHero";
import { serviceLocations } from "../../lib/locations";
import { SITE_URL } from "../../lib/site";

const canonical = `${SITE_URL}/locations/southampton`;

export const metadata: Metadata = {
  title: { absolute: "Mobile Foot Health Practitioner Southampton | Foot+" },
  description: "Foot+ Southampton launches professional home-visit foot care on 7 November 2026. Learn about the service and register your interest.",
  alternates: { canonical },
  openGraph: {
    title: "Foot+ Southampton | Launching 7 November 2026",
    description: "Professional home-visit foot care is coming to Southampton.",
    url: canonical,
    siteName: "Foot+",
  },
};

const processSteps = [
  {
    title: "Register your interest",
    text: "Share your postcode, contact details and the support you are looking for.",
  },
  {
    title: "Confirm suitability",
    text: "Foot+ confirms coverage, availability and whether the service is appropriate.",
  },
  {
    title: "Arrange your visit",
    text: "Southampton appointments begin from 7 November 2026.",
  },
];

const faqs = [
  {
    question: "When does Foot+ Southampton launch?",
    answer: "Home-visit appointments are planned to begin on 7 November 2026.",
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
  const practitioner = location.practitioner!;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Foot+ Southampton home-visit foot care",
    description: "Professional home-visit foot care launching in Southampton on 7 November 2026.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Southampton" },
    employee: { "@type": "Person", name: practitioner.name, jobTitle: practitioner.role },
    url: canonical,
  };

  return (
    <main className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-[1360px] px-6 pt-8 md:px-10 md:pt-10 xl:px-14">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/60">
          <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/locations">Locations</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Southampton</span>
        </nav>
      </div>

      <LocationHero
        eyebrow="Foot+ Southampton · Launching 7 November 2026"
        title="Home-visit foot care in Southampton"
        description="Professional foot care in the comfort of your own home, delivered with expertise, dignity and genuine care."
        primaryAction={{ label: "Register your interest", href: "/book?location=southampton" }}
        secondaryAction={{ label: "View coverage", href: "#southampton-coverage" }}
        practitioner={practitioner}
      />

      <section id="southampton-coverage" className="scroll-mt-24 border-b border-brand-sageLight/30 bg-brand-sageLight/10">
        <div className="mx-auto grid max-w-[1360px] gap-14 px-6 py-14 md:px-10 md:py-18 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">Southampton coverage</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">Launch coverage is being finalised</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-brand-charcoal/72">
              Register with the appointment postcode and Foot+ will confirm whether it falls within the Southampton launch area. Specific districts and any travel supplements will be published once confirmed.
            </p>
            <div className="mt-7">
              <Button href="/book?location=southampton" variant="outline">Check your postcode</Button>
            </div>
          </div>

          <div aria-labelledby="southampton-process">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">How it works</p>
            <h2 id="southampton-process" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">A straightforward home visit</h2>
            <ol className="relative mt-9 grid gap-7 md:grid-cols-3 md:gap-8">
              <span className="absolute left-4 top-4 hidden h-px bg-brand-sageLight/70 md:block md:right-4" aria-hidden="true" />
              {processSteps.map((step, index) => (
                <li key={step.title} className="relative grid grid-cols-[2rem_1fr] gap-4 md:block md:pt-11">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-sageLight/75 bg-white text-xs font-semibold text-brand-sageDark md:absolute md:left-0 md:top-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-brand-sageDark">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/68">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1360px] px-6 md:px-10 xl:px-14">
        <section className="grid gap-8 py-14 md:grid-cols-[0.7fr_1.3fr] md:gap-16 md:py-18" aria-labelledby="southampton-faqs">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">Useful information</p>
            <h2 id="southampton-faqs" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">Questions about Foot+ Southampton</h2>
          </div>
          <div className="border-b border-brand-sageLight/40">
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

        <section className="mb-20 border-y border-brand-sageDark bg-brand-sageDark px-7 py-9 text-white md:flex md:items-center md:justify-between md:gap-12 md:px-10 md:py-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold">Register for Southampton launch updates</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">Tell us your postcode and the support you are looking for. We will contact you about Southampton availability ahead of launch.</p>
          </div>
          <div className="mt-6 shrink-0 md:mt-0">
            <Button href="/book?location=southampton" variant="primary">Register your interest</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
