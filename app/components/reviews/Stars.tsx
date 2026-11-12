// Solid, sharp-pointed stars in the brand sage (rather than gold), so ratings sit
// quietly within the site palette. Use tone="dark" on dark sage backgrounds.
const STAR_PATH =
  "M12 1.5l3.09 6.86 7.41.78-5.54 5.03 1.57 7.33L12 17.77 5.47 21.5l1.57-7.33L1.5 9.14l7.41-.78z";

export default function Stars({
  rating = 5,
  className = "h-4 w-4",
  tone = "light",
}: {
  rating?: number;
  className?: string;
  tone?: "light" | "dark";
}) {
  const filled = tone === "dark" ? "text-white" : "text-brand-sageDark";
  const empty = tone === "dark" ? "text-white/30" : "text-brand-line";

  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`${className} ${index < Math.round(rating) ? filled : empty}`}
        >
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}
