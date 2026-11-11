import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { displayH1, shell } from "../components/site/ui";
import { serviceLocations } from "../lib/locations";

export const metadata: Metadata = {
  title: "Choose a location",
  description: "Choose your local Foot+ service in Bristol or Southampton.",
  alternates: { canonical: "/locations" },
  robots: { index: true, follow: true },
};

const portraits = {
  bristol: "/images/adam-james.webp",
  southampton: "/images/katie-preston.webp",
};

// Deliberately bare: a heading and the two cities. Everything else lives on
// each location's own page.
export default function LocationsPage() {
  return (
    <section className="py-10 md:py-16 lg:py-20" aria-labelledby="locations-heading">
      <div className={shell}>
        <h1 id="locations-heading" className={displayH1}>
          Choose your local <span className="text-brand-sage">Foot+ service</span>
        </h1>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:mt-10 md:gap-10">
          {Object.values(serviceLocations).map((location) => (
            <li key={location.slug}>
              <Link
                href={location.href}
                className="group block rounded-lg focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-brand-sageDark"
                data-analytics-id={`locations-view-${location.slug}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-brand-wash sm:aspect-[4/5] lg:aspect-[4/3]">
                  <Image
                    src={portraits[location.slug]}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </span>
                <span className="mt-4 flex items-center justify-between gap-4 font-heading text-[1.625rem] font-semibold leading-[1.2] text-brand-sageDeep md:text-[2.125rem]">
                  <span className="underline-offset-4 group-hover:underline">{location.name}</span>
                  <ArrowRight className="h-7 w-7 shrink-0 text-brand-sage" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
