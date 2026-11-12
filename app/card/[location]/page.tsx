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
// button, and the location's contact details sit below as labelled icon buttons.
// The contact details are the same ones the location page uses, so a change
// there shows up here too.

type Slug = ServiceLocation["slug"];

const contactActions: Record<Slug, (options: { analyticsPrefix: string }) => ContactAction[]> = {
  bristol: bristolContactActions,
  southampton: southamptonContactActions,
};

/** One word under each icon: icons alone are easy to misread. */
const shortLabel: Record<ContactAction["kind"], string> = { phone: "Call", whatsapp: "WhatsApp", email: "Email" };

const STAR_PATH =
  "M12 1.5l3.09 6.86 7.41.78-5.54 5.03 1.57 7.33L12 17.77 5.47 21.5l1.57-7.33L1.5 9.14l7.41-.78z";

const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white";
const quietLink = `inline-flex min-h-12 items-center text-base font-medium text-white/85 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white ${focus}`;

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
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#34503F] px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+1.5rem)] text-white sm:px-8"
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

      <Link href="/" className={`mx-auto block rounded-sm ${focus}`}>
        <span
          role="img"
          aria-label="Foot+ home"
          className="block h-8 w-[6.4rem] bg-white [mask:url('/images/footplus-generic-logo_MASTER_FINAL.svg')_center/contain_no-repeat]"
        />
      </Link>

      <div className="locations-enter mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8 text-center">
        {practitioner ? (
          <Image
            src={portraits[location.slug]}
            alt=""
            width={192}
            height={192}
            priority
            className="mx-auto h-24 w-24 rounded-full object-cover object-top shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] ring-2 ring-white/80"
          />
        ) : null}

        <p className="mt-5 text-base font-medium tracking-[0.01em] text-white/85">{location.displayName}</p>
        <h1
          id="card-heading"
          className="mt-1 font-heading text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] text-balance md:text-[2.5rem]"
        >
          {firstName ? `How was your visit with ${firstName}?` : "How was your visit?"}
        </h1>

        <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <svg key={index} viewBox="0 0 24 24" className="h-8 w-8 text-brand-goldLight">
              <path d={STAR_PATH} fill="currentColor" />
            </svg>
          ))}
        </div>

        <a
          href={getWriteReviewUrl(location.slug, location.displayName)}
          rel="noopener"
          data-analytics-id={`${analyticsPrefix}-review`}
          className={`mt-6 flex min-h-16 items-center justify-center rounded-lg bg-white px-6 text-xl font-semibold text-[#34503F] shadow-[0_14px_30px_-16px_rgba(0,0,0,0.6)] transition-[background-color,transform] duration-200 hover:bg-brand-offwhite active:translate-y-px active:scale-[0.99] motion-reduce:transition-none ${focus}`}
        >
          Leave a Google review
        </a>
        <p className="mt-3 text-base text-white/80">Takes about a minute.</p>

        <div className="mt-9 border-t border-white/25 pt-8">
          <h2 className="font-heading text-xl font-semibold leading-7">Need to change a visit?</h2>
          <p className="mt-1 text-base text-white/85">24 hours&rsquo; notice, please.</p>

          <ul className="mt-5 flex justify-center gap-7">
            {actions.map((action) => (
              <li key={action.kind}>
                <a
                  href={action.href}
                  aria-label={action.label}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  data-analytics-id={action.analyticsId}
                  className={`group flex w-[4.5rem] flex-col items-center gap-2 rounded-lg text-base font-medium text-white ${focus}`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/55 bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_30px_-18px_rgba(0,0,0,0.6)] transition-[background-color,color,transform] duration-200 group-hover:bg-white group-hover:text-[#34503F] group-active:scale-[0.97] motion-reduce:transition-none">
                    <ContactGlyph kind={action.kind} className="h-7 w-7" />
                  </span>
                  <span aria-hidden="true">{shortLabel[action.kind]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav aria-label="More" className="mx-auto flex flex-wrap justify-center gap-x-6">
        <Link href={location.href} className={quietLink}>
          {location.displayName} page
        </Link>
        <Link href="/card" className={quietLink}>
          Change location
        </Link>
      </nav>
    </section>
  );
}
