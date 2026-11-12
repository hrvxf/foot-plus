import Link from "next/link";
import FooterEmail from "./FooterEmail";
import { rule, shell } from "./site/ui";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/advice", label: "Advice" },
  { href: "/about", label: "About Foot+" },
  { href: "/toenail-cutting", label: "Nail cutting" },
];

const locationLinks = [
  { href: "/locations/bristol", label: "Bristol" },
  { href: "/locations/southampton", label: "Southampton" },
];

const legalLinks = [
  { href: "/forms", label: "Forms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

// Small grey labels above each group, so the links carry the weight.
const label = "text-sm text-brand-muted";
// 36px rows: comfortably tappable without the tall gaps of a full 44px row.
const link =
  "inline-flex min-h-9 items-center text-[0.9375rem] text-brand-charcoal underline-offset-4 transition-colors duration-150 hover:text-brand-sageDeep hover:underline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";

const legalLink = link.replace("text-[0.9375rem]", "text-sm");

function LinkGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className={`${label} mb-1`}>{title}</h2>
      <ul>
        {links.map((item) => (
          <li key={item.href}>
            <Link className={link} href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="site-footer" className="relative z-10 w-full flex-none bg-brand-offwhite text-brand-charcoal">
      <div className={`${shell} pb-6 pt-8 md:pt-10`}>
        <div className="grid gap-y-5 md:grid-cols-[1.4fr_1fr_1fr] md:gap-x-10">
          <div>
            <div className="flex items-center justify-between md:justify-start md:gap-3">
              <Link
                href="/"
                aria-label="Foot+ home"
                className="inline-flex focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-brand-sageDark"
              >
                {/* The generic logo file is white, so it is used as a mask and coloured here. */}
                <span
                  role="img"
                  aria-label="Foot+"
                  className="block h-9 w-[115px] bg-brand-sageDark [mask:url('/images/footplus-generic-logo_MASTER_FINAL.svg')_left_center/contain_no-repeat]"
                />
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61586341484139"
                target="_blank"
                rel="noreferrer"
                className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-brand-sageDark/10 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark md:mr-0"
                aria-label="Visit Foot+ on Facebook"
                title="Foot+ on Facebook"
                data-analytics-id="footer-facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px] fill-brand-sageDark">
                  <path d="M13.39 24v-10.95h3.68l.55-4.27h-4.23V6.05c0-1.24.34-2.08 2.12-2.08h2.26V.15C17.38.1 16.07 0 14.55 0c-3.17 0-5.34 1.94-5.34 5.49v3.29H5.63v4.27h3.58V24h4.18Z" />
                </svg>
              </a>
            </div>
            <div className="mt-4 flex flex-col items-start">
              <FooterEmail
                headingClass={label}
                linkClass="inline-flex min-h-9 items-center text-base font-semibold text-brand-charcoal underline underline-offset-4 hover:text-brand-sageDeep focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
              />
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className={`grid grid-cols-2 gap-x-4 border-t ${rule} pt-5 md:contents`}
          >
            <LinkGroup title="Explore" links={exploreLinks} />
            <LinkGroup title="Locations" links={locationLinks} />
          </nav>
        </div>

        <div className={`mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t ${rule} pt-3 md:mt-8`}>
          <p className="text-sm text-brand-muted">&copy; {new Date().getFullYear()} Foot+</p>
          <nav aria-label="Legal links">
            <ul className="flex gap-x-4">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link className={legalLink} href={item.href}>
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
