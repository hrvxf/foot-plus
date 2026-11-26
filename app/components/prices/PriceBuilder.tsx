"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";

import { trackAdviceEvent } from "../advice/AdviceTracker";
import { focusRing } from "../site/ui";
import { serviceLocations } from "../../lib/locations";
import { checkServiceArea } from "../../lib/postcodes";
import {
  FREE_UP_TO_MILES,
  STANDARD_UP_TO_MILES,
  estimateTravel,
  lookupPostcode,
  travelBandFor,
  travelBands,
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
  const [pop, setPop] = useState(0);
  const lastReported = useRef<number | null>(null);
  const glide = useRef(0);

  useEffect(() => () => cancelAnimationFrame(glide.current), []);

  /** A postcode was checked: glide the slider to its distance, then pop the fee and total. */
  const glideTo = (target: number) => {
    cancelAnimationFrame(glide.current);
    const to = Math.min(MAX_MILES, Math.round(target * 10) / 10);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMiles(to);
      return;
    }
    const from = miles;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const eased = 1 - Math.pow(1 - t, 3);
      setMiles(Math.round((from + (to - from) * eased) * 10) / 10);
      if (t < 1) glide.current = requestAnimationFrame(step);
      else setPop((n) => n + 1);
    };
    glide.current = requestAnimationFrame(step);
  };

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
              <p key={`fee-${pop}`} className={`font-heading text-[1.875rem] font-semibold text-brand-charcoal ${pop ? "price-pop" : ""}`} aria-live="polite">
                {band.fee}
              </p>
            </div>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={MAX_MILES}
              step={0.1}
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
            <p
              key={`total-${pop}`}
              className={`origin-right font-heading text-[4rem] font-bold leading-none tracking-[-0.03em] text-brand-sageDeep ${pop ? "price-pop" : ""}`}
              aria-live="polite"
            >
              {total}
            </p>
          </div>
          <div className="mt-[22px] border-t border-brand-wash pt-5">
            <ReceiptPostcode onDistance={glideTo} />
          </div>
        </div>
      </div>
    </div>
  );
}

type Check =
  | { state: "idle" }
  | { state: "checking"; postcode: string }
  | { state: "message"; text: string }
  | { state: "found"; text: string; href: string };

/**
 * The receipt's postcode check. It never changes the card's size: the answer is one line in the
 * label's place, the slider moves to the distance, and the button becomes "Request a visit".
 */
function ReceiptPostcode({ onDistance }: { onDistance: (miles: number) => void }) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const [check, setCheck] = useState<Check>({ state: "idle" });
  const lookup = useRef<AbortController | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    lookup.current?.abort();
    const area = checkServiceArea(value);
    if (area.status === "invalid") {
      setCheck({ state: "message", text: "Enter a full UK postcode." });
      return;
    }
    setValue(area.postcode);
    const params = { result: area.status, outward_code: area.postcode.split(" ")[0], placement: "builder" };
    if (area.status === "outside") {
      setCheck({ state: "message", text: `We don\u2019t visit ${area.postcode} yet.` });
      trackAdviceEvent("prices_postcode_check", params);
      return;
    }

    const controller = new AbortController();
    lookup.current = controller;
    setCheck({ state: "checking", postcode: area.postcode });
    const point = await lookupPostcode(area.postcode, controller.signal);
    if (controller.signal.aborted) return;
    const estimate = point ? estimateTravel(point.lat, point.lng, area.status) : null;
    trackAdviceEvent("prices_postcode_check", { ...params, travel_band: estimate?.band ?? "unknown" });

    const location = serviceLocations[area.status];
    const href = `/book?location=${location.slug}&postcode=${encodeURIComponent(area.postcode)}`;
    if (!estimate) {
      setCheck({ state: "found", text: `${area.postcode} is in the ${location.displayName} area.`, href });
      return;
    }
    // Beyond the £5 band a visit is by arrangement, so don't promise it outright.
    const byArrangement = estimate.band === "extended" && !estimate.borderline;
    setCheck({
      state: "found",
      text: byArrangement ? `We may be able to visit ${area.postcode}.` : `Yes, we visit ${area.postcode}.`,
      href,
    });
    onDistance(estimate.roadMiles);
  }

  const answer =
    check.state === "checking" ? `Checking ${check.postcode}\u2026` : check.state === "idle" ? "" : check.text;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="relative h-6">
        <label
          htmlFor={inputId}
          className={`absolute inset-0 text-[0.9375rem] font-semibold text-brand-charcoal transition-opacity duration-200 ${
            check.state === "idle" ? "" : "opacity-0"
          }`}
        >
          Or check your postcode
        </label>
        <p
          aria-live="polite"
          className={`absolute inset-0 flex items-center gap-1.5 truncate text-[0.9375rem] font-semibold ${
            check.state === "found" ? "text-brand-sageDeep" : "text-brand-charcoal"
          }`}
        >
          {check.state === "found" ? (
            <span className="price-pop inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sage text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
          ) : null}
          {answer}
        </p>
      </div>
      <div className="mt-2.5 flex gap-2.5">
        <input
          id={inputId}
          name="postcode"
          type="text"
          autoComplete="postal-code"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="Your postcode"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (check.state !== "idle") {
              lookup.current?.abort();
              setCheck({ state: "idle" });
            }
          }}
          className="h-14 min-w-0 flex-1 rounded-md border-[1.5px] border-brand-muted bg-white px-4 text-lg font-medium tracking-wide text-brand-charcoal placeholder:font-normal placeholder:tracking-normal placeholder:text-brand-muted focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
        />
        {check.state === "found" ? (
          <Link
            href={check.href}
            data-analytics-id="prices-builder-postcode-book"
            className={`inline-flex h-14 w-[13rem] shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-sageDark text-lg font-semibold text-white transition-colors hover:bg-brand-sageDeep ${focusRing}`}
          >
            Request a visit
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="submit"
            className={`inline-flex h-14 w-[13rem] shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-sageDark text-lg font-semibold text-white transition-colors hover:bg-brand-sageDeep ${focusRing}`}
          >
            Check postcode
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}
