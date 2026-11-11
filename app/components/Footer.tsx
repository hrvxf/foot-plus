import Link from "next/link";
import { emailDisplay, emailHref } from "../lib/site";
import { rule, shell } from "./site/ui";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/advice", label: "Advice" },
  { href: "/about", label: "About Foot+" },
  { href: "/toenail-cutting-bristol", label: "Bristol nail care" },
];

const locationLinks = [
  { href: "/locations", label: "All locations" },
  { href: "/locations/bristol", label: "Bristol" },
  { href: "/locations/southampton", label: "Southampton" },
];

const legalLinks = [
  { href: "/forms", label: "Forms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const heading = "font-heading text-base font-semibold text-brand-charcoal";
// 44px-tall rows so every footer link is an easy target on a phone.
const link =
  "inline-flex min-h-11 items-center text-base md:min-h-9 text-brand-charcoal underline-offset-4 transition-colors duration-150 hover:text-brand-sageDeep hover:underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";

export default function Footer() {
  return (
    <footer id="site-footer" className={`relative z-10 w-full flex-none bg-brand-offwhite text-brand-charcoal`}>
      <div className={`${shell} py-10`}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.1fr_1.4fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" aria-label="Foot+ home" className="inline-flex focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-brand-sageDark">
              {/* The generic logo file is white, so it is used as a mask and coloured here. */}
              <span
                role="img"
                aria-label="Foot+"
                className="block h-11 w-[140px] bg-brand-sageDark [mask:url('/images/footplus-generic-logo_MASTER_FINAL.svg')_left_center/contain_no-repeat]"
              />
            </Link>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h2 className={heading}>General enquiries</h2>
            <a href={emailHref} className={`${link} font-semibold underline`} data-analytics-id="footer-general-email">
              {emailDisplay}
            </a>
            <p className="text-base text-brand-muted">Shared inbox for Bristol and Southampton</p>
            <a
              href="https://www.facebook.com/profile.php?id=61586341484139"
              target="_blank"
              rel="noreferrer"
              className={`${link} mt-1 gap-2`}
              aria-label="Visit Foot+ on Facebook"
              data-analytics-id="footer-facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-brand-sageDark">
                <path d="M13.39 24v-10.95h3.68l.55-4.27h-4.23V6.05c0-1.24.34-2.08 2.12-2.08h2.26V.15C17.38.1 16.07 0 14.55 0c-3.17 0-5.34 1.94-5.34 5.49v3.29H5.63v4.27h3.58V24h4.18Z" />
              </svg>
              Facebook
            </a>
          </div>

          <nav aria-label="Footer navigation" className="contents">
            <div>
              <h2 className={heading}>Explore</h2>
              <ul>
                {exploreLinks.map((item) => (
                  <li key={item.href}>
                    <Link className={link} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={heading}>Locations</h2>
              <ul>
                {locationLinks.map((item) => (
                  <li key={item.href}>
                    <Link className={link} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className={`mt-8 flex flex-col gap-2 border-t ${rule} pt-4 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="text-base text-brand-muted">&copy; {new Date().getFullYear()} Foot+</p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-x-6">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link className={link} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
