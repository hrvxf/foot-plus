"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { formatReviewMonth, type Review } from "../../lib/reviews";
import { focusRing } from "../site/ui";
import Stars from "./Stars";

const INTERVAL_MS = 7000;

/**
 * Booking page review card: one review at a time, fading to the next, like the
 * home page proof line (../home/RotatingReview.tsx). All reviews share one grid
 * cell so the card stays as tall as the longest and never jumps. Pauses while
 * hovered or focused, has a pause button, and stays on the first review for
 * people who prefer reduced motion.
 */
export default function RotatingReviewCard({ reviews, className }: { reviews: Review[]; className?: string }) {
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

  const rotating = reviews.length > 1 && !reducedMotion;

  useEffect(() => {
    if (!rotating || paused || held) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % reviews.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, paused, held, active, reviews.length]);

  if (!reviews.length) return null;

  return (
    <div
      className={`rounded-3xl border border-brand-line bg-white/70 p-5 sm:p-6 ${className ?? ""}`}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="grid">
        {reviews.map((review, index) => {
          const shown = index === active;
          return (
            <figure
              key={review.name + review.month}
              aria-hidden={!shown}
              className={`col-start-1 row-start-1 transition-opacity duration-700 motion-reduce:transition-none ${
                shown ? "opacity-100" : "invisible opacity-0"
              }`}
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-3 text-[15.5px] leading-relaxed text-brand-charcoal">
                &ldquo;{review.excerpt ?? review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm text-brand-muted">
                <span className="font-semibold text-brand-sageDeep">{review.name}</span> ·{" "}
                {formatReviewMonth(review.month)} · Google
              </figcaption>
            </figure>
          );
        })}
      </div>

      {rotating ? (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play reviews" : "Pause reviews"}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-charcoal/20 text-brand-sageDeep hover:border-brand-sageDeep ${focusRing}`}
          >
            {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
          <div className="flex items-center gap-2" aria-hidden="true">
            {reviews.map((review, index) => (
              <span
                key={review.name + review.month}
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
