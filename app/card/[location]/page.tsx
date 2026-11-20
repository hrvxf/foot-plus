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

// Second step of the appointment card QR code (see ../page.tsx). It carries on
// from the full-screen green chooser: the review comes first, as the one solid
// pill, and the location's contact details sit below as labelled icon buttons.
// The contact details are the same ones the location page uses, so a change
// there shows up here too. On a phone everything is sized to fit one screen
// without scrolling (about 660px tall in a mobile browser); very short screens
// drop the portrait.

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

const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white";

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
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#34503F] px-5 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-[calc(env(safe-area-inset-top)+1rem)] md:pb-[calc(env(safe-area-inset-bottom)+1.5rem)] md:pt-[calc(env(safe-area-inset-top)+1.5rem)] text-white sm:px-8"
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

      {/* Top bar: a back button to the town chooser on the left, and the location
          lockup (Foot+ with the town under it) in the middle. The lockup links to
          the location page, so no text links are needed at the foot of the page. */}
      <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center">
        <Link
          href="/card"
          aria-label="Change location"
          data-analytics-id={`${analyticsPrefix}-change-location`}
          className={`flex size-11 items-center justify-center rounded-full bg-white/[0.14] text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.24] motion-reduce:transition-none ${focus}`}
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
          className={`mx-auto block rounded-sm ${focus}`}
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

      <div className="locations-enter mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-3 text-center md:py-8">
        {practitioner ? (
          <Image
            src={portraits[location.slug]}
            alt=""
            width={230}
            height={230}
            priority
            className="mx-auto h-[86px] w-[86px] rounded-full [@media(max-height:600px)]:hidden md:h-[115px] md:w-[115px] object-cover object-top shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] ring-2 ring-white/80"
          />
        ) : null}

        <h1
          id="card-heading"
          className="mt-4 font-heading text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.015em] text-balance md:text-[2.5rem]"
        >
          {firstName ? `How was your visit with ${firstName}?` : "How was your visit?"}
        </h1>

        <div className="mt-4 flex justify-center gap-1.5 md:mt-5 md:gap-2" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <svg key={index} viewBox="0 0 24 24" className="h-6 w-6 text-brand-goldLight md:h-8 md:w-8">
              <path d={STAR_PATH} fill="currentColor" />
            </svg>
          ))}
        </div>

        <a
          href={getWriteReviewUrl(location.slug, location.displayName)}
          rel="noopener"
          data-analytics-id={`${analyticsPrefix}-review`}
          className={`group mt-5 flex min-h-[3.75rem] md:mt-6 md:min-h-16 items-center justify-between gap-3 rounded-full bg-brand-offwhite py-2 pl-7 pr-2 text-left font-heading text-[1.1875rem] font-semibold text-[#34503F] shadow-[0_14px_30px_-16px_rgba(0,0,0,0.55)] transition-[background-color,transform] duration-200 hover:bg-white active:translate-y-px active:scale-[0.99] motion-reduce:transition-none ${focus}`}
        >
          <span>Leave a Google review</span>
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#34503F] text-brand-offwhite transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          >
            <svg
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
          </span>
        </a>
        <p className="mt-2 text-sm text-white/80 md:mt-3 md:text-base">Takes about a minute.</p>

        <div className="mt-5 border-t border-white/25 pt-5 md:mt-9 md:pt-8">
          <h2 className="font-heading text-lg font-semibold leading-6 md:text-xl md:leading-7">Need to change a visit?</h2>
          <p className="mt-0.5 text-sm text-white/85 md:mt-1 md:text-base">24 hours&rsquo; notice, please.</p>

          <ul className="mt-4 flex justify-center gap-7 md:mt-5">
            {actions.map((action) => (
              <li key={action.kind}>
                <a
                  href={action.href}
                  aria-label={action.label}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  data-analytics-id={action.analyticsId}
                  className={`group flex w-[4.5rem] flex-col items-center gap-1.5 rounded-lg text-sm font-medium md:gap-2 md:text-base text-white ${focus}`}
                >
                  <span className="flex h-14 w-14 items-center md:h-16 md:w-16 justify-center rounded-full bg-white/[0.14] backdrop-blur-md transition-[background-color,color,transform] duration-200 group-hover:bg-white group-hover:text-[#34503F] group-active:scale-[0.97] motion-reduce:transition-none">
                    <ContactGlyph kind={action.kind} className="h-6 w-6 md:h-7 md:w-7" />
                  </span>
                  <span aria-hidden="true">{shortLabel[action.kind]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
