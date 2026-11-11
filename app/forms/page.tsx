import type { Metadata } from "next";
import Link from "next/link";

import { emailHref, phoneDisplay, phoneHref, SITE_URL } from "../lib/site";
import SplosePatientForm from "./SplosePatientForm";

const splosePatientFormUrl =
  "https://foot-plus.splose.com/public-form/e373fa16-a7c8-4138-a4fb-c2b9b8a1aa7d";
const splosePatientFormTitle = "New patient and medical history form";

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
        <p className="mx-auto mt-5 max-w-md rounded-2xl bg-white/10 px-5 py-4 text-base leading-relaxed text-white">
          Already enquired? No need to book again.
        </p>

        <nav
          aria-label="Choose your patient form location"
          className="mx-auto mt-8 grid w-full max-w-md gap-3 sm:grid-cols-2"
        >
          {[
            { name: "Bristol", href: "/forms?location=bristol" },
            { name: "Southampton", href: "/forms?location=southampton" },
          ].map((location) => (
            <Link
              key={location.href}
              href={location.href}
              className="flex min-h-16 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-heading text-lg font-semibold text-brand-sageDark shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] transition hover:bg-brand-offwhite active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {location.name}
              <span aria-hidden="true">→</span>
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
            Southampton patient forms are not online yet
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-charcoal/75 sm:text-lg">
            Foot+ Southampton is taking appointments. If you have already sent an enquiry, it
            has been received and the Southampton team will contact you to arrange your visit
            and any forms needed.
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
      {/* Visually hidden: the form starts at the top of the page. */}
      <h1 className="sr-only">Foot+ Bristol patient form</h1>

      <div className="mx-auto max-w-3xl sm:px-6 sm:pt-8">
        <SplosePatientForm
          formUrl={splosePatientFormUrl}
          title={splosePatientFormTitle}
          contactHref={emailHref}
        />
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-14 pt-6 text-center text-base text-brand-charcoal/75 sm:px-6">
        <p>
          Need help? Call{" "}
          <a
            href={phoneHref}
            className="font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4"
          >
            {phoneDisplay}
          </a>
          . A relative or carer can also fill it in for you.
        </p>
        <p className="mt-3 text-sm">
          Not in Bristol?{" "}
          <Link
            href="/forms"
            className="font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4"
          >
            Change location
          </Link>
        </p>
      </div>
    </section>
  );
}
