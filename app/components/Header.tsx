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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "About", href: "/about", active: pathname === "/about" },
    { label: "Services", href: "/#services", active: pathname === "/" },
    { label: "Prices", href: "/prices", active: pathname === "/prices" },
    { label: "Areas", href: "/areas", active: pathname === "/areas" },
  ];

  const headerBase =
    "sticky top-0 z-30 border-b transition-colors transition-shadow duration-300 relative pt-[env(safe-area-inset-top)]";

  // ✅ Only elevation + border changes (no text shifts)
  const headerChrome = isScrolled
    ? "border-white/25 shadow-[0_14px_40px_-26px_rgba(0,0,0,0.55)]"
    : "border-transparent shadow-none";

  // ✅ Glass comes in when scrolled
  const headerSurface = isScrolled
    ? "bg-white/10 backdrop-blur-xl"
    : "bg-brand-offwhite/95 backdrop-blur-0";

  const linkBase =
    "px-4 py-4 text-base font-medium transition border-b-2 border-transparent md:py-2";
  const navTracking = "tracking-normal";
  const navPadding = "py-4";
  const logoSize = "h-12 md:h-14";

  const linkTone = "text-brand-charcoal/80 hover:text-brand-sageDark";
  const activeBorder = "border-brand-sageDark";

  const bookButtonClasses =
    "rounded-full bg-brand-sage px-6 py-3 text-base font-semibold text-white hover:bg-brand-sageDark";

  return (
    <>
      <header className={`${headerBase} ${headerChrome}`}>
        {/* ✅ -top-px avoids Safari 1px seam */}
        <div
          className={`pointer-events-none absolute -top-px left-0 right-0 bottom-0 z-0 ${headerSurface}`}
          aria-hidden="true"
        />

        {/* ✅ Subtle glass highlight only when scrolled */}
        {isScrolled ? (
          <div
            className="pointer-events-none absolute -top-px left-0 right-0 h-px bg-white/35"
            aria-hidden="true"
          />
        ) : null}

        <nav
          className={`relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 ${navPadding}`}
        >
          <div className="flex h-full items-center">
            <Link href="/" className="flex items-center gap-3" aria-label="Foot Plus">
              <Image
                src="/images/footplus-logo-dark.png"
                alt="Foot+ Bristol logo"
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
            className="inline-flex items-center justify-center rounded-full border border-brand-sageLight/40 px-3 py-2 text-sm font-semibold text-brand-sageDark md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
        <div id="mobile-menu" className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-brand-offwhite/95"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-6 pt-20 text-brand-charcoal">
            <div className="flex items-center justify-between pb-6">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
                Menu
              </span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-brand-sageLight/40 px-3 py-2 text-sm font-semibold text-brand-sageDark"
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
                  className={`${linkBase} ${navTracking} ${linkTone} ${
                    link.active ? activeBorder : ""
                  }`}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link className={bookButtonClasses} href="/book" onClick={() => setIsMenuOpen(false)}>
                Book
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
