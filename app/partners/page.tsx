import type { Metadata } from "next";
import { Suspense } from "react";

import PartnersDirectory, { PartnersList } from "../components/partners/PartnersDirectory";
import { focusRing, shell } from "../components/site/ui";
import { emailDisplay, emailHref, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Partners | Connected Care",
  alternates: { canonical: `${SITE_URL}/partners` },
  openGraph: { url: `${SITE_URL}/partners` },
  description: "Trusted local services Foot+ points people to in Bristol and Southampton when they need more than foot care.",
};

// "+" marks from the wordmark, sprinkled in the hero's corners.
const marks = [
  { className: "left-[6%] top-10 text-[2.5rem] opacity-50" },
  { className: "right-[16%] top-12 text-[1.625rem] opacity-35" },
  { className: "right-[4%] top-48 text-[3.25rem] opacity-50" },
];

export default function PartnersPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-offwhite pb-8 pt-12 text-center md:pt-20" aria-labelledby="partners-heading">
        {marks.map((mark, index) => (
          <span key={index} aria-hidden="true" className={`pointer-events-none absolute font-heading font-semibold text-brand-sage ${mark.className}`}>
            +
          </span>
        ))}
        <div className={`${shell} relative`}>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">Foot+ partners</p>
          <h1
            id="partners-heading"
            className="mt-3 font-heading text-[2.625rem] font-semibold leading-[1.02] tracking-[-0.025em] text-brand-charcoal md:text-6xl"
          >
            Care that
            <span className="block text-brand-sage">joins up.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[34ch] text-base leading-[1.5] text-brand-muted md:text-lg">
            Trusted local services we point people to when they need more than foot care.
          </p>
        </div>
      </section>

      <Suspense fallback={<PartnersList asked={null} />}>
        <PartnersDirectory />
      </Suspense>

      <div className={`${shell} max-w-3xl pb-16 pt-6`}>
        <div className="rounded-[22px] bg-brand-sageDark px-6 py-7 text-center text-white">
          <h2 className="font-heading text-[1.375rem] font-semibold leading-tight">Run a local care service?</h2>
          <p className="mt-2 text-white/80">We&apos;re always glad to hear from services our patients would value.</p>
          <a
            href={emailHref}
            className={`mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-offwhite px-5 font-semibold text-brand-sageDeep ${focusRing}`}
          >
            Get in touch<span className="sr-only"> at {emailDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
