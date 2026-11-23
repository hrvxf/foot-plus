"use client";

import { useEffect, useRef, useState } from "react";

import { locationFaqs } from "../../lib/locationFaqs";
import { focusRing, shell } from "../site/ui";

/**
 * Location page "Still wondering?": short question cards that flip to the answer when tapped. Phones swipe
 * through them (snap, with dots); desktop shows all four in a row. Reduced motion swaps faces without the
 * turn. Answers are always in the page, and the location page's FAQPage data uses the same list.
 */
export default function FaqFlipDeck({ id }: { id: string }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const [current, setCurrent] = useState(0);
  const deck = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = deck.current;
    if (!el) return;
    const onScroll = () => {
      const range = el.scrollWidth - el.clientWidth;
      setCurrent(range > 0 ? Math.round((el.scrollLeft / range) * (locationFaqs.length - 1)) : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = (index: number) =>
    setOpen((was) => {
      const next = new Set(was);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const face = "absolute inset-0 flex flex-col justify-center rounded-[20px] px-5 py-[18px] text-left [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

  return (
    <section id={id} className="scroll-mt-24 bg-white pb-[4.5rem] pt-14 text-center md:py-20" aria-labelledby={`${id}-heading`}>
      <div className={shell}>
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">Good to know</p>
        <h2
          id={`${id}-heading`}
          className="mt-3 font-heading text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal md:text-5xl"
        >
          Still <span className="text-brand-sage">wondering?</span>
        </h2>
      </div>

      <div
        ref={deck}
        className="mt-6 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-6 pb-3.5 pt-1 [scrollbar-width:none] md:mx-auto md:mt-10 md:grid md:max-w-[1200px] md:grid-cols-4 md:gap-4 md:overflow-visible md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {locationFaqs.map((faq, index) => {
          const flipped = open.has(index);
          return (
            <button
              key={faq.question}
              type="button"
              aria-expanded={flipped}
              onClick={() => toggle(index)}
              className={`h-[150px] w-[68%] flex-none snap-center rounded-[20px] [perspective:900px] md:h-[170px] md:w-auto ${focusRing}`}
            >
              <span
                className={`relative block h-full w-full transition-transform duration-[550ms] ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${
                  flipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                <span className={`${face} border border-brand-line bg-brand-offwhite`} aria-hidden={flipped}>
                  <span aria-hidden="true" className="absolute right-4 top-3 font-heading text-[1.375rem] font-semibold text-brand-sage">
                    +
                  </span>
                  <span className="pr-5 font-heading text-[1.1875rem] font-semibold leading-[1.2] tracking-[-0.01em] text-brand-charcoal">
                    {faq.short}
                  </span>
                </span>
                <span
                  className={`${face} bg-brand-sageDark text-[0.9375rem] leading-[1.45] text-white [transform:rotateY(180deg)]`}
                  aria-hidden={!flipped}
                >
                  {faq.answer}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-1.5 md:hidden" aria-hidden="true">
        {locationFaqs.map((faq, index) => (
          <span
            key={faq.question}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === current ? "w-[18px] bg-brand-sageDark" : "w-1.5 bg-brand-line"}`}
          />
        ))}
      </div>
      <p className="mt-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-sage md:mt-6">Tap a card to flip it</p>
    </section>
  );
}
