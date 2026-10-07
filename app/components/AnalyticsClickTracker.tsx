"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, trackAdviceEvent } from "./advice/AdviceTracker";

function typeFor(href: string) {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.startsWith("https://wa.me/")) return "whatsapp_click";
  if (href.startsWith("/book")) return "booking_click";
  return undefined;
}

export default function AnalyticsClickTracker() {
  const pathname = usePathname();
  useEffect(() => {
    captureAttribution();
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const name = typeFor(anchor.getAttribute("href") || "");
      if (!name) return;
      trackAdviceEvent(name, {
        source_page: pathname,
        destination: anchor.href,
        cta_id: anchor.dataset.analyticsId,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);
  return null;
}
