import { ArrowUpRight } from "lucide-react";
import {
  formatReviewMonth,
  getRating,
  getReviewLinks,
  getReviews,
  type ReviewScope,
} from "../../lib/reviews";
import ReviewsCarousel from "./ReviewsCarousel";
import Stars from "./Stars";

/** Slide widths: most of the screen on phones (the next one peeks in), two on tablets, three on desktop. */
const reviewSlide =
  "flex shrink-0 basis-[85%] snap-start flex-col border-t border-brand-charcoal/15 pt-5 sm:basis-[calc((100%-2rem)/2)] md:basis-[calc((100%-5rem)/3)]";

/**
 * Rating summary above a slideshow of every review in scope, three at a time on desktop. Use scope "all" on shared pages and a location on
 * that location's page. Renders nothing until the scope has reviews switched on.
 */
export default function ReviewsSection({
  scope,
  id = "reviews",
  analyticsPrefix,
}: {
  scope: ReviewScope;
  id?: string;
  analyticsPrefix: string;
}) {
  const rating = getRating(scope);
  const shown = getReviews(scope, Infinity);
  const links = getReviewLinks(scope);
  if (!rating || !shown.length) return null;

  return (
    <section className="py-12 md:py-20" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2
            id={`${id}-heading`}
            className="font-heading text-[1.625rem] font-semibold leading-[1.2] tracking-[-0.01em] text-brand-sageDeep md:text-[2.125rem] md:leading-[1.15]"
          >
            What patients say
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex items-center gap-3">
              <p className="font-heading text-[2.75rem] font-semibold leading-none tracking-[-0.02em] text-brand-sageDeep md:text-[3.25rem]">
                {rating.average.toFixed(1)}
              </p>
              <div>
                <Stars rating={rating.average} className="h-5 w-5" />
                <p className="mt-1 text-base text-brand-muted">from {rating.count} Google reviews</p>
              </div>
            </div>
            <ReviewLinks links={links} analyticsPrefix={analyticsPrefix} />
          </div>
        </div>

        {/* Ruled columns rather than cards, in line with the rest of the site. */}
        <ReviewsCarousel id={`${id}-list`} label="Recent Google reviews">
          {shown.map((review) => (
            <li key={review.name + review.month} className={reviewSlide}>
              <Stars rating={review.rating} />
              <blockquote className="mt-3 flex-1 text-[1.0625rem] leading-[1.55] text-brand-charcoal md:text-lg md:leading-7">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <p className="mt-4 text-base">
                <span className="font-semibold text-brand-sageDeep">{review.name}</span>
                <span className="text-brand-muted">, {formatReviewMonth(review.month)}, on Google</span>
              </p>
            </li>
          ))}
        </ReviewsCarousel>
      </div>
    </section>
  );
}

const linkStrong =
  "inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-sageDeep underline underline-offset-4";
const linkQuiet =
  "inline-flex min-h-11 items-center gap-1.5 text-brand-muted underline underline-offset-4 hover:text-brand-sageDeep";

function ReviewLinks({
  links,
  analyticsPrefix,
}: {
  links: ReturnType<typeof getReviewLinks>;
  analyticsPrefix: string;
}) {
  if (!links.length) return null;

  // One Google profile: simple links. Several: one link per location.
  if (links.length === 1) {
    const [link] = links;
    return (
      <div className="flex flex-col items-start text-base">
        <a href={link.readUrl} target="_blank" rel="noopener noreferrer" data-analytics-id={`${analyticsPrefix}-reviews-read-all`} className={linkStrong}>
          Read all reviews on Google
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a href={link.writeUrl} target="_blank" rel="noopener noreferrer" data-analytics-id={`${analyticsPrefix}-reviews-write`} className={linkQuiet}>
          Had a visit? Leave a review
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start text-base">
      <p className="font-semibold text-brand-sageDeep">
        Read reviews on Google:{" "}
        {links.map((link, index) => (
          <span key={link.key}>
            {index ? " · " : null}
            <a href={link.readUrl} target="_blank" rel="noopener noreferrer" data-analytics-id={`${analyticsPrefix}-reviews-read-${link.key}`} className="underline underline-offset-4">
              {link.label}
            </a>
          </span>
        ))}
      </p>
      <p className="text-brand-muted">
        Had a visit? Leave a review:{" "}
        {links.map((link, index) => (
          <span key={link.key}>
            {index ? " · " : null}
            <a href={link.writeUrl} target="_blank" rel="noopener noreferrer" data-analytics-id={`${analyticsPrefix}-reviews-write-${link.key}`} className="underline underline-offset-4 hover:text-brand-sageDeep">
              {link.label}
            </a>
          </span>
        ))}
      </p>
    </div>
  );
}
