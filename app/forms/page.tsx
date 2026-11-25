import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { portraits } from "../components/site/blocks";
import { focusRing } from "../components/site/ui";
import { serviceLocations } from "../lib/locations";
import { emailHref, locationEmails, locationPhones, phoneDisplay, phoneHref, SITE_URL, DEFAULT_SOCIAL_IMAGE } from "../lib/site";
import PatientFormLauncher from "./PatientFormLauncher";

const splosePatientFormUrl =
  "https://foot-plus.splose.com/public-form/e373fa16-a7c8-4138-a4fb-c2b9b8a1aa7d";
const splosePatientFormTitle = "New patient and medical history form";

export const metadata: Metadata = {
  title: "Patient Forms",
  alternates: { canonical: `${SITE_URL}/forms` },
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE], url: `${SITE_URL}/forms` },
  description:
    "Choose your local Foot+ service and complete the correct new-patient documentation.",
  // Only reached from a WhatsApp link after an enquiry; nothing here to rank.
  robots: { index: false, follow: true },
};

const eyebrow = "text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark";
const heading = "font-heading text-[2.4rem] font-bold leading-[1.03] tracking-[-0.03em] text-brand-charcoal md:text-6xl";
const portraitRing = "rounded-full bg-white object-cover object-[center_15%]";

type FormsPageProps = {
  searchParams: Promise<{ location?: string | string[] }>;
};

