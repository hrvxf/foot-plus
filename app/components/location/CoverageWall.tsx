import Link from "next/link";

import PostcodeChecker from "../home/PostcodeChecker";
import styles from "./CoverageWall.module.css";
import { focusRing, shell } from "../site/ui";

/**
 * Location page coverage: the postcode checker on a white card, set over a faint wall of the place names
 * the practitioner covers. Names glow softly one after another (CSS only; still with reduced motion).
 * The travel fee is left to the checker's answer.
 */
export default function CoverageWall({
  id,
  source,
  summary,
  places,
  areasHref,
  areasLabel,
}: {
  id: string;
  /** Analytics source for the checker, e.g. "bristol". */
  source: "bristol" | "southampton";
  /** One short line under the heading, e.g. "Central, north, south and east Bristol." */
  summary: string;
  places: string[];
  /** Optional page listing every area covered (Bristol has one), linked under the card. */
  areasHref?: string;
  areasLabel?: string;
}) {
  // Repeat the names so the wall fills the space around the card. The wall is decoration only: each name is
  // drawn by CSS from data-place (CoverageWall.module.css), so it isn't page text. Search engines and
  // screen readers get the list once, from the sr-only line below, rather than a block of repeated place names.
  const wall = [...places, ...places, ...places];
  return (
    <section id={id} className="relative scroll-mt-24 overflow-hidden py-28 md:py-36" aria-label="Do we visit you?">
      <p className="sr-only">Areas covered: {places.join(", ")}.</p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-wrap content-center justify-center gap-x-4 gap-y-1 px-3 font-heading text-[1.625rem] font-semibold leading-tight tracking-[-0.01em] text-brand-sageDark/[0.11] md:text-[2.5rem]"
      >
        {wall.map((place, index) => (
          <span key={index} data-place={place} className={`${styles.name} place-glow`} // One name lights at a time, working through the wall.
            style={{ animationDelay: `${index * 1.3}s`, animationDuration: `${wall.length * 1.3}s` }} />
        ))}
      </div>
      <div className={`${shell} relative`}>
        <div className="mx-auto max-w-md rounded-[22px] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(36,48,40,0.5)]">
          <PostcodeChecker
            tone="compact"
            source={source}
            bookLocation={source}
            title="Do we visit you?"
            label="Postcode for the visit"
            helper={summary}
          />
        </div>
        {areasHref ? (
          <p className="mt-5 text-center">
            <Link
              href={areasHref}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/80 px-5 font-semibold text-brand-sageDeep shadow-[0_0_0_1px_var(--color-brand-line)] backdrop-blur-sm transition-colors hover:bg-white ${focusRing}`}
            >
              {areasLabel ?? "See every area we cover"} <span aria-hidden="true">→</span>
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
