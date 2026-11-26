"use client";

import { useEffect, useRef, useState } from "react";

import { stableViewportHeight } from "../../lib/stableViewport";
import { focusRing } from "../site/ui";

/** Header height (top-16): the pinned stage sits below it. */
const HEADER = 64;
/** How many screens of scrolling the three cards arrive over on phones. */
const SCREENS = 2.4;
/** Scroll progress at which each card arrives, and when the first card's light comes on. */
const ARRIVE = [0.04, 0.34, 0.64];
const LIGHT_ON = 0.18;

type Point = { title: string; text: string; icon: "light" | "people" | "clock" };

const points: Point[] = [
  { icon: "light", title: "Wherever they're comfortable", text: "Any room that feels right for them. We just ask for plenty of light." },
  { icon: "people", title: "Someone they know nearby", text: "For anyone who finds visits hard, we ask for a member of staff to be with them." },
  { icon: "clock", title: "No rush, ever", text: "We explain before we start. If today isn't the day, we stop and come back." },
];

function Icon({ name }: { name: Point["icon"] }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "light")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  if (name === "people")
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16.5" cy="9" r="2.5" />
        <path d="M2.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
        <path d="M14.5 15c.6-.2 1.3-.3 2-.3 2.6 0 4.5 2 4.5 4.8" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/**
 * Care settings page "Comfortable first. Feet second.": how a visit is shaped around the person. On phones the
 * section pins and the three cards rise in one at a time as you scroll; soon after the first arrives its light
 * comes on (a soft warm glow), a nod to "plenty of light". Desktop and reduced motion show all three at once,
 * lit. Every card stays in the page for screen readers and search; only opacity and position change.
 */
export default function ComfortStage({ id }: { id: string }) {
  const track = useRef<HTMLDivElement>(null);
  // Off until the browser confirms a phone without reduced motion, so the server render shows everything.
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState(0);
  const [shown, setShown] = useState(points.length);
  const [lit, setLit] = useState(true);
  // Desktop spotlight: the line lit by hover, focus or click.
  const [active, setActive] = useState(0);
  const activePoint = points[active];

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
    function render() {
      frame = 0;
      const t = track.current;
      if (!t) return;
      const rect = t.getBoundingClientRect();
      const travel = rect.height - (height - HEADER);
      const progress = Math.min(1, Math.max(0, (HEADER - rect.top) / travel));
      setShown(ARRIVE.filter((at) => progress > at).length);
      setLit(progress > LIGHT_ON);
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

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <div ref={track} style={pinned && height ? { height: SCREENS * (height - HEADER) } : undefined}>
        <div
          className={`mx-auto flex max-w-5xl flex-col px-[22px] text-center lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14 lg:px-8 lg:pt-[104px] lg:text-left ${pinned ? "sticky top-16 justify-center" : "pt-14 md:pt-20"}`}
          style={pinned && height ? { height: height - HEADER } : undefined}
        >
          <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-care-deep lg:hidden">Their visit, their way</p>
          <h2
            id={`${id}-heading`}
            className="mt-2.5 font-heading text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[2.5rem] lg:mt-0 lg:text-5xl"
          >
            Comfortable first. <span className="text-care-accent">Feet second.</span>
          </h2>
          <ul className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2.5 text-left md:mt-10 md:grid md:max-w-none md:grid-cols-3 md:gap-4 lg:hidden">
            {points.map((point, index) => {
              // Unpinned (desktop, reduced motion, server render): everything shown and lit.
              const here = !pinned || index < shown;
              const glow = point.icon === "light" && (!pinned || lit);
              return (
                <li
                  key={point.title}
                  className={`flex gap-4 rounded-[24px] p-5 transition-[opacity,transform,background-color,box-shadow] duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)] md:flex-col md:p-6 ${
                    here ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-[0.97] opacity-0"
                  } ${
                    glow
                      ? "bg-[#FFFBF1] shadow-[0_0_0_1px_#F1E3C2,0_10px_30px_rgba(227,170,51,0.16)]"
                      : "bg-white shadow-[0_0_0_1px_var(--color-care-line)]"
                  }`}
                >
                  <span
                    className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-[background-color,box-shadow,color] duration-700 ${
                      glow ? "bg-[#FFF0CC] text-[#A87412] shadow-[0_0_18px_4px_rgba(237,190,79,0.45)]" : "text-care-accent"
                    }`}
                  >
                    <Icon name={point.icon} />
                  </span>
                  <div>
                    <h3 className="font-heading text-[1.0625rem] font-semibold">{point.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-[1.5] text-care-muted">{point.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop: a spotlight list; the panel beside it shows the lit line. */}
          <ul className="mt-7 hidden lg:block">
            {points.map((point, index) => (
              <li key={point.title}>
                <button
                  type="button"
                  aria-pressed={index === active}
                  aria-controls={`${id}-panel`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`block py-3 text-left font-heading text-[2.125rem] font-semibold xl:text-[2.5rem] leading-[1.12] tracking-[-0.025em] transition-[color,transform] duration-300 motion-reduce:transition-none ${focusRing} ${
                    index === active ? "translate-x-1.5 text-care-ink" : "text-[#C5D4DD] hover:text-care-muted"
                  }`}
                >
                  {point.title}
                </button>
              </li>
            ))}
          </ul>
          </div>

          <div
            id={`${id}-panel`}
            aria-live="polite"
            className="hidden rounded-[32px] bg-white px-10 py-11 shadow-[0_0_0_1px_var(--color-care-line),0_30px_60px_-40px_rgba(31,44,53,0.4)] lg:block"
          >
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-[20px] transition-colors duration-300 ${
                activePoint.icon === "light"
                  ? "bg-[#FFF0CC] text-[#A87412] shadow-[0_0_24px_6px_rgba(237,190,79,0.35)]"
                  : "bg-care-mist text-care-deep"
              }`}
            >
              <Icon name={activePoint.icon} />
            </span>
            <h3 className="mt-6 font-heading text-[1.75rem] font-semibold tracking-[-0.02em]">{activePoint.title}</h3>
            <p className="mt-3 text-[1.1875rem] leading-[1.55] text-care-muted">{activePoint.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
