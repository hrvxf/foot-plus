"use client";

import { useEffect, useState, type ReactNode } from "react";

// Module scope survives client-side navigations but resets on a full page load.
// The first render (server HTML + hydration) never animates, so the landing page
// paints immediately and LCP is unaffected. Every later soft navigation remounts
// the root template and gets a short fade-in.
let hasMountedOnce = false;

export default function PageTransition({ children }: { children: ReactNode }) {
  const [animate] = useState(() => hasMountedOnce);

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
