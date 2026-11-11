import Link from "next/link";
import type { Metadata } from "next";

import PostcodeChecker from "../components/home/PostcodeChecker";
import { AppointmentList, Breadcrumb, Steps } from "../components/site/blocks";
import {
  body,
  btnSolid,
  displayH1,
  displayH2,
  displayH3,
  lead,
  linkQuiet,
  rule,
  shell,
  small,
  supporting,
} from "../components/site/ui";
import { bookingHref, paymentMethods, prices, SITE_URL } from "../lib/site";
import { southamptonTravelSummary, travelSummary } from "../lib/travel";

export const metadata: Metadata = {
  title: "Home Visit Nail & Foot Care Prices",
  alternates: { canonical: `${SITE_URL}/prices` },
  openGraph: { url: `${SITE_URL}/prices` },
  description:
    "Home nail and foot care: £60 for a first visit and £55 for a routine appointment. Available in Bristol and Southampton.",
};

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
    cta: "Request your first appointment",
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
    cta: "Request a routine appointment",
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

const section = "py-12 md:py-20";
const inlineLink = "font-semibold text-brand-sageDeep underline decoration-brand-sage decoration-[1.5px] underline-offset-4 hover:text-brand-charcoal";

const travel = [
  {
    name: "Bristol",
    text: travelSummary,
    link: { label: "View Bristol coverage", href: "/locations/bristol/areas-we-cover" },
  },
  {
    name: "Southampton",
    text: `Appointments are available now. ${southamptonTravelSummary}`,
    link: { label: "View Southampton information", href: "/locations/southampton" },
  },
];

export default function PricesPage() {
  return (
    <div>
      <section aria-labelledby="prices-heading">
        <div className={`${shell} pb-12 pt-4 md:pb-16 lg:pb-20`}>
          <Breadcrumb current="Prices" />
          <h1 id="prices-heading" className={`${displayH1} mt-4 max-w-[18ch] lg:mt-8`}>
            Home visit nail and foot care <span className="text-brand-sage">prices</span>
          </h1>
          <p className={`${lead} mt-4 max-w-[60ch] md:mt-6`}>
            The same clear appointment prices apply across Foot+ Bristol and Foot+ Southampton. Check your postcode to
            see your practitioner and any travel fee.
          </p>
        </div>
      </section>

      <section className={`bg-white ${section}`} aria-labelledby="appointments-heading">
        <div className={`${shell} grid gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-5">
            <h2 id="appointments-heading" className={displayH2}>
              Two appointment types
            </h2>
            <p className={`${body} mt-4 max-w-[52ch]`}>
              One price per visit. Nail care and suitable routine skin care are included.
            </p>
            <p className={`${supporting} mt-4`}>
              Pay by {paymentMethods.slice(0, -1).join(", ")} or {paymentMethods.at(-1)}.
            </p>

            <h3 className={`${displayH3} mt-8`}>What does a toenail-cutting visit cost?</h3>
            <p className={`${small} mt-2 max-w-[52ch]`}>
              Nail care uses the same appointment prices: {prices[0].price} for your first visit and {prices[1].price}{" "}
              for returning patients. There is no separate nail-only price. Suitable routine skin care can be included
              within the appointment.{" "}
              <Link href="/toenail-cutting-bristol" className={inlineLink}>
                See what Bristol toenail-cutting visits include
              </Link>
              , or explore{" "}
              <Link href="/services" className={inlineLink}>
                all services
              </Link>
              .
            </p>
          </div>

          <div className="lg:col-span-7">
            <AppointmentList
              appointments={pricingCards.map((card) => ({
                tag: card.label,
                title: card.title,
                price: card.price,
                duration: card.duration,
                points: card.checklist,
                href: bookingHref,
                cta: card.cta,
              }))}
            />
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="travel-heading">
        <div className={`${shell} grid gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7">
            <h2 id="travel-heading" className={displayH2}>
              Travel and coverage
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
              {travel.map((place) => (
                <div key={place.name} className={`border-t ${rule} pt-5`}>
                  <h3 className={displayH3}>{place.name}</h3>
                  <p className={`${small} mt-2`}>{place.text}</p>
                  <Link className={`${linkQuiet} mt-1`} href={place.link.href}>
                    {place.link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <PostcodeChecker
              tone="panel"
              source="prices"
              title="What will I pay?"
              label="Postcode for the visit"
              helper="We’ll show your practitioner and any travel fee."
            />
          </div>
        </div>
      </section>

      <section className={`border-t ${rule} bg-white ${section}`} aria-labelledby="next-heading">
        <div className={shell}>
          <h2 id="next-heading" className={displayH2}>
            What happens next?
          </h2>
          <p className={`${body} mt-4 max-w-[52ch]`}>The booking process is simple and confirmed before your visit.</p>
          <Steps steps={nextSteps} className="mt-8 md:mt-10" />

          <div className={`mt-10 flex flex-col gap-6 border-t ${rule} pt-8 md:mt-14 md:flex-row md:items-center md:justify-between md:gap-10 md:pt-10`}>
            <div className="max-w-[52ch]">
              <h2 className="font-heading text-2xl font-semibold leading-8 text-brand-sageDeep">
                Not sure which appointment to choose?
              </h2>
              <p className={`${small} mt-2`}>
                New clients should select the New Patient Appointment. Existing clients can book Routine Foot Care.
              </p>
            </div>
            <Link href={bookingHref} className={`${btnSolid} shrink-0`}>
              Request an appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
