import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ContactGlyph,
  bristolContactActions,
  southamptonContactActions,
  type ContactAction,
} from "../../components/site/ContactIcons";
import { portraits } from "../../components/site/blocks";
import { serviceLocations, type ServiceLocation } from "../../lib/locations";
import { getWriteReviewUrl } from "../../lib/reviews";

// Second step of the appointment card QR code (see ../page.tsx), in two halves.
// The green top carries on from the full-screen chooser and asks for the review,
// the one solid pill. An off-white panel at the foot holds the location's
// contact details as round icon buttons (one word under each), plus a quiet
// link for patients who are due another visit. The contact details are the same
// ones the location page uses, so a change there shows up here too. On a phone
// everything fits one screen without scrolling (about 660px tall in a mobile
// browser); short screens drop the portrait.

type Slug = ServiceLocation["slug"];

const contactActions: Record<Slug, (options: { analyticsPrefix: string }) => ContactAction[]> = {
  bristol: bristolContactActions,
  southampton: southamptonContactActions,
};

/** One word under each icon: icons alone are easy to misread. */
const shortLabel: Record<ContactAction["kind"], string> = { phone: "Call", whatsapp: "WhatsApp", email: "Email" };

/** White logo lockups with the town set under the wordmark, for the green background. */
const lockups: Record<Slug, string> = {
  bristol: "/images/footplus-logo-white.svg",
  southampton: "/images/footplus-logo-southampton-white.svg",
};

const STAR_PATH =
  "M12 1.5l3.09 6.86 7.41.78-5.54 5.03 1.57 7.33L12 17.77 5.47 21.5l1.57-7.33L1.5 9.14l7.41-.78z";

const focusLight = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white";
const focusDark = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#34503F]";

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
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
    description: "Leave a review or contact your Foot+ practitioner.",
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
    <section
      aria-labelledby="card-heading"
      data-fullscreen-page
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#34503F] text-white"
    >
      {/* Same depth as the location chooser: soft light from the top left, a darker foot, and the brand paper grain. */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(143,179,156,0.38),transparent_60%),linear-gradient(180deg,transparent_45%,rgba(20,34,27,0.45))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[url('/images/footplus-texture.png')] bg-size-[600px_600px] opacity-[0.12] mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Everything but the green: page changes between the full-screen pages fade this
          layer while the green stays still (see .fullscreen-content in globals.css). */}
      <div className="fullscreen-content flex flex-1 flex-col">
        {/* Top half: the review. */}
        <div className="flex flex-1 flex-col px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-6 sm:px-8 md:pt-[calc(env(safe-area-inset-top)+1.5rem)] md:pb-10">
          {/* Top bar: a back button to the town chooser on the left, and the location
              lockup (Foot+ with the town under it) in the middle, linking to the location page. */}
          <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center">
            <Link
              href="/card"
              aria-label="Change location"
              data-analytics-id={`${analyticsPrefix}-change-location`}
              className={`flex size-11 items-center justify-center rounded-full bg-white/[0.14] text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.24] motion-reduce:transition-none ${focusLight}`}
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <Link
              href={location.href}
              aria-label={`${location.displayName} page`}
              data-analytics-id={`${analyticsPrefix}-location-page`}
              className={`mx-auto block rounded-sm ${focusLight}`}
            >
              <Image
                src={lockups[location.slug]}
                alt=""
                width={147}
                height={51}
                priority
                unoptimized
                className="block h-[51px] w-[147px] md:h-[58px] md:w-[166px]"
              />
            </Link>
          </div>

          <div className="locations-enter mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center pt-4 text-center">
            {practitioner ? (
              <Image
                src={portraits[location.slug]}
                alt=""
                width={230}
                height={230}
                priority
                className="mb-4 h-[76px] w-[76px] rounded-full object-cover object-top shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] ring-2 ring-white/80 [@media(max-height:640px)]:hidden md:mb-5 md:h-[110px] md:w-[110px]"
              />
            ) : null}

            <h1
              id="card-heading"
              className="font-heading text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.015em] text-balance md:text-[2.5rem]"
            >
              Happy with your visit?
            </h1>
            <p className="mt-2 max-w-[19rem] text-[0.96875rem] leading-6 text-white/85 md:mt-3 md:max-w-sm md:text-lg md:leading-7">
              {firstName
                ? `A Google review helps people nearby find ${firstName}.`
                : "A Google review helps people nearby find Foot+."}
            </p>

            <a
              href={getWriteReviewUrl(location.slug, location.displayName)}
              rel="noopener"
              data-analytics-id={`${analyticsPrefix}-review`}
              className={`group mt-5 flex min-h-[3.75rem] w-full items-center justify-between gap-3 rounded-full bg-brand-offwhite py-2 pl-7 pr-2 text-left font-heading text-[1.1875rem] font-semibold text-[#34503F] shadow-[0_14px_30px_-16px_rgba(0,0,0,0.55)] transition-[background-color,transform] duration-200 hover:bg-white active:translate-y-px active:scale-[0.99] motion-reduce:transition-none md:mt-7 md:min-h-16 ${focusLight}`}
            >
              <span>Leave a Google review</span>
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#34503F] text-brand-offwhite transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              >
                <Arrow />
              </span>
            </a>
            <p className="mt-2.5 flex items-center gap-2 text-sm text-white/80 md:mt-3 md:text-base">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg key={index} viewBox="0 0 24 24" className="size-3.5 text-brand-goldLight md:size-4">
                    <path d={STAR_PATH} fill="currentColor" />
                  </svg>
                ))}
              </span>
              Takes about a minute
            </p>
          </div>
        </div>

        {/* Bottom half: changing a visit, as icon buttons on an off-white panel. */}
        <div className="rounded-t-[1.875rem] bg-brand-offwhite px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] text-brand-charcoal sm:px-8 md:pt-8 md:pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
          <div className="mx-auto w-full max-w-md text-center">
            <h2 className="font-heading text-lg font-semibold leading-6 tracking-[-0.01em] md:text-xl md:leading-7">
              Need to change a visit?
            </h2>
            <p className="mt-0.5 text-sm text-brand-muted md:text-base">24 hours&rsquo; notice, please.</p>

            <ul className="mt-4 flex justify-center gap-7 md:mt-5">
              {actions.map((action) => (
                <li key={action.kind}>
                  <a
                    href={action.href}
                    aria-label={action.label}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    data-analytics-id={action.analyticsId}
                    className={`group flex w-[4.5rem] flex-col items-center gap-1.5 rounded-lg text-sm font-medium text-brand-charcoal md:gap-2 md:text-base ${focusDark}`}
                  >
                    <span className="flex size-14 items-center justify-center rounded-full bg-brand-wash text-[#34503F] transition-[background-color,color,transform] duration-200 group-hover:bg-[#34503F] group-hover:text-brand-offwhite group-active:scale-[0.97] motion-reduce:transition-none md:size-16">
                      <ContactGlyph kind={action.kind} className="h-6 w-6 md:h-7 md:w-7" />
                    </span>
                    <span aria-hidden="true">{shortLabel[action.kind]}</span>
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href={`/book?location=${location.slug}`}
              data-analytics-id={`${analyticsPrefix}-book`}
              className={`mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-[0.9375rem] font-semibold text-[#34503F] md:mt-4 md:text-base ${focusDark}`}
            >
              Due another visit? Request one
              <span className="[&>svg]:size-4" aria-hidden="true">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
