"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { focusRing } from "./ui";

/**
 * Desktop (lg+) counterpart of the phones' sticky Request / Call bar: a small floating pill at the foot of
 * the screen with the practitioner's photo, a call button and Request a visit. It slides in once the hero's
 * own buttons (`[data-hero-actions]`) have scrolled out of view, and steps aside while the footer is on
 * screen, so it never sits beside the footer's Request a visit.
 */
export default function DesktopActionPill({
  firstName,
  portrait,
  bookingHref,
  callHref,
  analyticsId,
}: {
  firstName: string;
  portrait: string;
  bookingHref: string;
  callHref: string;
  analyticsId: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [footerOn, setFooterOn] = useState(false);
  // Rendered into <body>: the page wrapper animates with a transform, which would pin a fixed element to
  // the wrapper instead of the screen.
  const [body, setBody] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Deferred so it isn't a synchronous update inside the effect.
    const id = requestAnimationFrame(() => setBody(document.body));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const hero = document.querySelector("[data-hero-actions]");
    const footer = document.getElementById("site-footer");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        if (entry.target === footer) setFooterOn(entry.isIntersecting);
      }
    });
    if (hero) observer.observe(hero);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !footerOn;
  if (!body) return null;

  return createPortal(
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-20 hidden justify-center transition-[opacity,transform] duration-400 motion-reduce:transition-none lg:flex ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      inert={!visible}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-white/92 p-2 shadow-[0_20px_40px_-24px_rgba(36,48,40,0.5),0_0_0_1px_var(--color-brand-line)] backdrop-blur-xl">
        <Image src={portrait} alt="" width={96} height={96} className="h-12 w-12 rounded-full object-cover object-[center_15%]" />
        <p className="pr-1 text-sm leading-[1.3] text-brand-muted">
          <span className="block font-semibold text-brand-charcoal">{firstName}</span>
          Happy to take your call
        </p>
        <a
          href={callHref}
          aria-label={`Call ${firstName}`}
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-brand-wash text-brand-sageDeep transition-colors hover:bg-brand-line ${focusRing}`}
          data-analytics-id={`${analyticsId}-pill-phone`}
        >
          <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
        </a>
        <Link
          href={bookingHref}
          className={`inline-flex h-12 items-center rounded-full bg-brand-sageDark px-[22px] text-[0.9375rem] font-semibold text-white transition-colors hover:bg-brand-sageDeep ${focusRing}`}
          data-analytics-id={`${analyticsId}-pill-book`}
        >
          Request a visit
        </Link>
      </div>
    </div>,
    body,
  );
}
