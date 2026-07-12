"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { LocationPage } from "../lib/location-pages";

type CoverageMapLocation = Pick<
  LocationPage,
  "slug" | "area" | "hubDescription" | "intro" | "mapPosition" | "mapLabelPosition"
>;

type CoverageMapProps = {
  locations: CoverageMapLocation[];
};

const DEFAULT_SELECTED_SLUG = "foot-health-practitioner-st-philips";

const shortLabels: Record<string, string> = {
  "Westbury-on-Trym": "Westbury",
};

const labelPositionClass: Record<NonNullable<LocationPage["mapLabelPosition"]>, string> = {
  right: "left-7 top-1/2 -translate-y-1/2 items-start text-left",
  left: "right-7 top-1/2 -translate-y-1/2 items-end text-right",
  above: "bottom-7 left-1/2 -translate-x-1/2 items-center text-center",
  below: "left-1/2 top-7 -translate-x-1/2 items-center text-center",
};

export default function CoverageMap({ locations }: CoverageMapProps) {
  const headingId = useId();
  const descriptionId = useId();
  const defaultLocation = locations.find((location) => location.slug === DEFAULT_SELECTED_SLUG) ?? locations[0];
  const [selectedSlug, setSelectedSlug] = useState<string>(defaultLocation.slug);
  const selected = locations.find((location) => location.slug === selectedSlug) ?? defaultLocation;

  return (
    <div className="space-y-4">
      <div className="relative min-h-[500px] overflow-hidden rounded-3xl border border-brand-sageLight/30 bg-linear-to-br from-brand-sageLight/15 via-white to-brand-offwhite p-4 shadow-sm sm:min-h-[540px] sm:p-6 lg:min-h-[590px]">
        <svg
          role="img"
          aria-labelledby={`${headingId} ${descriptionId}`}
          className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] sm:inset-6 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-3rem)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <title id={headingId}>Simplified Bristol coverage schematic</title>
          <desc id={descriptionId}>A schematic Bristol outline with the River Avon and approximate covered area positions.</desc>
          <path
            aria-hidden="true"
            d="M16 17 C25 8 39 7 52 10 C67 13 80 23 86 37 C94 55 88 74 73 86 C59 97 39 96 25 87 C12 78 8 63 10 47 C11 35 9 25 16 17 Z"
            fill="rgba(222, 231, 211, 0.55)"
            stroke="rgba(124, 143, 122, 0.34)"
            strokeWidth="0.8"
          />
          <path
            aria-hidden="true"
            d="M7 62 C18 58 26 58 35 61 C43 64 50 63 58 58 C66 53 75 51 92 47"
            fill="none"
            stroke="rgba(78, 142, 153, 0.52)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text aria-hidden="true" x="70" y="46" fill="rgba(55, 99, 108, 0.78)" fontSize="3.4" fontWeight="700">
            River Avon
          </text>
          <path
            aria-hidden="true"
            d="M49 45 C53 43 58 43 63 45 C68 47 72 46 77 43"
            fill="none"
            stroke="rgba(124, 143, 122, 0.18)"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute left-[64%] top-[48%] z-10 flex max-w-[8rem] -translate-x-1/2 -translate-y-full flex-col items-center text-center text-[0.68rem] font-semibold leading-tight text-brand-sageDark sm:text-xs">
          <span className="mb-1 rounded-full border border-brand-sageDark/20 bg-white/90 px-2 py-1 shadow-sm">Foot+ base — BS2</span>
          <span aria-hidden="true" className="h-3 w-3 rounded-full border-2 border-white bg-brand-sageDark shadow-sm" />
        </div>

        <div aria-label="Covered Bristol areas" className="absolute inset-3 sm:inset-6">
          {locations.map((location) => {
            const active = location.slug === selected.slug;
            const label = shortLabels[location.area] ?? location.area;
            const labelPosition = location.mapLabelPosition ?? "right";
            return (
              <button
                key={location.slug}
                type="button"
                aria-current={active ? "location" : undefined}
                aria-label={`${active ? "Selected" : "Select"} ${location.area}`}
                onClick={() => setSelectedSlug(location.slug)}
                className="group absolute z-20 min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-sageDark"
                style={{ left: `${location.mapPosition.x}%`, top: `${location.mapPosition.y}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition group-hover:scale-125 group-focus-visible:scale-125 sm:h-4 sm:w-4 ${
                    active ? "bg-brand-sageDark ring-4 ring-brand-sageLight/60" : "bg-brand-sage ring-2 ring-white/80"
                  }`}
                />
                <span
                  className={`pointer-events-none absolute flex max-w-[7.5rem] text-[0.66rem] font-semibold leading-tight text-brand-charcoal transition sm:max-w-[8.5rem] sm:text-xs ${labelPositionClass[labelPosition]}`}
                >
                  <span className={`rounded-full bg-white/88 px-2 py-1 shadow-sm ring-1 ring-brand-sageLight/35 ${active ? "text-brand-sageDark ring-brand-sageDark/35" : ""}`}>
                    {label}
                    {active ? <span className="sr-only"> selected</span> : null}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-brand-sageLight/30 bg-white p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-5" aria-live="polite">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">Selected area</p>
          <h3 className="mt-2 font-heading text-2xl font-semibold text-brand-sageDark">{selected.area}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75">{selected.hubDescription ?? selected.intro}</p>
        </div>
        <Link href={`/${selected.slug}`} className="mt-4 inline-flex shrink-0 rounded-xl bg-brand-sageDark px-5 py-3 text-sm font-semibold text-white shadow-md shadow-black/10 transition hover:bg-brand-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight sm:mt-0">
          View {selected.area} coverage
        </Link>
      </div>
      <p className="text-xs leading-relaxed text-brand-charcoal/60">Area positions are approximate and are intended as a visual guide only.</p>
    </div>
  );
}
