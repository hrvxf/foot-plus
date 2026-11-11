import { googleRating, googleReviewsUrl } from "../../lib/reviews";
import Stars from "./Stars";

/** One-line rating summary, e.g. "★★★★★ 5.0 · 6 Google reviews". */
export default function RatingBadge({
  tone = "light",
  className = "",
  analyticsId,
  showBusiness = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  analyticsId?: string;
  /** Add "for Foot+ Bristol" on pages that also cover Southampton. */
  showBusiness?: boolean;
}) {
  const text = tone === "dark" ? "text-white" : "text-brand-sageDeep";
  const muted = tone === "dark" ? "text-white/75" : "text-brand-muted";

  return (
    <a
      href={googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-id={analyticsId}
      className={`group inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] ${text} ${className}`}
    >
      <Stars rating={googleRating.average} />
      <span className="font-semibold">{googleRating.average.toFixed(1)}</span>
      <span className={muted}>
        · <span className="underline-offset-4 group-hover:underline">{googleRating.count} Google reviews</span>
        {showBusiness ? " for Foot+ Bristol" : null}
      </span>
    </a>
  );
}
