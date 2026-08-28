import Image from "next/image";
import Link from "next/link";
import { emailDisplay, emailHref } from "../lib/site";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/advice", label: "Advice" },
];

const locationLinks = [
  { href: "/locations", label: "All locations" },
  { href: "/locations/bristol", label: "Bristol" },
  { href: "/locations/southampton", label: "Southampton" },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="relative z-10 mt-4 w-full flex-none overflow-hidden bg-brand-sage text-white">
      <div className="absolute inset-0 bg-brand-sage bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px]" aria-hidden="true" />
      <div className="absolute inset-0 bg-brand-sage/72" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/8 via-transparent to-black/25" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-4 h-72 w-72 rounded-full bg-white/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-5 md:py-6">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.3fr_0.95fr_1.05fr] lg:items-start lg:gap-7">
          <div className="lg:flex lg:h-full lg:items-center lg:justify-center">
            <Link href="/" aria-label="Foot+ home" className="flex w-fit text-white">
              <Image
                src="/images/footplus-generic-logo_MASTER_FINAL.svg"
                alt="Foot+"
                width={188}
                height={59}
                className="h-11 w-auto md:h-12"
              />
            </Link>
          </div>

          <div className="border-t border-white/18 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">General enquiries</p>
            <a
              href={emailHref}
              className="mt-2 flex w-fit text-base font-semibold text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-white"
              data-analytics-id="footer-general-email"
            >
              {emailDisplay}
            </a>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60">Shared inbox for Bristol and Southampton</p>
            <a
              href="https://www.facebook.com/profile.php?id=61586341484139"
              target="_blank"
              rel="noreferrer"
              className="group mt-4 inline-flex items-center gap-3 text-sm font-semibold text-white/75 transition hover:text-white"
              aria-label="Visit Foot+ on Facebook"
              data-analytics-id="footer-facebook"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-sage transition-transform group-hover:-translate-y-0.5">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M13.39 24v-10.95h3.68l.55-4.27h-4.23V6.05c0-1.24.34-2.08 2.12-2.08h2.26V.15C17.38.1 16.07 0 14.55 0c-3.17 0-5.34 1.94-5.34 5.49v3.29H5.63v4.27h3.58V24h4.18Z" />
                </svg>
              </span>
              Facebook
            </a>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Explore</h2>
              <ul className="mt-3 space-y-2.5">
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
              <ul className="mt-3 space-y-2.5">
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

          <section className="rounded-2xl border border-white/18 bg-white/8 p-4 shadow-[0_20px_55px_-38px_rgba(0,0,0,0.65)] backdrop-blur-sm md:p-5" aria-labelledby="footer-booking-title">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Appointments</p>
            <h2 id="footer-booking-title" className="mt-2 font-heading text-xl font-semibold text-white">
              Looking to book?
            </h2>
            <Link
              href="/locations"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-sageDark shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              data-analytics-id="footer-choose-location"
            >
              Choose your location
            </Link>
          </section>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-white/15 pt-3 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
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
