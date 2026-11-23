import type { Metadata } from "next";
import Link from "next/link";

import { clinic } from "../lib/clinic";
import { phoneDisplay, phoneHref, SITE_URL } from "../lib/site";
import { body, btnPrimary, displayH2, lead, supporting } from "../components/site/ui";
import ClinicFlow from "./ClinicFlow";

// Short address for printed leaflets: foot-plus.co.uk/ageuk
export const metadata: Metadata = {
  title: `Toenail Cutting Clinic with ${clinic.partnerName}`,
  description: `Book a place at the Foot+ toenail cutting clinic, run with ${clinic.partnerName}.`,
  alternates: { canonical: `${SITE_URL}/ageuk` },
  // Reached from partner leaflets, not search.
  robots: { index: false, follow: true },
};

function OnHold() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-20 pt-12 text-center sm:px-6 md:pt-16">
      <h1 className={displayH2}>The clinic is on hold</h1>
      <p className={`${lead} mt-4`}>
        Bookings for the toenail cutting clinic with {clinic.partnerName} aren&rsquo;t open at the moment.
      </p>
      <p className={`${body} mt-4`}>Foot+ still visits people at home for toenail cutting and routine foot care.</p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <Link href="/book" className={btnPrimary}>
          Request a visit
        </Link>
        <p className={supporting}>
          Or call{" "}
          <a href={phoneHref} className="font-semibold text-brand-sageDeep underline underline-offset-4">
            {phoneDisplay}
          </a>
        </p>
      </div>
    </div>
  );
}

export default function AgeUkClinicPage() {
  return <section className="bg-brand-offwhite">{clinic.paused ? <OnHold /> : <ClinicFlow />}</section>;
}
