import type { Metadata } from "next";

import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Patient Forms | Foot+ Bristol",
  alternates: { canonical: `${SITE_URL}/forms` },
  openGraph: { url: `${SITE_URL}/forms` },
  description:
    "Complete Foot+ Bristol patient forms online, including the new patient and medical history form.",
  robots: { index: false, follow: true },
};

export default function FormsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Patient forms
      </h1>

      <p className="mt-4 max-w-3xl text-sm text-brand-charcoal/70">
        Please complete the New patient and medical history form before your appointment where
        possible. If you need any help completing the form, contact us and we can assist.
      </p>

      <div className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-white p-3 shadow-sm md:p-4">
        <div className="relative min-h-[950px] w-full overflow-hidden rounded-xl md:min-h-[1100px]">
          <iframe
            src="https://foot-plus.splose.com/public-form/e373fa16-a7c8-4138-a4fb-c2b9b8a1aa7d"
            name="embeddableForm"
            title="New patient and medical history form"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            scrolling="auto"
            width="100%"
            height="100%"
            loading="lazy"
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  );
}
