"use client";

import Link from "next/link";
import { useState } from "react";
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
  right: "left-6 top-1/2 -translate-y-1/2 items-start text-left sm:left-7",
  left: "right-6 top-1/2 -translate-y-1/2 items-end text-right sm:right-7",
  above: "bottom-6 left-1/2 -translate-x-1/2 items-center text-center sm:bottom-7",
  below: "left-1/2 top-6 -translate-x-1/2 items-center text-center sm:top-7",
};

const mapPositionOverrides: Record<string, { x: number; y: number }> = {
  "foot-health-practitioner-old-market": { x: 57, y: 43 },
  "foot-health-practitioner-st-philips": { x: 66, y: 53 },
  "foot-health-practitioner-barton-hill": { x: 78, y: 56 },
  "foot-health-practitioner-easton": { x: 80, y: 39 },
  "foot-health-practitioner-redcliffe": { x: 52, y: 60 },
  "foot-health-practitioner-southville": { x: 39, y: 67 },
  "foot-health-practitioner-bedminster": { x: 43, y: 80 },
  "foot-health-practitioner-totterdown": { x: 64, y: 75 },
};

const mobileLabelPositionClass: Record<string, string> = {
  "foot-health-practitioner-redland": "max-sm:right-6 max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:items-end max-sm:text-right",
  "foot-health-practitioner-old-market": "max-sm:right-6 max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:items-end max-sm:text-right",
  "foot-health-practitioner-redcliffe": "max-sm:right-6 max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:items-end max-sm:text-right",
  "foot-health-practitioner-bedminster": "max-sm:right-6 max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:items-end max-sm:text-right",
};

