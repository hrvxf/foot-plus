import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { serviceLocations } from "../lib/locations";

export const metadata: Metadata = {
  title: "Choose a location",
  description: "Choose your local Foot+ service in Bristol or Southampton.",
  alternates: { canonical: "/locations" },
  robots: { index: true, follow: true },
};

const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white";

// A full green screen with one question and two answers. It replaces the header
// and footer on purpose (see data-fullscreen-page in globals.css), so the logo
// set into the heading is also the way back to the home page.
export default function LocationsPage() {
  return (
    <section
      aria-labelledby="locations-heading"
      data-fullscreen-page
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden bg-[#34503F] px-5 py-[calc(env(safe-area-inset-top)+3rem)] text-white sm:px-8"
    >
      {/* Depth: soft light from the top left, a darker foot, and the brand paper grain. */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(143,179,156,0.38),transparent_60%),linear-gradient(180deg,transparent_45%,rgba(20,34,27,0.45))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[url('/images/footplus-texture.png')] bg-size-[600px_600px] opacity-[0.12] mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="locations-enter mx-auto w-full max-w-5xl">
        <h1
          id="locations-heading"
          className="text-center font-heading text-[2rem] font-semibold leading-[1.25] tracking-[-0.015em] md:text-[2.75rem] lg:text-[3.5rem]"
        >
          Choose your local{" "}
          <Link href="/" className={`inline-block rounded-sm align-baseline ${focus}`}>
            <span
              role="img"
              aria-label="Foot+"
              className="inline-block h-[1em] w-[3.19em] translate-y-[0.14em] bg-white [mask:url('/images/footplus-generic-logo_MASTER_FINAL.svg')_center/contain_no-repeat]"
            />
          </Link>{" "}
          service
        </h1>

        <ul className="mt-10 grid border-y border-white/30 sm:grid-cols-2 md:mt-16">
          {Object.values(serviceLocations).map((location) => (
            <li key={location.slug} className="border-white/30 not-first:border-t sm:not-first:border-l sm:not-first:border-t-0">
              <Link
                href={location.href}
                className={`group flex min-h-28 items-center justify-between gap-6 px-2 font-heading text-[2rem] font-semibold tracking-[-0.01em] transition-colors duration-200 hover:bg-white/[0.07] sm:px-8 md:min-h-44 md:px-10 md:text-[2.75rem] lg:text-[3.25rem] ${focus}`}
                data-analytics-id={`locations-view-${location.slug}`}
              >
                {location.name}
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/50 transition-[background-color,color,transform] duration-200 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#34503F] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 md:h-14 md:w-14"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-6 w-6" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
