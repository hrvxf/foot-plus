import type { Metadata } from "next";

import { clinic } from "../lib/clinic";
import { SITE_URL } from "../lib/site";
import ClinicFlow from "./ClinicFlow";

// Short address for printed leaflets: foot-plus.co.uk/ageuk
export const metadata: Metadata = {
  title: `Toenail Cutting Clinic with ${clinic.partnerName}`,
  description: `Book a place at the Foot+ toenail cutting clinic, run with ${clinic.partnerName}.`,
  alternates: { canonical: `${SITE_URL}/ageuk` },
  // Reached from partner leaflets, not search.
  robots: { index: false, follow: true },
};

export default function AgeUkClinicPage() {
  return (
    <section className="bg-brand-offwhite">
      <ClinicFlow />
    </section>
  );
}