export default function CoverageMap({ locations }: CoverageMapProps) {
  const defaultLocation = locations.find((location) => location.slug === DEFAULT_SELECTED_SLUG) ?? locations[0];
  const [selectedSlug, setSelectedSlug] = useState<string>(defaultLocation.slug);
  const selected = locations.find((location) => location.slug === selectedSlug) ?? defaultLocation;

  return (
    <div className="space-y-4">
      <div className="relative min-h-[540px] overflow-hidden rounded-3xl border border-brand-sageLight/30 bg-linear-to-br from-brand-sageLight/10 via-white to-brand-offwhite p-4 shadow-sm sm:min-h-[560px] sm:p-6 lg:min-h-[610px]">
        <svg
          aria-hidden="true"
          className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] sm:inset-6 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-3rem)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="coverage-land" x1="15" x2="85" y1="12" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(222, 231, 211, 0.42)" />
              <stop offset="1" stopColor="rgba(244, 239, 229, 0.34)" />
            </linearGradient>
          </defs>
          <path
            d="M18 20 C25 12 37 10 48 12 C60 14 69 17 78 25 C87 34 90 47 86 59 C82 72 72 83 58 89 C45 95 31 91 21 81 C12 72 10 58 13 45 C15 35 11 27 18 20 Z"
            fill="url(#coverage-land)"
            stroke="rgba(124, 143, 122, 0.18)"
            strokeWidth="0.6"
          />
          <path d="M19 34 C31 29 43 29 55 34 C66 39 76 39 87 34" fill="none" stroke="rgba(124, 143, 122, 0.12)" strokeWidth="0.55" strokeLinecap="round" />
          <path d="M14 49 C27 44 38 45 49 50 C61 55 72 54 86 48" fill="none" stroke="rgba(124, 143, 122, 0.1)" strokeWidth="0.55" strokeLinecap="round" />
          <path d="M16 66 C30 61 43 62 55 67 C65 72 75 70 84 64" fill="none" stroke="rgba(124, 143, 122, 0.09)" strokeWidth="0.55" strokeLinecap="round" />
          <path
            d="M6 64 C16 61 24 59 33 61 C42 63 47 68 56 65 C64 62 66 55 75 52 C82 50 88 48 94 45"
            fill="none"
            stroke="rgba(78, 142, 153, 0.4)"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="72" y="49" fill="rgba(55, 99, 108, 0.48)" fontSize="2.4" fontWeight="650">
            River Avon
          </text>
        </svg>

        <div aria-hidden="true" className="pointer-events-none absolute inset-3 z-0 text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-brand-sageDark/20 sm:inset-6 sm:text-[0.62rem]">
          <span className="absolute left-[16%] top-[9%]">North West Bristol</span>
          <span className="absolute left-[44%] top-[34%]">Central Bristol</span>
          <span className="absolute right-[8%] top-[29%]">East Bristol</span>
          <span className="absolute bottom-[11%] left-[39%]">South Bristol</span>
        </div>

        <div className="absolute left-[61%] top-[48%] z-10 flex max-w-[6rem] -translate-x-1/2 -translate-y-full flex-col items-center text-center text-[0.62rem] font-semibold leading-tight text-brand-sageDark sm:left-[63%] sm:top-[48%] sm:text-[0.68rem]">
          <span className="mb-1 rounded-2xl border border-brand-sageDark/20 bg-white/92 px-2 py-1 shadow-sm ring-1 ring-white/70">Foot+ base<br /><span className="tracking-[0.18em]">BS2</span></span>
          <span aria-hidden="true" className="h-3 w-3 rounded-full border-2 border-white bg-brand-sageDark shadow-sm ring-4 ring-brand-sageLight/45" />
        </div>

        <div aria-label="Covered Bristol areas" className="absolute inset-3 sm:inset-6">
          {locations.map((location) => {
            const active = location.slug === selected.slug;
            const label = shortLabels[location.area] ?? location.area;
            const labelPosition = location.mapLabelPosition ?? "right";
            const mobileLabelClass = mobileLabelPositionClass[location.slug] ?? "";
            const position = mapPositionOverrides[location.slug] ?? location.mapPosition;
            return (
              <button
                key={location.slug}
                type="button"
                aria-current={active ? "location" : undefined}
                aria-label={`${active ? "Selected" : "Select"} covered area: ${location.area}`}
                onClick={() => setSelectedSlug(location.slug)}
                className="group absolute z-20 min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[filter,transform] duration-200 hover:z-30 hover:-translate-y-[calc(50%+1px)] focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-sageDark motion-reduce:transition-none"
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-colors duration-200 group-hover:bg-brand-sageDark group-focus-visible:bg-brand-sageDark motion-reduce:transition-none ${
                    active ? "h-4 w-4 bg-brand-sageDark ring-[5px] ring-brand-sageLight/55" : "h-3 w-3 bg-brand-sage/75 ring-2 ring-white/85 sm:h-3.5 sm:w-3.5"
                  }`}
                />
                <span
                  className={`pointer-events-none absolute flex max-w-[7.5rem] text-[0.64rem] font-semibold leading-tight text-brand-charcoal/86 transition-colors duration-200 group-hover:text-brand-sageDark group-focus-visible:text-brand-sageDark sm:flex sm:max-w-[8.75rem] sm:text-xs ${labelPositionClass[labelPosition]} ${mobileLabelClass}`}
                >
                  <span className={`rounded-full bg-white/90 px-2 py-1 shadow-sm ring-1 ring-brand-sageLight/30 ${active ? "text-brand-sageDark ring-brand-sageDark/35" : ""}`}>
                    {label}
                    {active ? <span className="sr-only"> selected</span> : null}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-brand-sageLight/25 bg-white/90 px-4 py-3 text-xs font-semibold text-brand-charcoal/65 shadow-sm" aria-label="Map legend">
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-full bg-brand-sage/75 ring-2 ring-brand-sageLight/45" />Covered area</span>
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-full border-2 border-white bg-brand-sageDark ring-4 ring-brand-sageLight/45" />Foot+ base (BS2)</span>
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
