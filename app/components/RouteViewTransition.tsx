"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * Smooth page changes. When someone taps a link to another page, the browser takes a
 * picture of the current screen, Next.js swaps in the new page behind it, and the two
 * cross-fade on the GPU (the View Transitions API). Without this, phones showed the
 * old page frozen, then a snap to the top of a blank page, then a fade-in.
 *
 * The fade also waits briefly for pictures on the new screen (practitioner portraits)
 * so they appear with the page instead of popping in a moment later.
 *
 * Browsers without the API (older iOS) keep the CSS fade in PageTransition.tsx.
 * Skipped for reduced-motion visitors, new tabs, downloads, hash links and anything
 * off-site. If the new page is slow to arrive the transition is abandoned so the
 * screen is never left frozen.
 */

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => { skipTransition: () => void; finished: Promise<void> };
};

/** Never hold the old screen longer than this while waiting for the new page. */
const MAX_WAIT_MS = 1200;

/** How long to hold the fade for pictures on the new screen to finish loading. */
const MAX_IMAGE_WAIT_MS = 500;

let pending: { resolve: () => void; timer: number } | null = null;

function settle() {
  if (!pending) return;
  window.clearTimeout(pending.timer);
  pending.resolve();
  pending = null;
}

/** Images on screen that have not loaded yet (lazy ones further down are left alone). */
function unloadedImagesInView() {
  const height = window.innerHeight;
  return Array.from(document.querySelectorAll("main img")).filter((img): img is HTMLImageElement => {
    if (!(img instanceof HTMLImageElement) || img.complete) return false;
    const rect = img.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < height && rect.width > 0;
  });
}

/** New page is in place: fade to it once its visible pictures are ready (or soon anyway). */
function settleWhenImagesReady() {
  if (!pending) return;
  const images = unloadedImagesInView();
  if (!images.length) return settle();
  const waiting = pending;
  Promise.race([
    Promise.all(images.map((img) => img.decode().catch(() => undefined))),
    new Promise((resolve) => window.setTimeout(resolve, MAX_IMAGE_WAIT_MS)),
  ]).then(() => {
    if (pending === waiting) settle();
  });
}

export function viewTransitionsSupported() {
  if (typeof document === "undefined") return false;
  if (!(document as ViewTransitionDocument).startViewTransition) return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function RouteViewTransition() {
  const pathname = usePathname();

  // The new page has been committed (and Next has scrolled to the top): let the
  // browser take its "after" picture and run the cross-fade, once the pictures
  // on screen have arrived so they don't pop in after the fade.
  useLayoutEffect(() => {
    settleWhenImagesReady();
  }, [pathname]);

  useEffect(() => {
    if (!viewTransitionsSupported()) return;
    const doc = document as ViewTransitionDocument;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page, hash or query only

      settle();
      doc.startViewTransition!(
        () =>
          new Promise<void>((resolve) => {
            pending = { resolve, timer: window.setTimeout(settle, MAX_WAIT_MS) };
          }),
      );
    };

    // Capture phase on window, so this runs before Next's Link handler starts the navigation.
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
