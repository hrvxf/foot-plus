"use client";

import { useId, useState } from "react";

// Reviews longer than this are clamped to the height of a typical review, with a
// toggle to read the rest. The full text stays in the page for search engines and
// screen readers; the clamp is visual only.
const LONG_REVIEW_CHARS = 320;

export default function ReviewQuote({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const isLong = text.length > LONG_REVIEW_CHARS;

  return (
    <div className="mt-3">
      <blockquote
        id={id}
        className={`text-[1.0625rem] leading-[1.55] text-brand-charcoal md:text-lg md:leading-7 ${
          isLong && !expanded ? "line-clamp-7" : ""
        }`}
      >
        &ldquo;{text}&rdquo;
      </blockquote>
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
