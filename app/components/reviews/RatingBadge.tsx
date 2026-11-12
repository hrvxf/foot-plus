import { getRating, getReviewLinks, type ReviewScope } from "../../lib/reviews";
import Stars from "./Stars";

/**
 * One-line rating summary, e.g. "★★★★★ 5.0 · 6 Google reviews".
 * Links to Google when the scope has a single profile; renders nothing if there
 * are no reviews to show yet.
 */
export default function RatingBadge({
  scope,
  tone = "light",
  className = "",
  analyticsId,
}: {
  scope: ReviewScope;
  tone?: "light" | "dark";
  className?: string;
  analyticsId?: string;
}) {
  const rating = getRating(scope);
  if (!rating) return null;

  const links = getReviewLinks(scope);
  const text = tone === "dark" ? "text-white" : "text-brand-sageDeep";
  const muted = tone === "dark" ? "text-white/75" : "text-brand-muted";
  const content = (
    <>
      <Stars rating={rating.average} tone={tone} />
      <span className="font-semibold">{rating.average.toFixed(1)}</span>
      <span className={muted}>
        · <span className="underline-offset-4 group-hover:underline">{rating.count} Google reviews</span>
      </span>
    </>
  );
  const classes = `group inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] ${text} ${className}`;

  return links.length === 1 ? (
    <a
      href={links[0].readUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-id={analyticsId}
      className={classes}
    >
      {content}
    </a>
  ) : (
    <p className={classes}>{content}</p>
  );
}
