import Image from "next/image";
import Link from "next/link";

import { serviceLocations } from "../../lib/locations";
import { portraits } from "../site/blocks";
import { focusRing } from "../site/ui";
import PostcodeChecker from "./PostcodeChecker";

/** Home: the two practitioners, each linking to their location page, then the postcode check. */
export default function WhereWeVisit({ checkerId }: { checkerId: string }) {
  const locations = Object.values(serviceLocations);
  return (
    <section className="border-t border-brand-line bg-white py-14 text-center md:py-20" aria-labelledby="where-heading">
      <div className="mx-auto w-full max-w-md px-6">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-brand-sageDark">Where we visit</p>
        <h2
          id="where-heading"
          className="mt-2.5 font-heading text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal md:text-4xl"
        >
          Two practitioners. <span className="text-brand-sage">Two cities.</span>
        </h2>
        <ul className="mt-6 flex justify-center gap-7">
          {locations.map((location) => {
            const first = location.practitioner?.name.split(" ")[0] ?? location.name;
            return (
              <li key={location.slug}>
                <Link href={`/locations/${location.slug}`} className={`group flex flex-col items-center gap-2 rounded-2xl p-1 ${focusRing}`}>
                  <Image
                    src={portraits[location.slug]}
                    alt=""
                    width={168}
                    height={168}
                    className="h-[84px] w-[84px] rounded-full object-cover object-[center_15%] shadow-[0_0_0_4px_#fff,0_0_0_5px_var(--color-brand-line)]"
                  />
                  <span className="font-heading text-[1.0625rem] font-semibold text-brand-charcoal">{first}</span>
                  <span className="text-[0.78125rem] font-semibold text-brand-sageDark group-hover:text-brand-sageDeep">
                    {location.name} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8">
          <PostcodeChecker
            tone="compact"
            source="home"
            anchorId={checkerId}
            bookLocation={null}
            label="Postcode for the visit"
          />
        </div>
      </div>
    </section>
  );
}
