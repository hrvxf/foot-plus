"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { homeServices } from "../../lib/home";
import { focusRing } from "../site/ui";

/**
 * Home "What we do": every treatment in large type, faded, with the one nearest the middle of the screen
 * lit as you scroll (Diabetic foot care lights in sage). Each line links to its entry on the services
 * page. Reduced motion shows them all lit.
 */
export default function TreatmentSpotlight() {
  const list = useRef<HTMLUListElement>(null);
  // -1 = all lit (server, reduced motion); otherwise the index of the lit line.
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
        const d = Math.abs(rect.top + rect.height / 2 - middle);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      // Nothing lit while the list is well off screen.
      setActive(distance < window.innerHeight * 0.4 ? best : -2);
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
  }, []);

  const lastIndex = homeServices.length - 1;

  return (
    <section className="bg-white pb-14 pt-4 md:pb-20" aria-labelledby="what-heading">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8">
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
          className={`mt-6 inline-flex min-h-11 items-center text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark ${focusRing}`}
        >
          All in one home visit →
        </Link>
      </div>
    </section>
  );
}
