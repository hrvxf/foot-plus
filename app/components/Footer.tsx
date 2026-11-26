"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Phone } from "lucide-react";

import AnimatedFootPlusLogo from "./AnimatedFootPlusLogo";
import CookieSettingsButton from "./CookieSettingsButton";
import CallButton from "./site/CallButton";
import LgbtqFriendly from "./site/LgbtqFriendly";
import { facebookUrl, phoneLocationForPath } from "../lib/site";
import { focusRing } from "./site/ui";

/** Desktop: inline in the pill. */
const pillLinks = [
  { href: "/foot-care-services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/advice", label: "Advice" },
  { href: "/partners", label: "Partners" },
];

/** Phones: the menu that opens up out of the pill. Same order as the header menu, plus Advice and Partners. */
const menuLinks = [
  { href: "/foot-care-services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/locations", label: "Locations" },
  { href: "/advice", label: "Advice" },
  { href: "/partners", label: "Partners" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms-and-conditions", label: "Terms" },
];

// "+" marks in the corners of the open menu card, as in the header menu (brand guide §4).
const plusMarks = [
  { left: 14, top: 10, fontSize: 34, "--o": 0.5 },
  { right: 20, top: 40, fontSize: 20, "--o": 0.35 },
  { right: 12, top: 170, fontSize: 44, "--o": 0.6 },
  { left: 22, top: 220, fontSize: 18, "--o": 0.3 },
] as unknown as CSSProperties[];

/** Focus ring for the small print on the dark green band. */
const focusRingLight = "focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-offwhite";

/**
 * Pages where the footer leaves out its "Request a visit" button: the home page ends with the postcode
 * checker, whose button carries the postcode through to the form; /book is the form; /forms is for people
 * who have already enquired.
 */
const noRequestButton = (pathname: string) =>
  pathname === "/" || pathname.startsWith("/book") || pathname.startsWith("/forms");

/**
 * Pages that end with their own closing section (the location pages' "Say hello" section), which carries the
 * small print itself. The footer pill and band are left out there, and the header stays.
 */
export const hasOwnClose = (pathname: string) =>
  pathname === "/locations/bristol" || pathname === "/locations/southampton";

const isActive = (pathname: string, href: string) => (href === "/locations" ? pathname.startsWith(href) : pathname === href);

type State = "still" | "waiting" | "landed";

/**
 * Site footer: the header pill lands at the bottom of the page. A white pill on a Sage Deep band. Desktop: logo,
 * links and "Request a visit". Phones: like the scrolled header, a small centred pill (logo + menu button) that
 * opens out to full width as its menu grows upwards, with "Request a visit" inside the menu. On a page long enough to scroll it waits
 * out of view and settles in as the visitor reaches the bottom, while the header pill and the small-screen
 * Request / Call bar step aside (html[data-footer-landed], styles in globals.css).
 *
 * The footer's "Request a visit" button takes precedence: pages don't end with their own button just above it.
 * When adding a page, end it with something else (a link, a question) rather than another request button.
 */
export default function Footer() {
  const pathname = usePathname() ?? "/";
  const footer = useRef<HTMLElement>(null);
  // "still" on the server, with reduced motion and when the footer is already on screen at load.
  const [state, setState] = useState<State>("still");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const el = footer.current;
    const root = document.documentElement;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current: State = "still";
    const apply = (next: State) => {
      if (next === current) return;
      current = next;
      setState(next);
      if (next === "landed") {
        root.dataset.footerLanded = "true";
      } else {
        delete root.dataset.footerLanded;
        setIsMenuOpen(false);
      }
    };

    const update = () => {
      const rect = el.getBoundingClientRect();
      const shown = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (current === "still") {
        // Only pages where the footer starts out of view get the landing; short pages keep their header.
        if (rect.top >= window.innerHeight) apply("waiting");
        return;
      }
      if (shown >= rect.height * 0.35) apply("landed");
      else if (rect.top > window.innerHeight * 0.75) apply("waiting");
    };

    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      delete root.dataset.footerLanded;
      setState("still");
      setIsMenuOpen(false);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  if (hasOwnClose(pathname)) return null;

  const close = () => setIsMenuOpen(false);
  const location = phoneLocationForPath(pathname);
  const requestHref = location ? `/book?location=${location}` : "/book";
  const showRequest = !noRequestButton(pathname);

  return (
    <footer
      id="site-footer"
      ref={footer}
      data-state={state}
      className="relative z-10 -mt-[30px] w-full flex-none rounded-t-[30px] bg-brand-sageDeep px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-5 text-brand-offwhite md:px-6 md:pt-7"
    >
      <div
        className="site-pill-scrim fixed inset-0 bg-brand-charcoal/25 md:hidden"
        data-open={isMenuOpen}
        aria-hidden="true"
        onClick={close}
      />

      <div className="relative mx-auto max-w-[75rem]">
        {/* Phones: the menu grows up out of the pill. */}
        <div
          id="footer-menu"
          className="footer-menu absolute inset-x-0 bottom-0 z-[1] rounded-[30px] bg-white px-6 pb-[84px] pt-6 text-center text-brand-charcoal shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.45)] md:hidden"
          data-open={isMenuOpen}
          inert={!isMenuOpen}
        >
          {plusMarks.map((mark, index) => (
            <span
              key={index}
              className="footer-menu-plus pointer-events-none absolute font-heading font-semibold leading-none text-brand-sage"
              style={mark}
              aria-hidden="true"
            >
              +
            </span>
          ))}
          <nav aria-label="Footer menu" className="flex flex-col items-center">
            {menuLinks.map((link, index) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  style={{ "--i": menuLinks.length - 1 - index } as CSSProperties}
                  className={`footer-menu-item whitespace-nowrap rounded-xl px-3 font-heading text-[2rem] font-semibold leading-[1.3] tracking-[-0.02em] ${focusRing} ${
                    active ? "text-brand-sage" : "text-brand-charcoal"
                  }`}
                >
                  {link.label}
                  {active ? "." : null}
                </Link>
              );
            })}
          </nav>
          <div
            className="footer-menu-item mx-auto mt-4 h-[3px] w-[60px] rounded-full bg-brand-sage"
            style={{ "--i": 0 } as CSSProperties}
            aria-hidden="true"
          />
          {showRequest ? (
            <Link
              href={requestHref}
              onClick={close}
              style={{ "--i": 0 } as CSSProperties}
              className={`footer-menu-item mt-5 flex h-[52px] w-full items-center justify-center rounded-full bg-brand-sageDark text-base font-semibold text-white transition-colors hover:bg-brand-sageDeep ${focusRing}`}
              data-analytics-id="footer-menu-book"
            >
              Request a visit
            </Link>
          ) : null}
          <CallButton
            className={`footer-menu-item mx-auto mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-base font-semibold text-brand-sageDeep hover:text-brand-sage ${focusRing}`}
            style={{ "--i": 0 } as CSSProperties}
            analyticsId="footer-menu-phone"
          >
            {(number) => (
              <>
                <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                {number ? `Call ${number}` : "Call us"}
              </>
            )}
          </CallButton>
        </div>

        <div
          data-open={isMenuOpen}
          className="footer-pill relative z-[2] mx-auto flex h-[60px] items-center justify-between gap-2 rounded-full bg-white pl-[18px] pr-2 text-brand-charcoal shadow-[0_22px_50px_-24px_rgba(0,0,0,0.55)] md:pl-6">
          <Link href="/" className={`flex shrink-0 items-center rounded-lg ${focusRing}`} aria-label="Foot+ home">
            <span className="relative block h-[34px] w-[106px] text-brand-sageDark md:h-[38px] md:w-[120px]">
              <AnimatedFootPlusLogo id="footplus-logo-footer" className="h-full w-full" animate={false} />
            </span>
          </Link>

          <nav aria-label="Footer navigation" className="hidden md:block">
            <ul className="flex items-center gap-1 lg:gap-3">
              {pillLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-full px-3 font-semibold text-brand-sageDeep transition-colors hover:text-brand-sage ${focusRing} ${
                      isActive(pathname, link.href)
                        ? "after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-brand-sage"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            {showRequest ? (
              <Link
                href={requestHref}
                className={`hidden h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-brand-sageDark px-5 text-base font-semibold text-white transition-colors duration-150 hover:bg-brand-sageDeep md:inline-flex ${focusRing}`}
                data-analytics-id="footer-book"
              >
                Request a visit
              </Link>
            ) : (
              // Keeps the links centred on desktop when there's no button.
              <span aria-hidden="true" className="hidden w-[120px] shrink-0 md:block" />
            )}
            <button
              type="button"
              className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-sageDark text-white md:hidden ${focusRing}`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="footer-menu"
              data-open={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="relative h-3 w-[18px]" aria-hidden="true">
                <span className="footer-menu-bar" style={{ top: 2 }} />
                <span className="footer-menu-bar" style={{ top: 8 }} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <SmallPrint className="mt-2.5 md:mt-3" />
    </footer>
  );
}

/** The small print row: Facebook, the Pride flag, copyright, Privacy, Terms, Cookies. Light, for green backgrounds. */
export function SmallPrint({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex max-w-[75rem] items-center justify-between gap-4 px-1 text-[0.78125rem] text-brand-line md:px-6 ${className}`}>
      <div className="flex items-center gap-2">
        <a
          href={facebookUrl}
          target="_blank"
          rel="noreferrer"
          className={`-ml-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 ${focusRingLight}`}
          aria-label="Visit Foot+ on Facebook"
          title="Foot+ on Facebook"
          data-analytics-id="footer-facebook"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-brand-offwhite">
            <path d="M13.39 24v-10.95h3.68l.55-4.27h-4.23V6.05c0-1.24.34-2.08 2.12-2.08h2.26V.15C17.38.1 16.07 0 14.55 0c-3.17 0-5.34 1.94-5.34 5.49v3.29H5.63v4.27h3.58V24h4.18Z" />
          </svg>
        </a>
        <LgbtqFriendly flagOnly />
        <p className="ml-1 whitespace-nowrap">&copy; {new Date().getFullYear()} Foot+</p>
      </div>
      <nav aria-label="Legal links">
        <ul className="flex gap-x-3">
          {legalLinks.map((item) => (
            <li key={item.href}>
              <Link className={`inline-flex min-h-9 items-center text-brand-offwhite hover:text-white hover:underline hover:underline-offset-4 ${focusRingLight}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <CookieSettingsButton className={`inline-flex min-h-9 items-center text-brand-offwhite hover:text-white hover:underline hover:underline-offset-4 ${focusRingLight}`} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
