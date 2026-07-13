import type { Metadata } from "next";

import { emailDisplay, emailHref, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: { url: `${SITE_URL}/privacy` },
  title: "Privacy Policy",
  description: "Privacy policy for Foot+ Bristol home-visit foot health services.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        Foot+ Bristol respects your privacy and only collects information needed to
        arrange appointments and provide care. We do not sell personal data and
        only share details with trusted providers when required to deliver our
        services.
      </p>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        You can request access to or deletion of your information at any time by
        emailing{" "}
        <a
          className="font-medium text-brand-sageDark underline decoration-brand-sageDark/30 underline-offset-4 transition hover:decoration-brand-sageDark"
          href={emailHref}
        >
          {emailDisplay}
        </a>
        .
      </p>
    </section>
  );
}
