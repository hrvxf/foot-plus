'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PractitionerProfile() {
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
        if (!cancelled) {
          setIsPortraitLoaded(true);
        }
      });
    };
    const handleLoad = () => {
      if (typeof img.decode === "function") {
        img
          .decode()
          .catch(() => {})
          .finally(finish);
      } else {
        finish();
      }
    };
    img.src = "/images/Adam-James.svg";
    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      img.addEventListener("error", finish);
    }
    return () => {
      cancelled = true;
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", finish);
    };
  }, []);

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
      gsap.set(portraitRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });
      return;
    }
    gsap.set(portraitRef.current, {
      opacity: 0,
      y: 10,
      scale: 0.985,
      filter: "blur(6px)",
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isPortraitLoaded || !portraitRef.current || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    if (prefersReducedMotion) {
      gsap.set(portraitRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });
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

  const portraitBase =
    "relative aspect-4/5 overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_-32px_rgba(15,23,42,0.25)] opacity-0";

  return (
    <div className="relative rounded-[28px] border border-brand-sageLight/40 bg-white p-6 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] transition-[box-shadow,transform] duration-300 ease-out focus-within:shadow-[0_22px_60px_-40px_rgba(15,23,42,0.22)] md:sticky md:top-24 md:p-8 md:hover:-translate-y-0.5 md:hover:shadow-[0_22px_60px_-40px_rgba(15,23,42,0.22)] md:focus-within:-translate-y-0.5">
      {/* Subtle top sheen / divider (makes the sticky card feel deliberate) */}
      <div className="pointer-events-none absolute inset-x-6 top-3 hidden h-px bg-linear-to-r from-transparent via-brand-sageLight/60 to-transparent opacity-20 transition-opacity duration-300 md:block md:hover:opacity-40 md:focus-within:opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 rounded-[28px] bg-linear-to-b from-brand-sageLight/10 via-transparent to-transparent" />

      <div className="grid gap-6">
        {/* Small label */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-brand-charcoal/55">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-sageLight" />
            Practitioner profile
          </div>
        </div>

        {/* Portrait */}
        <div
          ref={portraitRef}
          className={portraitBase}
          role="img"
          aria-label="Portrait of Adam James, Foot+ Bristol foot health practitioner."
          style={{
            backgroundImage: "url('/images/Adam-James.svg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* Neutral vignette (doesn't tint white) */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
        </div>

        {/* Header + Bio */}
        <div className="space-y-5">
          <div className="space-y-2">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-brand-sageDark">
              Adam James
            </h2>

            {/* Credentials chips - make them crisp + premium */}
            <div className="flex flex-wrap gap-2">
              {["BA (Hons)", "Dip FH", "MCFHP", "MAFHP"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-brand-sageLight/40 bg-white/80 px-3 py-1 text-xs font-medium text-brand-charcoal/70 shadow-[0_10px_24px_-22px_rgba(15,23,42,0.35)] backdrop-blur"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="pt-1 inline-flex items-center gap-2 text-sm font-semibold text-brand-charcoal/60">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-sageLight" />
              Foot Health Practitioner
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-base leading-relaxed text-brand-charcoal/80">
            <p>
              Adam has over six years’ experience working in healthcare and
              rehabilitation, supporting people to regain confidence, mobility, and
              independence. Through this work, he became increasingly aware of how often
              foot health is overlooked - and the difference that proper care and
              education can make.
            </p>

            <p>
              As a fully trained Foot Health Practitioner, Adam offers a friendly,
              relaxed service built on trust, clear communication, and achievable,
              measurable outcomes. He takes time to listen, explain each step, and
              ensure every client feels comfortable and informed throughout their
              appointment.
            </p>

            <p>
              Adam is fully insured and professionally recognised as a member of the
              College of Foot Health Practitioners and the Association of Foot Health
              Practitioners. His priority is simple: that every client feels heard,
              reassured, and confident in their foot health.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
