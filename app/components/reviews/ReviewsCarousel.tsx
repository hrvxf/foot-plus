"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal slideshow for review items. Swipe on touch, scroll with the keyboard
 * once focused, or use the previous/next buttons. No autoplay: reviews are long
 * enough that people need to read at their own pace. The buttons hide themselves
 * when every review already fits.
 *
 * Children should be <li> elements; ReviewsSection sets their widths.
 */
export default function ReviewsCarousel({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // A couple of pixels of slack for sub-pixel widths.
    setCanPrev(track.scrollLeft > 2);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  // Move by one review. The site-wide scroll-behavior makes this smooth, and
  // instant for people who prefer reduced motion.
  const move = (direction: 1 | -1) => {
    const track = trackRef.current;
    const slide = track?.querySelector("li");
    if (!track || !slide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (slide.getBoundingClientRect().width + gap) });
  };

  const showButtons = canPrev || canNext;

  return (
    <div className="mt-8 md:mt-10">
      <ul
        id={id}
        ref={trackRef}
        tabIndex={0}
        aria-label={label}
        className="-mx-5 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-px-5 px-5 pb-1 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-brand-sageDeep/40 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      {showButtons ? (
        <div className="mt-6 flex justify-end gap-3">
          <SlideButton label="Previous review" controls={id} disabled={!canPrev} onClick={() => move(-1)}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </SlideButton>
          <SlideButton label="Next review" controls={id} disabled={!canNext} onClick={() => move(1)}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </SlideButton>
        </div>
      ) : null}
    </div>
  );
}

function SlideButton({
  label,
  controls,
  disabled,
  onClick,
  children,
}: {
  label: string;
  controls: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={controls}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-charcoal/20 text-brand-sageDeep transition-colors hover:border-brand-sageDeep hover:bg-brand-sageDeep hover:text-white disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
