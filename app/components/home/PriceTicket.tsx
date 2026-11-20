import Link from "next/link";

import { prices } from "../../lib/site";
import { focusRing, texturedGreen } from "../site/ui";

/**
 * Home prices on their own green card, matching "Foot care for": "Simple, upfront prices." with the two
 * visit prices on a tilted tear-off ticket, and a link to the full prices page.
 */
export default function PriceTicket() {
  const [first, routine] = prices;
  const halves = [
    { label: "First visit", price: first.price },
    { label: "Routine", price: routine.price },
  ];
  return (
    <section className="px-4 py-6 md:py-10" aria-labelledby="prices-heading">
      <div className={`mx-auto max-w-[1200px] rounded-[28px] px-[22px] py-11 text-center md:py-16 ${texturedGreen}`}>
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-[#A8E6B8]">Prices</p>
        <h2
          id="prices-heading"
          className="mt-2.5 font-heading text-[2.125rem] font-semibold leading-[1.05] tracking-[-0.025em] text-white md:text-5xl"
        >
          Simple,
          <span className="block text-[#A8E6B8]">upfront prices.</span>
        </h2>
        <dl className="relative mx-auto mt-[26px] flex max-w-[330px] -rotate-2 rounded-[18px] bg-white text-left shadow-[0_22px_34px_-18px_rgba(0,0,0,0.45)]">
          {halves.map((half, index) => (
            <div key={half.label} className="contents">
              {index > 0 && (
                // Perforation, with notches cut out top and bottom in the card's green.
                <div
                  aria-hidden="true"
                  className="relative my-3 border-l-2 border-dashed border-brand-line before:absolute before:-left-[9px] before:-top-5 before:h-4 before:w-4 before:rounded-full before:bg-brand-sageDark after:absolute after:-bottom-5 after:-left-[9px] after:h-4 after:w-4 after:rounded-full after:bg-brand-sageDark"
                />
              )}
              <div className="flex-1 px-4 py-[18px]">
                <dt className="text-[0.65625rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">{half.label}</dt>
                <dd className="mt-1.5 font-heading text-[2.375rem] font-semibold leading-none text-brand-sageDeep">{half.price}</dd>
              </div>
            </div>
          ))}
        </dl>
        <Link
          href="/prices"
          className={`mt-[22px] inline-flex min-h-11 items-center text-[0.875rem] font-semibold text-white hover:text-[#A8E6B8] ${focusRing}`}
        >
          Full prices →
        </Link>
      </div>
    </section>
  );
}
