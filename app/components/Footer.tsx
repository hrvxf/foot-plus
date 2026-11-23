import Link from "next/link";

import CookieSettingsButton from "./CookieSettingsButton";
import Doormat from "./site/Doormat";
import LgbtqFriendly from "./site/LgbtqFriendly";
import { shell } from "./site/ui";

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

const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";

/**
 * Site footer: the Foot+ doormat on the doorstep, then one row of links, the trust line and the small print.
 * Contact details live in each page's own sections, so the footer stays a calm sign-off.
 */
export default function Footer() {
  return (
    <footer id="site-footer" className="relative z-10 w-full flex-none overflow-hidden bg-brand-offwhite text-center text-brand-charcoal">
      <Doormat />

      <div className={`${shell} max-w-xl pb-6`}>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center">
            {exploreLinks.map((item, index) => (
              <li key={item.href} className="relative">
                {index > 0 && (
                  <span aria-hidden="true" className="absolute -left-0.5 top-1/2 -translate-y-1/2 text-brand-sageLight">
                    ·
                  </span>
                )}
                <Link
                  href={item.href}
                  className={`inline-flex min-h-9 items-center px-[7px] text-[0.90625rem] font-medium text-brand-sageDark transition-colors hover:text-brand-sageDeep ${focus}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-3 text-[0.65625rem] font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
          Qualified · Insured · DBS-checked
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-brand-line pt-3.5 text-[0.78125rem] text-brand-muted">
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=61586341484139"
              target="_blank"
              rel="noreferrer"
              className={`-ml-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-brand-sageDark/10 ${focus}`}
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
                  <Link className={`inline-flex min-h-9 items-center text-brand-sageDark hover:text-brand-sageDeep ${focus}`} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className={`inline-flex min-h-9 items-center text-brand-sageDark hover:text-brand-sageDeep ${focus}`} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
