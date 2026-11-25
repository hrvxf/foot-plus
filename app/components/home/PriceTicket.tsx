import Link from "next/link";

import { prices } from "../../lib/site";
import { focusRing, texturedGreen } from "../site/ui";

/** The two visit prices on a tilted tear-off ticket. */
function Ticket({ className = "" }: { className?: string }) {
  const [first, routine] = prices;
  const halves = [
    { label: "First visit", price: first.price },
    { label: "Routine", price: routine.price },
  ];
  return (
    <dl className={`relative flex -rotate-2 rounded-[18px] bg-white text-left shadow-[0_22px_34px_-18px_rgba(0,0,0,0.45)] ${className}`}>
      {halves.map((half, index) => (
        <div key={half.label} className="contents">
          {index > 0 && (
            // Perforation, with notches cut out top and bottom in the card's green.
            <div
              aria-hidden="true"
              className="relative my-3 border-l-2 border-dashed border-brand-line before:absolute before:-left-[9px] before:-top-5 before:h-4 before:w-4 before:rounded-full before:bg-brand-sageDark after:absolute after:-bottom-5 after:-left-[9px] after:h-4 after:w-4 after:rounded-full after:bg-brand-sageDark"
            />
          )}
          <div className="flex-1 px-4 py-[18px] lg:px-[22px] lg:py-5">
            <dt className="text-[0.65625rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">{half.label}</dt>
            <dd className="mt-1.5 font-heading text-[2.375rem] font-semibold leading-none text-brand-sageDeep lg:text-[2.75rem]">{half.price}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

const fullPrices = `inline-flex min-h-11 items-center font-semibold text-white hover:text-[#A8E6B8] ${focusRing}`;

/**
 * Home prices on their own green card, matching "Foot care for": "Simple, upfront prices." with the two
 * visit prices on a tilted tear-off ticket, and a link to the full prices page. Phones and tablets only:
 * from lg up the ticket moves into the "Foot care for" band (`PriceTicketAside`).
 */
export default function PriceTicket() {
  return (
    <section className="px-4 py-6 md:px-6 md:py-10 lg:hidden" aria-labelledby="prices-heading">
      <div className={`mx-auto max-w-[1200px] rounded-[28px] px-[22px] py-11 text-center md:py-16 ${texturedGreen}`}>
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-[#A8E6B8]">Prices</p>
        <h2
          id="prices-heading"
          className="mt-2.5 font-heading text-[2.125rem] font-semibold leading-[1.05] tracking-[-0.025em] text-white md:text-5xl"
        >
          Simple,
          <span className="block text-[#A8E6B8]">upfront prices.</span>
        </h2>
        <Ticket className="mx-auto mt-[26px] max-w-[330px]" />
        <Link href="/prices" className={`mt-[22px] text-[0.875rem] ${fullPrices}`}>
          Full prices →
        </Link>
      </div>
    </section>
  );
}

/** Desktop only (lg+): the prices ticket on the right of the "Foot care for" band. */
export function PriceTicketAside() {
  return (
    <div className="hidden flex-col items-end gap-4 lg:flex">
      <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-[#A8E6B8]">Prices</h2>
      <Ticket className="w-[380px]" />
      <Link href="/prices" className={`text-base ${fullPrices}`}>
        Full prices →
      </Link>
    </div>
  );
}
