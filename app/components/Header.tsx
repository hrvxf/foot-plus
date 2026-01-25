"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Small threshold stops iOS “bounce at 0px” flicker
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "About", href: "/about", active: pathname === "/about" },
    { label: "Services", href: "/#services", active: pathname === "/" },
    { label: "Contact", href: "/contact", active: pathname === "/contact" },
  ];

  // No always-on border; add border only when scrolled to avoid iOS seams.
  const headerBase =
    "sticky top-0 z-40 transition-colors transition-shadow duration-300 relative pt-[env(safe-area-inset-top)]";

  // Elevation + border changes (no layout shifts)
  const headerChrome = isScrolled
    ? "border-b border-white/20 shadow-[0_14px_40px_-26px_rgba(0,0,0,0.55)]"
    : "border-b border-transparent shadow-none";

  // Glass comes in when scrolled; otherwise transparent so texture is continuous behind.
  const headerSurface = isScrolled
    ? "bg-white/12 backdrop-blur-xl"
    : "bg-transparent backdrop-blur-0";

  const linkBase =
    "px-4 py-3 text-base font-medium transition border-b-2 border-transparent md:py-2";
  const navTracking = "tracking-normal";
  const navPadding = "py-4";
  const logoSize = "h-12 md:h-14";

  const linkTone = "text-brand-charcoal/80 hover:text-brand-sageDark";
  const activeBorder = "border-brand-sageDark";

  const bookButtonClasses =
    "rounded-full bg-brand-sage px-6 py-3 text-base font-semibold text-white hover:bg-brand-sageDark";

  const burgerBase =
    "inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-semibold md:hidden transition";
  const burgerTone = isScrolled
    ? "border-white/25 text-white bg-white/10 backdrop-blur-md"
    : "border-brand-sageLight/40 text-brand-sageDark bg-transparent";

  return (
    <>
      <header className={`${headerBase} ${headerChrome}`}>
        {/* Surface layer */}
        <div
          className={`pointer-events-none absolute -top-px left-0 right-0 bottom-0 z-0 ${headerSurface}`}
          aria-hidden="true"
        />

        {/* Subtle glass highlight only when scrolled (kept soft to avoid “cut line”) */}
        {isScrolled ? (
          <div
            className="pointer-events-none absolute -top-px left-0 right-0 h-px bg-white/20"
            aria-hidden="true"
          />
        ) : null}

        <nav
          className={`relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 ${navPadding}`}
        >
          <div className="flex h-full items-center">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Foot Plus"
            >
              <Image
                src="/images/footplus-logo-dark.png"
                alt=""
                aria-hidden="true"
                width={360}
                height={140}
                priority
                sizes="(max-width: 768px) 200px, 280px"
                className={`block w-auto ${logoSize}`}
              />
            </Link>
          </div>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                className={`${linkBase} ${navTracking} ${linkTone} ${
                  link.active ? activeBorder : ""
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            <Link className={bookButtonClasses} href="/book">
              Book
            </Link>
          </div>

          <button
            type="button"
            className={`${burgerBase} ${burgerTone}`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Open navigation</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path
                d={
                  isMenuOpen
                    ? "M6 6l12 12M18 6l-12 12"
                    : "M4 7h16M4 12h16M4 17h16"
                }
              />
            </svg>
          </button>
        </nav>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop (glass + tint) */}
          <button
            type="button"
            className="absolute inset-0 bg-black/20 backdrop-blur-xl"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-6 pt-20 text-white">
            {/* Glass surface for the panel */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-white/10 backdrop-blur-2xl"
              aria-hidden="true"
            />

            <div className="flex items-center justify-between pb-6">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                Menu
              </span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur-md"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  className={`${linkBase} ${navTracking} text-white/90 hover:text-white ${
                    link.active ? "border-white/60" : ""
                  }`}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                className={bookButtonClasses}
                href="/book"
                onClick={() => setIsMenuOpen(false)}
              >
                Book
              </Link>

              <Link
                className={`${linkBase} text-white/90 hover:text-white`}
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Call / WhatsApp
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
