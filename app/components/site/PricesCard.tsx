import Link from "next/link";

import { prices } from "../../lib/site";
import { focusRing, texturedGreen } from "./ui";

/** Desktop only (lg+): the two visit prices on a green card, beside "What's included". */
export default function PricesCard() {
  const tickets = [
    { tag: "First visit", price: prices[0].price, detail: "About 60 minutes", tilt: "-rotate-2" },
    { tag: "Returning", price: prices[1].price, detail: "About 45 minutes", tilt: "rotate-2" },
  ];
  return (
    <div className={`hidden rounded-[28px] px-10 py-12 text-center lg:block ${texturedGreen}`}>
      <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-[#A8E6B8]">Prices</h2>
      <div className="mt-4 flex justify-center gap-3.5">
        {tickets.map((ticket) => (
          <div
            key={ticket.tag}
            className={`min-w-[140px] rounded-[18px] bg-white px-[22px] py-[18px] shadow-[0_22px_34px_-18px_rgba(0,0,0,0.45)] ${ticket.tilt}`}
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">{ticket.tag}</p>
            <p className="mt-1.5 font-heading text-[2.75rem] font-semibold leading-none text-brand-sageDeep">{ticket.price}</p>
            <p className="mt-1.5 text-[0.8125rem] text-brand-muted">{ticket.detail}</p>
          </div>
        ))}
      </div>
      <Link href="/prices" className={`mt-5 inline-flex min-h-11 items-center text-base font-semibold text-white hover:text-[#A8E6B8] ${focusRing}`}>
        Travel and prices <span aria-hidden="true">&nbsp;→</span>
      </Link>
    </div>
  );
}
