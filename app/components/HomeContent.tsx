import Link from "next/link";
import { ArrowRight, ChevronRight, CircleDot, Droplets, Footprints, HeartPulse, Layers, Scissors, type LucideIcon } from "lucide-react";

import {
  homeCredentials,
  homeFaqs,
  homeMemberships,
  homeServices,
  homeSteps,
} from "../lib/home";
import { serviceLocations, type ServiceLocation } from "../lib/locations";
import { formatReviewMonth, getRating, getReviewLinks, getReviews } from "../lib/reviews";
import { prices } from "../lib/site";
import HomeMobileBar from "./home/HomeMobileBar";
import PostcodeChecker from "./home/PostcodeChecker";
import RotatingReview from "./home/RotatingReview";
import Stars from "./reviews/Stars";
import LgbtqFriendly from "./site/LgbtqFriendly";
import { ClosingCheck, FaqList, LocationSummary, Steps } from "./site/blocks";
import {
  displayH1,
  displayH2,
  displayH3,
  figure,
  focusRing,
  lead,
  linkQuiet,
  rule,
  shell,
  small,
  supporting,
} from "./site/ui";

const HERO_CHECKER_ID = "check-postcode";

const locationLinks: Record<ServiceLocation["slug"], { label: string; href: string; analyticsId?: string }[]> = {
  bristol: [
    { label: "Areas we cover", href: "/locations/bristol/areas-we-cover", analyticsId: "home-location-bristol-areas" },
    { label: "Toenail cutting in Bristol", href: "/toenail-cutting-bristol" },
  ],
  // Same two links as Bristol. Southampton has no areas page yet, so "Areas we cover"
  // goes to the coverage section on its location page.
  southampton: [
    { label: "Areas we cover", href: "/locations/southampton#southampton-coverage", analyticsId: "home-location-southampton-areas" },
    { label: "Toenail cutting in Southampton", href: "/toenail-cutting-southampton" },
  ],
};

const visits = [
  { name: "First visit", detail: "Assessment and treatment. About 60 minutes.", price: prices[0].price },
  { name: "Routine visit", detail: "For returning patients. About 45 minutes.", price: prices[1].price },
];

const section = "py-12 md:py-20";

