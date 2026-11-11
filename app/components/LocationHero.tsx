import Link from "next/link";
import ContactIcons, { type ContactAction } from "./site/ContactIcons";

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
  contactActions?: ContactAction[];
  practitioner: Practitioner;
};

const trustItems = [
  { title: "Home visits", text: "Care in familiar surroundings" },
  { title: "Qualified practitioner", text: "Professional, insured care" },
  { title: "Clear guidance", text: "Honest advice and next steps" },
  { title: "Local service", text: "Coverage confirmed by postcode" },
];

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
            <ContactIcons actions={contactActions} className="mt-4" />
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
