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
    "sticky top-0 z-50 h-20 border-b border-transparent transition-colors duration-300";
  const headerSurface = isScrolled
    ? isHome
      ? "bg-white/10 backdrop-blur-xl border-white/15"
      : "bg-brand-offwhite/95 backdrop-blur border-brand-sageLight/40"
    : isHome
      ? "bg-transparent backdrop-blur-0"
      : "bg-brand-offwhite/80 backdrop-blur-0";

  const linkBase =
    "px-3 py-2 text-sm font-medium transition border-b-2 border-transparent";
  const linkTone = isHome
    ? "text-white/90 hover:text-white"
    : "text-brand-charcoal/80 hover:text-brand-sageDark";
  const activeBorder = isHome ? "border-white/60" : "border-brand-sageDark";
  const bookButtonClasses = isHome
    ? "rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
    : "rounded-full bg-brand-sage px-4 py-2 text-sm font-semibold text-white hover:bg-brand-sageDark";

  return (
    <header className={`${headerBase} ${headerSurface}`}>
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div
            className={`origin-left transition-transform duration-300 ${
              isScrolled ? "scale-[1.15]" : "scale-[1.5]"
            }`}
          >
            <Image
              src={
                isHome
                  ? "/images/footplus-logo-white.svg"
                  : "/images/footplus-logo-dark.svg"
              }
              alt="Foot+"
              width={140}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              className={`${linkBase} ${linkTone} ${link.active ? activeBorder : ""}`}
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
        <div
          className={`border-t px-6 pb-6 md:hidden ${
            isHome
              ? "border-white/20 bg-white/10 text-white/90 backdrop-blur-xl"
              : "border-brand-sageLight/30 bg-brand-offwhite/95 text-brand-charcoal"
          }`}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                className={`${linkBase} ${linkTone} ${link.active ? activeBorder : ""}`}
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
    </header>
  );
}
