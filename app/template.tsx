import type { ReactNode } from "react";
import PageTransition from "./components/PageTransition";

// A template (unlike a layout) remounts on every navigation, which is what lets
// each new page run its entrance animation. Header and footer live in the root
// layout, so they stay put while only the page content changes.
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
