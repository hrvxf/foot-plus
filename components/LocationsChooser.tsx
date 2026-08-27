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
      <div className="locations-daylight absolute inset-0" aria-hidden="true" />
      <div className="locations-panes absolute inset-0" aria-hidden="true" />
      <div
        className="locations-texture absolute -inset-8 scale-[1.06] bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[520px_520px] opacity-[0.16]"
        aria-hidden="true"
      />
      <div className="locations-frost absolute inset-0" aria-hidden="true" />
      <div
        className="locations-grain absolute inset-0 bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[420px_420px] opacity-[0.055] mix-blend-screen"
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
          background:
            radial-gradient(circle at 18% 16%, rgba(178, 202, 188, 0.32), transparent 38%),
            linear-gradient(145deg, #18372d 0%, #274d40 52%, #173128 100%);
        }

        .locations-daylight {
          background:
            linear-gradient(105deg, rgba(237, 247, 240, 0.34) 0%, rgba(207, 228, 215, 0.16) 22%, transparent 48%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.12), transparent 42%, rgba(6, 24, 18, 0.16));
        }

        .locations-panes {
          background:
            linear-gradient(90deg,
              transparent 0%,
              transparent 24.8%,
              rgba(235, 245, 239, 0.16) 25%,
              rgba(10, 35, 27, 0.12) 25.18%,
              transparent 25.35%,
              transparent 74.7%,
              rgba(235, 245, 239, 0.13) 74.9%,
              rgba(10, 35, 27, 0.1) 75.08%,
              transparent 75.25%
            );
          opacity: 0.72;
        }

        .locations-daylight,
        .locations-panes,
        .locations-texture {
          animation: background-in 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .locations-frost {
          z-index: 1;
          background:
            linear-gradient(118deg, rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.055) 46%, rgba(255, 255, 255, 0.1)),
            repeating-linear-gradient(102deg, rgba(255, 255, 255, 0.018) 0 1px, transparent 1px 5px);
          -webkit-backdrop-filter: blur(30px) saturate(106%);
          backdrop-filter: blur(30px) saturate(106%);
          box-shadow:
            inset 0 1px rgba(255, 255, 255, 0.16),
            inset 0 0 150px rgba(236, 246, 240, 0.085);
          animation: frost-in 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .locations-grain {
          z-index: 2;
          pointer-events: none;
        }

        .locations-actions {
          z-index: 3;
        }

        .location-choice {
          opacity: 0;
          animation: choice-in 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .locations-overlay[data-leaving="true"] {
          pointer-events: none;
        }

        .locations-overlay[data-leaving="true"] .locations-daylight,
        .locations-overlay[data-leaving="true"] .locations-panes,
        .locations-overlay[data-leaving="true"] .locations-texture {
          transform: scale(1.025);
          opacity: 0.34;
          transition: transform 240ms ease, opacity 240ms ease;
        }

        .locations-overlay[data-leaving="true"] .locations-frost {
          opacity: 0.78;
          transition: opacity 240ms ease;
        }

        .locations-overlay[data-leaving="true"] .location-choice[aria-current="true"] {
          animation: selected-out 240ms cubic-bezier(0.4, 0, 1, 1) both;
        }

        @keyframes background-in {
          from { transform: scale(1.08); opacity: 0; }
          to { transform: scale(1); }
        }

        @keyframes frost-in {
          from { opacity: 0; backdrop-filter: blur(8px); }
          to { opacity: 1; backdrop-filter: blur(30px); }
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
          .locations-daylight,
          .locations-panes,
          .locations-texture,
          .locations-frost,
          .locations-grain,
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
