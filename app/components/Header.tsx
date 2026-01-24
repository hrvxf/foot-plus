"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={
        isHome
          ? "absolute top-0 left-0 right-0 z-20"
          : "sticky top-0 z-20 border-b border-brand-sageLight/40 bg-brand-offwhite/95 backdrop-blur"
      }
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
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
          />
        </Link>

        <div
          className={
            isHome
              ? "flex gap-6 text-sm font-medium text-white"
              : "flex gap-6 text-sm font-medium text-brand-charcoal"
          }
        >
          <Link className="transition hover:text-brand-sageLight" href="/about">
            About
          </Link>
          <Link className="transition hover:text-brand-sageLight" href="/book">
            Book
          </Link>
          <Link className="transition hover:text-brand-sageLight" href="/contact">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
