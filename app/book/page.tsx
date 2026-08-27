import EnquiryForm from "../components/EnquiryForm";
import type { Metadata } from "next";
import { Suspense } from "react";

import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Request a Foot+ Home-Visit Appointment",
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: { url: `${SITE_URL}/book` },
  description:
    "Request a Foot+ home-visit appointment in Bristol or register your interest for the Southampton launch.",
};


export default function BookPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-12 md:pt-20">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Request a Foot+ home-visit appointment
      </h1>

      <p className="mt-4 text-sm text-brand-charcoal/70">
        Bristol appointments are available now. Southampton home visits launch on
        20 October 2026 and you can register your interest in advance.
      </p>
      <p className="mt-3 text-sm text-brand-charcoal/70">
        New patients can complete the{" "}
        <a className="font-semibold text-brand-sageDark underline" href="/forms">
          medical history form online
        </a>{" "}
        before we visit.
      </p>

      <p className="mt-3 text-sm text-brand-charcoal/70">
        Not sure what to book? Review{" "}
        <a className="font-semibold text-brand-sageDark underline" href="/prices">
          prices
        </a>{" "}
        or learn more{" "}
        <a className="font-semibold text-brand-sageDark underline" href="/locations">
          about your local Foot+ service
        </a>
        .
      </p>

      <div className="mt-8 grid gap-4 rounded-2xl border border-brand-sageLight/30 bg-white p-5 text-sm text-brand-charcoal/75 shadow-sm md:grid-cols-3 md:p-6">
        {[
          {
            title: "1) Send your request",
            body: "Share the basics and any concerns.",
          },
          {
            title: "2) We confirm details",
            body: "We’ll contact you to confirm availability, location, and pricing.",
          },
          {
            title: "3) Treatment visit",
            body: "Sit back, and we'll do the rest",
          },
        ].map((step) => (
          <div key={step.title} className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
              {step.title}
            </p>
            <p>{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm md:p-6">
        <Suspense fallback={<p className="text-sm text-brand-charcoal/65">Loading enquiry form…</p>}>
          <EnquiryForm />
        </Suspense>
      </div>
    </section>
  );
}