function LocationChoice() {
  return (
    <section className="px-[22px] pb-16 pt-10 text-center md:pt-16">
      <p className={eyebrow}>Patient form</p>
      <h1 className={`mt-2.5 ${heading}`}>
        Who&rsquo;s visiting
        <br />
        <span className="text-brand-sage">you?</span>
      </h1>

      <nav aria-label="Choose your patient form location" className="mx-auto mt-7 max-w-md">
        <ul className="flex gap-2.5">
          {(["bristol", "southampton"] as const).map((slug) => {
            const location = serviceLocations[slug];
            return (
              <li key={slug} className="flex-1">
                <Link
                  href={`/forms?location=${slug}`}
                  className={`flex h-full flex-col items-center rounded-[26px] bg-white px-3 pb-[18px] pt-5 shadow-[0_0_0_1.5px_var(--color-brand-line)] transition-[background-color,transform] duration-200 hover:bg-brand-wash active:scale-[0.98] ${focusRing}`}
                >
                  <Image
                    src={portraits[slug]}
                    alt=""
                    width={184}
                    height={184}
                    className={`h-[92px] w-[92px] shadow-[0_0_0_3px_#fff,0_0_0_4.5px_var(--color-brand-line)] ${portraitRing}`}
                  />
                  <span className="mt-3 font-heading text-lg font-semibold tracking-[-0.02em] text-brand-charcoal">
                    {location.practitioner?.name.split(" ")[0]}
                  </span>
                  <span className="text-[0.8125rem] text-brand-muted">{location.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-5 inline-block rounded-full bg-brand-wash px-4 py-2 text-sm font-medium text-brand-sageDeep">
        Already enquired? No need to book again.
      </p>
    </section>
  );
}

function SouthamptonNotice() {
  const phone = locationPhones.southampton;
  const email = locationEmails.southampton;
  const button = `flex min-h-[52px] flex-1 items-center justify-center rounded-full px-4 text-[0.9375rem] font-semibold transition-colors ${focusRing}`;
  return (
    <section className="px-[22px] pb-16 pt-10 text-center md:pt-16">
      <Image
        src={portraits.southampton}
        alt=""
        width={240}
        height={240}
        className={`mx-auto h-[120px] w-[120px] shadow-[0_0_0_4px_#fff,0_16px_40px_-20px_rgba(24,55,45,0.6)] ${portraitRing}`}
      />
      <p className={`mt-5 ${eyebrow}`}>Foot+ Southampton</p>
      <h1 className={`mt-2.5 ${heading}`}>
        Katie will send
        <br />
        <span className="text-brand-sage">your forms.</span>
      </h1>
      <div className="mx-auto mt-6 max-w-md rounded-3xl bg-white p-5 text-left shadow-[0_0_0_1.5px_var(--color-brand-line)]">
        <p className="text-[0.9375rem] leading-[1.55] text-brand-muted">
          Southampton forms aren&rsquo;t online yet. If you&rsquo;ve already enquired, it&rsquo;s been received.
        </p>
        <p className="mt-2 text-[0.9375rem] leading-[1.55] text-brand-muted">
          Katie will be in touch to arrange your visit and anything she needs.
        </p>
        <div className="mt-4 flex gap-2.5">
          <a href={phone.href} className={`${button} bg-brand-sageDark text-white hover:bg-brand-sageDeep`}>
            Call Katie
          </a>
          <a
            href={email.href}
            className={`${button} bg-white text-brand-sageDeep shadow-[0_0_0_1.5px_var(--color-brand-line)] hover:bg-brand-wash`}
          >
            Email
          </a>
        </div>
      </div>
      <Link href="/forms" className={`mt-5 inline-flex min-h-11 items-center rounded-lg text-sm font-semibold text-brand-sageDeep ${focusRing}`}>
        <span aria-hidden="true">←&nbsp;</span>Not in Southampton?
      </Link>
    </section>
  );
}

/** Where the patient is: enquiry done, this form now, then Adam confirms the visit. */
function Journey() {
  const steps = [
    { label: "Enquiry sent", state: "done" },
    { label: "Patient form", state: "now" },
    { label: "Adam confirms your visit", state: "next" },
  ] as const;
  return (
    <ol className="relative mx-auto mt-6 flex max-w-sm items-start" aria-label="Your progress">
      {/* The track: grey all the way, green up to the current step. */}
      <span aria-hidden="true" className="absolute left-[16.7%] right-[16.7%] top-[17px] h-0.5 bg-brand-line" />
      <span aria-hidden="true" className="absolute left-[16.7%] top-[17px] h-0.5 w-[33.3%] bg-brand-sage" />
      {steps.map((step, index) => (
        <li
          key={step.label}
          className="relative flex flex-1 flex-col items-center"
          aria-current={step.state === "now" ? "step" : undefined}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
              step.state === "done"
                ? "bg-brand-sage text-white"
                : step.state === "now"
                  ? "bg-brand-sageDark text-white shadow-[0_0_0_5px_var(--color-brand-wash)]"
                  : "bg-white text-brand-muted shadow-[0_0_0_1.5px_var(--color-brand-line)]"
            }`}
          >
            {step.state === "done" ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : index + 1}
          </span>
          <span
            className={`mt-2 max-w-[7rem] text-[0.8125rem] leading-[1.3] ${
              step.state === "now" ? "font-semibold text-brand-charcoal" : "text-brand-muted"
            }`}
          >
            {step.label}
            {step.state === "done" ? <span className="sr-only"> (done)</span> : null}
          </span>
        </li>
      ))}
    </ol>
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
    <section className="pb-14">
      <div className="px-[22px] pt-8 text-center md:pt-14">
        <p className={eyebrow}>Foot+ Bristol</p>
        <h1 className={`mt-2.5 ${heading}`}>
          Nearly
          <br />
          <span className="text-brand-sage">there.</span>
          <span className="sr-only"> Your Foot+ Bristol patient form.</span>
        </h1>
        <Journey />
      </div>

      <div className="mx-auto mt-8 max-w-sm px-[22px]">
        <PatientFormLauncher
          formUrl={splosePatientFormUrl}
          title={splosePatientFormTitle}
          contactHref={emailHref}
          analyticsId="forms-start-bristol"
        />
      </div>

      <div className="mx-3 mt-8 flex items-center gap-3.5 rounded-[26px] bg-white p-5 shadow-[0_0_0_1.5px_var(--color-brand-line)] sm:mx-auto sm:max-w-md">
        <Image
          src={portraits.bristol}
          alt=""
          width={116}
          height={116}
          className={`h-[58px] w-[58px] shrink-0 ${portraitRing}`}
        />
        <p className="text-[0.9375rem] leading-[1.45] text-brand-muted">
          Stuck, or filling it in for someone else? Call me on{" "}
          <a
            href={phoneHref}
            className={`rounded font-semibold text-brand-sageDeep ${focusRing}`}
          >
            {phoneDisplay}
          </a>
          . Already done it? You&rsquo;re all set.
        </p>
      </div>

      <p className="mt-5 text-center text-sm text-brand-muted">
        Not in Bristol?{" "}
        <Link href="/forms" className={`rounded font-semibold text-brand-sageDeep ${focusRing}`}>
          Change location
        </Link>
      </p>
    </section>
  );
}
