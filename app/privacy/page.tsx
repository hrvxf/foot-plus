import type { Metadata } from "next";

import { emailDisplay, emailHref, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: { url: `${SITE_URL}/privacy` },
  title: "Privacy Policy",
  description: "Privacy policy for Foot+ Bristol home-visit foot health services.",
  robots: { index: false, follow: true },
};

const privacySections = [
  {
    title: "Patient information we collect",
    body: [
      "When you enquire, book an appointment or complete a patient form, Foot+ Bristol may collect contact details, appointment notes, relevant medical history, medication information, GP or emergency contact details, accessibility needs and details about your foot-care concerns.",
      "We only ask for patient information that helps us decide whether Foot+ is suitable, arrange a safe home visit, provide routine foot-care services and keep an appropriate record of the care discussed or provided.",
    ],
  },
  {
    title: "How patient records are used",
    body: [
      "Patient records are used to support continuity of care, confirm consent, record observations and treatment provided, note aftercare advice, manage follow-up appointments and respond to questions about your care.",
      "Health information is treated as confidential and is only accessed by Foot+ or carefully selected service providers who need it for appointment administration, secure record keeping or patient communication.",
    ],
  },
  {
    title: "Sharing information about your care",
    body: [
      "We do not sell patient information. We only share identifiable patient details where you have asked us to, where it is needed to provide the service, where there is a legal obligation, or where there is a serious concern about safety or safeguarding.",
      "If your foot concern appears to need support outside Foot+ scope, we may suggest contacting your GP, podiatrist, pharmacist, NHS 111 or emergency services. We would normally ask for your permission before sharing information with another professional, unless there is an urgent safety reason or legal requirement to do so.",
    ],
  },
  {
    title: "Online forms and appointment systems",
    body: [
      "Foot+ may use secure third-party systems to collect patient forms, manage appointments, send reminders and store records. These providers are expected to protect personal information and only process it for the agreed service.",
      "Please avoid sending highly sensitive medical details through general website messages or social media. Use the patient form or contact Foot+ directly if you need to discuss private health information.",
    ],
  },
  {
    title: "Your choices and rights",
    body: [
      "You can ask what information Foot+ holds about you, request a correction, ask for information to be deleted where appropriate, or raise a concern about how your information has been handled.",
      "Some patient records may need to be retained for legal, insurance, safeguarding or professional record-keeping reasons, even if you no longer use Foot+ services.",
    ],
  },
];

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

      <div className="mt-8 space-y-8">
        {privacySections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-xl font-semibold text-brand-sageDark">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-brand-charcoal/80">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-sm text-brand-charcoal/80">
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
