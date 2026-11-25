"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { homeServices } from "../../lib/home";
import { serviceDetails } from "../../lib/services";
import { focusRing } from "../site/ui";

/** The services-page summary for each home treatment, matched by its `#id` link. */
const summaries = homeServices.map(
  (service) => serviceDetails.find((detail) => service.href.endsWith(`#${detail.id}`))?.summary ?? "",
);

/**
 * Home "What we do": every treatment in large type, faded, with one lit (Diabetic foot care lights in sage).
 * Each line links to its entry on the services page.
 * - Phones and tablets: the line nearest the middle of the screen lights as you scroll. Reduced motion
 *   shows them all lit.
 * - Desktop (lg+ with a mouse): scrolling lights lines the same way, and the line you point at or tab to
 *   lights too. A panel beside the list shows the lit treatment's summary from the services page.
 */
export default function TreatmentSpotlight() {
  const list = useRef<HTMLUListElement>(null);
  // -1 = all lit (server, reduced motion); otherwise the index of the lit line.
  const [active, setActive] = useState(-1);
  const [desktop, setDesktop] = useState(false);
  // The treatment shown in the desktop panel.
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const decide = () => setDesktop(query.matches);
    decide();
    query.addEventListener("change", decide);
    return () => query.removeEventListener("change", decide);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No scroll lighting. On desktop, light the first treatment so the panel matches; pointing moves it.
      if (!desktop) return;
      const id = requestAnimationFrame(() => setActive(0));
      return () => cancelAnimationFrame(id);
    }
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
        const d = Math.abs(rect.top + rect.height / 2 - middle);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      // Nothing lit while the list is well off screen.
      const lit = distance < window.innerHeight * 0.4 ? best : -2;
      setActive(lit);
      if (desktop && lit >= 0) setShown(lit);
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [desktop]);

  const lastIndex = homeServices.length - 1;
  // Desktop: pointing at or tabbing to a line lights it until the next scroll.
  const pick = (index: number) => () => {
    if (!desktop) return;
    setActive(index);
    setShown(index);
  };

  return (
    <section className="bg-white pb-14 pt-4 md:pb-20 lg:py-24" aria-labelledby="what-heading">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <div>
          <h2 id="what-heading" className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
            What we do
          </h2>
          <ul ref={list} className="mt-4">
            {homeServices.map((service, index) => {
              const lit = active === -1 || active === index;
              const colour = !lit ? "text-brand-line" : index === lastIndex ? "text-brand-sage" : "text-brand-charcoal";
              return (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    onMouseEnter={pick(index)}
                    onFocus={pick(index)}
                    className={`inline-block py-1.5 font-heading text-[2.125rem] font-semibold leading-[1.12] tracking-[-0.025em] transition-[color,transform] duration-300 hover:text-brand-sageDeep md:text-5xl ${colour} ${active === index ? "translate-x-1.5" : ""} ${focusRing}`}
                  >
                    {service.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/services"
            className={`mt-6 inline-flex min-h-11 items-center text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark lg:hidden ${focusRing}`}
          >
            All in one home visit →
          </Link>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-32 mt-11 rounded-[24px] bg-brand-offwhite p-10">
            <p aria-hidden="true" className="font-heading text-[4rem] font-semibold leading-none text-brand-line">
              {String(shown + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-heading text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.02em] text-brand-charcoal">
              {homeServices[shown].title}
            </h3>
            <p className="mt-3.5 text-lg leading-[1.55] text-brand-muted">{summaries[shown]}</p>
            <Link
              href={homeServices[shown].href}
              className={`mt-6 inline-flex min-h-11 items-center text-base font-semibold text-brand-sageDeep hover:text-brand-charcoal ${focusRing}`}
            >
              More about {homeServices[shown].title.toLowerCase()} →
            </Link>
            <Link
              href="/services"
              className={`mt-7 flex min-h-11 items-center border-t border-brand-line pt-5 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark ${focusRing}`}
            >
              All in one home visit →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
