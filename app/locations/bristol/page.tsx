import type { Metadata } from "next";
import Link from "next/link";

import Button from "../../components/Button";
import LocalPartnerCard from "../../components/LocalPartnerCard";
import LocationHero from "../../components/LocationHero";
import { serviceLocations } from "../../lib/locations";
import { publishedLocalPartners } from "../../lib/partners";
import { SITE_URL } from "../../lib/site";

const canonical = `${SITE_URL}/locations/bristol`;
const bristolWhatsAppHref = `https://wa.me/447380301555?text=${encodeURIComponent("Hi Adam, I’d like to enquire about a Foot+ Bristol appointment.")}`;

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

const processSteps = [
  {
    title: "Request a visit",
    text: "Tell us what support you need and provide the appointment postcode.",
  },
  {
    title: "Confirm the details",
    text: "Foot+ confirms coverage, suitability, availability and the expected cost.",
  },
  {
    title: "Care at home",
    text: "Your practitioner visits at the arranged time and provides clear aftercare guidance.",
  },
];

const faqs = [
  {
    question: "Which parts of Bristol does Foot+ cover?",
    answer: "Foot+ covers central, north, south and east Bristol. Nearby towns may be considered by request, with exact coverage confirmed from the appointment postcode.",
  },
  {
    question: "Can a relative or carer arrange the appointment?",
    answer: "Yes. A relative, carer or support worker can enquire or help coordinate the visit, with appropriate consent from the person receiving care.",
  },
  {
    question: "What if my concern needs podiatry or medical care?",
    answer: "Foot+ will explain when a concern appears outside routine foot-health scope and advise seeking an appropriate podiatry, GP, urgent or emergency service.",
  },
];

export default function BristolLocationPage() {
  const location = serviceLocations.bristol;
  const practitioner = location.practitioner!;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${canonical}#medicalbusiness`,
    name: "Foot+ Bristol",
    url: canonical,
    areaServed: { "@type": "City", name: "Bristol" },
    employee: { "@type": "Person", name: practitioner.name, jobTitle: practitioner.role },
    priceRange: "££",
  };

  return (
    <main className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-[1360px] px-6 pt-8 md:px-10 md:pt-10 xl:px-14">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/60">
          <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/locations">Locations</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Bristol</span>
        </nav>
      </div>

      <LocationHero
        eyebrow="Foot+ Bristol · Appointments available"
        title="Mobile foot care in Bristol"
        description="Professional, respectful foot care in the comfort of your own home, delivered by your local Foot+ practitioner."
        primaryAction={{ label: "Book in Bristol", href: "/book?location=bristol" }}
        secondaryAction={{ label: "View Bristol coverage", href: "/locations/bristol/areas-we-cover" }}
        contactActions={[
          { label: "WhatsApp Adam", href: bristolWhatsAppHref, icon: "whatsapp", external: true },
          { label: "Email Foot+ Bristol", href: "mailto:bristol@foot-plus.co.uk", icon: "email" },
        ]}
        practitioner={practitioner}
      />

      <section className="border-b border-brand-sageLight/30 bg-white" aria-labelledby="meet-adam">
        <div className="mx-auto grid max-w-[1360px] gap-8 px-6 py-12 md:px-10 md:py-14 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20 xl:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">Your Bristol practitioner</p>
            <h2 id="meet-adam" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">Meet Adam</h2>
          </div>
          <div className="grid gap-5 text-base leading-relaxed text-brand-charcoal/72 md:grid-cols-2 md:gap-10">
            <p>{practitioner.bio[0]}</p>
            <p>{practitioner.bio[1]}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-sageLight/30 bg-brand-sageLight/10">
        <div className="mx-auto grid max-w-[1360px] gap-14 px-6 py-14 md:px-10 md:py-18 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">Bristol coverage</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">Home visits across Bristol</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-brand-charcoal/72">
              Central, north, south and east Bristol are covered, with nearby towns considered by request. Travel within central Bristol is included; any wider-area supplement is confirmed before booking.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/locations/bristol/areas-we-cover" variant="outline">View areas covered</Button>
              <Button href="/prices" variant="outline">View prices</Button>
            </div>
          </div>

          <div aria-labelledby="bristol-process">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">How it works</p>
            <h2 id="bristol-process" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">A straightforward home visit</h2>
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
        <section className="grid gap-10 border-b border-brand-sageLight/35 py-14 md:py-18 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20" aria-labelledby="bristol-partners">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">Local partners</p>
            <h2 id="bristol-partners" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">Connected care in Bristol</h2>
            <p className="mt-5 max-w-md leading-relaxed text-brand-charcoal/70">
              Trusted local services Foot+ Bristol may signpost to when wider mobility or rehabilitation support could be helpful.
            </p>
          </div>
          <div className="divide-y divide-brand-sageLight/35 border-y border-brand-sageLight/35">
            {publishedLocalPartners.map((partner) => (
              <LocalPartnerCard key={partner.website} partner={partner} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-14 md:grid-cols-[0.7fr_1.3fr] md:gap-16 md:py-18" aria-labelledby="bristol-faqs">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">Useful information</p>
            <h2 id="bristol-faqs" className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">Questions about Foot+ Bristol</h2>
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
            <h2 className="font-heading text-2xl font-semibold">Book a Bristol home visit</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">Share the appointment postcode and the support you need. Foot+ will confirm coverage, suitability and availability.</p>
          </div>
          <div className="mt-6 shrink-0 md:mt-0">
            <Button href="/book?location=bristol" variant="primary">Book in Bristol</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
