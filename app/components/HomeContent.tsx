import Link from "next/link";
import BrandSeal from "../../components/BrandSeal";
import Button from "./Button";
import HeroSection from "./HeroSection";

const heroServices = [
  {
    category: "Nails",
    items: [
      "Thickened & problem nail care",
      "Fungal nail treatment plans",
      "Ingrowing toenail relief",
    ],
  },
  {
    category: "Skin",
    items: ["Corns & callus reduction", "Verrucas & hard skin care", "Dry, cracked heel care"],
  },
  {
    category: "Assessment & specialist care",
    items: [
      "Full foot health assessment",
      "Circulation & sensation checks",
      "Diabetic foot care guidance",
    ],
  },
];

const trustChips = ["Qualified FHP", "Sterile instruments", "Home visits in Bristol"];

const serviceCards = [
  {
    title: "Nail & skin care",
    desc: "Comfortable nail trimming and treatment for thickened or problem nails.",
  },
  {
    title: "Corns & calluses",
    desc: "Targeted removal of painful corns, hard skin, and verrucas.",
  },
  {
    title: "Fungal treatment",
    desc: "Clear guidance and treatment plans for fungal nail concerns.",
  },
  {
    title: "Diabetic foot care",
    desc: "Careful assessments with circulation checks and aftercare advice.",
  },
];

const steps = [
  { t: "1) Request a slot", d: "Tell us what you need and when you’re free." },
  { t: "2) Confirm details", d: "We’ll reply to confirm time, location, and cost." },
  { t: "3) Appointment", d: "Professional treatment with aftercare guidance." },
];

export default function HomeContent() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero */}
      <HeroSection className="text-white">
        <div
          className="absolute inset-0 bg-[url('/images/footplus-texture.png')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-sage/40" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col items-center gap-10 px-6 pb-12 pt-6 md:flex-row md:items-center md:gap-14 md:pb-16 md:pt-8">
          <div className="flex-1 space-y-6">
            <div className="flex justify-start">
              <BrandSeal variant="hero" className="-mt-1 mb-3 md:-mt-2 md:mb-4" />
            </div>
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-semibold leading-tight md:text-5xl">
                Professional foot health services in Bristol
              </h1>
              <p className="max-w-xl text-base text-white/90 md:text-lg">
                Calm, clinical, and compassionate care for healthy, comfortable feet — in
                the comfort of your home.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/book" variant="primary">
                Book an appointment
              </Button>
              <Button href="/contact" variant="secondary">
                Call or WhatsApp
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/25 p-6 shadow-[0_32px_90px_-35px_rgba(0,0,0,0.6)] ring-1 ring-white/10 md:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-white/12 backdrop-blur-2xl"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" />
              <div className="pointer-events-none absolute -left-12 top-8 h-40 w-40 rounded-full bg-white/25 blur-[80px]" />
              <div className="pointer-events-none absolute -right-14 bottom-4 h-44 w-44 rounded-full bg-brand-sageLight/25 blur-[90px]" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
                    Services
                  </span>
                  <p className="text-sm text-white/70">
                    Clinical, calm care tailored to your feet.
                  </p>
                </div>

                <div className="mt-5 space-y-5">
                  {heroServices.map((group) => (
                    <div key={group.category}>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        {group.category}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[15px] leading-relaxed text-white/85"
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
                      key={chip}
                      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/75"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
            Services
          </p>
          <h2 className="font-heading text-3xl font-semibold text-brand-sageDark">
            Calm, thorough care tailored to you
          </h2>
          <p className="max-w-2xl text-base text-brand-charcoal/80">
            We deliver premium foot health services with clear advice and gentle
            treatment. Each visit includes a full assessment and personalised guidance.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {serviceCards.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm shadow-brand-sage/10 transition hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-sageLight/20 text-brand-sageDark">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 12.5C6 8 10 4 14.5 4c2.5 0 4.5 2 4.5 4.5 0 4.5-3.5 11.5-9.5 11.5C7.5 20 6 18.5 6 16.5v-4Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7.5c0-1.7 1.4-3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-brand-sageDark">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-brand-charcoal/70">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/about" className="text-sm font-semibold text-brand-sageDark">
            See full service details →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">
          How it works
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-base font-semibold text-brand-sageDark">
                {x.t}
              </h3>
              <p className="mt-2 text-sm text-brand-charcoal/70">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">
          Areas covered
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-brand-charcoal/70">
          Bristol and nearby areas. If you’re not sure, send a message and we’ll confirm.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-brand-sageLight/30 bg-white p-8 text-center shadow-sm">
          <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">
            Ready to book?
          </h2>
          <p className="mt-2 text-sm text-brand-charcoal/70">
            Use the booking form and we’ll get back to you to confirm a time.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/book" variant="primary">
              Request an appointment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
