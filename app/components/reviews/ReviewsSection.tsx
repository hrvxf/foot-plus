import { MessageCircle, PencilLine } from "lucide-react";
import {
  formatReviewMonth,
  getRating,
  getReviewLinks,
  getReviews,
  type ReviewScope,
} from "../../lib/reviews";
import Stars from "./Stars";

/**
 * Rating summary above up to three reviews in ruled columns. Use scope "all" on shared pages and a location on
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
  const shown = getReviews(scope, 3);
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
        <ul className="mt-8 grid gap-8 md:mt-10 md:grid-cols-3 md:gap-10" aria-label="Recent Google reviews">
          {shown.map((review) => (
            <li key={review.name + review.month} className="flex flex-col border-t border-brand-charcoal/15 pt-5">
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
        </ul>
      </div>
    </section>
  );
}

// Matches the header "Request a visit" button: filled for the action most visitors
// want, outlined for the one aimed at existing patients.
const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-base font-semibold transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";
const buttonPrimary = `${buttonBase} bg-brand-sageDark text-white hover:bg-brand-sageDeep`;
const buttonSecondary = `${buttonBase} border border-brand-sageLight bg-white text-brand-sageDeep hover:bg-brand-wash`;

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
      <div className="flex flex-wrap items-center gap-3">
        <a href={link.readUrl} target="_blank" rel="noopener noreferrer" data-analytics-id={`${analyticsPrefix}-reviews-read-all`} className={buttonPrimary}>
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Read reviews
          <span className="sr-only"> on Google (opens in a new tab)</span>
        </a>
        <a href={link.writeUrl} target="_blank" rel="noopener noreferrer" data-analytics-id={`${analyticsPrefix}-reviews-write`} className={buttonSecondary}>
          <PencilLine className="h-5 w-5" aria-hidden="true" />
          Write a review
          <span className="sr-only"> on Google (opens in a new tab)</span>
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
