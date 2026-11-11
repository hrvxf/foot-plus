import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  homeCredentials,
  homeFaqs,
  homeMemberships,
  homeScopeNote,
  homeServices,
  homeSteps,
} from "../lib/home";
import { serviceLocations, type ServiceLocation } from "../lib/locations";
import { formatReviewMonth, getRating, getReviewLinks, getReviews } from "../lib/reviews";
import { paymentMethods, prices } from "../lib/site";
import { travelSummaryAllLocations } from "../lib/travel";
import HomeMobileBar from "./home/HomeMobileBar";
import PostcodeChecker from "./home/PostcodeChecker";
import Stars from "./reviews/Stars";
import { ClosingCheck, FaqList, PhoneLine, Steps } from "./site/blocks";
import {
  body,
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

// Portraits are the optimised photos; the practitioner records point at the
// larger files used on the location and about pages.
const portraits: Record<ServiceLocation["slug"], string> = {
  bristol: "/images/adam-james.webp",
  southampton: "/images/katie-preston.webp",
};

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
            A qualified Foot Health Practitioner visits you in Bristol or Southampton to cut and thin
            difficult nails and treat corns, hard skin and cracked heels. For yourself, or for someone
            you look after.
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
          <PhoneLine analyticsId="home-hero-phone" className={`${small} mt-2 text-brand-sageDeep`} />
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const rating = getRating("all");
  const review = getReviews("all", 1)[0];
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
          <figure className={ratingSummary ? "lg:col-span-5" : "lg:col-span-7"}>
            <blockquote className="font-heading text-xl font-semibold leading-[1.4] text-brand-sageDeep md:text-[1.375rem]">&ldquo;{review.excerpt ?? review.text}&rdquo;</blockquote>
            <figcaption className={`${supporting} mt-2`}>
              {review.name}, {formatReviewMonth(review.month)}, on Google
            </figcaption>
          </figure>
        ) : null}

        <p className={`${small} border-brand-sage/50 lg:border-l lg:pl-8 ${review || ratingSummary ? "lg:col-span-4" : "lg:col-span-12"}`}>
          {homeCredentials} {homeMemberships}
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
                  className={`group grid gap-x-6 gap-y-0.5 py-3.5 lg:grid-cols-[13rem_1fr] lg:items-baseline ${focusRing}`}
                >
                  <span className={`${displayH3} underline-offset-4 group-hover:underline`}>{service.title}</span>
                  <span className={supporting}>{service.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={`${small} mt-5 max-w-[60ch]`}>{homeScopeNote}</p>
          <Link href="/services" className={`${linkQuiet} mt-2`}>
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
            <p>{travelSummaryAllLocations} The postcode checker shows your fee.</p>
            <p>
              Pay by {paymentMethods.slice(0, -1).join(", ")} or {paymentMethods.at(-1)}.
            </p>
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
          {Object.values(serviceLocations).map((location) => {
            const practitioner = location.practitioner;
            if (!practitioner) return null;
            return (
              <article key={location.slug} className="flex items-start gap-5 lg:gap-7" aria-labelledby={`who-${location.slug}`}>
                <Image
                  src={portraits[location.slug]}
                  alt=""
                  width={176}
                  height={208}
                  sizes="(min-width: 1024px) 176px, 112px"
                  className="h-36 w-28 shrink-0 rounded-md object-cover object-[center_15%] lg:h-52 lg:w-44"
                />
                <div className="min-w-0">
                  <h3 id={`who-${location.slug}`} className="font-heading text-2xl font-semibold leading-8 text-brand-sageDeep">
                    <Link href={location.href} className={`inline-flex min-h-11 items-center underline-offset-4 hover:underline ${focusRing}`}>
                      {location.name}
                    </Link>
                  </h3>
                  <p className={`${body} mt-1`}>
                    {practitioner.name}, {practitioner.role} ({practitioner.credentials.join(", ")})
                  </p>
                  <p className={`${supporting} mt-2`}>{location.coverage}</p>
                  <p className={`${small} mt-3 inline-flex items-center gap-2 font-semibold text-brand-sageDeep`}>
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-sage" aria-hidden="true" />
                    {location.availability}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-x-6">
                    {locationLinks[location.slug].map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={linkQuiet} data-analytics-id={link.analyticsId}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
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
  return <ClosingCheck id="start-heading" source="home" placement="closing" phoneAnalyticsId="home-cta-phone" />;
}
