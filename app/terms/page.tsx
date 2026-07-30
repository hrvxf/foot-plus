import type { Metadata } from "next";

import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: { url: `${SITE_URL}/terms` },
  title: "Terms of Service",
  description: "Terms of service for Foot+ Bristol home-visit foot health care.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Terms &amp; Conditions
      </h1>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        Appointments are provided by qualified Foot+ Bristol practitioners. Please give
        at least 24 hours&apos; notice to reschedule or cancel. Missed appointments
        may incur a fee.
      </p>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        By booking with Foot+ Bristol, you confirm that the information you provide is
        accurate and that you will follow any aftercare guidance shared during
        your visit.
      </p>
    </section>
  );
}
