"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { prices } from "../../lib/site";
import { focusRing, shell } from "../site/ui";

// Treatments shown as moving type. The same list is in a plain list for screen readers.
const treatments = [
  "Toenail cutting",
  "Thick nails",
  "Ingrown toenails",
  "Fungal nails",
  "Corns",
  "Hard skin",
  "Cracked heels",
  "Verrucas",
  "Athlete’s foot",
  "Diabetic foot care",
];
const rows = [treatments.slice(0, 4), treatments.slice(4, 7), treatments.slice(7)];

const textured =
  "bg-[linear-gradient(rgba(79,111,95,0.92),rgba(79,111,95,0.92)),url('/images/footplus-texture.png')] bg-size-[auto,600px_600px]";

/**
 * Location page treatments and prices in one section: treatment names slide across in large type, rows in
 * opposite directions, as the section passes through the screen, with the visit prices on a ticket in front.
 * Reduced motion keeps the type still.
 */
export default function TreatmentsMarquee({ id, place }: { id: string; place: string }) {
  const section = useRef<HTMLElement>(null);
  const lines = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    function render() {
      frame = 0;
      const s = section.current;
      if (!s) return;
      const rect = s.getBoundingClientRect();
      // 0 as the section enters the bottom of the screen, 1 as it leaves the top.
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      lines.current.forEach((line, row) => {
        if (!line) return;
        const set = line.scrollWidth / 3;
        const shift = progress * set * 0.9 + row * 60;
        line.style.transform = `translateX(${row % 2 ? shift - set : -shift}px)`;
      });
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const [first, routine] = prices;

  return (
    <section ref={section} id={id} className={`scroll-mt-24 overflow-hidden py-12 text-white md:py-20 ${textured}`} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="text-center text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#A8E6B8]">
        Treatments and prices<span className="sr-only"> in {place}</span>
      </h2>

      <ul className="sr-only">
        {treatments.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div className="mt-5 grid gap-1 md:mt-8" aria-hidden="true">
        {rows.map((row, index) => {
          const words = row.map((name, word) => (
            <span key={name} className="inline-flex items-center">
              <span
                className={
                  (word + index) % 2
                    ? "text-transparent [-webkit-text-stroke:1.2px_rgba(255,255,255,0.55)]"
                    : "text-white"
                }
              >
                {name}
              </span>
              <span className="mx-[0.4em] text-[#A8E6B8]">·</span>
            </span>
          ));
          return (
            <div
              key={index}
              ref={(el) => {
                lines.current[index] = el;
              }}
              className="whitespace-nowrap font-heading text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.02em] will-change-transform md:text-[4.5rem]"
            >
              {words}
              {words}
              {words}
            </div>
          );
        })}
      </div>

      <div className={`${shell} mt-6 md:mt-10`}>
        <div className="mx-auto max-w-md rounded-[20px] bg-brand-offwhite px-6 py-5 text-brand-charcoal shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)]">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">One price per visit</p>
          <dl>
            {[
              { name: "First visit", detail: "About 60 minutes", price: first.price },
              { name: "Routine visit", detail: "About 45 minutes", price: routine.price },
            ].map((visit) => (
              <div key={visit.name} className="flex items-baseline justify-between border-b border-brand-line py-3 last:border-b-0">
                <dt>
                  <span className="block font-semibold text-brand-sageDeep">{visit.name}</span>
                  <span className="block text-[0.8125rem] text-brand-muted">{visit.detail}</span>
                </dt>
                <dd className="font-heading text-[2.25rem] font-semibold leading-none text-brand-sageDeep">{visit.price}</dd>
              </div>
            ))}
          </dl>
          <Link href="/foot-care-services" className={`mt-1 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-brand-sageDeep ${focusRing}`}>
            All treatments
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
