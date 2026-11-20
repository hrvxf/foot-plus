"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { stableViewportHeight } from "../../lib/stableViewport";
import Stars from "./Stars";

export type DeckReview = { name: string; when: string; rating: number; text: string; highlight?: string };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// Within each step the card moves, then rests, so every review gets a moment fully in view.
const settle = (f: number) => {
  const t = clamp((f - 0.15) / 0.7);
  return t * t * (3 - 2 * t);
};

function withHighlight(text: string, highlight?: string): ReactNode {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className="-mx-[3px] rounded-[3px] bg-brand-wash px-[3px] font-semibold text-brand-sageDeep [box-decoration-break:clone]">
        {highlight}
      </mark>
      {text.slice(at + highlight.length)}
    </>
  );
}

function Card({ review }: { review: DeckReview }) {
  return (
    <>
      <svg viewBox="0 0 32 24" className="h-5 w-7 shrink-0 text-brand-sage" aria-hidden="true">
        <path fill="currentColor" d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12H0zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12H19z" />
      </svg>
      <p className="mt-4 text-[1.0625rem] leading-[1.6] text-brand-charcoal">{withHighlight(review.text, review.highlight)}</p>
      <div className="mt-auto pt-5">
        <p className="font-semibold text-brand-sageDeep">{review.name}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.9375rem] text-brand-muted">
          <Stars rating={review.rating} />
          <span>{review.when}, on Google</span>
        </p>
      </div>
    </>
  );
}

const cardClass = "flex flex-col rounded-2xl bg-white p-6 shadow-[0_14px_34px_-18px_rgba(36,48,40,0.4)]";

/**
 * Phones and tablets: the reviews section pins in place and, as the visitor scrolls, each review slides up
 * and lands on top of the last like a dealt card. Reduced motion gets the same cards as a plain list.
 */
export default function ReviewsDeck({
  reviews,
  header,
  footer,
}: {
  reviews: DeckReview[];
  header: ReactNode;
  footer: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const steps = reviews.length - 1;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(reduce.matches);
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (still || steps < 1) return;
    let frame = 0;

    function fit() {
      // Every card takes the height of the tallest, so the pile stays square.
      const d = deck.current;
      if (!d) return;
      const cards = Array.from(d.children) as HTMLElement[];
      cards.forEach((card) => (card.style.height = "auto"));
      const tallest = Math.max(...cards.map((card) => card.offsetHeight));
      cards.forEach((card) => (card.style.height = `${tallest}px`));
      d.style.height = `${tallest}px`;
    }

    function render() {
      frame = 0;
      const t0 = track.current, s = stage.current, d = deck.current;
      if (!t0 || !s || !d) return;
      const header = document.querySelector("header");
      const top = header ? header.getBoundingClientRect().height : 64;
      const vh = stableViewportHeight();
      s.style.top = `${top}px`;
      s.style.height = `${vh - top}px`;
      t0.style.height = `${vh * (1 + steps * 0.6)}px`;
      const travel = t0.offsetHeight - (vh - top);
      const progress = clamp((top - t0.getBoundingClientRect().top) / travel) * steps;
      const index = Math.min(steps, Math.floor(progress));
      const position = index + settle(progress - index);
      const drop = d.parentElement ? d.parentElement.clientHeight : 600;

      (Array.from(d.children) as HTMLElement[]).forEach((card, k) => {
        const behind = position - k; // above 0: newer reviews sit on top of this one
        let y: number, scale: number, visible = true;
        if (behind <= -1) {
          y = drop;
          scale = 1;
          visible = false;
        } else if (behind < 0) {
          y = -behind * drop;
          scale = 1;
        } else {
          const depth = Math.min(behind, 3);
          y = -depth * 14;
          scale = 1 - depth * 0.05;
          visible = behind < 2.5;
        }
        card.style.transform = `translateY(${y}px) scale(${scale})`;
        card.style.visibility = visible ? "visible" : "hidden";
        card.style.zIndex = String(10 + k);
        card.style.filter = behind > 0 ? `brightness(${1 - Math.min(behind, 2) * 0.04})` : "none";
      });
      setActive(Math.round(position));
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const refit = () => {
      fit();
      schedule();
    };
    fit();
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refit);
    document.fonts?.ready.then(refit);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refit);
    };
  }, [still, steps]);

  if (still || steps < 1) {
    return (
      <div className="py-12">
        <div className="px-5 sm:px-8">{header}</div>
        <ul className="mt-6 grid gap-4 px-5 sm:px-8" aria-label="Recent Google reviews">
          {reviews.map((review) => (
            <li key={review.name + review.when} className={cardClass}>
              <Card review={review} />
            </li>
          ))}
        </ul>
        <div className="mt-6 px-5 sm:px-8">{footer}</div>
      </div>
    );
  }

  return (
    <div ref={track} style={{ height: `calc(100svh + ${steps * 60}svh)` }}>
      <div ref={stage} className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden pb-5 pt-8">
        <div className="px-5 sm:px-8">{header}</div>
        {/* Clipped, so a card being dealt rises from just above the buttons rather than over them. */}
        <div className="relative mt-2 flex min-h-0 flex-1 items-center overflow-hidden px-5 py-4 sm:px-8">
          <div ref={deck} className="relative w-full" role="list" aria-label="Recent Google reviews">
            {reviews.map((review) => (
              <div
                key={review.name + review.when}
                role="listitem"
                className={`${cardClass} absolute inset-x-0 top-0 origin-top will-change-transform`}
              >
                <Card review={review} />
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[0.8125rem] font-semibold text-brand-muted" aria-hidden="true">
          {active + 1} of {reviews.length}
        </p>
        <div className="mt-3 px-5 sm:px-8">{footer}</div>
      </div>
    </div>
  );
}
