"use client";

import { useEffect, useRef, useState } from "react";

import { stableViewportHeight } from "../../lib/stableViewport";
import { ChristmasAvailability } from "./ChristmasNotes";
import Snowfall from "./Snowfall";

const lines = ["No waiting rooms.", "No travelling.", "No rushing."];
const last = "Just good foot care, at home.";
// Height of the floating pill header on phones (12px + 60px pill + 12px).
const HEADER = 84;
const SCREENS = 3;

/**
 * Home hero: a statement that builds as you scroll. On phones the section pins and each line lights up in
 * turn, ending on the sage "Just good foot care, at home." Desktop and reduced motion show it all lit,
 * without pinning. The page's h1 is kept for search but visually hidden.
 */
export default function StatementHero() {
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState(0);
  // How many lines are lit; everything lit until the browser says otherwise.
  const [lit, setLit] = useState(lines.length + 1);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      setPinned(phone.matches && !reduce.matches);
      setHeight(stableViewportHeight());
    };
    decide();
    phone.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      phone.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const total = lines.length + 1;
    function render() {
      frame = 0;
      const t = track.current;
      if (!t) return;
      const rect = t.getBoundingClientRect();
      const travel = rect.height - (height - HEADER);
      const progress = Math.min(1, Math.max(0, (HEADER - rect.top) / travel));
      // The first line is lit on arrival; the rest arrive as you scroll.
      setLit(Math.min(total, 1 + Math.floor(progress * (total - 0.4))));
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [pinned, height]);

  // Unpinned (desktop, reduced motion): everything lit.
  const shown = pinned ? lit : lines.length + 1;
  const line = "block font-heading text-[2.875rem] font-semibold leading-[1.04] tracking-[-0.03em] transition-colors duration-500 md:text-7xl";

  return (
    <section aria-labelledby="home-heading" className="relative" data-page-hero>
      <h1 id="home-heading" className="sr-only">
        Toenail cutting and routine foot care, in your own home, in Bristol and Southampton.
      </h1>
      <div ref={track} style={pinned && height ? { height: SCREENS * (height - HEADER) } : undefined}>
        <div
          className={`relative overflow-hidden ${pinned ? "sticky top-[84px] flex flex-col justify-center" : "py-20 md:py-28"}`}
          style={pinned && height ? { height: height - HEADER } : undefined}
        >
          <Snowfall />
          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8">
            <p className="mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
              Foot+ · Home foot care
            </p>
            <p aria-label={[...lines, last].join(" ")}>
              {lines.map((text, index) => (
                <span key={text} aria-hidden="true" className={`${line} ${index < shown ? "text-brand-charcoal" : "text-brand-line"}`}>
                  {text}
                </span>
              ))}
              <span aria-hidden="true" className={`${line} ${shown > lines.length ? "text-brand-sage" : "text-brand-line"}`}>
                {last}
              </span>
            </p>
            <ChristmasAvailability />
          </div>
        </div>
      </div>
    </section>
  );
}
