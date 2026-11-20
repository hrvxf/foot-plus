"use client";

import { useEffect, useRef, useState } from "react";
import { focusRing } from "../site/ui";

export type AreaGroup = {
  /** Anchor id. The old neighbourhood pages redirect to these (#north, #west…), so keep them stable. */
  id: string;
  /** Chip label, e.g. "North". */
  short: string;
  /** Heading, split into two lines: first line, then the sage line. */
  lines: [string, string];
  note?: string;
  places: string[];
};

/**
 * One swipeable card per part of Bristol, each listing its areas. Chips jump between cards. Every
 * place name is in the page as text, whichever card is showing. Arriving on #north (etc.) swipes to
 * that card and brings the deck into view.
 */
export default function AreaDeck({ groups }: { groups: AreaGroup[] }) {
  const deck = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (index: number, smooth = true) => {
    const el = deck.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: smooth ? "smooth" : "auto" });
    setActive(index);
  };

  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const index = groups.findIndex((group) => group.id === id);
      if (index < 0) return;
      window.requestAnimationFrame(() => {
        goTo(index, false);
        document.getElementById("areas")?.scrollIntoView({ block: "start" });
      });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = () => {
    const el = deck.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    setActive(Math.min(groups.length - 1, Math.round(el.scrollLeft / (first.offsetWidth + 12))));
  };

  return (
    <section id="areas" className="scroll-mt-24 pt-8" aria-labelledby="areas-heading">
      <h2 id="areas-heading" className="sr-only">
        Where we visit
      </h2>
      <div className="flex gap-1.5 overflow-x-auto px-[18px] pb-1 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {groups.map((group, index) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            aria-current={active === index ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              goTo(index);
            }}
            className={`shrink-0 rounded-full px-[15px] py-[9px] text-[0.84375rem] font-semibold transition-colors duration-300 ${focusRing} ${
              active === index
                ? "bg-brand-sageDark text-white"
                : "bg-white text-brand-sageDeep shadow-[0_0_0_1px_var(--color-brand-line)]"
            }`}
          >
            {group.short}
          </a>
        ))}
      </div>

      <div
        ref={deck}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[8%] pb-2 pt-4 [scrollbar-width:none] md:mx-auto md:max-w-[1200px] md:flex-wrap md:justify-center md:overflow-visible md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {groups.map((group, index) => {
          const green = index % 2 === 1;
          return (
            <article
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className={`relative min-h-[430px] w-[84vw] max-w-[380px] shrink-0 snap-center overflow-hidden rounded-[28px] px-6 py-7 md:w-[360px] md:min-h-0 ${
                green ? "bg-brand-sageDeep text-white" : "bg-white text-brand-charcoal shadow-[0_0_0_1px_var(--color-brand-line)]"
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${green ? "text-brand-sageLight" : "text-brand-sage"}`}>
                {group.places.length} areas
              </p>
              <h3
                id={`${group.id}-title`}
                className="mt-2.5 font-heading text-[2.125rem] font-bold leading-[1.02] tracking-[-0.025em]"
              >
                {group.lines[0]}
                <br />
                <span className={green ? "text-brand-sageLight" : "text-brand-sage"}>{group.lines[1]}</span>
              </h3>
              <ul className="mt-[18px] columns-2 gap-x-3.5">
                {group.places.map((place) => (
                  <li
                    key={place}
                    className={`break-inside-avoid border-t py-1.5 text-[0.96875rem] ${green ? "border-white/15" : "border-brand-line"}`}
                  >
                    {place}
                  </li>
                ))}
              </ul>
              {group.note ? (
                <p className={`mt-4 text-[0.8125rem] ${green ? "text-white/70" : "text-brand-muted"}`}>{group.note}</p>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="flex justify-center gap-1.5 py-3 md:hidden" aria-hidden="true">
        {groups.map((group, index) => (
          <span
            key={group.id}
            className={`h-1.5 rounded-full transition-all duration-400 ${index === active ? "w-5 bg-brand-sageDark" : "w-1.5 bg-brand-line"}`}
          />
        ))}
      </div>
    </section>
  );
}
