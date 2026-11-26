"use client";

import Link from "next/link";
import { createContext, useContext, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { trackAdviceEvent } from "../advice/AdviceTracker";
import PostcodeChecker from "../home/PostcodeChecker";
import { focusRing } from "../site/ui";
import {
  FREE_UP_TO_MILES,
  STANDARD_UP_TO_MILES,
  travelBandFor,
  travelBands,
  travelBases,
} from "../../lib/travel";
import type { Ticket } from "./PriceTickets";

/*
 * Desktop only (lg+): the /prices "price builder". A receipt on the right where
 * you pick the visit and drag the distance, with a running total; the left
 * column (the page's own heading) lists what the chosen visit includes.
 * Phones keep the tickets and the green travel band.
 */

const MAX_MILES = 10;

type Builder = { tickets: Ticket[]; visit: number; setVisit: (index: number) => void };
const BuilderContext = createContext<Builder | null>(null);

function useBuilder() {
  const value = useContext(BuilderContext);
  if (!value) throw new Error("PriceBuilder parts must sit inside <PriceBuilder>");
  return value;
}

/** Holds the chosen visit for the parts below. Lays its children out in two columns from lg. */
export default function PriceBuilder({ tickets, children }: { tickets: Ticket[]; children: ReactNode }) {
  const [visit, setVisit] = useState(0);
  return (
    <BuilderContext.Provider value={{ tickets, visit, setVisit }}>
      <div className="lg:mx-auto lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-center lg:gap-16 lg:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,500px)]">{children}</div>
    </BuilderContext.Provider>
  );
}

/** What the chosen visit includes, under the heading. */
export function PriceBuilderIncluded() {
  const { tickets, visit } = useBuilder();
  const ticket = tickets[visit];
  return (
    <div className="hidden lg:block">
      <ul className="mt-8 flex min-h-[10.5rem] flex-col gap-1" aria-label={`What a ${ticket.name.toLowerCase()} includes`}>
        {ticket.points.map((point) => (
          <li key={point} className="flex gap-3 py-1.5 text-[1.0625rem] text-brand-charcoal">
            <span className="font-heading font-semibold text-brand-sage" aria-hidden="true">
              +
            </span>
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[0.9375rem] text-brand-muted">
        {ticket.duration}.{" "}
        <Link
          href="/foot-care-services"
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-brand-sageDeep hover:text-brand-charcoal ${focusRing}`}
        >
          What each treatment involves <span aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  );
}

function amount(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

/** The receipt: visit switch, travel slider, total and postcode check. */
export function PriceBuilderReceipt() {
  const { tickets, visit, setVisit } = useBuilder();
  const sliderId = useId();
  const [miles, setMiles] = useState(1);
  const lastReported = useRef<number | null>(null);

  const ticket = tickets[visit];
  const bandKey = travelBandFor(miles);
  const band = travelBands[bandKey];
  const travelFee = bandKey === "free" ? 0 : amount(band.fee);
  const total = `${bandKey === "extended" ? "from " : ""}£${amount(ticket.price) + travelFee}`;
  const pct = (miles / MAX_MILES) * 100;

  const report = () => {
    if (lastReported.current === miles) return;
    lastReported.current = miles;
    trackAdviceEvent("travel_slider_used", { miles, travel_band: bandKey, placement: "price_builder" });
  };

  return (
    <div className="relative hidden text-left lg:block">
      <span className="absolute -top-12 right-10 z-10 font-heading text-[4rem] font-semibold leading-none text-brand-sageLight/60" aria-hidden="true">
        +
      </span>
      <span className="absolute -left-9 bottom-10 font-heading text-[2.125rem] font-semibold leading-none text-brand-sage/50" aria-hidden="true">
        +
      </span>
      <div className="relative rotate-1 rounded-[28px] bg-white shadow-[0_30px_60px_-30px_rgba(36,48,40,0.45),0_0_0_1px_var(--color-brand-line)] motion-reduce:rotate-0">
        <div className="px-[34px] pb-[26px] pt-[30px]">
          <div role="group" aria-label="Which visit" className="grid grid-cols-2 rounded-full bg-brand-wash p-[5px]">
            {tickets.map((option, index) => (
              <button
                key={option.name}
                type="button"
                aria-pressed={index === visit}
                onClick={() => setVisit(index)}
                className={`min-h-12 rounded-full text-[0.9375rem] font-semibold transition-colors duration-200 ${focusRing} ${
                  index === visit ? "bg-brand-sageDark text-white" : "text-brand-sageDeep hover:bg-white/60"
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>

          <div className="mt-[26px] flex items-baseline justify-between">
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">{ticket.tag}</span>
              <span className="mt-1 block font-heading text-[1.375rem] font-semibold text-brand-charcoal">{ticket.name}</span>
            </p>
            <p className="font-heading text-[1.875rem] font-semibold text-brand-charcoal">{ticket.price}</p>
          </div>

          <div className="mt-[26px]">
            <div className="flex items-baseline justify-between">
              <label htmlFor={sliderId} className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
                Travel
              </label>
              <p className="font-heading text-[1.875rem] font-semibold text-brand-charcoal" aria-live="polite">
                {band.fee}
              </p>
            </div>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={MAX_MILES}
              step={0.5}
              value={miles}
              onChange={(event) => setMiles(Number(event.target.value))}
              onPointerUp={report}
              onKeyUp={report}
              aria-valuetext={`${miles} miles: ${band.label}`}
              className="travel-range travel-range--light mt-3 w-full"
              style={{ "--p": `${pct}%` } as CSSProperties}
            />
            <div className="relative mt-1 h-4 text-[11px] text-brand-muted" aria-hidden="true">
              <span className="absolute left-0">0</span>
              <span className="absolute -translate-x-1/2" style={{ left: `${(FREE_UP_TO_MILES / MAX_MILES) * 100}%` }}>
                {FREE_UP_TO_MILES} mi
              </span>
              <span className="absolute -translate-x-1/2" style={{ left: `${(STANDARD_UP_TO_MILES / MAX_MILES) * 100}%` }}>
                {STANDARD_UP_TO_MILES} mi
              </span>
              <span className="absolute right-0">{MAX_MILES}+</span>
            </div>
            <p className="mt-2.5 text-sm leading-[1.5] text-brand-muted">
              {band.range}. Distance from your practitioner&rsquo;s base: {travelBases.bristol.label} in Bristol,{" "}
              {travelBases.southampton.label} in Southampton.
            </p>
          </div>
        </div>

        {/* Tear line with punched notches */}
        <div
          className="relative mx-6 border-t-2 border-dashed border-brand-line before:absolute before:-left-9 before:-top-3 before:h-[22px] before:w-[22px] before:rounded-full before:bg-brand-offwhite after:absolute after:-right-9 after:-top-3 after:h-[22px] after:w-[22px] after:rounded-full after:bg-brand-offwhite"
          aria-hidden="true"
        />

        <div className="px-[34px] pb-[30px] pt-[22px]">
          <div className="flex items-baseline justify-between">
            <p className="font-heading text-xl font-semibold text-brand-charcoal">Your visit</p>
            <p className="font-heading text-[4rem] font-bold leading-none tracking-[-0.03em] text-brand-sageDeep" aria-live="polite">
              {total}
            </p>
          </div>
          <p className="mt-1.5 text-right text-sm text-brand-muted">Always confirmed first.</p>
          <div className="mt-[22px] border-t border-brand-wash pt-5">
            <PostcodeChecker tone="plain" source="prices" placement="builder" label="Or check your postcode" />
          </div>
        </div>
      </div>
    </div>
  );
}
