"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import { phoneHref } from "../../lib/site";
import { focusRing } from "../site/ui";

/**
 * Small-screen action bar for the home page. It stays out of the way while a
 * postcode checker or the footer is on screen, so it never covers the page's
 * primary action, and returns once the visitor has scrolled past it.
 */
export default function HomeMobileBar({ checkerId }: { checkerId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [
      ...document.querySelectorAll("[data-postcode-checker]"),
      document.getElementById("site-footer"),
    ].filter((element): element is Element => element !== null);
    if (!targets.length || typeof IntersectionObserver === "undefined") return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  const action = `inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-base font-semibold transition-colors duration-150 ${focusRing}`;

  return (
    <div data-mobile-actions className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-charcoal/15 bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href={`#${checkerId}`}
          className={`${action} bg-brand-sageDark text-white hover:bg-brand-sageDeep`}
          data-analytics-id="home-mobile-check-postcode"
          onClick={() => {
            // Follow the anchor, then put the cursor in the field.
            const input = document.querySelector<HTMLInputElement>(`#${CSS.escape(checkerId)} input`);
            window.setTimeout(() => input?.focus({ preventScroll: true }), 400);
          }}
        >
          Check postcode
        </a>
        <a
          href={phoneHref}
          className={`${action} border-[1.5px] border-brand-sageDark bg-white text-brand-sageDeep hover:bg-brand-offwhite`}
          data-analytics-id="home-mobile-phone"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
