"use client";
import { useEffect, useRef } from "react";

type Attr = {
  landing_page: string;
  source?: string;
  medium?: string;
  campaign?: string;
  referrer_domain?: string;
  ai_referral_source?: "chatgpt" | "other";
  referral_category: "chatgpt" | "organic_search" | "direct" | "other_referral";
};
const KEY = "footplus_attribution";
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
function host(ref: string) {
  try {
    return ref ? new URL(ref).hostname.replace(/^www\./, "") : undefined;
  } catch {
    return undefined;
  }
}
function getAttr(): Attr {
  if (typeof window === "undefined")
    return { landing_page: "", referral_category: "direct" };
  try {
    const stored = sessionStorage.getItem(KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Attr;
      if (typeof parsed.landing_page === "string" && parsed.referral_category)
        return parsed;
    }
  } catch {
    /* Analytics must not interrupt booking when storage is unavailable. */
  }
  const params = new URLSearchParams(location.search);
  const referrer = host(document.referrer);
  const source = params.get("utm_source") || undefined;
  const medium = params.get("utm_medium") || undefined;
  const campaign = params.get("utm_campaign") || undefined;
  const chat =
    source?.toLowerCase().includes("chatgpt") ||
    referrer === "chatgpt.com" ||
    referrer === "openai.com";
  const organic =
    medium === "organic" ||
    /(^|\.)google\.(com|co\.uk|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/.test(referrer ?? "") ||
    ["bing.com", "duckduckgo.com", "yahoo.com"].some(
      (domain) => referrer === domain || referrer?.endsWith(`.${domain}`),
    );
  const attr: Attr = {
    landing_page: location.pathname,
    source,
    medium,
    campaign,
    referrer_domain: referrer,
    ai_referral_source: chat ? "chatgpt" : referrer ? "other" : undefined,
    referral_category: chat
      ? "chatgpt"
      : organic
        ? "organic_search"
        : referrer
          ? "other_referral"
          : "direct",
  };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(attr));
  } catch {
    /* Storage is optional. */
  }
  return attr;
}
export function captureAttribution() {
  getAttr();
}

export function trackAdviceEvent(
  name: string,
  params: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  try {
    const attr = getAttr();
    window.gtag?.("event", name, { ...attr, ...params });
  } catch {
    /* Analytics must not block an enquiry or a link. */
  }
}
export default function AdviceTracker({
  slug,
  title,
  category,
}: {
  slug: string;
  title: string;
  category: string;
}) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackAdviceEvent("advice_article_view", {
      article_slug: slug,
      article_title: title,
      article_category: category,
      author: "Adam James",
    });
  }, [slug, title, category]);
  return null;
}
export function AdviceTrackedLink({
  href,
  children,
  eventName = "advice_cta_click",
  params,
  className,
}: {
  href: string;
  children: React.ReactNode;
  eventName?: string;
  params: Record<string, unknown>;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() =>
        trackAdviceEvent(eventName, { destination: href, ...params })
      }
    >
      {children}
    </a>
  );
}
