"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders children except on the given path prefixes. */
export default function HideOnPaths({ paths, children }: { paths: string[]; children: ReactNode }) {
  const pathname = usePathname();
  if (paths.some((path) => pathname.startsWith(path))) return null;
  return <>{children}</>;
}
