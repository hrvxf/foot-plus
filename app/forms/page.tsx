import type { Metadata } from "next";
import Link from "next/link";

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
    "Choose your local Foot+ service and complete the correct new-patient documentation.",
  robots: { index: true, follow: true },
};

type FormsPageProps = {
  searchParams: Promise<{ location?: string | string[] }>;
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

function LocationChoice() {
  return (
    <section className="relative isolate flex min-h-[68dvh] items-center overflow-hidden bg-brand-sageDark px-5 py-16 text-white">
      <div
        className="absolute -inset-4 scale-[1.03] bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px] opacity-20 blur-[3px]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-white/15 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-brand-sageLight/30 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/65">
          Patient documentation
        </p>
        <h1 className="mt-4 font-heading text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.03] tracking-[-0.035em]">
          Where do you receive care?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/70">
          Choose your Foot+ service to continue to the correct patient document.
        </p>

        <nav
          aria-label="Choose your patient form location"
          className="relative mx-auto mt-8 grid h-14 w-full max-w-md grid-cols-2 overflow-hidden rounded-full border border-white/30 bg-white/[0.07] p-1 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-1/2 top-3 w-px bg-white/20"
          />
          {[
            { name: "Bristol", href: "/forms?location=bristol" },
            { name: "Southampton", href: "/forms?location=southampton" },
          ].map((location) => (
            <Link
              key={location.href}
              href={location.href}
              className="group relative z-10 flex items-center justify-center rounded-full px-4 font-heading text-base font-semibold tracking-[0.015em] text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-white/[0.10] active:scale-[0.95] active:bg-white/[0.18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
            >
              <span className="relative pb-0.5">
                {location.name}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white/85 transition-[width,opacity] duration-200 group-hover:w-5"
                />
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

function SouthamptonNotice() {
  return (
    <section className="bg-brand-offwhite">
      <div className="mx-auto flex min-h-[62dvh] max-w-3xl items-center px-5 py-16 sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-sageDark/70">
            Foot+ Southampton
          </p>
          <h1 className="mt-4 font-heading text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-brand-sageDark">
            Patient forms are not open yet
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-charcoal/75 sm:text-lg">
            Foot+ Southampton is not taking patients yet. If you have already submitted an
            enquiry, it has been received and the Southampton team will contact you as the
            service prepares to launch.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/forms"
              className="inline-flex rounded-full bg-brand-sageDark px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
            >
              Choose another location
            </Link>
            <a
              href={emailHref}
              className="text-sm font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4"
            >
              Contact Foot+
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function FormsPage({ searchParams }: FormsPageProps) {
  const params = await searchParams;
  const rawLocation = Array.isArray(params.location) ? params.location[0] : params.location;
  const location = rawLocation?.toLowerCase();

  if (location === "southampton") {
    return <SouthamptonNotice />;
  }

  if (location !== "bristol") {
    return <LocationChoice />;
  }

  return (
    <section className="bg-brand-offwhite">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-6 md:pb-16 md:pt-10">
        <div className="max-w-225">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-sageDark/75">
              Foot+ Bristol · Patient registration
            </p>
            <Link
              href="/forms"
              className="text-sm font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4"
            >
              Change location
            </Link>
          </div>
          <h1 className="mt-3 max-w-225 font-heading text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-brand-sageDark">
            Complete your new patient form
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-charcoal/75 sm:text-lg">
            Please complete this form before your first Bristol appointment where possible. Your
            answers help Foot+ understand your medical history, foot-care needs and any support
            required during the visit.
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
