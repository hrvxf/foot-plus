import Link from "next/link";
import { ArrowRight, ChevronRight, CircleDot, Droplets, Footprints, Scissors, type LucideIcon } from "lucide-react";

import { treatments } from "../../lib/treatments";
import { body, btnSolid, displayH2, focusRing, shell } from "./ui";

// Location page services: nail cutting (the main market) as one featured card,
// the general treatments as compact tiles, then a single call to action.
// Whole cards are the links, so there are no underlined headings. No prices here.

const treatmentIcons: Record<string, LucideIcon> = {
  "corn-treatment": CircleDot,
  "hard-skin-and-callus": Footprints,
  "cracked-heels": Droplets,
};

type ServicesTilesProps = {
  /** Section id; the heading id is derived from it. */
  id: string;
  place: string;
  /** Practitioner's first name, e.g. "Adam". */
  practitioner: string;
  nailCuttingHref: string;
  bookHref: string;
  bookLabel: string;
  className?: string;
};

export default function ServicesTiles({
  id,
  place,
  practitioner,
  nailCuttingHref,
  bookHref,
  bookLabel,
  className = "",
}: ServicesTilesProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} className={`scroll-mt-24 ${className}`} aria-labelledby={headingId}>
      <div className={shell}>
        <h2 id={headingId} className={displayH2}>
          Foot care services in {place}
        </h2>
        <p className={`${body} mt-3 text-brand-muted`}>All treatments are carried out at home by {practitioner}.</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Link
            href={nailCuttingHref}
            className={`group flex flex-col gap-4 rounded-2xl bg-brand-sageDark p-6 text-white transition-colors duration-150 hover:bg-brand-sageDeep md:p-8 ${focusRing}`}
          >
            <span className="self-start rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Most booked</span>
            <span className="flex items-center gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
                <Scissors className="h-7 w-7" />
              </span>
              <span className="font-heading text-2xl font-semibold leading-tight md:text-[1.75rem]">Toenail cutting</span>
            </span>
            <span className="text-lg leading-7 text-white/90">
              Nails cut, filed and thinned, including thick or hard-to-reach nails.
            </span>
            <span className="mt-auto inline-flex items-center gap-2 border-t border-white/20 pt-4 text-base font-semibold">
              Find out more
              <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
            </span>
          </Link>

          <ul className="grid gap-3">
            {treatments.map((treatment) => {
              const Icon = treatmentIcons[treatment.slug] ?? CircleDot;
              return (
                <li key={treatment.slug}>
                  <Link
                    href={`/${treatment.slug}`}
                    className={`group flex h-full min-h-20 items-center gap-4 rounded-xl border border-brand-line bg-white px-5 py-4 transition-colors duration-150 hover:border-brand-sageLight hover:bg-brand-wash/50 ${focusRing}`}
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-sageDeep" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-lg font-semibold leading-6 text-brand-sageDeep">{treatment.name}</span>
                      <span className="block text-base leading-6 text-brand-muted">{treatment.short}</span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-brand-sage transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
          <Link href={bookHref} className={btnSolid}>
            {bookLabel}
          </Link>
          <Link
            href="/services"
            className={`inline-flex min-h-12 items-center gap-2 self-start font-semibold text-brand-sageDeep hover:text-brand-charcoal sm:self-auto ${focusRing}`}
          >
            All services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
