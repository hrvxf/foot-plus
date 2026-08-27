import Link from "next/link";
import Button from "./Button";
import HeroSection from "./HeroSection";
import AnimatedFootPlusLogo from "./AnimatedFootPlusLogo";

const heroServices = [
  {
    category: "Home-visit foot care",
    items: [
      "Toenails and thickened nails",
      "Corns, calluses and cracked heels",
      "Foot-health assessment and guidance",
    ],
  },
];

const trustChips = [
  { label: "Qualified practitioners" },
  { label: "Fully insured" },
  { label: "DBS checked" },
  { label: "Sterile instruments" },
  { label: "LGBT friendly", variant: "rainbow" },
];

const steps = [
  { t: "1) Choose your location", d: "See your local practitioner, coverage and availability." },
  { t: "2) Tell us what you need", d: "Request a Bristol appointment or register for Southampton." },
  { t: "3) Confirm the next step", d: "Your local Foot+ service will confirm suitability, timing and pricing." },
];

export default function HomeContent() {
  return (
    <div className="space-y-10 pb-[calc(env(safe-area-inset-bottom)+24px)] md:pb-0">
      {/* Hero */}
      <HeroSection className="text-white">
        <div
          className="absolute inset-0 bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-sage/40" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-6xl flex-col items-center gap-10 px-6 py-12 sm:min-h-[690px] md:min-h-[720px] md:flex-row md:items-center md:gap-16 md:py-14">
          <div className="flex flex-1 flex-col items-center space-y-6 text-center md:items-start md:text-left">
            <div className="space-y-3.75">
              {/* Brand mark (removed Bristol pill) */}
              <div className="relative z-10 flex min-h-32 w-full items-center justify-center overflow-visible md:justify-start">
                <AnimatedFootPlusLogo className="h-28 text-white/95 sm:h-32 md:h-36 lg:h-40" />
              </div>

              {/* Headline (intentional line breaks) */}
              <h1 className="font-heading text-4xl font-semibold leading-[1.05] sm:text-[2.75rem] md:text-5xl">
                <span className="block">Professional foot care, brought home</span>
              </h1>

              <p className="mx-auto max-w-2xl text-base text-white/90 sm:text-lg md:mx-0">
                Qualified, respectful foot care in the comfort of home, delivered through your local Foot+ service.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button href="/locations" variant="primary">
                Choose your location
              </Button>
              <Button href="/prices" variant="secondary">
                View prices
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative w-full max-w-xl border-y border-white/25 py-7 md:py-9">

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
                    Services
                  </span>
                  <p className="text-sm font-medium text-white/70">Care that starts from the ground up.</p>
                </div>

                <div className="mt-5 space-y-5">
                  {heroServices.map((group) => (
                    <div key={group.category}>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                        {group.category}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-white/85"
                          >
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/40 bg-white/10">
                              <svg
                                viewBox="0 0 20 20"
                                className="h-3.5 w-3.5 text-white/90"
                                fill="none"
                                aria-hidden="true"
                              >
                                <path
                                  d="M5 10.5l3 3 7-7"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {trustChips.map((chip) => (
                    <span
                      key={chip.label}
                      className={
                        chip.variant === "rainbow"
                          ? "rounded-full border border-white/35 bg-[linear-gradient(90deg,rgba(228,3,3,0.48),rgba(255,140,0,0.48),rgba(255,237,0,0.48),rgba(0,128,38,0.48),rgba(36,64,142,0.48),rgba(115,41,130,0.48))] px-3 py-1 text-xs font-medium text-white shadow-[0_8px_24px_-14px_rgba(0,0,0,0.7)]"
                          : "rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white/75"
                      }
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* How it works */}
      <section className="w-full border-y border-brand-sageLight/30 bg-brand-sageLight/10">
        <div className="mx-auto max-w-6xl px-6 py-10 md:flex md:items-end md:gap-12 md:py-12">
          <div className="md:w-56 md:shrink-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/65">Getting started</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-sageDark">How it works</h2>
            <Link href="/locations" className="mt-4 inline-block text-sm font-semibold text-brand-sageDark underline underline-offset-4">
              Choose your location
            </Link>
          </div>
          <div className="mt-7 grid flex-1 divide-y divide-brand-sageLight/40 border-y border-brand-sageLight/40 md:mt-0 md:grid-cols-3 md:divide-x md:divide-y-0">
            {steps.map((step, index) => (
              <div key={step.t} className="py-6 md:px-7 first:md:pl-0 last:md:pr-0">
                <span className="text-2xl font-semibold text-brand-sageLight" aria-hidden="true">0{index + 1}</span>
                <h3 className="mt-3 font-heading text-base font-semibold text-brand-sageDark">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-sageLight/30 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <Link
            href="/book"
            className="flex-1 rounded-full bg-brand-sageDark px-4 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-black/10"
          >
            Book now
          </Link>
          <Link
            href="/prices"
            className="flex-1 rounded-full border border-brand-sageLight/60 px-4 py-3 text-center text-sm font-semibold text-brand-sageDark"
          >
            Prices
          </Link>
        </div>
      </div>
    </div>
  );
}
