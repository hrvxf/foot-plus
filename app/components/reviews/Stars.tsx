import { Star } from "lucide-react";

export default function Stars({
  rating = 5,
  className = "h-4 w-4",
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={`${className} ${
            index < Math.round(rating)
              ? "fill-[#E0A526] text-[#E0A526]"
              : "fill-transparent text-brand-line"
          }`}
        />
      ))}
    </span>
  );
}
