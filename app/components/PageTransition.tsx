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
  const [animate] = useState(() => hasMountedOnce && !viewTransitionsSupported());

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
