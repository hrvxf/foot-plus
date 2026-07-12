"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LocationPage } from "../lib/location-pages";

type CoverageMapLocation = Pick<
  LocationPage,
  "slug" | "area" | "hubDescription" | "intro" | "mapCoordinates"
>;

type CoverageMapProps = {
  locations: CoverageMapLocation[];
};

const DEFAULT_SELECTED_SLUG = "foot-health-practitioner-st-philips";
const OSM_BBOX = "-2.6600,51.4250,-2.5300,51.5050";

const osmEmbedUrl = (location: { lat: number; lng: number }) =>
  `https://www.openstreetmap.org/export/embed.html?bbox=${OSM_BBOX}&layer=mapnik&marker=${location.lat}%2C${location.lng}`;

export default function CoverageMap({ locations }: CoverageMapProps) {
  const defaultLocation = locations.find((location) => location.slug === DEFAULT_SELECTED_SLUG) ?? locations[0];
  const [selectedSlug, setSelectedSlug] = useState<string>(defaultLocation.slug);
  const selected = locations.find((location) => location.slug === selectedSlug) ?? defaultLocation;
  const mapUrl = useMemo(() => osmEmbedUrl(selected.mapCoordinates), [selected.mapCoordinates]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-brand-sageLight/30 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="relative min-h-[440px] bg-brand-sageLight/10 sm:min-h-[520px]">
            <iframe
              key={selected.slug}
              title={`Interactive Bristol map showing ${selected.area} coverage`}
              src={mapUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-2xl border border-white/75 bg-white/92 px-4 py-3 text-xs font-semibold text-brand-charcoal/75 shadow-sm backdrop-blur sm:text-sm">
              <span className="text-brand-sageDark">Interactive Bristol map:</span> zoom, pan, then choose an area from the list.
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-brand-sageDark/15 bg-white/92 px-3 py-1 text-xs font-semibold text-brand-sageDark shadow-sm">
              Foot+ base: BS2 / central Bristol
            </div>
          </div>

          <aside className="border-t border-brand-sageLight/30 bg-linear-to-br from-white to-brand-offwhite p-4 lg:max-h-[520px] lg:overflow-y-auto lg:border-l lg:border-t-0 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">Covered areas</p>
            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1" aria-label="Select a covered Bristol area">
              {locations.map((location) => {
                const active = location.slug === selected.slug;
                return (
                  <button
                    key={location.slug}
                    type="button"
                    aria-current={active ? "location" : undefined}
                    onClick={() => setSelectedSlug(location.slug)}
                    className={`rounded-2xl border px-3 py-2 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark ${
                      active
                        ? "border-brand-sageDark bg-brand-sageDark text-white shadow-sm"
                        : "border-brand-sageLight/30 bg-white/90 text-brand-sageDark hover:border-brand-sageLight/70 hover:bg-brand-sageLight/10"
                    }`}
                  >
                    {location.area}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-brand-sageLight/25 bg-white/90 px-4 py-3 text-xs font-semibold text-brand-charcoal/65 shadow-sm" aria-label="Map legend">
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-full bg-brand-sage/75 ring-2 ring-brand-sageLight/45" />Selected covered area marker</span>
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
      <p className="text-xs leading-relaxed text-brand-charcoal/60">Map markers identify approximate neighbourhood centres rather than clinical boundaries. Please include your postcode when enquiring so Foot+ can confirm availability.</p>
    </div>
  );
}
