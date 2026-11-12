/**
 * "LGBTQ+ friendly" with a small rainbow flag. Shown with the credentials under the
 * home page hero and in the footer on every page. The flag is decorative; the words
 * carry the meaning. `flagOnly` (footer) hides the words visually but keeps them for
 * screen readers, with a tooltip for mouse users.
 */
const stripes = ["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"];

export default function LgbtqFriendly({ className = "", flagOnly = false }: { className?: string; flagOnly?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-base font-semibold leading-6 text-brand-sageDeep ${className}`}
      title={flagOnly ? "LGBTQ+ friendly" : undefined}
    >
      <svg
        viewBox="0 0 24 18"
        aria-hidden="true"
        className={`shrink-0 rounded-[3px] ${flagOnly ? "h-[18px] w-6" : "h-[15px] w-5"}`}
      >
        {stripes.map((colour, index) => (
          <rect key={colour} x="0" y={index * 3} width="24" height="3" fill={colour} />
        ))}
      </svg>
      <span className={flagOnly ? "sr-only" : undefined}>LGBTQ+ friendly</span>
    </p>
  );
}
