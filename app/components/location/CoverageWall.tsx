import PostcodeChecker from "../home/PostcodeChecker";
import { shell } from "../site/ui";

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
}: {
  id: string;
  /** Analytics source for the checker, e.g. "bristol". */
  source: string;
  /** One short line under the heading, e.g. "Central, north, south and east Bristol." */
  summary: string;
  places: string[];
}) {
  // Repeat the names so the wall fills the space around the card.
  const wall = [...places, ...places, ...places];
  return (
    <section id={id} className="relative scroll-mt-24 overflow-hidden py-28 md:py-36" aria-label="Do we visit you?">
      <p className="sr-only">Areas covered: {places.join(", ")}.</p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-wrap content-center justify-center gap-x-4 gap-y-1 px-3 font-heading text-[1.625rem] font-semibold leading-tight tracking-[-0.01em] text-brand-sageDark/[0.11] md:text-[2.5rem]"
      >
        {wall.map((place, index) => (
          <span key={index} className="place-glow" // One name lights at a time, working through the wall.
            style={{ animationDelay: `${index * 1.3}s`, animationDuration: `${wall.length * 1.3}s` }}>
            {place}
          </span>
        ))}
      </div>
      <div className={`${shell} relative`}>
        <div className="mx-auto max-w-md rounded-[22px] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(36,48,40,0.5)]">
          <PostcodeChecker tone="compact" source={source} title="Do we visit you?" label="Postcode for the visit" helper={summary} />
        </div>
      </div>
    </section>
  );
}
