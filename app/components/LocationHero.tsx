import Link from "next/link";

import PractitionerProfile from "./PractitionerProfile";
import { Breadcrumb } from "./site/blocks";
import { btnSolid, displayH1, lead, linkQuiet, shell, small, supporting } from "./site/ui";
import type { Practitioner } from "../lib/locations";

type LocationHeroProps = {
  /** Current page name for the breadcrumb, e.g. "Bristol". */
  place: string;
  /** Availability line shown above the heading. */
  status: string;
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  contactActions?: { label: string; href: string; icon: "whatsapp" | "email"; external?: boolean }[];
  practitioner: Practitioner;
};

const trustItems = [
  { title: "Home visits", text: "Care in familiar surroundings" },
  { title: "Qualified practitioner", text: "Professional, insured care" },
  { title: "Clear guidance", text: "Honest advice and next steps" },
  { title: "Local service", text: "Coverage confirmed by postcode" },
];

export function ContactIcon({ icon }: { icon: "whatsapp" | "email" }) {
  if (icon === "email") {
    return (
      <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M3.75 6.75h16.5v10.5H3.75V6.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m4.5 7.5 7.5 5.75 7.5-5.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.22-1.58A9.94 9.94 0 1 0 12.04 2Zm0 17.98a8.03 8.03 0 0 1-4.1-1.12l-.3-.18-3.1.94 1-3.02-.2-.31a7.94 7.94 0 1 1 6.7 3.69Zm4.4-5.96c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19a7.25 7.25 0 0 1-1.34-1.66c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export default function LocationHero({
  place,
  status,
  title,
  description,
  primaryAction,
  secondaryAction,
  contactActions,
  practitioner,
}: LocationHeroProps) {
  return (
    <section aria-labelledby="location-heading">
      <div className={`${shell} pt-4`}>
        <Breadcrumb current={place} parent={{ label: "Locations", href: "/locations" }} />
      </div>
      <div className={`${shell} grid gap-10 pb-12 pt-4 md:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-20 lg:pt-8`}>
        <div className="lg:col-span-7">
          <p className={`${small} inline-flex items-center gap-2 font-semibold text-brand-sageDeep`}>
            <span className="h-2.5 w-2.5 rounded-full bg-brand-sage" aria-hidden="true" />
            {status}
          </p>
          <h1 id="location-heading" className={`${displayH1} mt-3 max-w-[16ch]`}>
            {title}
          </h1>
          <p className={`${lead} mt-4 max-w-[52ch] md:mt-6`}>{description}</p>
          <div className="mt-7 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
            <Link href={primaryAction.href} className={btnSolid}>
              {primaryAction.label}
            </Link>
            <Link href={secondaryAction.href} className={linkQuiet}>
              {secondaryAction.label}
            </Link>
          </div>
          {contactActions?.length ? (
            <ul className="mt-3 flex flex-wrap gap-x-6">
              {contactActions.map((action) => (
                <li key={action.href}>
                  <a
                    href={action.href}
                    className={linkQuiet}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                  >
                    <ContactIcon icon={action.icon} />
                    {action.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          <PractitionerProfile practitioner={practitioner} />
        </div>
      </div>

      <div className="bg-brand-wash">
        <ul className={`${shell} grid gap-x-10 gap-y-4 py-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {trustItems.map((item) => (
            <li key={item.title} className="border-brand-sage/50 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
              <p className="font-heading text-xl font-semibold leading-7 text-brand-sageDeep">{item.title}</p>
              <p className={supporting}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
