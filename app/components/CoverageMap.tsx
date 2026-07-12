"use client";

import Link from "next/link";
import { useState } from "react";
import type { LocationPage } from "../lib/location-pages";

type CoverageMapProps = {
  locations: Pick<LocationPage, "slug" | "area" | "hubDescription" | "intro" | "mapPosition">[];
};

export default function CoverageMap({ locations }: CoverageMapProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = locations.find((location) => location.slug === selectedSlug);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)]">
      <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-brand-sageLight/30 bg-linear-to-br from-brand-sageLight/20 via-white to-brand-offwhite p-4 shadow-sm sm:min-h-[480px] sm:p-6">
        <svg
          aria-hidden="true"
          className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] text-brand-sageDark/20 sm:inset-6 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-3rem)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M19 21 C28 9 46 8 60 13 C73 18 84 29 86 43 C89 60 77 75 62 84 C48 92 29 88 19 76 C8 63 8 36 19 21 Z"
            fill="currentColor"
          />
          <path
            d="M18 61 C34 56 49 58 64 51 C73 47 80 42 87 37"
            fill="none"
            stroke="rgba(124,143,122,0.36)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="relative z-10 max-w-sm rounded-2xl bg-white/80 p-3 text-xs leading-relaxed text-brand-charcoal/70 shadow-sm">
          Schematic guide only: markers show approximate neighbourhood positions rather than exact boundaries.
        </p>
        <div aria-label="Covered Bristol areas" className="absolute inset-4 sm:inset-6">
          {locations.map((location, index) => {
            const active = location.slug === selectedSlug;
            return (
              <button
                key={location.slug}
                type="button"
                aria-pressed={active}
                aria-label={`Select ${location.area}`}
                onClick={() => setSelectedSlug(location.slug)}
                className={`absolute z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-sm font-semibold shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark sm:h-12 sm:w-12 ${
                  active
                    ? "border-brand-sageDark bg-brand-sageDark text-white scale-110"
                    : "border-white bg-brand-sage text-white hover:bg-brand-sageDark"
                }`}
                style={{ left: `${location.mapPosition.x}%`, top: `${location.mapPosition.y}%` }}
              >
                <span aria-hidden="true">{index + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
      <aside className="rounded-3xl border border-brand-sageLight/30 bg-white p-5 shadow-sm md:p-6" aria-live="polite">
        {selected ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">Selected area</p>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-brand-sageDark">{selected.area}</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75">{selected.hubDescription ?? selected.intro}</p>
            <Link href={`/${selected.slug}`} className="mt-5 inline-flex rounded-xl bg-brand-sageDark px-5 py-3 text-sm font-semibold text-white shadow-md shadow-black/10 transition hover:bg-brand-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight">
              View {selected.area} coverage
            </Link>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">Coverage guide</p>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-brand-sageDark">Choose an area</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75">Choose an area to see more information, or use the regional lists below for direct links to each location page.</p>
          </>
        )}
      </aside>
    </div>
  );
}
