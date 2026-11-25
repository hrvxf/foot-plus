import { MessageCircle, PencilLine } from "lucide-react";
import {
  formatReviewMonth,
  getRating,
  getReviewLinks,
  getReviews,
  type ReviewScope,
} from "../../lib/reviews";
import Stars from "./Stars";
import ReviewQuote from "./ReviewQuote";
import ReviewsDeck from "./ReviewsDeck";

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
  const deck = getReviews(scope, 5).map((review) => ({
    name: review.name,
    when: formatReviewMonth(review.month),
    rating: review.rating,
    // Long reviews show their one-line excerpt; "Read reviews" leads to the full text on Google.
    text: review.text.length > 200 && review.excerpt ? review.excerpt : review.text,
    highlight: review.highlight,
  }));
  const links = getReviewLinks(scope);
  if (!rating || !shown.length) return null;

  return (
    <>
    {/* Phones and tablets: a pinned deck of reviews, dealt one at a time as you scroll. */}
    <section className="lg:hidden" aria-labelledby={`${id}-deck-heading`}>
      <ReviewsDeck
        reviews={deck}
        header={
          <div className="flex items-end justify-between gap-3">
            <h2
              id={`${id}-deck-heading`}
              className="font-heading text-[1.625rem] font-semibold leading-[1.1] tracking-[-0.01em] text-brand-sageDeep"
            >
              What patients say
            </h2>
            <div className="flex shrink-0 items-center gap-2">
              <p className="sr-only">Rated {rating.average.toFixed(1)} out of 5 from {rating.count} Google reviews.</p>
              <p aria-hidden="true" className="font-heading text-[2rem] font-semibold leading-none text-brand-sageDeep">{rating.average.toFixed(1)}</p>
              <div>
                <Stars rating={rating.average} className="h-3.5 w-3.5" />
                <p aria-hidden="true" className="mt-0.5 text-[0.8125rem] text-brand-muted">{rating.count} Google reviews</p>
              </div>
            </div>
          </div>
        }
        footer={<ReviewLinks links={links} analyticsPrefix={analyticsPrefix} />}
      />
    </section>

    {/* Large screens: rating summary and three reviews in ruled columns. */}
    <section className="hidden py-12 md:py-20 lg:block" aria-labelledby={`${id}-heading`}>
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
              <p className="sr-only">Rated {rating.average.toFixed(1)} out of 5 from {rating.count} Google reviews.</p>
              <p aria-hidden="true" className="font-heading text-[2.75rem] font-semibold leading-none tracking-[-0.02em] text-brand-sageDeep md:text-[3.25rem]">
                {rating.average.toFixed(1)}
              </p>
              <div>
                <Stars rating={rating.average} className="h-5 w-5" />
                <p aria-hidden="true" className="mt-1 text-base text-brand-muted">from {rating.count} Google reviews</p>
              </div>
            </div>
            <ReviewLinks links={links} analyticsPrefix={analyticsPrefix} />
          </div>
        </div>

        {/* Ruled columns rather than cards, in line with the rest of the site. */}
        <ul className="mt-8 grid gap-8 md:mt-10 md:grid-cols-3 md:gap-10" aria-label="Recent Google reviews">
          {shown.map((review) => (
            <li key={review.name + review.month} className="flex flex-col border-t border-brand-charcoal/15 pt-5">
              <ReviewQuote text={review.text} excerpt={review.excerpt} highlight={review.highlight} />
              {/* Reviewer, then their rating and date: the quote mark leads the column.
                  mt-auto lines the names up across columns; long reviews start
                  collapsed, so the gap above a shorter review stays small. */}
              <div className="mt-auto pt-4 text-base">
                <p className="font-semibold text-brand-sageDeep">{review.name}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-brand-muted">
                  <Stars rating={review.rating} />
                  <span>
                    {formatReviewMonth(review.month)}, on Google
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
    </>
  );
}

// Matches the location hero: a rounded Sage Dark button for the action most visitors want, and a white
// one with a hairline border (like the hero's contact circles) for the one aimed at existing patients.
// Tighter padding and text on phones so the two buttons share one line.
const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 font-heading text-[0.9375rem] font-semibold sm:px-5 sm:text-base transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";
const buttonPrimary = `${buttonBase} bg-brand-sageDark text-white shadow-[0_16px_30px_-18px_rgba(36,48,40,0.6)] hover:bg-brand-sageDeep`;
const buttonSecondary = `${buttonBase} border border-brand-line bg-white text-brand-sageDark hover:bg-brand-wash`;

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
      <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
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
