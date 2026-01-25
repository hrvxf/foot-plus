"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
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
    "sticky top-0 z-50 border-b border-transparent transition-colors transition-shadow duration-300 relative";
  const headerChrome = isScrolled
    ? isHome
      ? "border-white/15 shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
      : "border-brand-sageLight/40 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
    : "shadow-none";
  const headerSurface = isScrolled
    ? isHome
      ? "bg-white/10 backdrop-blur-xl"
      : "bg-brand-offwhite/95 backdrop-blur"
    : isHome
      ? "bg-transparent backdrop-blur-0"
      : "bg-brand-offwhite/80 backdrop-blur-0";
  const mobileMenuSurface = isHome
    ? "bg-white/10 backdrop-blur-xl"
    : "bg-brand-offwhite/95";
  const mobileMenuBorder = isHome ? "border-white/20" : "border-brand-sageLight/30";
  const mobileMenuText = isHome ? "text-white/90" : "text-brand-charcoal";

  const linkBase =
    "px-4 py-2 text-base font-medium transition border-b-2 border-transparent";
  const navTracking = isScrolled ? "tracking-normal" : "tracking-wide";
  const navPadding = isScrolled ? "py-3" : "py-5";
  const logoSize = isScrolled ? "h-12" : "h-16";
  const linkTone = isHome
    ? "text-white/90 hover:text-white"
    : "text-brand-charcoal/80 hover:text-brand-sageDark";
  const activeBorder = isHome ? "border-white/60" : "border-brand-sageDark";
  const bookButtonClasses = isHome
    ? "rounded-full border border-white/20 bg-white/15 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
    : "rounded-full bg-brand-sage px-6 py-3 text-base font-semibold text-white hover:bg-brand-sageDark";

  return (
    <header className={`${headerBase} ${headerChrome}`}>
      <div className={`pointer-events-none absolute inset-0 ${headerSurface}`} aria-hidden="true" />
      <nav
        className={`relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${navPadding}`}
      >
        <div className="flex h-full items-center">
          <Link href="/" className="flex items-center gap-3" aria-label="Foot Plus">
            <div className={`transition-[height,opacity] duration-300 ${logoSize} opacity-100`}>
              <Image
                src={
                  isHome
                    ? "/images/footplus-logo-white.svg"
                    : "/images/footplus-logo-dark.svg"
                }
                alt=""
                aria-hidden="true"
                width={140}
                height={40}
                priority
                className="block h-full w-auto"
              />
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              className={`${linkBase} ${navTracking} ${linkTone} ${link.active ? activeBorder : ""}`}
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
          className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-semibold md:hidden ${
            isHome
              ? "border-white/30 text-white/90 hover:text-white"
              : "border-brand-sageLight/40 text-brand-sageDark"
          }`}
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
            <path d={isMenuOpen ? "M6 6l12 12M18 6l-12 12" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>
      </nav>
      {isMenuOpen ? (
        <div className={`relative border-t md:hidden ${mobileMenuBorder}`}>
          <div
            className={`pointer-events-none absolute inset-0 ${mobileMenuSurface}`}
            aria-hidden="true"
          />
          <div className={`relative z-10 px-6 pb-6 ${mobileMenuText}`}>
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  className={`${linkBase} ${navTracking} ${linkTone} ${link.active ? activeBorder : ""}`}
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
        </div>
      ) : null}
    </header>
  );
}
