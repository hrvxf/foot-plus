"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceDetail } from "../../lib/services";
import { focusRing } from "../site/ui";

type Group = "nails" | "skin";
const groups: { key: Group; label: string }[] = [
  { key: "nails", label: "Nails" },
  { key: "skin", label: "Skin" },
];

/**
 * Nails / Skin toggle over a swipeable deck of treatment cards (phones), or a
 * grid (desktop). Both sets stay in the page so /services#corns and friends
 * still land: a hash for a skin treatment switches to Skin and brings that
 * card into view.
 */
export default function ServiceDeck({ services }: { services: ServiceDetail[] }) {
  const [group, setGroup] = useState<Group>("nails");
  const [shown, setShown] = useState<Group>("nails");
  const [fading, setFading] = useState(false);
  const [active, setActive] = useState(0);
  const decks = useRef<Record<Group, HTMLDivElement | null>>({ nails: null, skin: null });

  const sets: Record<Group, ServiceDetail[]> = {
    nails: services.filter((s) => s.group === "nails"),
    skin: services.filter((s) => s.group === "skin"),
  };

  // Fade the current set out, swap, fade back in.
  useEffect(() => {
    if (group === shown) return;
    const timer = window.setTimeout(() => {
      setShown(group);
      setActive(0);
      setFading(false);
      const deck = decks.current[group];
      if (deck) deck.scrollLeft = 0;
    }, 250);
    return () => window.clearTimeout(timer);
  }, [group, shown]);

  const choose = (next: Group) => {
    if (next === group) return;
    setFading(true);
    setGroup(next);
  };

  // Arriving on /services#<treatment>.
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const service = services.find((s) => s.id === id);
      if (!service || service.group === "check") return;
      const g = service.group as Group;
      setGroup(g);
      setShown(g);
      setFading(false);
      window.requestAnimationFrame(() => {
        const card = document.getElementById(id);
        const deck = decks.current[g];
        if (card && deck) {
          deck.scrollLeft = card.offsetLeft - (deck.clientWidth - card.offsetWidth) / 2;
          setActive(sets[g].findIndex((s) => s.id === id));
          document.getElementById("treatments")?.scrollIntoView({ block: "start" });
        }
      });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = (g: Group) => {
    const deck = decks.current[g];
    const first = deck?.firstElementChild as HTMLElement | null;
    if (!deck || !first) return;
    setActive(Math.round(deck.scrollLeft / (first.offsetWidth + 12)));
  };

  return (
    <div id="treatments" className="scroll-mt-24">
      <div role="group" aria-label="Show treatments for" className="relative mx-auto flex w-[220px] rounded-full bg-brand-wash p-1">
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-brand-sageDark transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: group === "skin" ? "translateX(100%)" : "none" }}
        />
        {groups.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            aria-pressed={group === key}
            onClick={() => choose(key)}
            className={`relative h-[42px] flex-1 rounded-full font-semibold transition-colors duration-300 ${focusRing} ${
              group === key ? "text-white" : "text-brand-sageDeep"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={`transition-opacity duration-300 motion-reduce:transition-none ${fading ? "opacity-0" : "opacity-100"}`}>
        {groups.map(({ key, label }) => (
          <div key={key} hidden={shown !== key}>
            <div
              ref={(el) => {
                decks.current[key] = el;
              }}
              onScroll={() => onScroll(key)}
              aria-label={`${label} treatments`}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[9%] pb-2 pt-7 [scrollbar-width:none] md:mx-auto md:max-w-[1200px] md:flex-wrap md:justify-center md:gap-4 md:overflow-visible md:px-8 md:pb-16 [&::-webkit-scrollbar]:hidden"
            >
              {sets[key].map((service, index) => (
                <article
                  key={service.id}
                  id={service.id}
                  aria-labelledby={`${service.id}-title`}
                  className="flex min-h-[300px] w-[82vw] max-w-[360px] shrink-0 snap-center flex-col rounded-[28px] bg-white p-6 pt-7 shadow-[0_0_0_1px_var(--color-brand-line)] md:w-[340px] md:max-w-none"
                >
                  <span className="font-heading text-[4rem] font-bold leading-none text-brand-wash" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    id={`${service.id}-title`}
                    className="mt-2.5 font-heading text-[1.75rem] font-bold leading-[1.08] tracking-[-0.02em] text-brand-charcoal"
                  >
                    {service.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-base leading-[1.55] text-brand-muted">{service.summary}</p>
                  <Link
                    href={service.link.href}
                    className={`mt-4 inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg font-semibold text-brand-sageDeep ${focusRing}`}
                  >
                    {service.link.label} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
            <div className="flex justify-center gap-1.5 pb-9 pt-3.5 md:hidden" aria-hidden="true">
              {sets[key].map((service, index) => (
                <span
                  key={service.id}
                  className={`h-1.5 rounded-full transition-all duration-400 ${index === active ? "w-5 bg-brand-sageDark" : "w-1.5 bg-brand-line"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
