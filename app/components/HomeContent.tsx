import Link from "next/link";
import Button from "./Button";
import HeroSection from "./HeroSection";
import AnimatedFootPlusLogo from "./AnimatedFootPlusLogo";
import type { SVGProps } from "react";

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.73a11.86 11.86 0 0 0 5.77 1.47h.01c6.57 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.46-8.36Zm-8.45 18.2h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74 1.03 1-3.65-.24-.38a9.9 9.9 0 1 1 8.38 4.59Zm5.74-7.86c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.52-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.38-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.51-.7-.52h-.6c-.2 0-.54.08-.82.38-.28.31-1.08 1.05-1.08 2.56 0 1.5 1.1 2.95 1.25 3.16.15.2 2.17 3.31 5.25 4.64.73.31 1.3.5 1.74.64.73.23 1.4.2 1.92.12.59-.09 1.82-.74 2.08-1.45.26-.71.26-1.33.18-1.45-.08-.12-.28-.2-.59-.36Z" />
    </svg>
  );
}

const whatsappMessage = encodeURIComponent(
  "Hello, I’d like to enquire about a Foot+ home-visit appointment."
);
const whatsappHref = `https://wa.me/447380301555?text=${whatsappMessage}`;

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
    items: [
      "Corns & callus reduction",
      "Verrucas & hard skin care",
      "Dry, cracked heel care",
    ],
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

const trustChips = [
  { label: "Qualified Foot Health Practitioner" },
  { label: "Fully insured" },
  { label: "DBS checked" },
  { label: "Sterile instruments" },
  { label: "Professional home visits" },
  { label: "LGBT friendly", variant: "rainbow" },
];

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
    <div className="space-y-10 pb-[calc(env(safe-area-inset-bottom)+24px)] md:pb-0">
      {/* Hero */}
      <HeroSection className="text-white">
        <div
          className="absolute inset-0 bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-sage/40" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-140px)] max-w-6xl flex-col items-center gap-12 px-6 pb-2 pt-5 sm:gap-14 md:min-h-[calc(100vh-80px)] md:flex-row md:items-center md:gap-20 md:pb-20 md:pt-8">
          <div className="flex flex-1 flex-col items-center space-y-8 text-center md:space-y-10">
            <div className="space-y-3.75">
              {/* Brand mark (removed Bristol pill) */}
              <div className="relative z-10 flex min-h-55 w-full items-center justify-center overflow-visible">
                <AnimatedFootPlusLogo className="text-white/95 h-36 sm:h-48 md:h-56 lg:h-64" />
              </div>

              {/* Headline (intentional line breaks) */}
              <h1 className="font-heading text-4xl font-semibold leading-[1.05] sm:text-[2.75rem] md:text-5xl">
                <span className="block">Professional foot care, brought home</span>
              </h1>

              <p className="mx-auto max-w-2xl text-base text-white/90 sm:text-lg">
                Qualified, respectful foot care in the comfort of home, delivered through your local Foot+ service.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:justify-center">
              <Button href="/book" variant="primary">
                Book an appointment
              </Button>
              <Button href="/prices" variant="secondary">
                View prices
              </Button>
              <a
                href="https://www.facebook.com/profile.php?id=61586341484139"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Foot+ on Facebook"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#4f8ed8] text-white shadow-md shadow-black/10 transition hover:bg-[#3f7fc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                data-analytics-id="hero-facebook"
              >
                {/* Use a filled glyph so the Facebook mark reads clearly at small sizes. */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-[1.55rem] w-[1.55rem] fill-current"
                >
                  <path d="M13.39 24v-10.95h3.68l.55-4.27h-4.23V6.05c0-1.24.34-2.08 2.12-2.08h2.26V.15C17.38.1 16.07 0 14.55 0c-3.17 0-5.34 1.94-5.34 5.49v3.29H5.63v4.27h3.58V24h4.18Z" />
                </svg>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ask Foot+ a question on WhatsApp"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#54bf7a] text-white shadow-md shadow-black/10 transition hover:bg-[#46ad6d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                data-analytics-id="hero-whatsapp"
              >
                <WhatsAppIcon className="h-[1.55rem] w-[1.55rem]" />
              </a>
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

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
            Services
          </p>
          <h2 className="font-heading text-3xl font-semibold text-brand-sageDark">
            Professional home-visit foot care
          </h2>
          <p className="max-w-2xl text-base text-brand-charcoal/80">
            Foot+ delivers professional foot-health services with clear advice and gentle treatment. Each
            visit includes a full assessment and personalised guidance. Explore{" "}
            <Link href="/services" className="font-semibold text-brand-sageDark underline">
              home-visit foot care services
            </Link>{" "}
            and see{" "}
            <Link href="/prices" className="font-semibold text-brand-sageDark underline">
              foot health prices
            </Link>{" "}
            or{" "}
            <Link href="/locations" className="font-semibold text-brand-sageDark underline">
              find your local Foot+ service
            </Link>{" "}
            before you book.
          </p>
        </div>

        <div className="mt-10 grid border-y border-brand-sageLight/35 md:grid-cols-2">
          {serviceCards.map((s) => (
            <div
              key={s.title}
              className="group border-b border-brand-sageLight/35 py-8 even:md:border-l even:md:pl-10 odd:md:pr-10 nth-[3]:md:border-b-0 nth-[4]:border-b-0"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center border-b border-brand-sageLight/60 text-brand-sageDark">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
              <h3 className="font-heading text-lg font-semibold text-brand-sageDark">{s.title}</h3>
              <p className="mt-2 text-sm text-brand-charcoal/70">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/services" className="text-sm font-semibold text-brand-sageDark">
            See full service details →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">How it works</h2>
        <div className="mt-7 grid divide-y divide-brand-sageLight/35 border-y border-brand-sageLight/35 md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map((x) => (
            <div key={x.t} className="py-7 md:px-8 first:md:pl-0 last:md:pr-0">
              <h3 className="font-heading text-base font-semibold text-brand-sageDark">{x.t}</h3>
              <p className="mt-2 text-sm text-brand-charcoal/70">{x.d}</p>
            </div>
          ))}
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
