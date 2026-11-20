"use client";

import { useEffect, useState } from "react";

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
    <section className="bg-white py-16 text-center md:py-24" aria-labelledby="for-heading">
      <h2
        id="for-heading"
        aria-label="Foot care for you, and for the people you care for."
        className="font-heading text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.025em] text-brand-charcoal md:text-6xl"
      >
        <span aria-hidden="true">
          Foot care for
          <br />
          <span
            className={`inline-block text-brand-sage transition-[opacity,transform] duration-300 ${out ? "translate-y-2.5 opacity-0" : ""}`}
          >
            {people[index]}
          </span>
        </span>
      </h2>
    </section>
  );
}
