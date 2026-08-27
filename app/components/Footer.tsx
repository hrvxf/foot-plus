import Image from "next/image";
import Link from "next/link";
import { emailDisplay, emailHref } from "../lib/site";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/advice", label: "Advice" },
  { href: "/about", label: "About Foot+" },
];

const locationLinks = [
  { href: "/locations", label: "All locations" },
  { href: "/locations/bristol", label: "Bristol" },
  { href: "/locations/southampton", label: "Southampton" },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="relative z-10 mt-8 w-full flex-none overflow-hidden bg-brand-sage text-white">
      <div className="absolute inset-0 bg-brand-sage bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px]" aria-hidden="true" />
      <div className="absolute inset-0 bg-brand-sage/72" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/8 via-transparent to-black/25" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-4 h-72 w-72 rounded-full bg-white/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.9fr_1.1fr] lg:items-start">
          <div className="max-w-sm">
            <Link href="/" aria-label="Foot+ home" className="inline-flex text-white">
              <Image
                src="/images/footplus-generic-logo_MASTER_FINAL.svg"
                alt="Foot+"
                width={188}
                height={59}
                className="h-12 w-auto md:h-14"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              Professional, respectful foot care delivered in the comfort of home through your local Foot+ service.
            </p>
            <a
              href={emailHref}
              className="mt-5 inline-flex text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-white"
              data-analytics-id="footer-general-email"
            >
              {emailDisplay}
            </a>
            <p className="mt-1 text-xs text-white/55">General enquiries for all locations</p>
            <Link
              href="/locations"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
            >
              Find your local Foot+
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Explore</h2>
              <ul className="mt-4 space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link className="text-sm text-white/80 transition hover:text-white" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Locations</h2>
              <ul className="mt-4 space-y-3">
                {locationLinks.map((link) => (
                  <li key={link.href}>
                    <Link className="text-sm text-white/80 transition hover:text-white" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <section className="rounded-3xl border border-white/18 bg-white/10 p-6 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm md:p-7" aria-labelledby="footer-booking-title">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Appointments</p>
            <h2 id="footer-booking-title" className="mt-3 font-heading text-2xl font-semibold text-white">
              Looking to book?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Choose your area to see the correct practitioner, coverage and contact details before requesting an appointment.
            </p>
            <Link
              href="/locations"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-sageDark shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              data-analytics-id="footer-choose-location"
            >
              Choose your location
            </Link>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Foot+</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="transition hover:text-white" href="/forms">Forms</Link>
            <Link className="transition hover:text-white" href="/privacy">Privacy</Link>
            <Link className="transition hover:text-white" href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
