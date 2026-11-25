"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { stableViewportHeight } from "../../lib/stableViewport";
import { ChristmasAvailability } from "./ChristmasNotes";
import Snowfall from "./Snowfall";

const lines = ["No waiting rooms.", "No travelling.", "No rushing."];
const last = "Just good foot care, at home.";
// Height of the floating pill header on phones (12px + 60px pill + 12px).
const HEADER = 84;
// Bottom edge of the pill itself; text passing above this fades out.
const PILL_BOTTOM = 72;
const FADE = 48;
// Scroll needed to light the remaining lines, as a share of the screen (about a quarter per line).
const TRAVEL = 0.75;
// Space left between the statement and the card that follows.
const GAP = 8;

/**
 * Home hero: a statement that builds as you scroll. The section pins and each line lights up in turn, ending
 * on the sage "Just good foot care, at home." Reduced motion shows it all lit, without pinning. On phones the
 * statement sits near the top rather than centred, so the first line, not empty cream, is what shows under
 * the header (the sticky phone bar covers the foot of the screen); from lg up it's centred, with `aside`
 * (the practitioners and postcode check) beside it in a second column. The next section rises over the
 * empty lower part of the pinned screen, so it lands just under the statement as the last line lights, with
 * no blank stretch. Text fades as it scrolls up under the pill header. The page's h1 is kept for search but
 * visually hidden.
 */
export default function StatementHero({ aside }: { aside?: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState(0);
  // Bottom of the statement, measured from the top of the pinned screen.
  const [contentBottom, setContentBottom] = useState(0);
  // How many lines are lit; everything lit until the browser says otherwise.
  const [lit, setLit] = useState(lines.length + 1);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      setPinned(!reduce.matches);
      setHeight(stableViewportHeight());
    };
    decide();
    reduce.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      reduce.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    const el = content.current;
    if (!pinned || !el) return;
    const measure = () => setContentBottom(el.offsetTop + el.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pinned]);

  useEffect(() => {
    const faded = content.current;
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
      // Fade whatever has scrolled up under the pill header.
      const c = content.current;
      if (c) {
        const edge = PILL_BOTTOM - c.getBoundingClientRect().top;
        const mask = edge > -FADE ? `linear-gradient(to bottom, transparent ${edge}px, #000 ${edge + FADE}px)` : "";
        c.style.maskImage = mask;
        c.style.webkitMaskImage = mask;
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      if (faded) {
        faded.style.maskImage = "";
        faded.style.webkitMaskImage = "";
      }
    };
  }, [pinned, height]);

  const stage = height - HEADER;
  const sized = pinned && height > 0;
  // Pull the next section up over the empty lower part of the pinned screen.
  const overlap = sized && contentBottom ? Math.max(0, stage - contentBottom - GAP) : 0;

  // Unpinned (reduced motion): everything lit.
  const shown = pinned ? lit : lines.length + 1;
  const line = "block font-heading text-[2.875rem] font-semibold leading-[1.04] tracking-[-0.03em] transition-colors duration-500 md:text-7xl lg:text-[3.5rem] xl:text-[4.25rem]";

  return (
    <section
      aria-labelledby="home-heading"
      className="relative"
      data-page-hero
      style={overlap ? { marginBottom: -overlap } : undefined}
    >
      <h1 id="home-heading" className="sr-only">
        Toenail cutting and routine foot care, in your own home, in Bristol and Southampton.
      </h1>
      <div ref={track} style={sized ? { height: stage + Math.round(TRAVEL * stage) } : undefined}>
        <div
          data-hero-stage
          className={`relative overflow-hidden ${pinned ? "sticky top-[84px] flex flex-col justify-start pt-10 lg:justify-center lg:pt-0" : "pt-10 pb-16 md:pt-20 md:pb-24"}`}
          style={sized ? { height: stage } : undefined}
        >
          <Snowfall />
          <div
            ref={content}
            className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14"
          >
            <div>
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
            {aside}
          </div>
        </div>
      </div>
    </section>
  );
}
