"use client";

import { useEffect, useRef, useState } from "react";
import { focusRing } from "../site/ui";

/**
 * Sticky "jump to" chips for an advice article. The chip for the section being read is filled, and the row
 * scrolls itself so that chip stays in view. Plain anchor links, so it works before JavaScript loads.
 */
export default function AdviceJumpBar({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const row = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;
    const render = () => {
      frame = 0;
      // A section counts as "being read" once its top passes ~40% of the way down the screen.
      const line = window.innerHeight * 0.4;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < line) current = item.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [items]);

  // Keep the active chip in view within the horizontally scrolling row.
  useEffect(() => {
    const el = row.current;
    const chip = el?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!el || !chip) return;
    el.scrollTo({ left: chip.offsetLeft - el.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[calc(env(safe-area-inset-top)+84px)] z-20 mt-2 bg-brand-offwhite/90 py-2 backdrop-blur-md lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:top-32 lg:mt-14 lg:bg-transparent lg:py-0 lg:backdrop-blur-none"
    >
      <p className="mb-3 hidden text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark lg:block">On this page</p>
      <ul
        ref={row}
        className="mx-auto flex max-w-2xl gap-1.5 overflow-x-auto px-[18px] [scrollbar-width:none] md:flex-wrap md:justify-center lg:mx-0 lg:max-w-none lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              data-id={item.id}
              aria-current={active === item.id ? "true" : undefined}
              className={`block rounded-full px-[13px] py-2 text-[0.78125rem] font-semibold transition-colors duration-300 lg:rounded-none lg:border-l-2 lg:bg-transparent lg:px-4 lg:py-2.5 lg:text-[0.9375rem] lg:shadow-none ${focusRing} ${
                active === item.id
                  ? "bg-brand-sageDark text-white lg:border-brand-sageDark lg:text-[#2F3D35]"
                  : "bg-white text-brand-sageDeep shadow-[0_0_0_1px_var(--color-brand-line)] lg:border-brand-line lg:font-medium lg:text-brand-muted lg:hover:text-[#2F3D35]"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
