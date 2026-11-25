"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Foot+ standard: each title in large type, faded, with the one nearest the
 * middle of the screen lit and its line shown. On desktop, pointing at a line
 * lights it as well. Server render and reduced motion show them all lit.
 */
export default function StandardsSpotlight({
  standards,
  ordered = false,
}: {
  /** body is optional: without it, each line is just the title (e.g. "What's included" on the nail pages). */
  standards: { title: string; body?: string }[];
  ordered?: boolean;
}) {
  const list = useRef<HTMLOListElement & HTMLUListElement>(null);
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

  const List = ordered ? "ol" : "ul";
  return (
    <List ref={list} className="mt-5">
      {standards.map((standard, index) => {
        const lit = active === -1 || active === index;
        // Lines with a body are headings (the standards); plain lines are list text.
        const Title = standard.body ? "h3" : "span";
        return (
          <li
            key={standard.title}
            className="py-2.5"
            // Desktop: pointing at a line lights it too, until the next scroll.
            onMouseEnter={() => {
              if (window.matchMedia("(min-width: 1024px) and (hover: hover)").matches) setActive(index);
            }}
          >
            <Title
              className={`block font-heading text-[1.625rem] font-semibold leading-[1.15] tracking-[-0.015em] transition-colors duration-400 md:text-4xl ${
                lit ? "text-brand-charcoal" : "text-brand-line"
              }`}
            >
              {standard.title}
            </Title>
            {/* Always in the layout (fixed height) so lighting a line never moves the others. */}
            {standard.body ? (
              <p
                className={`mx-auto mt-1 min-h-[2.9em] max-w-[34ch] text-[0.9375rem] leading-[1.45] text-brand-muted transition-opacity duration-400 ${
                  lit ? "opacity-100" : "opacity-0"
                }`}
              >
                {standard.body}
              </p>
            ) : null}
          </li>
        );
      })}
    </List>
  );
}
