import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CreditCard } from "lucide-react";

import PostcodeChecker from "../components/home/PostcodeChecker";
import AppointmentCards from "../components/site/AppointmentCards";
import { Breadcrumb, Steps } from "../components/site/blocks";
import {
  body,
  displayH1,
  displayH2,
  linkQuiet,
  rule,
  shell,
  supporting,
} from "../components/site/ui";
import { homeSteps } from "../lib/home";
import { appointmentTypes } from "../lib/services";
import { bookingHref, paymentMethods, SITE_URL } from "../lib/site";
import { travelSummaryAllLocations } from "../lib/travel";

export const metadata: Metadata = {
  title: "Home Visit Nail & Foot Care Prices",
  alternates: { canonical: `${SITE_URL}/prices` },
  openGraph: { url: `${SITE_URL}/prices` },
  description:
    "Home nail and foot care: £60 for a first visit and £55 for a routine appointment. Available in Bristol and Southampton.",
};

const ctas = ["Request your first appointment", "Request a routine appointment"];

const section = "py-12 md:py-20";

const coverageLinks = [
  { label: "Bristol areas we cover", href: "/locations/bristol/areas-we-cover" },
  { label: "Foot+ Southampton", href: "/locations/southampton" },
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
        </div>
      </section>

      <section className={`bg-white ${section}`} aria-labelledby="appointments-heading">
        <div className={shell}>
          <h2 id="appointments-heading" className={displayH2}>
            Two appointment types
          </h2>
          <p className={`${body} mt-3 max-w-[60ch] text-brand-muted`}>
            One price per visit, covering nail care and any suitable skin care.
          </p>

          <div className="mt-8 md:mt-10">
            <AppointmentCards
              appointments={appointmentTypes.map((type, i) => ({ ...type, href: bookingHref, cta: ctas[i] }))}
            />
          </div>

          <div className="mt-6 flex flex-col gap-x-8 gap-y-1 sm:flex-row sm:items-center sm:justify-between">
            <p className={`${supporting} inline-flex items-center gap-2`}>
              <CreditCard className="h-5 w-5 shrink-0 text-brand-sageDark" aria-hidden="true" />
              Pay by {paymentMethods.slice(0, -1).join(", ")} or {paymentMethods.at(-1)}.
            </p>
            <Link href="/services" className={linkQuiet}>
              What each treatment involves <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="travel-heading">
        <div className={`${shell} grid gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7">
            <h2 id="travel-heading" className={displayH2}>
              Travel
            </h2>
            <p className={`${body} mt-4 max-w-[52ch]`}>
              {travelSummaryAllLocations} Any travel fee is confirmed before you book.
            </p>
            <ul className="mt-2 flex flex-col gap-x-6 sm:flex-row">
              {coverageLinks.map((link) => (
                <li key={link.href}>
                  <Link className={linkQuiet} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
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
          <Steps steps={homeSteps} className="mt-8 md:mt-10" />
        </div>
      </section>
    </div>
  );
}
