import Link from "next/link";
import type { Metadata } from "next";

import PostcodeChecker from "../components/home/PostcodeChecker";
import PriceBuilder, { PriceBuilderIncluded, PriceBuilderReceipt } from "../components/prices/PriceBuilder";
import PriceTickets from "../components/prices/PriceTickets";
import TravelSlider from "../components/prices/TravelSlider";
import { focusRing, texturedGreen } from "../components/site/ui";
import { homeSteps } from "../lib/home";
import { appointmentTypes } from "../lib/services";
import { SITE_URL, DEFAULT_SOCIAL_IMAGE } from "../lib/site";
import { travelBases } from "../lib/travel";

export const metadata: Metadata = {
  title: "Home Visit Nail & Foot Care Prices",
  alternates: { canonical: `${SITE_URL}/prices` },
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE], url: `${SITE_URL}/prices` },
  description:
    "Simple, upfront prices for toenail cutting and foot care in your own home, with any travel fee confirmed before you book. Bristol and Southampton.",
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
/** `texturedGreen`, from lg only. */
const desktopGreen =
  "lg:relative lg:isolate lg:overflow-hidden lg:bg-[url('/images/footplus-texture.png')] lg:bg-size-[600px_600px] lg:before:absolute lg:before:inset-0 lg:before:-z-10 lg:before:bg-brand-sageDark/85";
const arrowLink = `inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-brand-sageDeep ${focusRing}`;

export default function PricesPage() {
  return (
    <div>
      <section aria-labelledby="prices-heading" className="pb-2 pt-10 text-center md:pt-16 lg:pb-24 lg:pt-[72px]">
        <PriceBuilder tickets={tickets}>
          <div className="lg:text-left">
            <h1
              id="prices-heading"
              className={`${headline} mb-8 px-6 text-[2.75rem] leading-[1.04] md:mb-12 md:text-7xl lg:mb-0 lg:px-0 lg:text-[3.75rem] lg:leading-none xl:text-[4.75rem]`}
            >
              <span className="sr-only">Home visit foot care prices. </span>
              Simple,
              <br />
              <span className="text-brand-sage">upfront prices.</span>
            </h1>
            <div className="lg:hidden">
              <PriceTickets tickets={tickets} />
            </div>
            <p className="mx-auto max-w-[34ch] px-6 pt-7 leading-[1.5] text-brand-muted lg:mx-0 lg:max-w-[30ch] lg:px-0 lg:pt-[26px] lg:text-xl">
              One price per visit, covering nail care and any suitable skin care.
            </p>
            <PriceBuilderIncluded />
          </div>
          <PriceBuilderReceipt />
        </PriceBuilder>
      </section>

      <section
        className={`${texturedGreen} mx-3.5 mt-10 rounded-[28px] lg:hidden px-[22px] pb-8 pt-10 text-center md:mx-auto md:max-w-2xl md:px-12 md:py-14`}
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

      {/* From lg: a green band, the steps as a dotted timeline. */}
      <section
        className={`mx-auto max-w-xl px-[22px] pt-14 text-center md:max-w-4xl md:pt-20 lg:mb-24 lg:max-w-[1136px] lg:rounded-[28px] lg:px-16 lg:pb-[72px] lg:pt-16 ${desktopGreen}`}
        aria-labelledby="next-heading"
      >
        <p className={`${eyebrow} lg:text-brand-sageLight`}>What happens next</p>
        <h2 id="next-heading" className={`${headline} mt-2.5 text-[2.125rem] leading-[1.06] md:text-5xl lg:text-[3.25rem] lg:text-white`}>
          Three easy <span className="text-brand-sage lg:text-[#A8E6B8]">steps.</span>
        </h2>
        <ol className="mt-7 flex flex-col gap-[18px] text-left md:grid md:grid-cols-3 md:gap-8 lg:relative lg:mt-[52px] lg:gap-10 lg:text-center lg:before:absolute lg:before:inset-x-[16.6%] lg:before:top-8 lg:before:border-t-2 lg:before:border-dashed lg:before:border-white/35">
          {homeSteps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-4 lg:relative lg:flex-col lg:items-center lg:gap-5">
              <span
                className="w-[34px] shrink-0 font-heading text-[2.75rem] font-bold leading-[0.9] text-brand-sageLight lg:flex lg:h-16 lg:w-16 lg:items-center lg:justify-center lg:rounded-full lg:bg-white lg:text-[1.75rem] lg:leading-none lg:text-brand-sageDeep"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span>
                <h3 className="font-heading text-[1.1875rem] font-semibold text-brand-charcoal lg:text-[1.375rem] lg:text-white">{step.title}</h3>
                <p className="mt-0.5 text-[0.9375rem] leading-[1.45] text-brand-muted lg:mx-auto lg:mt-2 lg:max-w-[26ch] lg:text-base lg:leading-[1.5] lg:text-white/85">
                  {step.body}
                </p>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* From lg this link sits under what's included, in the price builder. */}
      <p className="mx-auto max-w-xl px-[18px] pb-14 pt-6 text-center md:pb-[4.5rem] lg:hidden">
        <Link href="/foot-care-services" className={arrowLink}>
          What each treatment involves <span aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  );
}
