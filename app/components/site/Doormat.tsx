"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Fine fractal noise in white at low opacity: the bristles of a coir mat.
const bristles =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .22 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\"), repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 3px)";

const ease = "cubic-bezier(.2,.8,.2,1)";

/**
 * Footer scene: the foot of a sage front door and its threshold, floorboards, and a Foot+ doormat lying in
 * front. The mat unrolls the first time the footer comes into view (not with reduced motion). The mat is
 * the home link.
 */
export default function Doormat() {
  const scene = useRef<HTMLDivElement>(null);
  // "flat" on the server and for reduced motion. Otherwise it rolls up while the footer is out of view and
  // unrolls as it comes in; scrolling back up rolls it up again.
  const [state, setState] = useState<"flat" | "rolled">("flat");

  useEffect(() => {
    const el = scene.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const set = (next: "flat" | "rolled", delay: number) => {
      clearTimeout(timer);
      timer = setTimeout(() => setState(next), delay);
    };
    // Unroll once half the scene is showing; roll up when it drops below a third on the way back up
    // (top still on screen). The gap between the two stops it flickering at the edge.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) set("flat", 120);
        else if (
          entry.intersectionRatio < 0.3 &&
          entry.boundingClientRect.top > 0
        )
          set("rolled", 0);
      },
      { threshold: [0, 0.3, 0.5] },
    );
    // Start rolled only if it's off screen, so a short page never flashes a rolled mat.
    const frame = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top >= window.innerHeight)
        setState("rolled");
      observer.observe(el);
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const rolled = state === "rolled";

  return (
    <div ref={scene} className="relative h-[200px] overflow-hidden">
      {/* Threshold strip with the foot of the door */}
      <div
        className="h-4 border-b border-[#cfc6b3] bg-[linear-gradient(#e9e3d6,#ddd5c5)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-0 h-4 w-[250px] -translate-x-1/2 rounded-b-[3px] bg-brand-sageDeep"
        aria-hidden="true"
      />
      {/* Floorboards */}
      <div
        className="absolute inset-x-0 bottom-0 top-4 bg-[repeating-linear-gradient(90deg,transparent_0_63px,rgba(36,48,40,0.05)_63px_64px)]"
        aria-hidden="true"
      />

      <div className="absolute left-1/2 top-10 w-[300px] -translate-x-1/2 [perspective:640px]">
        <div className="relative [transform-origin:50%_0] [transform:rotateX(34deg)]">
          <Link
            href="/"
            aria-label="Foot+ home"
            className="relative flex h-[158px] flex-col items-center justify-center rounded-xl bg-brand-sageDark shadow-[0_2px_0_#3a5446,0_22px_26px_-14px_rgba(36,48,40,0.6)] before:absolute before:inset-2 before:rounded-[7px] before:shadow-[inset_0_0_0_4px_rgba(0,0,0,0.12)] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-brand-sageDark"
            style={{
              backgroundImage: bristles,
              clipPath: rolled
                ? "inset(0 0 100% 0 round 12px)"
                : "inset(0 0 0 0 round 12px)",
              transition: `clip-path ${rolled ? "0.9s" : "1.1s"} ${ease}`,
            }}
          >
            {/* The generic logo file is white, so it is used as a mask and coloured here. */}
            <span
              aria-hidden="true"
              className="block h-[50px] w-40 bg-brand-offwhite drop-shadow-[0_1px_0_rgba(0,0,0,0.25)] [mask:url('/images/footplus-generic-logo_MASTER_FINAL.svg')_center/contain_no-repeat]"
            />
            <span className="mt-2.5 text-[0.59375rem] font-semibold uppercase tracking-[0.32em] text-brand-offwhite/80">
              We&apos;ll come to you
            </span>
          </Link>
          {/* The roll: the rolled-up part of the mat. It travels to the front edge and gets thinner as the mat
            unrolls, so it's used up exactly as it arrives. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 rounded-full bg-[linear-gradient(#6a8c7a,#3E5A4C_55%,#33493e)] shadow-[0_6px_10px_-4px_rgba(36,48,40,0.5)]"
            style={{
              top: rolled ? -14 : "calc(100% - 3px)",
              height: rolled ? 28 : 3,
              opacity: rolled ? 1 : 0,
              // Unrolling: fade out as it reaches the edge. Rolling up: appear at once and grow back.
              transition: rolled
                ? `top .9s ${ease}, height .9s ${ease}, opacity .15s`
                : `top 1.1s ${ease}, height 1.1s ${ease}, opacity .25s .85s`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
