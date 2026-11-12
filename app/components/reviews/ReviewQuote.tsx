"use client";

import { useId, useState, type ReactNode } from "react";

// Reviews longer than this start collapsed: they show their `excerpt` (or, without
// one, the first 7 lines) with a toggle for the rest. Both versions are in the HTML,
// so the full wording is still there for search engines.
const LONG_REVIEW_CHARS = 320;

/** Wraps the first occurrence of `highlight` in a soft sage highlight. */
function withHighlight(text: string, highlight?: string): ReactNode {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className="-mx-[3px] rounded-[3px] bg-brand-wash px-[3px] font-semibold text-brand-sageDeep [box-decoration-break:clone]">
        {highlight}
      </mark>
      {text.slice(at + highlight.length)}
    </>
  );
}

export default function ReviewQuote({
  text,
  excerpt,
  highlight,
}: {
  text: string;
  excerpt?: string;
  highlight?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const isLong = text.length > LONG_REVIEW_CHARS;
  const useExcerpt = isLong && Boolean(excerpt);
  const quoteClass = "text-[1.0625rem] leading-[1.55] text-brand-charcoal md:text-lg md:leading-7";

  return (
    <div>
      {/* Drawn as a shape: the Poppins quote glyph reads as two slashes. */}
      <svg aria-hidden="true" viewBox="0 0 32 24" className="h-6 w-8 text-brand-sageLight">
        <path
          fill="currentColor"
          d="M0 24V14.4C0 6.6 4.2 1.6 11.6 0l1.5 3.3C9 4.6 7 7.4 6.8 11H13v13H0zm18.9 0V14.4C18.9 6.6 23.1 1.6 30.5 0L32 3.3c-4.1 1.3-6.1 4.1-6.3 7.7h6.2v13h-13z"
        />
      </svg>
      <div id={id} className="mt-3">
        {useExcerpt ? (
          <blockquote className={quoteClass} hidden={expanded}>
            {withHighlight(excerpt!, highlight)}
          </blockquote>
        ) : null}
        <blockquote
          className={`${quoteClass} ${isLong && !useExcerpt && !expanded ? "line-clamp-7" : ""}`}
          hidden={useExcerpt && !expanded}
        >
          {withHighlight(text, highlight)}
        </blockquote>
      </div>
      {isLong ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 inline-flex min-h-11 items-center text-base font-semibold text-brand-sageDeep underline underline-offset-4 hover:text-brand-sageDark focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
        >
          {expanded ? "Show less" : "Read full review"}
        </button>
      ) : null}
    </div>
  );
}
