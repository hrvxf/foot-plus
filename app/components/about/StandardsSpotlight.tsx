"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Foot+ standard: each title in large type, faded, with the one nearest the
 * middle of the screen lit and its line shown. Server render and reduced motion
 * show them all lit.
 */
export default function StandardsSpotlight({ standards }: { standards: { title: string; body: string }[] }) {
  const list = useRef<HTMLUListElement>(null);
  // -1 = all lit; -2 = none (list off screen); otherwise the lit index.
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    function render() {
      frame = 0;
      const items = list.current?.querySelectorAll("li");
      if (!items) return;
      const middle = window.innerHeight / 2;
      let best = -2;
      let distance = Infinity;
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const d = Math.abs(rect.top + 20 - middle);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      setActive(distance < window.innerHeight * 0.35 ? best : -2);
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <ul ref={list} className="mt-5">
      {standards.map((standard, index) => {
        const lit = active === -1 || active === index;
        return (
          <li key={standard.title} className="py-2.5">
            <h3
              className={`font-heading text-[1.625rem] font-semibold leading-[1.15] tracking-[-0.015em] transition-colors duration-400 md:text-4xl ${
                lit ? "text-brand-charcoal" : "text-brand-line"
              }`}
            >
              {standard.title}
            </h3>
            {/* Always in the layout (fixed height) so lighting a line never moves the others. */}
            <p
              className={`mx-auto mt-1 min-h-[2.9em] max-w-[34ch] text-[0.9375rem] leading-[1.45] text-brand-muted transition-opacity duration-400 ${
                lit ? "opacity-100" : "opacity-0"
              }`}
            >
              {standard.body}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
