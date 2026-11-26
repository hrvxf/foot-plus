"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { focusRing } from "./ui";

export type PillPerson = {
  firstName: string;
  portrait: string;
  /** Town, shown in the call choice when there's more than one person. */
  town: string;
  phoneDisplay: string;
  callHref: string;
};

/**
 * Desktop (lg+) counterpart of the phones' sticky Request / Call bar: a small floating pill at the foot of
 * the screen with the practitioner's photo, "Happy to take your call", a call button and Request a visit.
 * With two practitioners (shared treatment pages) it shows both photos, and the call button opens a small
 * choice of who to ring. It slides in once the hero's own buttons (`[data-hero-actions]`) have scrolled
 * out of view, and steps aside while the footer is on screen, so it never sits beside the footer's
 * Request a visit.
 */
export default function DesktopActionPill({
  people,
  bookingHref,
  analyticsId,
}: {
  people: PillPerson[];
  bookingHref: string;
  analyticsId: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [footerOn, setFooterOn] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const pill = useRef<HTMLDivElement>(null);
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

  // Close the call choice on Escape or a click elsewhere.
  useEffect(() => {
    if (!choosing) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setChoosing(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!pill.current?.contains(event.target as Node)) setChoosing(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [choosing]);

  if (!body || people.length === 0) return null;
  const [first, second] = people;
  const names = second ? `${first.firstName} and ${second.firstName}` : first.firstName;
  const callClass = `flex h-12 w-12 items-center justify-center rounded-full bg-brand-wash text-brand-sageDeep transition-colors hover:bg-brand-line ${focusRing}`;
  const choiceId = `${analyticsId}-call-choice`;

  return createPortal(
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-20 hidden justify-center transition-[opacity,transform] duration-400 motion-reduce:transition-none lg:flex ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      inert={!visible}
      aria-hidden={!visible}
    >
      <div
        ref={pill}
        className="pointer-events-auto relative flex items-center gap-3 rounded-full bg-white/92 p-2 shadow-[0_20px_40px_-24px_rgba(36,48,40,0.5),0_0_0_1px_var(--color-brand-line)] backdrop-blur-xl"
      >
        {second && choosing ? (
          <ul
            id={choiceId}
            className="absolute bottom-[72px] left-1/2 w-[280px] -translate-x-1/2 rounded-[20px] bg-white p-2 shadow-[0_20px_40px_-20px_rgba(36,48,40,0.5),0_0_0_1px_var(--color-brand-line)]"
          >
            {people.map((person) => (
              <li key={person.callHref}>
                <a
                  href={person.callHref}
                  className={`flex items-center gap-3 rounded-[14px] p-2.5 transition-colors hover:bg-brand-wash ${focusRing}`}
                  data-analytics-id={`${analyticsId}-pill-phone-${person.town.toLowerCase()}`}
                >
                  <Image src={person.portrait} alt="" width={72} height={72} className="h-9 w-9 rounded-full object-cover object-[center_15%]" />
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-brand-charcoal">
                      {person.firstName}, {person.town}
                    </span>
                    <span className="text-sm text-brand-muted">{person.phoneDisplay}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <span className="flex">
          {people.map((person, index) => (
            <Image
              key={person.callHref}
              src={person.portrait}
              alt=""
              width={96}
              height={96}
              className={`h-12 w-12 rounded-full object-cover object-[center_15%] shadow-[0_0_0_2px_#fff] ${index > 0 ? "-ml-3.5" : ""}`}
            />
          ))}
        </span>
        <p className="pr-1 text-sm leading-[1.3] text-brand-muted">
          <span className="block font-semibold text-brand-charcoal">{names}</span>
          Happy to take your call
        </p>
        {second ? (
          <button
            type="button"
            onClick={() => setChoosing((open) => !open)}
            aria-expanded={choosing}
            aria-controls={choosing ? choiceId : undefined}
            aria-label={`Call ${names}`}
            className={callClass}
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        ) : (
          <a href={first.callHref} aria-label={`Call ${first.firstName}`} className={callClass} data-analytics-id={`${analyticsId}-pill-phone`}>
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        )}
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
