"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { focusRing } from "../site/ui";

export type VisitStep = { title: string; text: string };

/** "How a visit goes" as swipeable cards, with arrows and dots. */
export default function VisitDeck({ steps }: { steps: VisitStep[] }) {
  const deck = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const current = useCallback(() => {
    const el = deck.current;
    if (!el) return 0;
    const centre = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let distance = Infinity;
    Array.from(el.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const gap = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
      if (gap < distance) {
        distance = gap;
        best = index;
      }
    });
    return best;
  }, []);

  useEffect(() => {
    const el = deck.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(current()));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [current]);

  const go = (direction: number) => {
    const el = deck.current;
    if (!el) return;
    const index = Math.max(0, Math.min(steps.length - 1, current() + direction));
    const card = el.children[index] as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      <ol
        ref={deck}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[22px] pb-2 pt-6 [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="w-[80%] min-w-0 max-w-[340px] shrink-0 snap-center rounded-[26px] bg-white px-[22px] py-[26px] text-left shadow-[0_0_0_1px_var(--color-care-line)] md:w-[260px]"
          >
            <p className="text-[0.8125rem] font-bold tracking-[0.2em] text-care-deep">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2.5 font-heading text-[1.3125rem] font-semibold tracking-[-0.01em] text-care-ink">{step.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-[1.6] text-care-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-3.5 flex items-center justify-center gap-2.5 md:hidden">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous step"
          className={`h-11 w-11 rounded-full bg-white text-care-deep shadow-[0_0_0_1px_var(--color-care-line)] ${focusRing}`}
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="flex gap-1.5" aria-hidden="true">
          {steps.map((step, index) => (
            <span
              key={step.title}
              className={`h-[7px] rounded-full transition-all duration-300 ${index === active ? "w-5 bg-care-deep" : "w-[7px] bg-care-line"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next step"
          className={`h-11 w-11 rounded-full bg-white text-care-deep shadow-[0_0_0_1px_var(--color-care-line)] ${focusRing}`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
