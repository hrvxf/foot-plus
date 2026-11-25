import Image from "next/image";
import Link from "next/link";

import { serviceLocations } from "../../lib/locations";
import { portraits } from "../site/blocks";
import { focusRing } from "../site/ui";
import PostcodeChecker from "./PostcodeChecker";

/**
 * Desktop only (lg+): the practitioners and the postcode check, beside the hero statement. On phones the
 * same content stays at the foot of the page in `WhereWeVisit`, which is hidden from lg up.
 */
export default function HeroVisit() {
  const locations = Object.values(serviceLocations);
  return (
    <aside
      aria-labelledby="hero-visit-heading"
      className="hidden rounded-[28px] bg-white p-8 shadow-[0_24px_48px_-32px_rgba(36,48,40,0.35)] lg:block"
    >
      <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-brand-sageDark">Where we visit</p>
      <h2
        id="hero-visit-heading"
        className="mt-2 font-heading text-[1.875rem] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-charcoal"
      >
        Two practitioners.
        <span className="block text-brand-sage">Two cities.</span>
      </h2>
      <ul className="mt-6 grid gap-2">
        {locations.map((location) => {
          const first = location.practitioner?.name.split(" ")[0] ?? location.name;
          return (
            <li key={location.slug}>
              <Link
                href={`/locations/${location.slug}`}
                className={`group flex items-center gap-3 rounded-[18px] bg-brand-offwhite p-3 transition-colors hover:bg-brand-wash ${focusRing}`}
              >
                <Image
                  src={portraits[location.slug]}
                  alt=""
                  width={112}
                  height={112}
                  className="h-12 w-12 rounded-full object-cover object-[center_15%]"
                />
                <span className="font-heading text-[1.0625rem] font-semibold text-brand-charcoal">{first}</span>
                <span className="ml-auto pr-2 text-[0.9375rem] font-semibold text-brand-sageDark group-hover:text-brand-sageDeep">
                  {location.name} →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6">
        <PostcodeChecker tone="compact" source="home-hero" anchorId="check-postcode-hero" bookLocation={null} label="Postcode for the visit" />
      </div>
    </aside>
  );
}
