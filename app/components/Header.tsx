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
    const onScroll = () => setIsScrolled(window.scrollY > 0);
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

  const headerBase =
    "sticky top-0 z-30 border-b border-transparent transition-colors transition-shadow duration-300 relative pt-[env(safe-area-inset-top)]";

  // ✅ Only the “elevation” changes on scroll (no opacity / blur / font shifts)
  const headerChrome = isScrolled
    ? "border-brand-sageLight/40 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
    : "border-transparent shadow-none";

  // ✅ Constant surface prevents translucent snap + font rasterization changes
  const headerSurface = "bg-brand-offwhite/95 backdrop-blur";

  const linkBase =
    "px-4 py-3 text-base font-medium transition border-b-2 border-transparent md:py-2";

  // ✅ Constant tracking prevents nav text “wiggle”
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
        <div
          className={`pointer-events-none absolute -top-px left-0 right-0 bottom-0 z-0 ${headerSurface}`}
          aria-hidden="true"
        />
        <nav
          className={`relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${navPadding}`}
        >
          <div className="flex h-full items-center">
            <Link href="/" className="flex items-center gap-3" aria-label="Foot Plus">
              <Image
                src="/images/footplus-logo-dark.png"
                alt=""
                aria-hidden="true"
                width={360}
                height={140}
                priority
                sizes="(max-width: 768px) 200px, 280px"
                className={`block w-auto transition-[height] duration-300 ${logoSize}`}
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-offwhite/95 px-6 pb-6 pt-24 text-brand-charcoal md:hidden">
          <div className="flex flex-col gap-2">
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
            <Link className={`${linkBase} ${linkTone}`} href="/contact">
              Call / WhatsApp
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
