import type { Review } from "../../lib/reviews";
import { getRating, getReviewLinks, getReviews } from "../../lib/reviews";
import Stars from "../reviews/Stars";
import { focusRing } from "../site/ui";

// Copies of each row: enough that half the row is wider than a 1920px screen, so the loop never shows a gap.
const COPIES = 4;

/** The review's short cut, with its highlight phrase in bold. */
function Quote({ review }: { review: Review }) {
  const text = (review.excerpt ?? review.text).replace(/^…\s*/, "").replace(/\s*…$/, "");
  const at = review.highlight ? text.indexOf(review.highlight) : -1;
  if (!review.highlight || at < 0) return <>“{text}”</>;
  return (
    <>
      “{text.slice(0, at)}
      <strong className="font-semibold text-brand-sageDeep">{review.highlight}</strong>
      {text.slice(at + review.highlight.length)}”
    </>
  );
}

function Row({ reviews, direction }: { reviews: Review[]; direction: "left" | "right" }) {
  return (
    <ul
      className={`flex w-max gap-4 motion-reduce:grid motion-reduce:w-auto motion-reduce:grid-cols-4 ${direction === "left" ? "review-drift-left" : "review-drift-right"}`}
    >
      {Array.from({ length: COPIES }, (_, copy) =>
        reviews.map((review) => (
          <li
            key={`${copy}-${review.name}-${review.month}`}
            aria-hidden={copy > 0 || undefined}
            className={`w-[380px] flex-none rounded-[22px] motion-reduce:w-auto bg-brand-offwhite p-[26px] ${copy > 0 ? "motion-reduce:hidden" : ""}`}
          >
            <Stars rating={review.rating} className="h-3.5 w-3.5" />
            <blockquote className="mt-3 text-[1.0625rem] leading-[1.5] text-brand-charcoal">
              <Quote review={review} />
            </blockquote>
            <p className="mt-3.5 text-sm font-semibold text-brand-muted">{review.name}</p>
          </li>
        )),
      )}
    </ul>
  );
}

/**
 * Desktop only (lg+): the home reviews as two rows of cards drifting slowly in opposite directions,
 * pausing while pointed at or tabbed into, with the overall rating at the top. Reduced motion shows one
 * still copy of each row. Phones keep the swipeable cards in `ReviewSwipe`.
 */
export default function ReviewWall() {
  const rating = getRating("all");
  const reviews = getReviews("all", 8);
  const [link] = getReviewLinks("all");
  if (reviews.length < 2) return null;

  const rows = [reviews.filter((_, index) => index % 2 === 0), reviews.filter((_, index) => index % 2 === 1)];

  return (
    <section className="hidden overflow-hidden bg-white py-24 lg:block" aria-labelledby="review-wall-heading">
      <div className="mx-auto flex w-full max-w-[1200px] items-end justify-between gap-8 px-8">
        <h2
          id="review-wall-heading"
          className="font-heading text-5xl font-semibold leading-[1.06] tracking-[-0.02em] text-brand-charcoal"
        >
          Kind words,
          <span className="block text-brand-sage">from every visit.</span>
        </h2>
        {rating && (
          <p className="flex items-center gap-4">
            <span className="sr-only">Rated {rating.average.toFixed(1)} out of 5 from {rating.count} Google reviews.</span>
            <span aria-hidden="true" className="font-heading text-5xl font-semibold leading-none text-brand-sageDeep">
              {rating.average.toFixed(1)}
            </span>
            <span className="flex flex-col gap-1">
              <Stars rating={rating.average} className="h-4 w-4" />
              {link ? (
                <a
                  href={link.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[0.9375rem] font-semibold text-brand-sageDeep hover:text-brand-charcoal ${focusRing}`}
                  data-analytics-id="home-reviews-rating"
                >
                  {rating.count} Google reviews →<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span aria-hidden="true" className="text-[0.9375rem] text-brand-muted">
                  {rating.count} Google reviews
                </span>
              )}
            </span>
          </p>
        )}
      </div>
      <div className="review-wall mt-12 flex flex-col gap-4 motion-reduce:mx-auto motion-reduce:max-w-[1200px] motion-reduce:px-8">
        {rows.map((row, index) => (
          <Row key={index} reviews={row} direction={index === 0 ? "left" : "right"} />
        ))}
      </div>
    </section>
  );
}
