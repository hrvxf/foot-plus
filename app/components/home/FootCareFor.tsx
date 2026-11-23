"use client";

import { useEffect, useState } from "react";

import { texturedGreen as textured } from "../site/ui";

// Who a visit is for, as people in the reviews describe them.
const people = ["Mum.", "Dad.", "you.", "Grandad.", "a neighbour."];

/**
 * "Foot care for / Mum." with the last word changing every couple of seconds. The word has its own line
 * so "for" never moves. Reduced motion keeps "you."
 */
export default function FootCareFor() {
  const [index, setIndex] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred so it isn't a synchronous update inside the effect.
      const id = requestAnimationFrame(() => setIndex(people.indexOf("you.")));
      return () => cancelAnimationFrame(id);
    }
    let swap: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      setOut(true);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % people.length);
        setOut(false);
      }, 300);
    }, 2000);
    return () => {
      clearInterval(timer);
      clearTimeout(swap);
    };
  }, []);

  return (
    <section className="relative z-10 px-4 py-6 md:py-10" aria-labelledby="for-heading">
      <div className={`mx-auto max-w-[1200px] rounded-[28px] px-6 py-14 text-center md:py-20 ${textured}`}>
        <h2
          id="for-heading"
          aria-label="Foot care for you, and for the people you care for."
          className="font-heading text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.025em] text-white md:text-6xl"
        >
          <span aria-hidden="true">
            Foot care for
            {/* Fixed-height line, never wrapping, so changing the word can't move anything around it. */}
            <span className="block h-[1.06em] whitespace-nowrap">
              <span className={`inline-block text-[#A8E6B8] transition-opacity duration-300 ${out ? "opacity-0" : "opacity-100"}`}>
                {people[index]}
              </span>
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}
