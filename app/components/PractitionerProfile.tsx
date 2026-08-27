'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { Practitioner } from "../lib/locations";
import { serviceLocations } from "../lib/locations";

export default function PractitionerProfile({
  practitioner = serviceLocations.bristol.practitioner!,
}: {
  practitioner?: Practitioner;
}) {
  const [isPortraitLoaded, setIsPortraitLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    const finish = () => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (!cancelled) setIsPortraitLoaded(true);
      });
    };
    const handleLoad = () => {
      if (typeof img.decode === "function") {
        img.decode().catch(() => {}).finally(finish);
      } else {
        finish();
      }
    };

    img.src = practitioner.imageSrc;
    if (img.complete) handleLoad();
    else {
      img.addEventListener("load", handleLoad);
      img.addEventListener("error", finish);
    }

    return () => {
      cancelled = true;
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", finish);
    };
  }, [practitioner.imageSrc]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!portraitRef.current || hasAnimatedRef.current) return;
    if (prefersReducedMotion) {
      gsap.set(portraitRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      return;
    }
    gsap.set(portraitRef.current, { opacity: 0, y: 10, scale: 0.985, filter: "blur(6px)" });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isPortraitLoaded || !portraitRef.current || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    if (prefersReducedMotion) {
      gsap.set(portraitRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      return;
    }
    gsap.to(portraitRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "power3.out",
    });
  }, [isPortraitLoaded, prefersReducedMotion]);

  return (
    <div className="grid gap-7 md:grid-cols-[minmax(220px,0.85fr)_1.15fr] md:items-start">
      <div
        ref={portraitRef}
        className="relative aspect-4/5 overflow-hidden rounded-[2rem] bg-white opacity-0 shadow-[0_24px_55px_-38px_rgba(15,23,42,0.38)]"
        role="img"
        aria-label={practitioner.imageAlt}
        style={{
          backgroundImage: `url('${practitioner.imageSrc}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
      </div>

      <div className="pt-1">
        <h3 className="font-heading text-3xl font-semibold tracking-tight text-brand-sageDark">
          {practitioner.name}
        </h3>
        <p className="mt-2 text-sm font-semibold text-brand-charcoal/60">{practitioner.role}</p>

        <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-brand-charcoal/55">
          {practitioner.credentials.join(" · ")}
        </p>

        {practitioner.bio.length > 0 && (
          <div className="mt-6 space-y-4 border-t border-brand-sageLight/35 pt-6 text-base leading-relaxed text-brand-charcoal/80">
            {practitioner.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        )}
      </div>
    </div>
  );
}
