import Link from "next/link";

import { ContactGlyph, type ContactAction } from "./ContactIcons";
import { focusRing } from "./ui";
import { prices } from "../../lib/site";

// Blocks shared by the "Statement" pages: the toenail cutting pages and the
// treatment pages (corns, hard skin and callus, cracked heels).

const contactLabels = { phone: "Call", whatsapp: "WhatsApp", email: "Email" } as const;

/** Small round labelled contact icons under the hero's "Request a visit". */
export function ContactRow({ actions, className = "" }: { actions: ContactAction[]; className?: string }) {
  return (
    <ul className={`mt-3 flex justify-center gap-4 ${className}`}>
      {actions.map((action) => (
        <li key={action.kind}>
          <a
            href={action.href}
            aria-label={action.label}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            data-analytics-id={action.analyticsId}
            className={`group flex flex-col items-center gap-1 rounded-xl ${focusRing}`}
          >
            <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-brand-sageDark shadow-[0_0_0_1px_var(--color-brand-line)] transition-colors group-hover:bg-brand-wash">
              <ContactGlyph kind={action.kind} className="h-5 w-5" />
            </span>
            <span aria-hidden="true" className="text-[0.71875rem] font-medium text-brand-muted">
              {contactLabels[action.kind]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The two tilted price tickets, with a link to the prices page. */
export function PriceTickets({ className = "" }: { className?: string }) {
  const tickets = [
    { tag: "First visit", price: prices[0].price, detail: "About 60 minutes", tilt: "-rotate-2" },
    { tag: "Returning", price: prices[1].price, detail: "About 45 minutes", tilt: "rotate-[1.6deg]" },
  ];
  return (
    <div className={className}>
      <div className="mx-auto flex max-w-md justify-center gap-2.5 px-[18px]" aria-label="Prices" role="group">
        {tickets.map((ticket) => (
          <div
            key={ticket.tag}
            className={`flex-1 rounded-[18px] bg-white px-3 py-4 text-center shadow-[0_12px_28px_-18px_rgba(36,48,40,0.35),0_0_0_1px_var(--color-brand-line)] ${ticket.tilt}`}
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand-sageDark">{ticket.tag}</p>
            <p className="mt-0.5 font-heading text-[2.125rem] font-bold tracking-[-0.03em] text-brand-charcoal">{ticket.price}</p>
            <p className="text-xs text-brand-muted">{ticket.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center">
        <Link
          href="/prices"
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-semibold text-brand-sageDeep ${focusRing}`}
        >
          Travel and prices <span aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  );
}

/** "Before you book." questions as white cards that open in place. */
export function FaqCards({
  faqs,
  headingId,
  split = false,
}: {
  faqs: { question: string; answer: string }[];
  headingId: string;
  /** Desktop (lg+): heading on the left, staying in view, with the questions on the right. */
  split?: boolean;
}) {
  const wide = split
    ? "lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-14 lg:px-8 lg:pt-24"
    : "";
  return (
    <section className={`mx-auto max-w-2xl px-4 pt-12 md:pt-16 ${wide}`} aria-labelledby={headingId}>
      <div className={split ? "lg:sticky lg:top-32 lg:text-left" : ""}>
        <p className={`text-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark ${split ? "lg:text-left" : ""}`}>
          Questions
        </p>
        <h2
          id={headingId}
          className={`mt-2.5 text-center font-heading text-[2rem] font-bold leading-[1.06] tracking-[-0.025em] text-brand-charcoal md:text-5xl ${split ? "lg:text-left" : ""}`}
        >
          Before you <span className="text-brand-sage">book.</span>
        </h2>
      </div>
      <div className={`mt-6 flex flex-col gap-2.5 ${split ? "lg:mt-0" : ""}`}>
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-[22px] bg-white shadow-[0_0_0_1px_var(--color-brand-line)] [&_summary::-webkit-details-marker]:hidden"
          >
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-3.5 rounded-[22px] px-5 py-[18px] font-semibold text-brand-charcoal ${focusRing}`}
            >
              {faq.question}
              <span
                aria-hidden="true"
                className="relative h-[30px] w-[30px] shrink-0 rounded-full bg-brand-wash transition-[transform,background-color] duration-500 before:absolute before:left-1/2 before:top-1/2 before:h-0.5 before:w-[11px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded before:bg-brand-sageDeep after:absolute after:left-1/2 after:top-1/2 after:h-0.5 after:w-[11px] after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-90 after:rounded after:bg-brand-sageDeep group-open:rotate-45 group-open:bg-brand-sageDark group-open:before:bg-white group-open:after:bg-white"
              />
            </summary>
            <p className="px-5 pb-[18px] text-[0.9375rem] leading-[1.55] text-brand-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
