"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { Practitioner } from "../../lib/locations";
import { stableViewportHeight } from "../../lib/stableViewport";
import { ContactGlyph, type ContactAction } from "../site/ContactIcons";
import { focusRing, shell } from "../site/ui";

type Props = {
  /** Visually hidden page heading, kept for search, e.g. "Home foot care in Bristol". */
  title: string;
  status: string;
  practitioner: Practitioner;
  portraitSrc: string;
  primaryAction: { label: string; href: string; analyticsId?: string };
  /** Id for links to the practitioner, e.g. "adam-james" (the author link on advice articles). */
  anchorId?: string;
  contactActions: ContactAction[];
};

const shortLabel: Record<ContactAction["kind"], string> = { phone: "Call", whatsapp: "WhatsApp", email: "Email" };
const textured =
  "bg-[linear-gradient(rgba(79,111,95,0.9),rgba(79,111,95,0.9)),url('/images/footplus-texture.png')] bg-size-[auto,600px_600px]";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const DOCKED = 76;
/** Shared with PortraitWarmup so the pre-fetched file is the one this picks. */
export const MEET_PORTRAIT_SIZES = "(min-width: 640px) 520px, 90vw";

/** Space kept between the settled intro card and the Request a visit button. */
const CARD_GAP = 16;

/**
 * Location page opening: the practitioner's portrait, name and one clear action. On phones, scrolling
 * settles the portrait into a green card with their own introduction, so arriving on the page feels like
 * meeting them. Large screens and reduced motion get the finished layout without the animation.
 */
