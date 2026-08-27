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
        className="locations-texture absolute -inset-8 scale-[1.06] bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[520px_520px] opacity-35"
        aria-hidden="true"
      />
      <div
        className="locations-mark absolute left-[8%] top-[10%] h-[36rem] w-[72rem] max-w-[92vw] -rotate-6 bg-[url('/images/footplus-generic-logo_MASTER_FINAL.svg')] bg-contain bg-center bg-no-repeat opacity-[0.13]"
        aria-hidden="true"
      />
      <div
        className="locations-shape absolute -left-20 top-[18%] h-72 w-72 rounded-full border-[36px] border-white/25 bg-brand-sageLight/45"
        aria-hidden="true"
      />
      <div
        className="locations-shape absolute -right-32 bottom-[8%] h-[28rem] w-[28rem] rounded-[42%] border-[54px] border-white/18 bg-white/20"
        aria-hidden="true"
      />
      <div className="locations-frost absolute inset-0" aria-hidden="true" />

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

        .locations-texture,
        .locations-mark,
        .locations-shape {
          animation: background-in 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .locations-frost {
          z-index: 1;
          background:
            radial-gradient(circle at 26% 20%, rgba(255, 255, 255, 0.2), transparent 28%),
            radial-gradient(circle at 74% 76%, rgba(255, 255, 255, 0.12), transparent 34%),
            linear-gradient(115deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.035));
          -webkit-backdrop-filter: blur(24px) saturate(112%);
          backdrop-filter: blur(24px) saturate(112%);
          box-shadow: inset 0 0 120px rgba(255, 255, 255, 0.07);
          animation: frost-in 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .locations-actions {
          z-index: 2;
        }

        .location-choice {
          opacity: 0;
          animation: choice-in 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .locations-overlay[data-leaving="true"] {
          pointer-events: none;
        }

        .locations-overlay[data-leaving="true"] .locations-texture,
        .locations-overlay[data-leaving="true"] .locations-mark,
        .locations-overlay[data-leaving="true"] .locations-shape {
          transform: scale(1.04);
          opacity: 0.15;
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
          to { opacity: 1; backdrop-filter: blur(24px); }
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
          .locations-mark,
          .locations-shape,
          .locations-frost,
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
