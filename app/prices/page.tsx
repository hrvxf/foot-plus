import Link from "next/link";
import type { Metadata } from "next";

import PostcodeChecker from "../components/home/PostcodeChecker";
import PriceTickets from "../components/prices/PriceTickets";
import TravelSlider from "../components/prices/TravelSlider";
import { focusRing, texturedGreen } from "../components/site/ui";
import { homeSteps } from "../lib/home";
import { appointmentTypes } from "../lib/services";
import { bookingHref, paymentMethods, SITE_URL, DEFAULT_SOCIAL_IMAGE } from "../lib/site";
import { travelBases } from "../lib/travel";

export const metadata: Metadata = {
  title: "Home Visit Nail & Foot Care Prices",
  alternates: { canonical: `${SITE_URL}/prices` },
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE], url: `${SITE_URL}/prices` },
  description:
    "Home nail and foot care: £60 for a first visit and £55 for a routine appointment. Available in Bristol and Southampton.",
};

// Short names for the tickets; prices, lengths and inclusions come from appointmentTypes.
const ticketNames = ["First visit", "Routine visit"];
const tickets = appointmentTypes.map((type, i) => ({
  tag: type.tag,
  name: ticketNames[i] ?? type.title,
  price: type.price,
  duration: type.duration,
  points: type.points,
}));

const eyebrow = "text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark";
const headline = "font-heading font-bold tracking-[-0.025em] text-brand-charcoal";
const arrowLink = `inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-brand-sageDeep ${focusRing}`;

export default function PricesPage() {
  return (
    <div>
      <section aria-labelledby="prices-heading" className="pb-2 pt-10 text-center md:pt-16">
        <h1 id="prices-heading" className={`${headline} mb-8 px-6 text-[2.75rem] leading-[1.04] md:mb-12 md:text-7xl`}>
          <span className="sr-only">Home visit foot care prices. </span>
          Simple,
          <br />
          <span className="text-brand-sage">upfront prices.</span>
        </h1>
        <PriceTickets tickets={tickets} />
        <p className="mx-auto max-w-[34ch] px-6 pt-7 leading-[1.5] text-brand-muted">
          One price per visit, covering nail care and any suitable skin care.
        </p>
      </section>

      <section
        className={`${texturedGreen} mx-3.5 mt-10 rounded-[28px] px-[22px] pb-8 pt-10 text-center md:mx-auto md:max-w-2xl md:px-12 md:py-14`}
        aria-labelledby="travel-heading"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageLight">Travel</p>
        <h2 id="travel-heading" className="mt-3 font-heading text-[1.875rem] font-bold leading-[1.08] tracking-[-0.02em] md:text-5xl">
          Free nearby.
          <br />
          <span className="text-brand-sageLight">Always confirmed first.</span>
        </h2>
        <TravelSlider />
        <p className="mt-3.5 text-[0.875rem] leading-[1.5] text-white/70">
          Distance from your practitioner&rsquo;s base: {travelBases.bristol.label} in Bristol, {travelBases.southampton.label} in
          Southampton.
        </p>
        <div className="mt-6 text-left">
          <PostcodeChecker tone="band" source="prices" label="Or check your postcode" />
        </div>
      </section>

      <section className="mx-auto max-w-xl px-[22px] pt-14 text-center md:max-w-4xl md:pt-20" aria-labelledby="next-heading">
        <p className={eyebrow}>What happens next</p>
        <h2 id="next-heading" className={`${headline} mt-2.5 text-[2.125rem] leading-[1.06] md:text-5xl`}>
          Three easy <span className="text-brand-sage">steps.</span>
        </h2>
        <ol className="mt-7 flex flex-col gap-[18px] text-left md:grid md:grid-cols-3 md:gap-8">
          {homeSteps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-4">
              <span className="w-[34px] shrink-0 font-heading text-[2.75rem] font-bold leading-[0.9] text-brand-sageLight" aria-hidden="true">
                {index + 1}
              </span>
              <span>
                <h3 className="font-heading text-[1.1875rem] font-semibold text-brand-charcoal">{step.title}</h3>
                <p className="mt-0.5 text-[0.9375rem] leading-[1.45] text-brand-muted">{step.body}</p>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-xl px-[18px] pb-16 pt-10 text-center md:pb-24" aria-label="Request a visit">
        <p className="mb-4 text-[0.875rem] text-brand-muted">
          Pay by {paymentMethods.slice(0, -1).join(", ")} or {paymentMethods.at(-1)}.
        </p>
        <Link
          href={bookingHref}
          className={`flex h-[52px] items-center justify-center rounded-full bg-brand-sageDark px-7 font-semibold text-white transition-colors duration-150 hover:bg-brand-sageDeep ${focusRing}`}
          data-analytics-id="prices-close-book"
        >
          Request a visit
        </Link>
        <Link href="/services" className={`${arrowLink} mt-4`}>
          What each treatment involves <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
