"use client";

import { getImageProps } from "next/image";
import { useEffect } from "react";
import { serviceLocations } from "../lib/locations";
import { PRACTITIONER_HERO_SIZES } from "./PractitionerProfile";

/**
 * Once the current page has finished loading and the phone is idle, quietly fetch the
 * practitioner hero portraits into the browser cache, so moving to a location page
 * shows the photo with the page rather than a moment after it. Uses the same srcset
 * and sizes as PractitionerProfile, so the browser picks the exact file it will need.
 * Skipped when the visitor has asked to save data.
 */
export default function PortraitWarmup() {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const warm = () => {
      for (const location of Object.values(serviceLocations)) {
        const practitioner = location.practitioner;
        if (!practitioner) continue;
        const { props } = getImageProps({ src: practitioner.imageSrc, alt: "", fill: true, sizes: PRACTITIONER_HERO_SIZES });
        const img = new Image();
        img.fetchPriority = "low";
        if (props.sizes) img.sizes = props.sizes;
        if (props.srcSet) img.srcset = props.srcSet;
        img.src = props.src;
      }
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(warm, { timeout: 4000 });
      else timeoutId = globalThis.setTimeout(warm, 1500) as unknown as number;
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
