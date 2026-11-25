"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { ServiceDetail } from "../../lib/services";
import { trackAdviceEvent } from "../advice/AdviceTracker";
import { focusRing, texturedGreen } from "../site/ui";

const groups = [
  { key: "nails", label: "Nails" },
  { key: "skin", label: "Skin" },
] as const;

/**
 * Desktop only (lg+) version of the services deck, in the style of the home page's "What we do": every
 * nail and skin treatment in large type, faded, with one lit. Scrolling lights the line nearest the middle
 * of the screen, and pointing at or tabbing to a line lights it too. A green card beside the list shows the
 * lit treatment's number, summary and link. A #treatment-id in the address (from home or treatment pages)
 * lights that treatment and scrolls here. Phones and tablets keep `ServiceDeck`.
 */
export default function ServiceSpotlight({ services }: { services: ServiceDetail[] }) {
  const list = services.filter((service) => service.group === "nails" || service.group === "skin");
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // After jumping to a linked treatment, scroll lighting waits a moment so it doesn't replace it.
  const holdUntil = useRef(0);

  // Arriving with a treatment's #id, or following one on this page: light it and bring the list into view.
  useEffect(() => {
    const open = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const index = list.findIndex((service) => `#${service.id}` === window.location.hash);
      if (index < 0) return;
      requestAnimationFrame(() => {
        holdUntil.current = Date.now() + 800;
        setActive(index);
        section.current?.scrollIntoView({ block: "start" });
      });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
    // Set up once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    if (!desktop.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    function render() {
      frame = 0;
      if (Date.now() < holdUntil.current) return;
      const items = section.current?.querySelectorAll("li[data-index]");
      if (!items) return;
      const middle = window.innerHeight / 2;
      let best = -1;
      let distance = Infinity;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height / 2 - middle);
        if (d < distance) {
          distance = d;
          best = Number((item as HTMLElement).dataset.index);
        }
      });
      // Leave the last lit line alone while the list is well off screen.
      if (best >= 0 && distance < window.innerHeight * 0.4) setActive(best);
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  const current = list[active];
  if (!current) return null;
  const currentGroup = groups.find((group) => group.key === current.group)?.label ?? "";

  return (
    <section
      ref={section}
      id="treatments-desktop"
      aria-label="Treatments"
      className="hidden scroll-mt-24 bg-white px-8 py-[88px] lg:block"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-14">
        <div>
          {groups.map((group, groupIndex) => (
            <div key={group.key} className={groupIndex > 0 ? "mt-9" : ""}>
              <h2 className="mb-2 text-[0.8125rem] font-semibold uppercase tracking-[0.24em] text-brand-sageDark">{group.label}</h2>
              <ul>
                {list.map((service, index) =>
                  service.group === group.key ? (
                    <li key={service.id} data-index={index}>
                      <Link
                        href={service.link.href}
                        onMouseEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        onClick={() => trackAdviceEvent("service_click", { service_id: service.id, group: group.key })}
                        className={`inline-block py-1.5 font-heading text-[2.625rem] font-semibold leading-[1.12] tracking-[-0.025em] transition-[color,transform] duration-300 ${
                          index === active ? "translate-x-1.5 text-brand-charcoal" : "text-brand-line hover:text-brand-sageDeep"
                        } ${focusRing}`}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <div className={`sticky top-32 mt-9 rounded-[28px] p-10 text-white ${texturedGreen}`}>
            <p className="flex items-baseline justify-between">
              <span aria-hidden="true" className="font-heading text-[4.5rem] font-bold leading-none text-white/25">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#A8E6B8]">{currentGroup}</span>
            </p>
            <h3 className="mt-5 font-heading text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.02em]">{current.title}</h3>
            <p className="mt-3.5 text-lg leading-[1.55] text-white/88">{current.summary}</p>
            <Link
              href={current.link.href}
              onClick={() => trackAdviceEvent("service_click", { service_id: current.id, group: current.group })}
              className={`mt-6 inline-flex min-h-12 items-center gap-1.5 rounded-full bg-white px-[22px] font-semibold text-brand-sageDeep transition-colors hover:bg-brand-offwhite ${focusRing}`}
            >
              {current.link.label} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
