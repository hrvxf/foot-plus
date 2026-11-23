"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { portraits } from "../site/blocks";

const YEARS = 8;

/**
 * Care settings page "Our experience": the practitioners' combined years in health and social care. As the
 * section comes into view the number counts up to 8 and the two portraits slide in from either side to
 * overlap ("between us"). Reduced motion, and the server render, show the finished state. The real number is
 * always in the text for screen readers and search.
 */
export default function SharedExperience({ id }: { id: string }) {
  const box = useRef<HTMLElement>(null);
  const [count, setCount] = useState(YEARS);
  const [met, setMet] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only animate if the section starts out of view; otherwise leave it finished.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    setCount(0);
    setMet(false);
    let timer = 0;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen.disconnect();
        setMet(true);
        let n = 0;
        timer = window.setInterval(() => {
          n += 1;
          setCount(n);
          if (n >= YEARS) window.clearInterval(timer);
        }, 110);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    seen.observe(el);
    return () => {
      seen.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const slide = "transition-[transform,opacity] duration-1000 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none";

  return (
    <section
      ref={box}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-3 mt-14 rounded-[32px] bg-care-mist px-6 py-10 text-center md:mx-auto md:mt-20 md:max-w-3xl md:py-14"
    >
      <h2 id={`${id}-heading`} className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-care-deep">
        Our experience
      </h2>
      <p className="mt-3.5 font-heading text-[4.75rem] font-bold leading-[0.95] tracking-[-0.04em] text-care-deep tabular-nums md:text-8xl">
        <span aria-hidden="true">{count}</span>
        <span className="sr-only">{YEARS}</span>
        <span className="text-[1.875rem] tracking-[-0.02em] md:text-[2.5rem]"> years</span>
      </p>
      <p className="mx-auto mt-3.5 max-w-[30ch] text-[1.0625rem] leading-[1.5]">
        Between us, in health and social care, working with adults with learning disabilities and autism.
      </p>
      <p className="mt-3.5 text-sm text-care-muted">Qualified, insured and DBS-checked.</p>
      <div className="mt-6 flex justify-center">
        {(["bristol", "southampton"] as const).map((slug, index) => (
          <span
            key={slug}
            className={`relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-care-mist bg-care-line ${slide} ${
              index === 0 ? "z-[1]" : "-ml-3"
            } ${met ? "translate-x-0 opacity-100" : `opacity-0 ${index === 0 ? "-translate-x-[70px]" : "translate-x-[70px]"}`}`}
          >
            <Image src={portraits[slug]} alt="" fill sizes="56px" className="object-cover object-[center_15%]" />
          </span>
        ))}
      </div>
      <p className="mt-2 text-[0.8125rem] text-care-muted">Adam in Bristol and Katie in Southampton</p>
    </section>
  );
}
