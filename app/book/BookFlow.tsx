"use client";

import Link from "next/link";
import { Suspense, useState } from "react";

import EnquiryForm from "../components/EnquiryForm";

export default function BookFlow() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-14">
      {submitted ? null : (
        <header className="mb-6">
          <h1 className="font-heading text-[clamp(2.4rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-brand-sageDark">
            Request a home visit
          </h1>
          <p className="mt-3 text-base leading-relaxed text-brand-charcoal/70 sm:text-lg">
            Tell us what you need. We&rsquo;ll confirm the time and price.
          </p>
          <p className="mt-4 text-base text-brand-charcoal/80">
            Already enquired?{" "}
            <Link
              href="/forms?location=bristol"
              className="font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4"
              data-analytics-id="book-already-enquired-forms"
            >
              Complete your patient form
            </Link>
          </p>
        </header>
      )}

      <div className="rounded-[1.75rem] border border-brand-sageLight/30 bg-white p-5 shadow-[0_28px_80px_-48px_rgba(24,55,45,0.55)] sm:p-8">
        <Suspense fallback={<p className="text-sm text-brand-charcoal/65">Loading…</p>}>
          <EnquiryForm onSubmitted={() => setSubmitted(true)} />
        </Suspense>
      </div>

      {submitted ? null : (
        <p className="mt-6 text-center text-sm text-brand-charcoal/65">
          Not sure what you need?{" "}
          <Link
            href="/prices"
            className="font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4"
          >
            View prices
          </Link>
        </p>
      )}
    </div>
  );
}