export default function HomeContent() {
  return (
    <>
      <Hero />
      <Proof />
      <CoversAndCosts />
      <WhoAndHow />
      <Questions />
      <Start />
      <HomeMobileBar checkerId={HERO_CHECKER_ID} />
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="home-heading">
      <div className={`${shell} grid items-center gap-7 pb-10 pt-7 md:pb-14 md:pt-12 lg:grid-cols-12 lg:gap-12 lg:py-20`}>
        <div className="lg:col-span-7">
          <h1 id="home-heading" className={`${displayH1} max-w-[18ch]`}>
            Toenail cutting and routine foot care,{" "}
            <span className="text-brand-sage">in your own home.</span>
          </h1>
          <p className={`${lead} mt-4 max-w-[52ch] md:mt-6`}>
            Qualified Foot Health Practitioners in Bristol and Southampton.
          </p>
        </div>

        <div className="lg:col-span-5">
          <PostcodeChecker
            tone="panel"
            anchorId={HERO_CHECKER_ID}
            title="Do we visit you?"
            label="Postcode for the visit"
            helper="Booking for a relative or someone you care for? Use their postcode."
          />
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const rating = getRating("all");
  const reviews = getReviews("all", Infinity).map((item) => ({
    quote: item.excerpt ?? item.text,
    name: item.name,
    month: formatReviewMonth(item.month),
  }));
  const review = reviews.length > 0;
  const links = getReviewLinks("all");

  const ratingSummary = rating ? (
    <>
      <span className={`${figure} text-[2.75rem] text-brand-sageDeep md:text-[3.25rem]`}>{rating.average.toFixed(1)}</span>
      <span className="flex flex-col gap-1">
        <Stars rating={rating.average} className="h-5 w-5" />
        <span className={`${small} underline-offset-4 group-hover:underline`}>
          from {rating.count} Google reviews
        </span>
      </span>
    </>
  ) : null;

  return (
    <section aria-label="Reviews and credentials" className="bg-brand-wash">
      <div className={`${shell} grid gap-6 py-8 md:py-10 lg:grid-cols-12 lg:items-center lg:gap-10`}>
        {ratingSummary ? (
          links.length === 1 ? (
            <a
              href={links[0].readUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex min-h-12 items-center gap-3 text-brand-charcoal lg:col-span-3 ${focusRing}`}
              data-analytics-id="home-hero-reviews"
            >
              {ratingSummary}
              <span className="sr-only">(opens Google in a new tab)</span>
            </a>
          ) : (
            <p className="inline-flex items-center gap-3 text-brand-charcoal lg:col-span-3">{ratingSummary}</p>
          )
        ) : null}

        {review ? (
          <RotatingReview items={reviews} className={ratingSummary ? "lg:col-span-5" : "lg:col-span-7"} />
        ) : null}

        <div className={`border-brand-sage/50 lg:border-l lg:pl-8 ${review || ratingSummary ? "lg:col-span-4" : "lg:col-span-12"}`}>
          <p className={small}>
            {homeCredentials} {homeMemberships}
          </p>
          <LgbtqFriendly className="mt-2" />
        </div>
      </div>
    </section>
  );
}

// Icons for the service tiles, keyed by the service's link.
const serviceIcons: Record<string, LucideIcon> = {
  "/services#toenail-cutting": Scissors,
  "/services#thickened-nails": Layers,
  "/services#corns": CircleDot,
  "/services#hard-skin": Footprints,
  "/services#cracked-heels": Droplets,
  "/services#foot-health-checks": HeartPulse,
};

function CoversAndCosts() {
  return (
    <section className={`bg-white ${section}`}>
      <div className={`${shell} grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-14`}>
        <div aria-labelledby="covers-heading" role="group">
          <h2 id="covers-heading" className={displayH2}>
            What a visit covers
          </h2>
          {/* Whole tile is the link, matching the service tiles on the location pages. */}
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {homeServices.map((service) => {
              const Icon = serviceIcons[service.href] ?? CircleDot;
              return (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className={`group flex h-full min-h-16 items-center gap-3 rounded-xl border border-brand-line bg-white px-4 py-3 transition-colors duration-150 hover:border-brand-sageLight hover:bg-brand-wash/50 ${focusRing}`}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-sageDeep" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1 font-heading text-lg font-semibold leading-6 text-brand-sageDeep">{service.title}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-brand-sage transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/services" className={`${linkQuiet} mt-5`}>
            All services <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        {/* One quiet card: the two visit prices and a link to the Prices page, nothing else. */}
        <div aria-labelledby="prices-heading" role="group" className="self-start rounded-2xl bg-brand-wash p-6 md:p-8">
          <h2 id="prices-heading" className={displayH2}>
            What it costs
          </h2>
          <ul className="mt-5">
            {visits.map((visit) => (
              <li key={visit.name} className="flex items-center justify-between gap-6 border-t border-brand-sage/30 py-4">
                <span>
                  <span className={`${displayH3} block`}>{visit.name}</span>
                  <span className={`${supporting} block`}>{visit.detail}</span>
                </span>
                <span className={`${figure} text-3xl text-brand-sageDeep`}>{visit.price}</span>
              </li>
            ))}
          </ul>
          <Link href="/prices" className={`${linkQuiet} border-t border-brand-sage/30 pt-2 w-full`}>
            See full prices <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhoAndHow() {
  return (
    <section className={section} aria-labelledby="who-heading">
      <div className={shell}>
        <h2 id="who-heading" className={displayH2}>
          Who visits, and how it works
        </h2>

        {/* No row gap from md up: the two cards share these rows through subgrid, so a
            row gap here would open up between every line inside them. */}
        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-2 md:gap-x-10 md:gap-y-0 lg:gap-x-20">
          {Object.values(serviceLocations).map((location) => (
            <LocationSummary key={location.slug} location={location} idPrefix="who" links={locationLinks[location.slug]} />
          ))}
        </div>

        <Steps steps={homeSteps} className={`mt-10 border-t ${rule} pt-8 md:mt-14 md:pt-12`} />
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className={`border-t ${rule} bg-white ${section}`} aria-labelledby="faq-heading">
      <div className={`${shell} grid gap-6 md:grid-cols-12 md:gap-10`}>
        <h2 id="faq-heading" className={`${displayH2} md:col-span-3`}>
          Questions
        </h2>
        <FaqList faqs={homeFaqs} className="md:col-span-9" />
      </div>
    </section>
  );
}

function Start() {
  // No phone line here: the header and the mobile call bar already offer it.
  return <ClosingCheck id="start-heading" source="home" placement="closing" />;
}
