"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { focusRing, supporting } from "../site/ui";

export type RotatingReviewItem = { quote: string; name: string; month: string };

const INTERVAL_MS = 7000;

/**
 * Home page proof line: one short review at a time, fading to the next every
 * few seconds. All quotes sit in the same grid cell so the strip is always as
 * tall as the longest one and never jumps. Pauses while hovered or focused,
 * has a pause button (needed for anything that moves on its own for more than
 * five seconds), and stays on the first quote for people who prefer reduced motion.
 */
export default function RotatingReview({ items, className }: { items: RotatingReviewItem[]; className?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const rotating = items.length > 1 && !reducedMotion;

  useEffect(() => {
    if (!rotating || paused || held) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % items.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, paused, held, active, items.length]);

  if (!items.length) return null;

  return (
    <div
      className={className}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="grid">
        {items.map((item, index) => {
          const shown = index === active;
          return (
            <figure
              key={item.name + item.month}
              aria-hidden={!shown}
              className={`col-start-1 row-start-1 transition-opacity duration-700 motion-reduce:transition-none ${
                shown ? "opacity-100" : "invisible opacity-0"
              }`}
            >
              <blockquote className="font-heading text-xl font-semibold leading-[1.4] text-brand-sageDeep md:text-[1.375rem]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className={`${supporting} mt-2`}>
                {item.name}, {item.month}, on Google
              </figcaption>
            </figure>
          );
        })}
      </div>

      {rotating ? (
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play reviews" : "Pause reviews"}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-charcoal/20 text-brand-sageDeep hover:border-brand-sageDeep ${focusRing}`}
          >
            {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
          <div className="flex items-center gap-2" aria-hidden="true">
            {items.map((item, index) => (
              <span
                key={item.name + item.month}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === active ? "w-5 bg-brand-sageDeep" : "w-1.5 bg-brand-charcoal/25"
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
