import Link from "next/link";

import AnimatedFootPlusLogo from "./AnimatedFootPlusLogo";
import Button from "./Button";
import HeroSection from "./HeroSection";

const sharedStandards = [
  "Professional home visits",
  "Qualified Foot Health Practitioners",
  "Fully insured",
  "DBS checked",
  "Sterile instruments",
  "Inclusive, respectful care",
];

const services = [
  {
    title: "Nail care",
    description:
      "Routine toenail care and support for thickened or difficult-to-manage nails.",
  },
  {
    title: "Skin care",
    description:
      "Care for hard skin, calluses, corns and cracked heels where suitable.",
  },
  {
    title: "Foot-health checks",
    description:
      "Careful observations, practical aftercare and onward guidance when needed.",
  },
];

export default function UmbrellaHome() {
  return (
    <div className="space-y-14 pb-16 md:space-y-20">
      <HeroSection className="overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-sage/55" aria-hidden="true" />
        <div
          className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brand-sageDark/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-140px)] max-w-6xl items-center gap-10 px-6 pb-12 pt-10 md:min-h-[calc(100vh-80px)] md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:pb-20 md:pt-16">
          <div>
            <AnimatedFootPlusLogo className="h-auto w-56 text-white/95 sm:w-64" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Home-visit foot care
            </p>
            <h1 className="mt-4 max-w-2xl font-heading text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Professional foot care, brought home.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Foot+ provides qualified, respectful foot care through local
              home-visit services in Bristol and Southampton.
            </p>
          </div>

          <div id="locations" className="grid scroll-mt-28 gap-4 sm:grid-cols-2">
            <article className="flex min-h-80 flex-col rounded-3xl border border-white/25 bg-white/14 p-6 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-xl md:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                  Available now
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden="true" />
              </div>
              <h2 className="mt-7 font-heading text-3xl font-semibold">Foot+ Bristol</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/80">
                Professional home-visit foot care across Bristol, with appointments
                available for new and returning patients.
              </p>
              <Link
                href="/bristol"
                className="mt-7 inline-flex items-center justify-between rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-sageDark transition hover:bg-brand-offwhite"
                data-analytics-id="home-location-bristol"
              >
                Explore Bristol <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="flex min-h-80 flex-col rounded-3xl border border-white/25 bg-brand-sageDark/35 p-6 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-xl md:p-7">
              <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                Launching 20 October 2026
              </span>
              <h2 className="mt-7 font-heading text-3xl font-semibold">Foot+ Southampton</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/80">
                Foot+ is bringing professional home-visit foot care to Southampton.
                Register your interest ahead of the October launch.
              </p>
              <Link
                href="/southampton"
                className="mt-7 inline-flex items-center justify-between rounded-xl border border-white/50 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                data-analytics-id="home-location-southampton"
              >
                Explore Southampton <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </HeroSection>

      <section className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">
            The Foot+ standard
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
            Local care, built around the same promise.
          </h2>
          <p className="mt-4 leading-relaxed text-brand-charcoal/75">
            Each Foot+ location provides calm, professional care in familiar
            surroundings, with clear explanations and respect for personal choice.
          </p>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sharedStandards.map((standard) => (
            <li
              key={standard}
              className="flex items-center gap-3 rounded-2xl border border-brand-sageLight/30 bg-white p-4 text-sm font-semibold text-brand-sageDark shadow-sm"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-sageLight/20" aria-hidden="true">
                ✓
              </span>
              {standard}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white/65 py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">
            Foot-health services
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
              Care for healthy, comfortable feet.
            </h2>
            <Link href="/services" className="text-sm font-semibold text-brand-sageDark underline underline-offset-4">
              View all services
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-3xl border border-brand-sageLight/25 bg-brand-offwhite/70 p-6">
                <h3 className="font-heading text-xl font-semibold text-brand-sageDark">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/70">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-brand-sageDark p-7 text-white shadow-sm md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold">Choose your local Foot+ service.</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
              Bristol appointments are available now. Southampton home visits begin on 20 October 2026.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0">
            <Button href="/book?location=bristol" variant="primary">Book in Bristol</Button>
            <Button href="/southampton" variant="secondary">Southampton launch</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
