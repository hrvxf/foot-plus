import { ArrowUpRight, Quote } from "lucide-react";
import {
  formatReviewMonth,
  googleRating,
  googleReviewsUrl,
  googleWriteReviewUrl,
  reviews,
} from "../../lib/reviews";
import Stars from "./Stars";

/**
 * Rating summary beside up to three review cards. On mobile the cards become a
 * swipeable row (no autoplay). Reviews are Foot+ Bristol only, so keep this off
 * Southampton pages.
 */
export default function ReviewsSection({
  id = "reviews",
  analyticsPrefix,
}: {
  id?: string;
  analyticsPrefix: string;
}) {
  const shown = reviews.slice(0, 3);

  return (
    <section className="py-14 md:py-20" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-sageDark">
              Reviews
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-2 font-heading text-[1.9rem] font-semibold leading-tight text-brand-sageDeep sm:text-4xl"
            >
              What patients say
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-10">
            <div className="flex items-center gap-3">
              <p className="font-heading text-5xl font-semibold leading-none text-brand-sageDeep">
                {googleRating.average.toFixed(1)}
              </p>
              <div>
                <Stars rating={googleRating.average} className="h-5 w-5" />
                <p className="mt-1 text-sm text-brand-muted">
                  from {googleRating.count} Google reviews of Foot+ Bristol
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1.5 text-[15px]">
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-id={`${analyticsPrefix}-reviews-read-all`}
                className="inline-flex items-center gap-1.5 font-semibold text-brand-sageDeep underline-offset-4 hover:underline"
              >
                Read all reviews on Google
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={googleWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-id={`${analyticsPrefix}-reviews-write`}
                className="inline-flex items-center gap-1.5 text-brand-muted underline-offset-4 hover:text-brand-sageDeep hover:underline"
              >
                Had a visit? Leave a review
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <ul
          className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          aria-label="Recent Google reviews"
        >
          {shown.map((review) => (
            <li
              key={review.name + review.month}
              className="flex w-[82%] shrink-0 snap-start flex-col rounded-3xl border border-brand-line bg-white p-6 shadow-[0_18px_40px_-32px_rgba(36,48,40,0.45)] sm:w-auto"
            >
              <div className="flex items-center justify-between">
                <Stars rating={review.rating} />
                <Quote className="h-5 w-5 text-brand-sageLight" aria-hidden="true" />
              </div>
              <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-brand-charcoal">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <p className="mt-5 text-sm">
                <span className="font-semibold text-brand-sageDeep">{review.name}</span>
                <span className="text-brand-muted"> · {formatReviewMonth(review.month)} · Google</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
