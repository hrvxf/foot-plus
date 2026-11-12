import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { displayH1, displayH3, lead, rule, shell, supporting } from "../components/site/ui";
import { serviceLocations } from "../lib/locations";
import { prices, SITE_URL } from "../lib/site";

// Short chooser so location-neutral links (the footer's "Nail cutting") can
// send people to the right town's page. Each town page does the ranking work.

const canonical = `${SITE_URL}/toenail-cutting`;
const title = "Toenail Cutting at Home in Bristol and Southampton | Foot+";
const description = `Toenail cutting at home from a qualified Foot Health Practitioner, in Bristol and Southampton. First visit ${prices[0].price}, returning visits ${prices[1].price}.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { url: canonical, title, description, siteName: "Foot+" },
  robots: { index: true, follow: true },
};

const towns = [
  { location: serviceLocations.bristol, href: "/toenail-cutting-bristol" },
  { location: serviceLocations.southampton, href: "/toenail-cutting-southampton" },
];

export default function ToenailCuttingPage() {
  return (
    <section className="py-12 md:py-20" aria-labelledby="nails-hub-heading">
      <div className={shell}>
        <h1 id="nails-hub-heading" className={displayH1}>
          Toenail cutting at home
        </h1>
        <p className={`${lead} mt-4 max-w-[52ch]`}>Choose your area.</p>

        <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
          {towns.map(({ location, href }) => (
            <li key={location.slug}>
              <Link
                href={href}
                className={`group flex items-center justify-between gap-4 rounded-2xl border ${rule} bg-white p-6 transition-colors hover:border-brand-sageDeep focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark`}
              >
                <span>
                  <span className={`${displayH3} block underline-offset-4 group-hover:underline`}>
                    Toenail cutting in {location.name}
                  </span>
                  <span className={`${supporting} mt-1 block`}>With {location.practitioner?.name}</span>
                </span>
                <ArrowRight className="h-6 w-6 shrink-0 text-brand-sageDeep" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <p className={`${supporting} mt-8`}>
          First visit {prices[0].price}, returning visits {prices[1].price}.{" "}
          <Link href="/services#toenail-cutting" className="underline underline-offset-4 hover:text-brand-sageDeep">
            About the service
          </Link>
        </p>
      </div>
    </section>
  );
}
