import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

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
import { paymentMethods, phoneDisplay, phoneHref, prices } from "../lib/site";
import { travelSummaryAllLocations } from "../lib/travel";
import HomeMobileBar from "./home/HomeMobileBar";
import PostcodeChecker from "./home/PostcodeChecker";
import Stars from "./reviews/Stars";
import { body, displayH1, displayH2, displayH3, focusRing, lead, linkQuiet, rule, shell, small } from "./site/ui";

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

const section = `border-t ${rule} py-10 md:py-14`;

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

function PhoneLine({ analyticsId, className }: { analyticsId: string; className: string }) {
  return (
    <p className={className}>
      Or call{" "}
      <a
        href={phoneHref}
        className="inline-flex min-h-12 items-center font-semibold underline underline-offset-4"
        data-analytics-id={analyticsId}
      >
        {phoneDisplay}
      </a>
    </p>
  );
}

function Hero() {
  return (
    <section aria-labelledby="home-heading">
      <div className={`${shell} grid items-center gap-7 pb-10 pt-7 md:pb-14 md:pt-12 lg:grid-cols-12 lg:gap-12 lg:py-16`}>
        <div className="lg:col-span-7">
          <h1 id="home-heading" className={`${displayH1} max-w-[20ch]`}>
            Toenail cutting and routine foot care, in your own home.
          </h1>
          <p className={`${lead} mt-4 max-w-[60ch] md:mt-5`}>
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
      <span className="font-heading text-[1.75rem] font-semibold leading-none">{rating.average.toFixed(1)}</span>
      <span className="flex flex-col gap-1">
        <Stars rating={rating.average} className="h-5 w-5" />
        <span className={`${small} underline-offset-4 group-hover:underline`}>
          from {rating.count} Google reviews
        </span>
      </span>
    </>
  ) : null;

  return (
    <section aria-label="Reviews and credentials" className={`border-t ${rule}`}>
      <div className={`${shell} grid gap-6 py-8 lg:grid-cols-12 lg:items-center lg:gap-10`}>
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
            <blockquote className={`${body} font-medium`}>&ldquo;{review.excerpt ?? review.text}&rdquo;</blockquote>
            <figcaption className={`${small} mt-1 text-brand-muted`}>
              {review.name}, {formatReviewMonth(review.month)}, on Google
            </figcaption>
          </figure>
        ) : null}

        <p className={`${small} ${review || ratingSummary ? "lg:col-span-4" : "lg:col-span-12"}`}>
          {homeCredentials} {homeMemberships}
        </p>
      </div>
    </section>
  );
}

function CoversAndCosts() {
  return (
    <section className={section}>
      <div className={`${shell} grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16`}>
        <div aria-labelledby="covers-heading" role="group">
          <h2 id="covers-heading" className={displayH2}>
            What a visit covers
          </h2>
          <ul className={`mt-6 border-b ${rule}`}>
            {homeServices.map((service) => (
              <li key={service.title} className={`border-t ${rule}`}>
                <Link
                  href={service.href}
                  className={`group grid gap-x-6 gap-y-0.5 py-3.5 lg:grid-cols-[13rem_1fr] lg:items-baseline ${focusRing}`}
                >
                  <span className={`${displayH3} underline-offset-4 group-hover:underline`}>{service.title}</span>
                  <span className={small}>{service.description}</span>
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
          <ul className={`mt-6 border-b ${rule}`}>
            {visits.map((visit) => (
              <li key={visit.name} className={`flex items-baseline justify-between gap-6 border-t ${rule} py-3.5`}>
                <span>
                  <span className={`${displayH3} block`}>{visit.name}</span>
                  <span className={`${small} block`}>{visit.detail}</span>
                </span>
                <span className="font-heading text-[1.75rem] font-semibold leading-none tabular-nums text-brand-charcoal">
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

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-10 lg:gap-16">
          {Object.values(serviceLocations).map((location) => {
            const practitioner = location.practitioner;
            if (!practitioner) return null;
            return (
              <article key={location.slug} className="flex items-start gap-5" aria-labelledby={`who-${location.slug}`}>
                <Image
                  src={portraits[location.slug]}
                  alt=""
                  width={96}
                  height={96}
                  sizes="96px"
                  className="h-24 w-24 shrink-0 rounded-sm object-cover object-[center_15%]"
                />
                <div className="min-w-0">
                  <h3 id={`who-${location.slug}`} className={displayH3}>
                    <Link href={location.href} className={`inline-flex min-h-11 items-center underline-offset-4 hover:underline ${focusRing}`}>
                      {location.name}
                    </Link>
                  </h3>
                  <p className={`${body} mt-1`}>
                    {practitioner.name}, {practitioner.role} ({practitioner.credentials.join(", ")})
                  </p>
                  <p className={`${small} mt-2`}>{location.coverage}</p>
                  <p className={`${small} mt-1 font-semibold text-brand-sageDeep`}>{location.availability}</p>
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

        <ol className={`mt-10 grid gap-8 border-t ${rule} pt-8 md:mt-12 md:grid-cols-3 md:gap-10 md:pt-10`}>
          {homeSteps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3">
              <span className="font-heading text-[1.75rem] font-semibold leading-7 text-brand-sage" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3 className={displayH3}>{step.title}</h3>
                <p className={`${small} mt-1`}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className={`${small} mt-8`}>Visits are unhurried, clearly explained and LGBTQ+ friendly.</p>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className={section} aria-labelledby="faq-heading">
      <div className={`${shell} grid gap-6 md:grid-cols-12 md:gap-10`}>
        <h2 id="faq-heading" className={`${displayH2} md:col-span-3`}>
          Questions
        </h2>
        <div className={`border-b ${rule} md:col-span-9`}>
          {homeFaqs.map((faq, index) => (
            <details key={faq.question} className={`group border-t ${rule}`} open={index === 0}>
              <summary
                className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 ${displayH3} ${focusRing} [&::-webkit-details-marker]:hidden`}
              >
                {faq.question}
                <Plus
                  className="h-6 w-6 shrink-0 text-brand-sageDark transition-transform duration-150 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className={`${body} max-w-[65ch] pb-6`}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Start() {
  return (
    <section className={section} aria-labelledby="start-heading">
      <div className={`${shell} grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10`}>
        <h2 id="start-heading" className={`${displayH2} lg:col-span-5`}>
          Check your postcode to get started.
        </h2>
        <div className="lg:col-span-7">
          <PostcodeChecker tone="plain" placement="closing" label="Postcode for the visit" />
          <PhoneLine analyticsId="home-cta-phone" className={`${small} mt-2`} />
        </div>
      </div>
    </section>
  );
}
