"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import CallButton from "../site/CallButton";
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

  return (
    <div
      // Not data-mobile-actions: that reserves room under the footer, and this bar hides itself there anyway.
      data-home-actions
      aria-hidden={!visible}
      inert={!visible}
      // Slides and fades in and out rather than popping, so it eases away as the checker or footer arrives.
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3.5 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-10 [background:linear-gradient(transparent,rgba(247,246,242,0.95)_55%)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className={`mx-auto flex max-w-md items-center gap-2.5 ${visible ? "pointer-events-auto" : ""}`}>
        <a
          href={`#${checkerId}`}
          className={`flex h-[54px] flex-1 items-center justify-center rounded-full bg-brand-sageDark font-heading text-base font-semibold text-white shadow-[0_16px_30px_-16px_rgba(36,48,40,0.6)] transition-colors hover:bg-brand-sageDeep ${focusRing}`}
          data-analytics-id="home-mobile-check-postcode"
          onClick={() => {
            // Follow the anchor, then put the cursor in the field.
            const input = document.querySelector<HTMLInputElement>(`#${CSS.escape(checkerId)} input`);
            window.setTimeout(() => input?.focus({ preventScroll: true }), 400);
          }}
        >
          Check your postcode
        </a>
        <CallButton
          className={`flex h-[54px] w-[54px] flex-none items-center justify-center rounded-full border border-brand-line bg-white text-brand-sageDark shadow-[0_10px_24px_-14px_rgba(36,48,40,0.5)] transition-colors hover:bg-brand-wash ${focusRing}`}
          label="Call Foot+"
          analyticsId="home-mobile-phone"
        >
          {() => <Phone className="h-5 w-5" aria-hidden="true" />}
        </CallButton>
      </div>
    </div>
  );
}