export default function MeetIntro({ title, status, practitioner, portraitSrc, primaryAction, contactActions, anchorId }: Props) {
  const firstName = practitioner.name.split(" ")[0];
  const credentials = practitioner.credentials.join(" · ");
  const intro = practitioner.intro;

  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const nameStart = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const cardText = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const actionsRow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!intro) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function render() {
      frame = 0;
      const t0 = track.current, m = media.current, p = portrait.current, s = stage.current;
      if (!t0 || !m || !p || !s || wide.matches) return;
      const header = document.querySelector("header");
      const top = header ? header.getBoundingClientRect().height : 64;
      const vh = stableViewportHeight();
      // The settled card is only as tall as its text and sits straight under the pill.
      const cardH = (cardText.current?.offsetHeight ?? 0) + 40;
      // Fill the screen under the header, but never squeeze the settled card into the
      // buttons below it: on short screens (browser bars showing) grow just enough to
      // keep a gap, and lengthen the scroll track by the same amount.
      s.style.top = `${top}px`;
      s.style.height = `${vh - top}px`;
      const extra = Math.max(0, cardH + CARD_GAP - m.clientHeight);
      if (extra) s.style.height = `${vh - top + extra}px`;
      t0.style.height = `${vh * 2.3 + extra}px`;

      const rect = t0.getBoundingClientRect();
      const travel = t0.offsetHeight - vh * 0.75;
      let progress = clamp((top - rect.top) / travel);
      if (reduce.matches) progress = progress > 0.1 ? 1 : 0;
      const t = ease(clamp(progress / 0.6));

      const W = m.clientWidth, H = m.clientHeight;
      // Leave room under the portrait for the name, role and the scroll hint.
      const startH = H - 90, startW = Math.min(W, startH * 0.82), startX = (W - startW) / 2;
      const inset = 16;
      const w = lerp(startW, DOCKED, t), h = lerp(startH, DOCKED, t);
      const shift = 0;
      Object.assign(p.style, {
        left: `${lerp(startX, inset, t)}px`,
        top: `${lerp(0, inset, t) + shift}px`,
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: `${lerp(14, DOCKED / 2, t)}px`,
        boxShadow: `0 0 0 ${3 * t}px rgba(255,255,255,0.7)`,
      });
      if (nameStart.current) {
        nameStart.current.style.transform = `translateY(${h + 10}px)`;
        nameStart.current.style.opacity = String(clamp(1 - t / 0.3));
      }
      if (card.current) {
        card.current.style.opacity = String(clamp((t - 0.55) / 0.45));
        // Only as tall as the intro inside it (16px inset top and bottom), not the whole stage.
        card.current.style.height = `${cardH}px`;
        card.current.style.top = `${shift}px`;
      }
      if (cardText.current) {
        const b = clamp((progress - 0.45) / 0.35);
        cardText.current.style.opacity = String(b);
        cardText.current.style.transform = `translateY(${shift + (1 - b) * 20}px)`;
      }
      // Once the card settles it is far shorter than the stage, so lift the buttons up to sit
      // just under it, and pull the next section up by the same amount so no gap is left behind.
      const lift = Math.max(0, H + 12 - cardH - CARD_GAP);
      if (actionsRow.current) actionsRow.current.style.transform = `translateY(${-lift * clamp((t - 0.55) / 0.45)}px)`;
      t0.style.marginBottom = `${-lift}px`;
      if (hint.current) hint.current.style.opacity = progress < 0.05 ? "1" : "0";
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    wide.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      wide.removeEventListener("change", schedule);
    };
  }, [intro]);

  const pill = (
    <p className="inline-flex self-center items-center gap-2.5 rounded-full bg-brand-sageDark py-1.5 pl-3 pr-4 text-[0.9375rem] font-semibold text-white">
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A8E6B8] opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#A8E6B8]" />
      </span>
      {status}
    </p>
  );

  const actions = (
    <div>
      <Link
        href={primaryAction.href}
        className={`flex h-14 w-full items-center justify-center rounded-full bg-brand-sageDark font-heading text-[1.0625rem] font-semibold text-white shadow-[0_16px_30px_-18px_rgba(36,48,40,0.6)] transition-colors hover:bg-brand-sageDeep ${focusRing}`}
        data-analytics-id={primaryAction.analyticsId}
      >
        {primaryAction.label}
      </Link>
      <ul className="mt-3 flex justify-center gap-3.5">
        {contactActions.map((action) => (
          <li key={action.kind}>
            <a
              href={action.href}
              aria-label={action.label}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              data-analytics-id={action.analyticsId}
              className={`group flex flex-col items-center gap-1 rounded-xl ${focusRing}`}
            >
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-brand-line bg-white text-brand-sageDark transition-colors group-hover:bg-brand-wash">
                <ContactGlyph kind={action.kind} className="h-5 w-5" />
              </span>
              <span aria-hidden="true" className="text-[0.71875rem] font-medium text-brand-muted">
                {shortLabel[action.kind]}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const greeting = (
    <div>
      <p className="font-heading text-[1.625rem] font-semibold leading-tight text-white">Hi, I’m {firstName}</p>
      <p className="mt-1 text-[0.9375rem] text-white/85">{practitioner.role}</p>
    </div>
  );

  const quote = intro ? (
    <>
      <svg viewBox="0 0 32 24" className="h-5 w-7 text-[#A8E6B8]" aria-hidden="true">
        <path fill="currentColor" d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12H0zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12H19z" />
      </svg>
      <p className="mt-3 font-heading text-xl font-semibold leading-[1.4] text-white">{intro}</p>
      <p className="mt-5 border-t border-white/30 pt-4 text-[0.8125rem] font-semibold tracking-[0.02em] text-white">{credentials}</p>
    </>
  ) : null;

  return (
    <section id={anchorId} aria-labelledby="location-heading" data-page-hero className="scroll-mt-24">
      <h1 id="location-heading" className="sr-only">
        {title}
      </h1>

      {/* Phones and tablets: the scroll-led introduction. */}
      <div ref={track} className={`lg:hidden ${intro ? "h-[230vh]" : ""}`}>
        <div ref={stage} data-hero-stage className={`${shell} flex flex-col pb-4 pt-4 ${intro ? "sticky top-16 h-[calc(100svh-4rem)]" : ""}`}>
          {pill}
          <div ref={media} className={`relative mt-4 ${intro ? "min-h-0 flex-1" : ""}`}>
            {intro ? (
              <div ref={card} className={`absolute inset-x-0 top-0 rounded-2xl opacity-0 ${textured}`} aria-hidden="true" />
            ) : null}
            <div
              ref={portrait}
              className={`${intro ? "absolute z-[1]" : "relative mx-auto aspect-[4/5] w-full max-w-[48svh]"} overflow-hidden rounded-[14px] bg-white`}
            >
              <Image src={portraitSrc} alt={practitioner.imageAlt} fill priority sizes={MEET_PORTRAIT_SIZES} className="object-cover object-[center_18%]" />
            </div>
            <div ref={nameStart} className={`text-center ${intro ? "absolute inset-x-0 top-0 z-[2]" : "mt-3"}`}>
              <p className="font-heading text-[1.875rem] font-semibold leading-tight text-brand-sageDeep">{practitioner.name}</p>
              <p className="text-[0.9375rem] text-brand-muted">{practitioner.role}</p>
            </div>
            {intro ? (
              <div ref={cardText} className="absolute inset-x-4 top-4 z-[2] opacity-0">
                <div className="flex min-h-[76px] items-center pl-[92px]">{greeting}</div>
                <div className="mt-5">{quote}</div>
              </div>
            ) : null}
          </div>
          <div ref={actionsRow} className="relative pt-3">
            {intro ? (
              // Out of the flow, so it never takes space from the card once it has faded.
              <div ref={hint} className="pointer-events-none absolute inset-x-0 -top-5 flex h-5 justify-center text-brand-muted transition-opacity" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            ) : null}
            {actions}
          </div>
        </div>
      </div>

      {/* Large screens: the same content, laid out side by side. */}
      <div className={`${shell} hidden gap-10 pb-16 pt-10 lg:grid lg:grid-cols-12 lg:items-stretch`}>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
            <Image src={portraitSrc} alt="" fill sizes="480px" className="object-cover object-[center_18%]" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-8 lg:col-span-7">
          <div>{pill}</div>
          {intro ? (
            <div className={`rounded-2xl p-8 ${textured}`}>
              {/* The large portrait sits beside the card here, so no avatar. */}
              {greeting}
              <div className="mt-6 max-w-[46ch]">{quote}</div>
            </div>
          ) : (
            <div>
              <p className="font-heading text-[2.5rem] font-semibold leading-tight text-brand-sageDeep">{practitioner.name}</p>
              <p className="text-lg text-brand-muted">{practitioner.role}</p>
            </div>
          )}
          <div className="max-w-md">{actions}</div>
        </div>
      </div>
    </section>
  );
}
