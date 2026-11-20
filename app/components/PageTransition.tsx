"use client";

import { useEffect, useState, type ReactNode } from "react";
import { viewTransitionsSupported } from "./RouteViewTransition";

// Module scope survives client-side navigations but resets on a full page load.
// The first render (server HTML + hydration) never animates, so the landing page
// paints immediately and LCP is unaffected. Every later soft navigation remounts
// the root template and gets a short fade-in, unless the browser supports view
// transitions, in which case RouteViewTransition cross-fades the whole screen instead.
let hasMountedOnce = false;

export default function PageTransition({ children }: { children: ReactNode }) {
  // "page-enter": CSS fade for browsers without view transitions. "soft-nav": a view
  // transition is handling the change, so in-page entrance animations (the location
  // chooser's rise) are switched off and don't play again once it has finished.
  const [className] = useState(() =>
    !hasMountedOnce ? undefined : viewTransitionsSupported() ? "soft-nav" : "page-enter",
  );

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return <div className={className}>{children}</div>;
}
