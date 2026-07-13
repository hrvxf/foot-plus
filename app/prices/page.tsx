import Link from "next/link";
import Button from "../components/Button";
import { bookingHref, prices, SITE_URL } from "../lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foot Health Prices in Bristol | Home Visits",
  alternates: { canonical: `${SITE_URL}/prices` },
  openGraph: { url: `${SITE_URL}/prices` },
  description:
    "Clear foot health prices for Bristol home visits, including new patient and routine appointments with Foot+ Bristol.",
};

const whatsappMessage = encodeURIComponent(
  "Hi Adam, I’d like to enquire about an appointment with Foot+ Bristol."
);
const whatsappHref = `https://wa.me/447380301555?text=${whatsappMessage}`;

const pricingCards = [
  {
    label: "First appointment",
    title: "New Patient Appointment",
    price: prices[0].price,
    summary: "Assessment and treatment",
    duration: "Approximately 60 minutes",
    checklist: [
      "Medical and foot health history",
      "Neurovascular assessment",
      "Treatment of nail and skin concerns",
      "Personalised care and aftercare advice",
    ],
    cta: "Book your first appointment",
    featured: true,
  },
  {
    label: "Returning patients",
    title: "Routine Appointment",
    price: prices[1].price,
    summary: "Ongoing foot care",
    duration: "Approximately 45 minutes",
    checklist: [
      "Routine nail and skin care",
      "Callus and hard-skin management",
      "Ongoing foot health review",
      "Advice between appointments",
    ],
    cta: "Book a routine appointment",
    featured: false,
  },
];

const nextSteps = [
  {
    title: "Send your request",
    body: "Tell Foot+ what support you need and where you are based.",
  },
  {
    title: "Confirm the details",
    body: "Your appointment type, location and availability will be confirmed.",
  },
  {
    title: "Receive care at home",
    body: "Foot+ brings the necessary equipment and provides treatment in your home.",
  },
];

function CheckIcon({ className = "text-brand-sageDark" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16.25 5.75 8.5 13.5 4.75 9.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricesPage() {
  return (
    <main className="bg-brand-offwhite">
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-6 md:pb-16 md:pt-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-brand-charcoal/65">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Prices</li>
          </ol>
        </nav>

        <div className="max-w-[900px]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-sageDark/75">
            HOME VISIT FOOT CARE IN BRISTOL
          </p>
          <h1 className="mt-3 max-w-[900px] font-heading text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-brand-sageDark">
            Home visit foot care prices
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-charcoal/75 sm:text-lg">
            Professional foot care in the comfort of your home, with travel across central Bristol included.
          </p>
        </div>

        <div className="mt-7 grid items-stretch gap-5 lg:grid-cols-2">
          {pricingCards.map((card) => (
            <article
              key={card.title}
              className={`flex h-full flex-col overflow-hidden rounded-[28px] border bg-white ${
                card.featured
                  ? "border-brand-sageDark/35 ring-1 ring-brand-sageDark/10"
                  : "border-brand-sageLight/35"
              }`}
            >
              <div
                className={`border-b px-5 py-5 sm:px-6 ${
                  card.featured
                    ? "border-brand-sageDark/15 bg-brand-sageDark text-white"
                    : "border-brand-sageLight/30 bg-brand-sageLight/14 text-brand-sageDark"
                }`}
              >
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${
                    card.featured
                      ? "border-white/35 bg-white/12 text-white"
                      : "border-brand-sageDark/20 bg-white/70 text-brand-sageDark"
                  }`}
                >
                  {card.label}
                </span>
                <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight">
                  {card.title}
                </h2>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div>
                  <p className="font-heading text-5xl font-semibold tracking-tight text-brand-sageDark sm:text-6xl">
                    {card.price}
                  </p>
                  <p className="mt-3 text-base font-semibold text-brand-charcoal">
                    {card.summary}
                  </p>
                  <p className="mt-1 text-sm text-brand-charcoal/70">{card.duration}</p>
                </div>

                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-brand-charcoal/78">
                  {card.checklist.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sageLight/20">
                        <CheckIcon />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Button
                    href={bookingHref}
                    variant={card.featured ? "solid" : "outline"}
                    className="w-full rounded-full sm:w-auto"
                  >
                    {card.cta}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      <section className="border-y border-brand-sageLight/30 bg-brand-sageLight/18">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center md:py-12">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">
              Travel across central Bristol is included
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75 sm:text-base">
              Foot+ is based in BS2 and provides home visits across central and surrounding Bristol. A small supplement may apply farther afield, but this will always be confirmed before booking.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button href="/areas-we-cover" variant="solid" className="w-full rounded-full sm:w-auto">
              View areas covered
            </Button>
            <Button href={bookingHref} variant="outline" className="w-full rounded-full sm:w-auto">
              Check your postcode
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">
        <div className="max-w-2xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">
            What happens next?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/70 sm:text-base">
            The booking process is simple and confirmed before your visit.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {nextSteps.map((step, index) => (
            <article key={step.title} className="rounded-[24px] border border-brand-sageLight/35 bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-sageDark font-heading text-base font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-brand-sageDark">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/72">{step.body}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-[28px] border border-brand-sageDark/20 bg-white p-6 sm:p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">
              Not sure which appointment to choose?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75 sm:text-base">
              New clients should select the New Patient Appointment. Existing clients can book Routine Foot Care.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <Button href={bookingHref} variant="solid" className="w-full rounded-full sm:w-auto">
              Request an appointment
            </Button>
            <Button
              href={whatsappHref}
              variant="outline"
              className="w-full rounded-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask a question on WhatsApp
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
