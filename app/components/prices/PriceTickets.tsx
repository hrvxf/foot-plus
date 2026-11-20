"use client";

import { useState } from "react";
import { focusRing } from "../site/ui";

export type Ticket = {
  tag: string;
  name: string;
  price: string;
  duration: string;
  points: string[];
};

/**
 * Two tilted tear-off tickets (the home page's price ticket, grown up). Tap one
 * to open what's included; each opens and closes on its own.
 */
export default function PriceTickets({ tickets }: { tickets: Ticket[] }) {
  const [open, setOpen] = useState<boolean[]>(() => tickets.map(() => false));

  return (
    <div className="mx-auto flex max-w-md flex-col gap-3.5 px-[18px] md:max-w-3xl md:flex-row md:items-start md:gap-6">
      {tickets.map((ticket, index) => {
        const isOpen = open[index];
        const panelId = `ticket-${index}`;
        return (
          <div
            key={ticket.name}
            className={`relative flex-1 overflow-hidden rounded-[22px] bg-white shadow-[0_14px_34px_-18px_rgba(36,48,40,0.35),0_0_0_1px_var(--color-brand-line)] ${
              index % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.2deg]"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen((current) => current.map((value, i) => (i === index ? !value : value)))}
              className={`flex w-full items-center justify-between gap-4 rounded-[22px] px-[22px] py-[22px] text-left ${focusRing}`}
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">{ticket.tag}</span>
                <span className="mt-1 block font-heading text-xl font-semibold text-brand-charcoal">{ticket.name}</span>
              </span>
              <span className="font-heading text-[2.875rem] font-bold leading-none tracking-[-0.03em] text-brand-charcoal">
                {ticket.price}
              </span>
            </button>

            {/* Tear line with punched notches */}
            <div
              className="relative mx-[18px] border-t-2 border-dashed border-brand-line before:absolute before:-left-[30px] before:-top-[11px] before:h-5 before:w-5 before:rounded-full before:bg-brand-offwhite after:absolute after:-right-[30px] after:-top-[11px] after:h-5 after:w-5 after:rounded-full after:bg-brand-offwhite"
              aria-hidden="true"
            />

            <div
              id={panelId}
              className="grid transition-[grid-template-rows] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <ul className="px-[22px] pb-1.5 pt-3.5">
                  {ticket.points.map((point) => (
                    <li key={point} className="flex gap-2.5 py-2 text-[0.9375rem] text-brand-muted">
                      <span className="font-heading font-semibold text-brand-sage" aria-hidden="true">
                        +
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="px-[22px] pb-5 text-[0.8125rem] text-brand-muted">{ticket.duration}</p>
              </div>
            </div>
            <p
              className={`px-[22px] pb-3.5 pt-2.5 text-center text-xs font-semibold text-brand-sage transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
            >
              Tap to see what&rsquo;s included
            </p>
          </div>
        );
      })}
    </div>
  );
}
