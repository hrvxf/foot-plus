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
      <mark className="rounded-[3px] bg-brand-wash px-1 font-semibold text-brand-sageDeep [box-decoration-break:clone]">
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
    <div className="mt-2">
      <span
        aria-hidden="true"
        className="block h-8 font-heading text-[4rem] font-semibold leading-[0.9] text-brand-sageLight"
      >
        &ldquo;
      </span>
      <div id={id}>
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
