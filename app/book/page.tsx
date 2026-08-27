import EnquiryForm from "../components/EnquiryForm";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Request a Foot+ Home-Visit Appointment",
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: { url: `${SITE_URL}/book` },
  description:
    "Request a Foot+ home-visit appointment in Bristol or register your interest for the Southampton launch.",
};

const bookingSteps = [
  {
    number: "01",
    title: "Send your request",
    body: "Tell us where you are and what you need.",
  },
  {
    number: "02",
    title: "We confirm the details",
    body: "We’ll agree availability, timing and price.",
  },
  {
    number: "03",
    title: "We visit you at home",
    body: "Your practitioner brings everything required.",
  },
];

export default function BookPage() {
  return (
    <section className="relative overflow-hidden bg-brand-offwhite">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-linear-to-b from-brand-sageLight/16 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-16 lg:grid-cols-[minmax(0,0.72fr)_minmax(34rem,1.28fr)] lg:gap-16 xl:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-sageDark/70">
            Appointments
          </p>
          <h1 className="mt-4 max-w-xl font-heading text-[clamp(2.8rem,5.4vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-brand-sageDark">
            Request a home visit
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-charcoal/72 sm:text-lg">
            Choose your area and tell us how we can help. We’ll confirm availability, timing and
            price.
          </p>

          <ol className="mt-10 max-w-lg border-y border-brand-sageLight/35">
            {bookingSteps.map((step) => (
              <li
                key={step.number}
                className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-brand-sageLight/25 py-5 last:border-b-0"
              >
                <span className="pt-0.5 text-xs font-bold tracking-[0.16em] text-brand-sageDark/45">
                  {step.number}
                </span>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-brand-charcoal/65">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm text-brand-charcoal/65">
            Unsure which service you need?{" "}
            <Link
              href="/prices"
              className="font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4"
            >
              View prices
            </Link>
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-brand-sageLight/30 bg-white/92 p-5 shadow-[0_28px_80px_-48px_rgba(24,55,45,0.55)] backdrop-blur-sm sm:p-7 md:p-9">
          <Suspense
            fallback={<p className="text-sm text-brand-charcoal/65">Loading enquiry form…</p>}
          >
            <EnquiryForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
