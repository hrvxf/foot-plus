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
    window.setTimeout(() => router.push(href), 240);
  }

  return (
    <main
      aria-label="Choose your Foot+ location"
      data-leaving={selected ? "true" : "false"}
      className="locations-overlay fixed inset-0 z-[100] flex min-h-dvh items-center justify-center overflow-hidden bg-brand-sageDark px-5 py-10"
    >
      <div
        className="locations-texture absolute -inset-4 scale-[1.03] bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px] opacity-20 blur-[3px]"
        aria-hidden="true"
      />
      <div
        className="locations-glow absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-white/15 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="locations-glow absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-brand-sageLight/30 blur-[120px]"
        aria-hidden="true"
      />

      <nav
        aria-label="Foot+ locations"
        className="locations-actions relative grid h-14 w-full max-w-md grid-cols-2 overflow-hidden rounded-full border border-white/30 bg-white/[0.07] p-1 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl"
      >
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-1/2 top-3 w-px bg-white/20"
        />

        {locations.map((location, index) => {
          const isSelected = selected === location.href;
          const isReceding = selected && !isSelected;

          return (
            <a
              key={location.href}
              href={location.href}
              aria-current={isSelected ? "true" : undefined}
              onClick={(event) => chooseLocation(event, location.href)}
              style={{ animationDelay: `${70 + index * 65}ms` }}
              className={[
                "location-choice group relative z-10 flex items-center justify-center rounded-full px-4",
                "font-heading text-base font-semibold tracking-[0.015em] text-white",
                "transition-[transform,opacity,background-color,box-shadow] duration-200 ease-out",
                "hover:bg-white/[0.10] active:scale-[0.95] active:bg-white/[0.18]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white",
                isSelected
                  ? "scale-[0.97] bg-white/[0.18] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22),0_8px_24px_-16px_rgba(0,0,0,0.9)]"
                  : "",
                isReceding ? "scale-95 opacity-20" : "",
              ].join(" ")}
            >
              <span className="relative pb-0.5">
                {location.name}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white/85 transition-[width,opacity] duration-200 group-hover:w-5 group-hover:opacity-100"
                />
              </span>
            </a>
          );
        })}
      </nav>

      <style jsx>{`
        .locations-overlay {
          isolation: isolate;
        }

        .locations-texture {
          animation: texture-in 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .locations-glow {
          animation: glow-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .location-choice {
          opacity: 0;
          animation: choice-in 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .locations-overlay[data-leaving="true"] {
          pointer-events: none;
        }

        .locations-overlay[data-leaving="true"] .locations-texture {
          transform: scale(1.06);
          opacity: 0.12;
          transition: transform 240ms ease, opacity 240ms ease;
        }

        .locations-overlay[data-leaving="true"] .locations-glow {
          transform: scale(1.06);
          opacity: 0.7;
          transition: transform 240ms ease, opacity 240ms ease;
        }

        .locations-overlay[data-leaving="true"] .location-choice[aria-current="true"] {
          animation: selected-out 240ms cubic-bezier(0.4, 0, 1, 1) both;
        }

        @keyframes texture-in {
          from { transform: scale(1.08); opacity: 0.08; }
          to { transform: scale(1.03); opacity: 0.2; }
        }

        @keyframes glow-in {
          from { transform: scale(1.08); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes choice-in {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes selected-out {
          from { opacity: 1; transform: scale(0.97); }
          to { opacity: 0; transform: scale(1.035); }
        }

        @media (prefers-reduced-motion: reduce) {
          .locations-texture,
          .locations-glow,
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
