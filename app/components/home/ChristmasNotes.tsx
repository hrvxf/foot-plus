"use client";

import type { ReactNode } from "react";

import { christmas, useSeason } from "../../lib/season";
import { small } from "../site/ui";

/** Christmas availability, shown under the hero lead until visits resume. */
export function ChristmasAvailability() {
  const on = useSeason(christmas.availability);
  if (!on) return null;

  return (
    <p className={`${small} mt-5 max-w-[52ch] border-l-2 border-brand-sage pl-3 md:mt-6`}>
      {christmas.availabilityText}
    </p>
  );
}

/** The hero checker's helper line, with a seasonal version in December. */
export function SeasonalHelper({ children }: { children: ReactNode }) {
  const on = useSeason(christmas.helper);
  return <>{on ? christmas.helperText : children}</>;
}
