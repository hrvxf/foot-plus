import type { Metadata } from "next";

import { emailHref, SITE_URL } from "../lib/site";
import SplosePatientForm from "./SplosePatientForm";

const splosePatientFormUrl =
  "https://foot-plus.splose.com/public-form/e373fa16-a7c8-4138-a4fb-c2b9b8a1aa7d";
const splosePatientFormTitle = "New patient and medical history form";

const preparationPoints = [
  "Have your medication details available",
  "A relative, carer or support worker can help",
  "Contact Foot+ if you would prefer help completing the form",
];

export const metadata: Metadata = {
  title: "Patient Forms",
  alternates: { canonical: `${SITE_URL}/forms` },
  openGraph: { url: `${SITE_URL}/forms` },
  description:
    "Complete Foot+ Bristol patient forms online, including the new patient and medical history form.",
  robots: { index: true, follow: true },
};

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-sageDark"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16.25 5.75 8.5 13.5 4.75 9.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FormsPage() {
  return (
    <section className="bg-brand-offwhite">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-6 md:pb-16 md:pt-10">
        <div className="max-w-225">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-sageDark/75">
            PATIENT REGISTRATION
          </p>
          <h1 className="mt-3 max-w-225 font-heading text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-brand-sageDark">
            Complete your new patient form
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-charcoal/75 sm:text-lg">
            Please complete this form before your first appointment where possible. Your answers help
            Foot+ understand your medical history, foot-care needs and any support required during
            the visit.
          </p>
        </div>

        <ul className="mt-7 grid gap-3 md:grid-cols-3" aria-label="Before you start">
          {preparationPoints.map((point) => (
            <li
              key={point}
              className="flex gap-3 rounded-2xl border border-brand-sageLight/30 bg-white/80 p-4 text-sm leading-relaxed text-brand-charcoal/75"
            >
              <CheckIcon />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <SplosePatientForm
            formUrl={splosePatientFormUrl}
            title={splosePatientFormTitle}
            contactHref={emailHref}
          />
        </div>
      </div>
    </section>
  );
}
