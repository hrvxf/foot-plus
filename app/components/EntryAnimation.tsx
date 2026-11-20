"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import AnimatedFootPlusLogo from "./AnimatedFootPlusLogo";

/**
 * Site entry animation: on the first page of a visit the Foot+ logo draws itself in
 * the middle of an off-white screen, then drops into the header logo's place with a
 * small bounce, and only then does the page fade in around it.
 *
 * How it is switched on: a tiny inline script (app/lib/entryAnimation.ts, placed in
 * <head> by app/layout.tsx) sets `data-intro` on
 * <html> before first paint (once per browser session, never for reduced-motion
 * visitors, never on /forms or the full-screen location chooser). The CSS in
 * globals.css shows this overlay and hides the header logo only while that attribute
 * is present, so visitors without JavaScript never see it. This component plays the
 * animation and removes the attribute when it lands.
 *
 * Full-screen green pages (marked data-fullscreen-page: the location chooser and the
 * review card) hide the header, so they mark their own logo with data-intro-target
 * instead, and the intro plays white on green to match them (colours in globals.css,
 * so they're right from the first frame). A target whose logo
 * sits inside a bigger image (the town lockups, with the town under the wordmark)
 * gives the wordmark's place in it as data-logo-box="left top width height", each a
 * fraction of the image.
 */

/** Safety net: never leave the overlay up longer than this, whatever goes wrong. */
const MAX_INTRO_MS = 6000;

/** Where the logo sits in the target: the whole box, or the part data-logo-box names. */
function logoRect(target: HTMLElement) {
  const rect = target.getBoundingClientRect();
  const box = target.dataset.logoBox?.split(" ").map(Number);
  if (!box || box.length !== 4 || box.some((n) => !Number.isFinite(n))) return rect;
  const [left, top, width, height] = box;
  return new DOMRect(
    rect.left + rect.width * left,
    rect.top + rect.height * top,
    rect.width * width,
    rect.height * height,
  );
}

export default function EntryAnimation() {
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<gsap.core.Timeline | null>(null);

  const finish = useCallback(() => {
    landingRef.current?.kill();
    landingRef.current = null;
    document.documentElement.removeAttribute("data-intro");
    setDone(true);
  }, []);

  // Decide after hydration: play only if the inline script switched the intro on.
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-intro")) {
      setDone(true);
      return;
    }
    setActive(true);

    const failsafe = window.setTimeout(finish, MAX_INTRO_MS);
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("keydown", onKey);
      landingRef.current?.kill();
    };
  }, [finish]);

  // Logo has drawn: move it onto the header logo, bounce, then hand over.
  const land = useCallback(() => {
    const logo = logoRef.current;
    const backdrop = backdropRef.current;
    const target =
      document.querySelector<HTMLElement>("[data-intro-target]") ??
      document.querySelector<HTMLElement>("[data-header-logo]");
    const from = logo?.getBoundingClientRect();
    const to = target ? logoRect(target) : undefined;

    if (!logo || !backdrop || !from || !to || !from.width || !to.width) {
      // No header logo to land on: fade the whole overlay away.
      landingRef.current = gsap
        .timeline({ onComplete: finish })
        .to([backdrop, logo], { autoAlpha: 0, duration: 0.4, ease: "power1.out" });
      return;
    }

    // The header logo is letterboxed inside its box, so fit by the tighter side.
    const scale = Math.min(to.width / from.width, to.height / from.height);
    const x = to.left + to.width / 2 - (from.left + from.width / 2);
    const y = to.top + to.height / 2 - (from.top + from.height / 2);

    landingRef.current = gsap
      .timeline({ delay: 0.15, onComplete: finish })
      // The screen stays blank while the logo travels and lands, so the snap into the
      // header reads on its own; the page only fades in once the bounce has settled.
      .to(logo, { x, y, scale, duration: 0.5, ease: "power3.in" }, 0)
      // Squash on impact, then spring back to shape (echoes the toes popping up).
      .to(logo, { scaleX: scale * 1.16, scaleY: scale * 0.82, duration: 0.09, ease: "power2.out" }, 0.5)
      .to(logo, { scaleX: scale, scaleY: scale, duration: 0.6, ease: "elastic.out(1.1, 0.4)" }, 0.59)
      .to(backdrop, { autoAlpha: 0, duration: 0.5, ease: "power1.out" }, 0.95);
  }, [finish]);

  if (done) return null;

  return (
    // Click or tap anywhere (or press any key) to skip straight to the page.
    <div className="entry-animation" aria-hidden="true" onClick={finish}>
      <div ref={backdropRef} className="entry-animation-backdrop absolute inset-0 bg-brand-offwhite" />
      <div
        ref={logoRef}
        className="entry-animation-logo relative aspect-[248.4347/77.966766] w-[min(60vw,300px)] text-brand-sageDark"
        // Hidden until the draw-in takes over, so the finished logo never flashes first.
        style={{ opacity: active ? 1 : 0 }}
      >
        <AnimatedFootPlusLogo
          id="footplus-logo-intro"
          className="h-full w-full"
          animate={active}
          speed={1.5}
          idle={false}
          onComplete={land}
        />
      </div>
    </div>
  );
}
