"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { Phone } from "lucide-react";
import AnimatedFootPlusLogo from "./AnimatedFootPlusLogo";
import CallButton from "./site/CallButton";
import { phoneForPath } from "../lib/site";
import { focusRing } from "./site/ui";

// "+" marks sprinkled in the corners of the open menu card (brand guide §4).
const plusMarks = [
  { left: 14, top: 10, fontSize: 34, "--o": 0.5 },
  { right: 20, top: 40, fontSize: 20, "--o": 0.35 },
  { right: 12, top: 150, fontSize: 44, "--o": 0.6 },
  { left: 22, top: 170, fontSize: 18, "--o": 0.3 },
] as unknown as CSSProperties[];

/**
 * Floating pill header (Nov 2026). Phones: full width at the top of the page,
 * shrinks to a small centred pill (logo + menu) once you scroll, and the menu
 * grows out of it as a white card. Desktop: one wide pill with the links inline.
 * Styles for the states live under .site-pill in globals.css.
 */
export default function Header() {
  const pathname = usePathname();
  // The patient forms page keeps one direct number for help. Every other call
  // button goes through CallButton, which asks Bristol or Southampton on shared pages.
  const { href: phoneHref } = phoneForPath(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Small threshold stops iOS "bounce at 0px" flicker.
      setIsScrolled(window.scrollY > 8);
      // Shrink only once the page's hero (the home statement, the location intro)
      // has fully scrolled away under the header. Other pages: after a short scroll.
      const hero = document.querySelector("[data-page-hero]");
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 84;
      setIsPastHero(hero ? hero.getBoundingClientRect().bottom <= headerBottom : window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Services", href: "/services", active: pathname === "/services" },
    { label: "Prices", href: "/prices", active: pathname === "/prices" },
    { label: "Locations", href: "/locations", active: pathname.startsWith("/locations") },
    { label: "About", href: "/about", active: pathname === "/about" },
  ];

  // Draw the logo once, on the page the visitor lands on (still static when landing
  // on the home page, as before). The header persists across navigations,
  // so freezing this at first render stops the logo redrawing on every click.
  const [shouldAnimateLogo] = useState(() => pathname !== "/");

  // Patients reach /forms after they have already enquired (usually from a WhatsApp
  // follow-up). Hide "Request a visit" there so they don't submit a second enquiry.
  const isPatientFormPage = pathname.startsWith("/forms");

  const close = () => setIsMenuOpen(false);
  const isGlass = isScrolled && !isMenuOpen;
  const isSmall = isPastHero;

  const round = `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${focusRing}`;
  const pillButton = `inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-sageDark px-5 text-base font-semibold text-white transition-colors duration-150 hover:bg-brand-sageDeep ${focusRing}`;

  return (
    <header className="pointer-events-none sticky top-0 z-30 px-3 pb-3 pt-[calc(env(safe-area-inset-top)+12px)] md:px-6">
      <div
        className="site-pill-scrim fixed inset-0 bg-brand-charcoal/25 md:hidden"
        data-open={isMenuOpen}
        aria-hidden="true"
        onClick={close}
      />

      <div
        className="site-pill pointer-events-auto relative mx-auto overflow-hidden rounded-[30px] bg-white/95 shadow-[0_10px_30px_-18px_rgba(36,48,40,0.35),0_0_0_1px_rgba(220,229,222,0.8)]"
        data-open={isMenuOpen}
        data-small={isSmall}
        data-glass={isGlass}
      >
        <nav className="flex h-[60px] items-center justify-between gap-2 pl-[18px] pr-2 md:pl-6" aria-label="Main">
          <Link href="/" className={`flex shrink-0 items-center rounded-lg ${focusRing}`} aria-label="Foot+ home" onClick={close}>
            <div data-header-logo className="relative h-[34px] w-[106px] text-brand-sageDark md:h-[38px] md:w-[120px]">
              <AnimatedFootPlusLogo className="h-full w-full" animate={shouldAnimateLogo} yieldToIntro />
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex lg:gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-base font-medium transition-colors lg:px-4 ${focusRing} ${
                  link.active ? "text-brand-sage" : "text-brand-charcoal/80 hover:text-brand-sageDark"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <CallButton
              className={`hidden items-center gap-2 rounded-full px-3 py-2 text-base font-semibold text-brand-sageDark hover:text-brand-sageDeep lg:inline-flex ${focusRing}`}
              analyticsId="header-phone"
            >
              {(number) => (
                <>
                  <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                  {number ?? "Call us"}
                </>
              )}
            </CallButton>
            {isPatientFormPage ? (
              <a className={pillButton} href={phoneHref} data-analytics-id="header-forms-phone">
                <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                Call for help
              </a>
            ) : (
              <Link className={pillButton} href="/book">
                Request a visit
              </Link>
            )}
          </div>

          {/* Phones */}
          <div className="flex items-center gap-1.5 md:hidden">
            <CallButton
              className={`site-pill-call ${round} bg-brand-wash text-brand-sageDeep hover:bg-brand-line`}
              label="Call Foot+"
              analyticsId="header-mobile-phone"
            >
              {() => <Phone className="h-5 w-5" aria-hidden="true" />}
            </CallButton>
            <button
              type="button"
              className={`${round} bg-brand-sageDark text-white`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="relative h-3 w-[18px]" aria-hidden="true">
                <span className="site-pill-bar" style={{ top: 2 }} />
                <span className="site-pill-bar" style={{ top: 8 }} />
              </span>
            </button>
          </div>
        </nav>

        <div id="site-menu" className="site-pill-panel md:hidden" inert={!isMenuOpen}>
          <div className="overflow-hidden">
            <div className="relative px-6 pb-6 pt-6 text-center">
              {plusMarks.map((mark, index) => (
                <span
                  key={index}
                  className="site-pill-plus pointer-events-none absolute font-heading font-semibold leading-none text-brand-sage"
                  style={mark}
                  aria-hidden="true"
                >
                  +
                </span>
              ))}
              <div className="flex flex-col items-center">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    aria-current={link.active ? "page" : undefined}
                    style={{ "--i": index } as CSSProperties}
                    className={`site-pill-item rounded-xl px-3 font-heading text-[2.125rem] font-semibold leading-[1.3] tracking-[-0.02em] ${focusRing} ${
                      link.active ? "text-brand-sage" : "text-brand-charcoal"
                    }`}
                  >
                    {link.label}
                    {link.active ? "." : null}
                  </Link>
                ))}
              </div>
              <div
                className="site-pill-item mx-auto mt-5 h-[3px] w-[60px] rounded-full bg-brand-sage"
                style={{ "--i": navLinks.length } as CSSProperties}
                aria-hidden="true"
              />
              {isPatientFormPage ? null : (
                <Link
                  href="/book"
                  onClick={close}
                  style={{ "--i": navLinks.length + 1 } as CSSProperties}
                  className={`site-pill-item mt-6 flex h-[52px] w-full items-center justify-center rounded-full bg-brand-sageDark text-base font-semibold text-white transition-colors hover:bg-brand-sageDeep ${focusRing}`}
                >
                  Request a visit
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
