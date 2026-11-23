"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AnimatedFootPlusLogo from "./AnimatedFootPlusLogo";
import CookieSettingsButton from "./CookieSettingsButton";
import LgbtqFriendly from "./site/LgbtqFriendly";
import { phoneLocationForPath } from "../lib/site";
import { focusRing } from "./site/ui";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/advice", label: "Advice" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

/**
 * Pages where the footer leaves out its "Request a visit" button: the home page ends with the postcode
 * checker, whose button carries the postcode through to the form; /book is the form; /forms is for people
 * who have already enquired.
 */
const noRequestButton = (pathname: string) =>
  pathname === "/" || pathname.startsWith("/book") || pathname.startsWith("/forms");

type State = "still" | "waiting" | "landed";

/**
 * Site footer: "the pill lands". The footer is a white pill matching the header. On a page long enough to
 * scroll, it waits out of view and settles in as the visitor reaches the bottom, while the header pill fades
 * away (html[data-footer-landed], styles in globals.css) and the Foot+ logo draws itself once.
 *
 * The footer's "Request a visit" button takes precedence: pages don't end with their own button just above it.
 * When adding a page, end it with something else (a link, a question) rather than another request button.
 */
export default function Footer() {
  const pathname = usePathname() ?? "/";
  const footer = useRef<HTMLElement>(null);
  // "still" on the server, with reduced motion and when the footer is already on screen at load.
  const [state, setState] = useState<State>("still");
  // Bumped each time the pill lands; remounts the logo so it draws again.
  const [drawKey, setDrawKey] = useState(0);

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
        // Remount the logo at once: it hides itself before paint, so the pill never shows it drawn early.
        setDrawKey((key) => key + 1);
      } else {
        delete root.dataset.footerLanded;
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
    };
  }, [pathname]);

  const location = phoneLocationForPath(pathname);
  const requestHref = location ? `/book?location=${location}` : "/book";
  const showRequest = !noRequestButton(pathname);

  return (
    <footer
      id="site-footer"
      ref={footer}
      data-state={state}
      className="relative z-10 w-full flex-none bg-brand-offwhite px-3 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-2 text-brand-charcoal md:px-6"
    >
      <div className="footer-pill mx-auto flex flex-col items-center gap-3.5 rounded-[30px] bg-white px-4 pb-4 pt-5 shadow-[0_22px_50px_-24px_rgba(36,48,40,0.45),0_0_0_1px_var(--color-brand-line)] md:flex-row md:justify-between md:gap-6 md:rounded-full md:py-2.5 md:pl-6 md:pr-2.5">
        <Link href="/" className={`flex shrink-0 items-center rounded-lg ${focusRing}`} aria-label="Foot+ home">
          <span className="relative block h-[34px] w-[106px] text-brand-sageDark md:h-[38px] md:w-[120px]">
            <AnimatedFootPlusLogo
              key={drawKey}
              id={`footplus-logo-footer-${drawKey}`}
              className="h-full w-full"
              animate={drawKey > 0}
              idle={false}
            />
          </span>
        </Link>

        <nav aria-label="Footer navigation" className="w-full md:w-auto">
          <ul className="flex justify-between gap-x-1.5 px-0.5 text-[clamp(0.8125rem,3.9vw,0.96875rem)] md:justify-center md:gap-x-1 md:px-0 lg:gap-x-3">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full font-medium transition-colors md:px-3 ${focusRing} ${
                    pathname === item.href ? "text-brand-sage" : "text-brand-charcoal/80 hover:text-brand-sageDark"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {showRequest ? (
          <Link
            href={requestHref}
            className={`inline-flex h-12 w-full shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-brand-sageDark px-5 text-base font-semibold text-white transition-colors duration-150 hover:bg-brand-sageDeep md:h-11 md:w-auto ${focusRing}`}
            data-analytics-id="footer-book"
          >
            Request a visit
          </Link>
        ) : (
          // Keeps the links centred on desktop when there's no button.
          <span aria-hidden="true" className="hidden w-[120px] shrink-0 md:block" />
        )}
      </div>

      <div className="mx-auto mt-3 flex max-w-[1180px] items-center justify-between gap-4 px-1 text-[0.78125rem] text-brand-muted md:mt-4 md:px-6">
        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/profile.php?id=61586341484139"
            target="_blank"
            rel="noreferrer"
            className={`-ml-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-brand-sageDark/10 ${focusRing}`}
            aria-label="Visit Foot+ on Facebook"
            title="Foot+ on Facebook"
            data-analytics-id="footer-facebook"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-brand-sageDark">
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
                <Link className={`inline-flex min-h-9 items-center text-brand-sageDark hover:text-brand-sageDeep ${focusRing}`} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className={`inline-flex min-h-9 items-center text-brand-sageDark hover:text-brand-sageDeep ${focusRing}`} />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
