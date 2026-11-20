import { getRating, getReviewLinks, getReviews } from "../../lib/reviews";
import Stars from "../reviews/Stars";
import { focusRing } from "../site/ui";

/** Home reviews: the overall rating, then real review lines as cards you swipe through. */
export default function ReviewSwipe() {
  const rating = getRating("all");
  const reviews = getReviews("all", 6);
  const [link] = getReviewLinks("all");
  if (!rating && !reviews.length) return null;

  const summary = rating ? (
    <span className="inline-flex items-center gap-3.5">
      <span className="font-heading text-[2.75rem] font-semibold leading-none text-brand-sageDeep">{rating.average.toFixed(1)}</span>
      <span className="flex flex-col items-start gap-1">
        <Stars rating={rating.average} className="h-4 w-4" />
        <span className="text-[0.8125rem] text-brand-muted">{rating.count} Google reviews</span>
      </span>
    </span>
  ) : null;

  return (
    <section className="bg-white py-14 text-center md:py-20" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="sr-only">
        Reviews
      </h2>
      {summary &&
        (link ? (
          <a href={link.readUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex rounded-lg ${focusRing}`} data-analytics-id="home-reviews-rating">
            {summary}
            <span className="sr-only"> (read the reviews on Google, opens in a new tab)</span>
          </a>
        ) : (
          summary
        ))}
      <ul className="mt-6 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-6 pb-3 pt-1 [scrollbar-width:none] md:mx-auto md:max-w-[1200px] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-8 [&::-webkit-scrollbar]:hidden">
        {reviews.map((review) => (
          <li key={review.name + review.month} className="w-[76%] flex-none snap-center rounded-[22px] bg-brand-offwhite px-5 py-[22px] text-left md:w-auto">
            <blockquote className="font-heading text-[1.0625rem] font-semibold leading-[1.4] text-brand-charcoal">
              “{(review.excerpt ?? review.text).replace(/^…\s*/, "").replace(/\s*…$/, "")}”
            </blockquote>
            <p className="mt-3 text-[0.8125rem] text-brand-muted">{review.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
