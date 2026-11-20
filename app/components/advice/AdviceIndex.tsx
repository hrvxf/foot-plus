"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { focusRing } from "../site/ui";

export type AdviceIndexTopic = { id: string; title: string };
export type AdviceIndexItem = { slug: string; title: string; readingTime: string; topic: string; searchText: string };

const ignored = new Set(["the", "and", "for", "are", "too", "my", "why", "how", "can", "you", "what", "does", "is", "do"]);

/**
 * Advice index: search box and topic buttons over short question cards, grouped by topic. Every guide link is in
 * the server HTML; filtering only hides cards.
 */
export default function AdviceIndex({ topics, items }: { topics: AdviceIndexTopic[]; items: AdviceIndexItem[] }) {
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");

  const words = useMemo(
    () =>
      query
        .toLowerCase()
        .split(/[^a-z0-9’']+/)
        .filter((word) => word.length > 2 && !ignored.has(word))
        // "thick" should find "thickened", "cut" should find "cutting": match on the start of the word.
        .map((word) => word.replace(/(s|es|ed|ing)$/, "")),
    [query],
  );
  const shows = (item: AdviceIndexItem) =>
    (topic === "all" || item.topic === topic) && words.every((word) => item.searchText.includes(word));
  const visibleCount = items.filter(shows).length;

  return (
    <div>
      <div className="relative mx-[18px] sm:mx-auto sm:max-w-md">
        <label htmlFor="advice-search" className="sr-only">
          Search advice
        </label>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-[18px] top-[18px] h-5 w-5 text-brand-sage" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </g>
        </svg>
        <input
          id="advice-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search, e.g. thick nails"
          autoComplete="off"
          className="h-14 w-full rounded-full bg-white pl-[50px] pr-5 text-[1.0625rem] text-brand-charcoal shadow-[0_14px_34px_-22px_rgba(36,48,40,0.4),0_0_0_1px_var(--color-brand-line)] outline-none placeholder:text-brand-muted/70 focus-visible:shadow-[0_0_0_2px_var(--color-brand-sageDark)]"
        />
      </div>

      <div role="group" aria-label="Topics" className="flex gap-1.5 overflow-x-auto px-[18px] pb-1 pt-3 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
        {[{ id: "all", title: "All" }, ...topics].map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={topic === item.id}
            onClick={() => setTopic(item.id)}
            className={`shrink-0 rounded-full px-[15px] py-[9px] text-[0.84375rem] font-semibold transition-colors duration-300 ${focusRing} ${
              topic === item.id ? "bg-brand-sageDark text-white" : "bg-white text-brand-sageDeep shadow-[0_0_0_1px_var(--color-brand-line)]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visibleCount} {visibleCount === 1 ? "guide" : "guides"} shown
      </p>

      {topics.map((group) => {
        const groupItems = items.filter((item) => item.topic === group.id);
        const anyVisible = groupItems.some(shows);
        return (
          <section key={group.id} id={group.id} hidden={!anyVisible} className="px-3.5 pt-[22px] sm:mx-auto sm:max-w-xl" aria-labelledby={`${group.id}-heading`}>
            <h2
              id={`${group.id}-heading`}
              className={`mb-1 text-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark ${topic === "all" ? "" : "sr-only"}`}
            >
              {group.title}
            </h2>
            <ul>
              {groupItems.map((item) => (
                <li key={item.slug} hidden={!shows(item)} className="mt-2">
                  <Link
                    href={`/advice/${item.slug}`}
                    className={`flex items-center justify-between gap-3 rounded-[20px] bg-white px-[18px] py-4 shadow-[0_0_0_1px_var(--color-brand-line)] transition-shadow hover:shadow-[0_0_0_1.5px_var(--color-brand-sage)] ${focusRing}`}
                  >
                    <span>
                      <span className="block font-heading text-[1.0625rem] font-semibold leading-[1.25] tracking-[-0.01em] text-brand-charcoal">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-brand-muted">{item.readingTime}</span>
                    </span>
                    <span aria-hidden="true" className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-brand-wash font-bold text-brand-sageDeep">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {visibleCount === 0 ? (
        <p className="px-6 pt-6 text-center text-brand-muted">
          Nothing on that yet.{" "}
          <Link href="/book" className={`rounded font-semibold text-brand-sageDeep ${focusRing}`}>
            Ask Adam
          </Link>{" "}
          and he&rsquo;ll tell you.
        </p>
      ) : null}
    </div>
  );
}
