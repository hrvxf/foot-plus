// Section-level building blocks shared by the home, services and prices pages.
// They carry the editorial system in ui.ts: rules instead of cards, deep green
// headings and figures, one dark green band for the postcode check.
import Link from "next/link";
import { Check, Plus } from "lucide-react";

import { phoneDisplay, phoneHref } from "../../lib/site";
import PostcodeChecker from "../home/PostcodeChecker";
import { body, btnSolid, displayH3, figure, focusRing, rule, shell, small, supporting, texturedGreen } from "./ui";

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className={supporting}>
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="/"
            className={`inline-flex min-h-11 items-center font-semibold text-brand-sageDeep underline underline-offset-4 ${focusRing}`}
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

export function PhoneLine({ analyticsId, className }: { analyticsId: string; className: string }) {
  return (
    <p className={className}>
      Or call{" "}
      <a
        href={phoneHref}
        className="inline-flex min-h-12 items-center font-semibold underline underline-offset-4"
        data-analytics-id={analyticsId}
      >
        {phoneDisplay}
      </a>
    </p>
  );
}

/** Numbered steps with large sage numerals. */
export function Steps({ steps, className = "" }: { steps: { title: string; body: string }[]; className?: string }) {
  return (
    <ol className={`grid gap-8 md:grid-cols-3 md:gap-10 ${className}`}>
      {steps.map((step, index) => (
        <li key={step.title} className="grid grid-cols-[3rem_1fr] items-start gap-x-3 md:block">
          <span className={`${figure} block text-[3.25rem] text-brand-sage md:mb-4 md:text-[4rem]`} aria-hidden="true">
            {index + 1}
          </span>
          <div>
            <h3 className={displayH3}>{step.title}</h3>
            <p className={`${supporting} mt-1`}>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Disclosure rows. The first is open so the section never looks empty. */
export function FaqList({ faqs, className = "" }: { faqs: { question: string; answer: string }[]; className?: string }) {
  return (
    <div className={`border-b ${rule} ${className}`}>
      {faqs.map((faq, index) => (
        <details key={faq.question} className={`group border-t ${rule}`} open={index === 0}>
          <summary
            className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 ${displayH3} ${focusRing} [&::-webkit-details-marker]:hidden`}
          >
            {faq.question}
            <Plus
              className="h-6 w-6 shrink-0 text-brand-sageDark transition-transform duration-150 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className={`${body} max-w-[65ch] pb-6`}>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export type Appointment = {
  tag: string;
  title: string;
  price: string;
  duration: string;
  points: string[];
  href: string;
  cta: string;
  analyticsId?: string;
};

/** Appointment types as a price list: name and figure on one line, what is included beneath. */
export function AppointmentList({ appointments }: { appointments: Appointment[] }) {
  return (
    <ul className={`border-b ${rule}`}>
      {appointments.map((appointment) => (
        <li key={appointment.title} className={`border-t ${rule} py-7`}>
          <div className="flex items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-semibold leading-8 text-brand-sageDeep">{appointment.title}</h3>
              <p className={supporting}>
                {appointment.tag}. {appointment.duration}.
              </p>
            </div>
            <p className={`${figure} text-[2.75rem] text-brand-sageDeep md:text-[3.25rem]`}>{appointment.price}</p>
          </div>
          <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {appointment.points.map((point) => (
              <li key={point} className={`${small} flex gap-2.5`}>
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-sage" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <Link href={appointment.href} className={`${btnSolid} mt-6 w-full sm:w-auto`} data-analytics-id={appointment.analyticsId}>
            {appointment.cta}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Closing band: the same postcode check as the home page hero, on dark green. */
export function ClosingCheck({
  id,
  heading = "Check your postcode to get started.",
  source,
  placement,
  phoneAnalyticsId,
}: {
  id: string;
  heading?: string;
  source: string;
  placement?: string;
  phoneAnalyticsId: string;
}) {
  return (
    <section className={`${texturedGreen} py-12 md:py-16`} aria-labelledby={id}>
      <div className={`${shell} grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10`}>
        <h2
          id={id}
          className="font-heading text-[1.625rem] font-semibold leading-[1.2] tracking-[-0.01em] text-white md:text-[2.125rem] md:leading-[1.15] lg:col-span-5"
        >
          {heading}
        </h2>
        <div className="lg:col-span-7">
          <PostcodeChecker tone="band" source={source} placement={placement} label="Postcode for the visit" />
          <PhoneLine analyticsId={phoneAnalyticsId} className="mt-2 text-base leading-6 text-white" />
        </div>
      </div>
    </section>
  );
}
