import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  homeCredentials,
  homeFaqs,
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
  southampton: [{ label: "About Foot+ Southampton", href: "/locations/southampton" }],
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

        <p className={`${small} border-brand-sage/50 lg:border-l lg:pl-8 ${review || ratingSummary ? "lg:col-span-4" : "lg:col-span-12"}`}>
          {homeCredentials}
        </p>
      </div>
    </section>
  );
}

function CoversAndCosts() {
  return (
    <section className={`bg-white ${section}`}>
      <div className={`${shell} grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-20`}>
        <div aria-labelledby="covers-heading" role="group">
          <h2 id="covers-heading" className={displayH2}>
            What a visit covers
          </h2>
          <ul className={`mt-7 border-b ${rule}`}>
            {homeServices.map((service) => (
              <li key={service.title} className={`border-t ${rule}`}>
                <Link
                  href={service.href}
                  className={`group block py-3.5 ${focusRing}`}
                >
                  <span className={`${displayH3} underline-offset-4 group-hover:underline`}>{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" className={`${linkQuiet} mt-5`}>
            All services <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div aria-labelledby="prices-heading" role="group">
          <h2 id="prices-heading" className={displayH2}>
            What it costs
          </h2>
          <ul className={`mt-7 border-b ${rule}`}>
            {visits.map((visit) => (
              <li key={visit.name} className={`flex items-center justify-between gap-6 border-t ${rule} py-5`}>
                <span>
                  <span className={`${displayH3} block`}>{visit.name}</span>
                  <span className={`${supporting} block`}>{visit.detail}</span>
                </span>
                <span className={`${figure} text-[2.75rem] text-brand-sageDeep md:text-[3.25rem]`}>
                  {visit.price}
                </span>
              </li>
            ))}
          </ul>
          <div className={`${small} mt-5 max-w-[60ch] space-y-3`}>
            <p>One price per visit. Nail care and suitable routine skin care are included.</p>
            <p>Any travel fee shows when you check your postcode.</p>
          </div>
          <Link href="/prices" className={`${linkQuiet} mt-2`}>
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

        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-2 md:gap-10 lg:gap-20">
          {Object.values(serviceLocations).map((location) => (
            <LocationSummary key={location.slug} location={location} idPrefix="who" links={locationLinks[location.slug]} />
          ))}
        </div>

        <Steps steps={homeSteps} className={`mt-10 border-t ${rule} pt-8 md:mt-14 md:pt-12`} />
        <p className={`${small} mt-10`}>Visits are unhurried, clearly explained and LGBTQ+ friendly.</p>
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
