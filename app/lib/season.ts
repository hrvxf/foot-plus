"use client";

import { useSyncExternalStore } from "react";

/**
 * Seasonal touches (Christmas 2026). Each one switches itself on and off by date,
 * so nothing needs removing by hand. Dates are inclusive and in UK time.
 *
 * Preview any time with ?season=christmas on the URL.
 */
export const christmas = {
  /** Light snow in the home hero. */
  snow: { from: "2026-12-01", to: "2027-01-06" },
  /** "Last visits / back from" note in the home hero. Ends the day before visits resume. */
  availability: { from: "2026-12-01", to: "2026-12-28" },
  availabilityText: "Christmas: last visits Wednesday 23 December, back Tuesday 29 December.",
  /** Seasonal version of the hero checker's helper line. */
  helper: { from: "2026-12-01", to: "2026-12-23" },
  helperText: "Visiting family this Christmas? Book a visit for Mum or Dad using their postcode.",
};

type Window = { from: string; to: string };

function ukToday() {
  // en-CA gives YYYY-MM-DD, which compares correctly as a string.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
}

function previewing() {
  return new URLSearchParams(window.location.search).get("season") === "christmas";
}

/**
 * True while today falls inside the window. Always false on the server, so the
 * static page never bakes in a date; the browser decides after hydration.
 */
export function useSeason(range: Window) {
  return useSyncExternalStore(
    noSubscribe,
    () => previewing() || (ukToday() >= range.from && ukToday() <= range.to),
    () => false,
  );
}

const noSubscribe = () => () => {};
