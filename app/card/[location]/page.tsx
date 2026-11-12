import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, MessageCircle, Phone, Star, type LucideIcon } from "lucide-react";

import {
  bristolContactActions,
  southamptonContactActions,
  type ContactAction,
} from "../../components/site/ContactIcons";
import { body, btnSolid, displayH2, focusRing, linkQuiet, rule, shell, supporting } from "../../components/site/ui";
import { serviceLocations, type ServiceLocation } from "../../lib/locations";
import { getWriteReviewUrl } from "../../lib/reviews";
import { locationEmails, phoneDisplay } from "../../lib/site";

// Second step of the appointment card QR code (see ../page.tsx): one location's
// contact details and its Google review link. The contact details are the same
// ones the location page uses, so a change there shows up here too.

type Slug = ServiceLocation["slug"];

const contactActions: Record<Slug, (options: { analyticsPrefix: string }) => ContactAction[]> = {
  bristol: bristolContactActions,
  southampton: southamptonContactActions,
};

const icons: Record<ContactAction["kind"], LucideIcon> = { phone: Phone, whatsapp: MessageCircle, email: Mail };

/** Written-out button text; the shared contact actions only carry screen-reader labels. */
function buttonText(action: ContactAction, slug: Slug) {
  if (action.kind === "phone") return `Call ${phoneDisplay}`;
  if (action.kind === "email") return locationEmails[slug].label;
  return action.label;
}

export function generateStaticParams() {
  return Object.keys(serviceLocations).map((location) => ({ location }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const found = serviceLocations[location as Slug];
  return {
    title: { absolute: found ? `Your ${found.displayName} visit` : "Your Foot+ visit" },
    description: "Contact your Foot+ practitioner or leave a review.",
    alternates: { canonical: `/card/${location}` },
    robots: { index: false, follow: false },
  };
}

export default async function CardLocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location: slug } = await params;
  const location = serviceLocations[slug as Slug];
  if (!location) notFound();

  const analyticsPrefix = `card-${location.slug}`;
  const actions = contactActions[location.slug]({ analyticsPrefix });
  const practitioner = location.practitioner;
  const firstName = practitioner?.name.split(" ")[0];

  return (
    <div className={`${shell} max-w-[640px] pb-16 pt-8 md:pb-24 md:pt-14`}>
      <section aria-labelledby="card-heading">
        <div className="flex items-center gap-4">
          {practitioner ? (
            <Image
              src={practitioner.imageSrc}
              alt=""
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-full object-cover object-top"
            />
          ) : null}
          <div>
            <h1 id="card-heading" className="font-heading text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.015em] text-brand-sageDeep md:text-[2.25rem]">
              {location.displayName}
            </h1>
            {practitioner ? (
              <p className={supporting}>
                {practitioner.name}, {practitioner.role}
              </p>
            ) : null}
          </div>
        </div>

        <h2 className={`${displayH2} mt-10`}>Change or ask about a visit</h2>
        <p className={`${body} mt-3`}>
          Please give at least 24 hours&rsquo; notice if you need to move or cancel.
        </p>

        <ul className="mt-6 grid gap-3">
          {actions.map((action, index) => {
            const Icon = icons[action.kind];
            return (
              <li key={action.kind}>
                <a
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  data-analytics-id={action.analyticsId}
                  className={
                    index === 0
                      ? `${btnSolid} w-full`
                      : `inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand-sageLight bg-white px-6 text-lg font-semibold text-brand-sageDeep transition-colors duration-150 hover:bg-brand-offwhite ${focusRing}`
                  }
                >
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                  {buttonText(action, location.slug)}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="card-review-heading" className={`mt-12 border-t ${rule} pt-10`}>
        <h2 id="card-review-heading" className={displayH2}>
          Happy with your visit?
        </h2>
        <p className={`${body} mt-3`}>
          A short Google review helps other people find {firstName ?? "Foot+"}.
        </p>
        <a
          href={getWriteReviewUrl(location.slug, location.displayName)}
          rel="noopener"
          data-analytics-id={`${analyticsPrefix}-review`}
          className={`mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand-sageLight bg-white px-6 text-lg font-semibold text-brand-sageDeep transition-colors duration-150 hover:bg-brand-offwhite ${focusRing}`}
        >
          <Star aria-hidden="true" className="h-5 w-5 shrink-0" />
          Leave a Google review
        </a>
      </section>

      <p className="mt-10">
        <Link href={location.href} className={linkQuiet}>
          More about {location.displayName}
        </Link>
      </p>
    </div>
  );
}
