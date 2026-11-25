"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { focusRing } from "../site/ui";

export type AdviceIndexTopic = { id: string; title: string; short: string };
export type AdviceIndexItem = { slug: string; title: string; readingTime: string; topic: string; searchText: string };

const ignored = new Set(["the", "and", "for", "are", "too", "my", "why", "how", "can", "you", "what", "does", "is", "do"]);

/**
 * Advice index: search box with a topic menu inside it, over short question cards grouped by topic. Every guide
 * link is in the server HTML; filtering only hides cards.
 */
export default function AdviceIndex({ topics, items }: { topics: AdviceIndexTopic[]; items: AdviceIndexItem[] }) {
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the topic menu on a click outside it or on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !toggleRef.current?.contains(target)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
  const currentTopic = topics.find((item) => item.id === topic);
  const menuOptions = [{ id: "all", title: "All topics", short: "All" }, ...topics].map((item) => ({
    ...item,
    count: item.id === "all" ? items.length : items.filter((entry) => entry.topic === item.id).length,
  }));

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
          placeholder="Search, e.g. corns"
          autoComplete="off"
          className="h-14 w-full rounded-full bg-white pl-[50px] pr-[124px] text-[1.0625rem] text-brand-charcoal shadow-[0_14px_34px_-22px_rgba(36,48,40,0.4),0_0_0_1px_var(--color-brand-line)] outline-none placeholder:text-brand-muted/70 focus-visible:shadow-[0_0_0_2px_var(--color-brand-sageDark)]"
        />
        <button
          ref={toggleRef}
          type="button"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-controls="advice-topic-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className={`absolute right-1.5 top-1.5 flex h-11 items-center gap-1.5 rounded-full px-3.5 text-[0.875rem] font-semibold transition-colors duration-300 ${focusRing} ${
            currentTopic ? "bg-brand-sageDark text-white" : "bg-brand-wash text-brand-sageDeep"
          }`}
        >
          <span className="sr-only">Filter by topic: </span>
          {currentTopic ? currentTopic.short : "Topic"}
          <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`} aria-hidden="true">
            <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div
          ref={menuRef}
          id="advice-topic-menu"
          role="group"
          aria-label="Topics"
          hidden={!menuOpen}
          className="absolute right-0 top-[62px] z-20 w-[232px] rounded-[20px] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(36,48,40,0.45),0_0_0_1px_var(--color-brand-line)]"
        >
          {menuOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={topic === item.id}
              onClick={() => {
                setTopic(item.id);
                setMenuOpen(false);
                toggleRef.current?.focus();
              }}
              className={`flex min-h-11 w-full items-center justify-between rounded-[14px] px-3 text-left text-[0.9375rem] text-brand-charcoal ${focusRing} ${
                topic === item.id ? "bg-brand-wash font-semibold" : "font-medium hover:bg-brand-wash/60"
              }`}
            >
              {item.title}
              <span className="text-xs font-medium text-brand-muted">{item.count}</span>
            </button>
          ))}
        </div>
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
