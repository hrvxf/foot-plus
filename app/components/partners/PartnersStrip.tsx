import Link from "next/link";

import { partnersFor, type PartnerLocation } from "../../lib/partners";
import { focusRing, shell } from "../site/ui";
import PartnerLogo from "./PartnerLogo";

/** Below this many partners the logos sit still in a centred row; from here on they drift past. */
const DRIFT_FROM = 3;

/**
 * Location page "Connected care": a short line and the location's partner logos, with a button through to
 * /partners. Hidden until the location has a published partner.
 */
export default function PartnersStrip({ id, location }: { id: string; location: PartnerLocation }) {
  const partners = partnersFor(location);
  if (!partners.length) return null;
  const drift = partners.length >= DRIFT_FROM;
  const tile = "h-[76px] w-[170px] flex-none border border-brand-line bg-white";

  return (
    <section id={id} className="scroll-mt-24 bg-brand-offwhite py-16 text-center md:py-24" aria-labelledby={`${id}-heading`}>
      <div className={shell}>
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">Connected care</p>
        <h2
          id={`${id}-heading`}
          className="mt-3 font-heading text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal md:text-5xl"
        >
          More than feet?
          <span className="block text-brand-sage">We know who to call.</span>
        </h2>
      </div>

      <ul className="sr-only">
        {partners.map((partner) => (
          <li key={partner.slug}>{partner.name}</li>
        ))}
      </ul>

      {drift ? (
        <div
          aria-hidden="true"
          className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] md:mt-12"
        >
          <div className="partner-drift flex w-max gap-3" style={{ animationDuration: `${partners.length * 5}s` }}>
            {[...partners, ...partners].map((partner, index) => (
              <PartnerLogo key={index} partner={partner} decorative className={tile} />
            ))}
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className={`${shell} mt-8 flex flex-wrap justify-center gap-3 md:mt-12`}>
          {partners.map((partner) => (
            <PartnerLogo key={partner.slug} partner={partner} decorative className={tile} />
          ))}
        </div>
      )}

      <Link
        href={`/partners?location=${location}`}
        className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-sageDark px-6 font-semibold text-white transition-colors hover:bg-brand-sageDeep md:mt-10 ${focusRing}`}
      >
        Meet our partners
      </Link>
    </section>
  );
}
