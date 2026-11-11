import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { texturedGreen } from "../components/site/ui";
import { serviceLocations } from "../lib/locations";

export const metadata: Metadata = {
  title: "Choose a location",
  description: "Choose your local Foot+ service in Bristol or Southampton.",
  alternates: { canonical: "/locations" },
  robots: { index: true, follow: true },
};

const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white";

// A full green screen with one question and two answers. It covers the header
// and footer on purpose, so the logo doubles as the way back to the home page.
export default function LocationsPage() {
  return (
    <section
      aria-labelledby="locations-heading"
      data-fullscreen-page
      className={`flex min-h-dvh flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+1.25rem)] sm:px-8 ${texturedGreen}`}
    >
      <Link href="/" aria-label="Foot+ home" className={`inline-flex self-start rounded-sm ${focus}`}>
        <span
          role="img"
          aria-label="Foot+"
          className="block h-10 w-[128px] bg-white [mask:url('/images/footplus-generic-logo_MASTER_FINAL.svg')_left_center/contain_no-repeat]"
        />
      </Link>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-10 text-center">
        <h1
          id="locations-heading"
          className="font-heading text-[2.125rem] font-semibold leading-[1.15] tracking-[-0.015em] text-white md:text-[2.75rem] md:leading-[1.1] lg:text-[3.25rem]"
        >
          Choose your local Foot+ service
        </h1>

        <ul className="mx-auto mt-8 grid w-full max-w-3xl gap-4 sm:grid-cols-2 sm:gap-6 md:mt-12">
          {Object.values(serviceLocations).map((location) => (
            <li key={location.slug}>
              <Link
                href={location.href}
                className={`group flex min-h-24 items-center justify-between gap-4 rounded-lg bg-white px-6 font-heading text-[1.625rem] font-semibold leading-[1.2] text-brand-sageDeep transition-colors duration-150 hover:bg-brand-offwhite md:min-h-28 md:px-8 md:text-[2.125rem] ${focus}`}
                data-analytics-id={`locations-view-${location.slug}`}
              >
                {location.name}
                <ArrowRight
                  className="h-7 w-7 shrink-0 text-brand-sage transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
