"use client";

import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

const locations = [
  { name: "Bristol", href: "/locations/bristol" },
  { name: "Southampton", href: "/locations/southampton" },
];

export default function LocationsChooser() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function chooseLocation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    if (selected) return;

    setSelected(href);
    window.setTimeout(() => router.push(href), 260);
  }

  return (
    <main
      aria-label="Choose your Foot+ location"
      data-leaving={selected ? "true" : "false"}
      className="locations-overlay fixed inset-0 z-[100] flex min-h-dvh items-center justify-center overflow-hidden bg-brand-sageDark/55 px-6 py-10 backdrop-blur-3xl"
    >
      <div
        className="locations-texture absolute inset-0 bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px] opacity-25"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-white/20 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-brand-sageLight/35 blur-[120px]"
        aria-hidden="true"
      />

      <nav
        aria-label="Foot+ locations"
        className="locations-actions relative flex w-full max-w-xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
      >
        {locations.map((location, index) => {
          const isSelected = selected === location.href;
          const isReceding = selected && !isSelected;

          return (
            <a
              key={location.href}
              href={location.href}
              aria-current={isSelected ? "true" : undefined}
              onClick={(event) => chooseLocation(event, location.href)}
              style={{ animationDelay: `${80 + index * 70}ms` }}
              className={[
                "location-choice group relative flex h-14 flex-1 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/10 px-8",
                "font-heading text-lg font-semibold tracking-[0.01em] text-white backdrop-blur-xl",
                "shadow-[0_12px_36px_-22px_rgba(0,0,0,0.85)] transition-[transform,opacity,background-color,border-color,box-shadow] duration-200 ease-out",
                "hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/18 hover:shadow-[0_18px_42px_-22px_rgba(0,0,0,0.9)]",
                "active:translate-y-0 active:scale-[0.96] active:bg-white/25",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                isSelected
                  ? "scale-[0.97] border-white/80 bg-white/25 shadow-[0_0_0_5px_rgba(255,255,255,0.09),0_16px_45px_-20px_rgba(0,0,0,0.9)]"
                  : "",
                isReceding ? "scale-95 opacity-0" : "",
              ].join(" ")}
            >
              <span className="relative transition-transform duration-200 group-hover:scale-[1.02]">
                {location.name}
              </span>
            </a>
          );
        })}
      </nav>

      <style jsx>{`
        .locations-overlay {
          animation: overlay-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: opacity 260ms ease, backdrop-filter 260ms ease;
        }

        .locations-texture {
          animation: texture-in 600ms ease-out both;
        }

        .location-choice {
          opacity: 0;
          animation: choice-in 440ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .locations-overlay[data-leaving="true"] {
          opacity: 0;
          backdrop-filter: blur(8px);
          pointer-events: none;
        }

        .locations-overlay[data-leaving="true"] .location-choice[aria-current="true"] {
          animation: selected-out 260ms cubic-bezier(0.4, 0, 1, 1) both;
        }

        @keyframes overlay-in {
          from {
            opacity: 0;
            backdrop-filter: blur(8px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(48px);
          }
        }

        @keyframes texture-in {
          from { opacity: 0; transform: scale(1.04); }
          to { opacity: 0.25; transform: scale(1); }
        }

        @keyframes choice-in {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes selected-out {
          from { opacity: 1; transform: scale(0.97); }
          to { opacity: 0; transform: scale(1.04); }
        }

        @media (prefers-reduced-motion: reduce) {
          .locations-overlay,
          .locations-texture,
          .location-choice,
          .locations-overlay[data-leaving="true"] .location-choice[aria-current="true"] {
            animation: none;
            transition-duration: 1ms;
          }

          .location-choice {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
