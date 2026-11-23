"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import { trackAdviceEvent } from "../advice/AdviceTracker";
import { FREE_UP_TO_MILES, STANDARD_UP_TO_MILES, travelBands, type TravelBand } from "../../lib/travel";

const MAX = 10;

function bandFor(miles: number): TravelBand {
  if (miles < FREE_UP_TO_MILES) return "free";
  if (miles < STANDARD_UP_TO_MILES) return "standard";
  return "extended";
}

/** Drag along the distance to see the travel fee. Styled in globals.css (.travel-range). */
export default function TravelSlider() {
  const id = useId();
  const [miles, setMiles] = useState(1);
  const lastReported = useRef<number | null>(null);

  /** Reported when the visitor lets go, so one drag is one event rather than one per step. */
  const report = () => {
    if (lastReported.current === miles) return;
    lastReported.current = miles;
    trackAdviceEvent("travel_slider_used", { miles, travel_band: bandFor(miles) });
  };
  const band = travelBands[bandFor(miles)];
  const pct = (miles / MAX) * 100;

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Distance from your practitioner, in miles
      </label>
      <div className="relative mx-1.5 mt-8">
        <input
          id={id}
          type="range"
          min={0}
          max={MAX}
          step={0.5}
          value={miles}
          onChange={(event) => setMiles(Number(event.target.value))}
          onPointerUp={report}
          onKeyUp={report}
          aria-valuetext={`${miles} miles: ${band.label}`}
          className="travel-range w-full"
          style={{ "--p": `${pct}%` } as CSSProperties}
        />
        <div className="relative mt-1 h-4 text-[11px] text-white/55" aria-hidden="true">
          <span className="absolute left-0">0</span>
          <span className="absolute -translate-x-1/2" style={{ left: `${(FREE_UP_TO_MILES / MAX) * 100}%` }}>
            {FREE_UP_TO_MILES} mi
          </span>
          <span className="absolute -translate-x-1/2" style={{ left: `${(STANDARD_UP_TO_MILES / MAX) * 100}%` }}>
            {STANDARD_UP_TO_MILES} mi
          </span>
          <span className="absolute right-0">{MAX}+</span>
        </div>
      </div>
      <p className="mt-7 flex items-baseline justify-center gap-2.5" aria-live="polite">
        <span className="font-heading text-[2.75rem] font-bold leading-none tracking-[-0.02em]">{band.fee}</span>
        <span className="text-sm text-white/70">{band.range.toLowerCase()}</span>
      </p>
    </div>
  );
}
