/**
 * Foot+ travel fees, by driving distance from each location's base
 * (Bristol: BS2 0QF, Southampton: SO16 5LF).
 *
 * Fee rule (from Adam, same for both locations): up to 2 road miles free,
 * 2–7 road miles £5, 7+ road miles £10+.
 *
 * We don't call a paid routing API. Driving distance is estimated as straight-line
 * distance × ROAD_FACTOR. Measured routes from the base came out at 1.28–1.57× the
 * straight line (Clifton 1.50, Bishopston 1.47, Southville 1.57, Sneyd Park 1.33,
 * Brislington 1.28, Portishead 1.29), so 1.4 is a fair middle. Anything close to a
 * threshold is shown as borderline and confirmed when booking.
 *
 * The 1.4 factor was measured around Bristol only. Southampton uses it as a starting
 * estimate until routes from SO16 have been checked the same way.
 */

export type TravelBaseKey = "bristol" | "southampton";

export const travelBases: Record<TravelBaseKey, { lat: number; lng: number; label: string }> = {
  bristol: { lat: 51.452116, lng: -2.577901, label: "BS2" },
  // SO16 5LF
  southampton: { lat: 50.936371, lng: -1.432678, label: "SO16" },
};

/** Bristol base. Kept for the Bristol-only pages that import it. */
export const TRAVEL_BASE = travelBases.bristol;
export const ROAD_FACTOR = 1.4;
export const FREE_UP_TO_MILES = 2;
export const STANDARD_UP_TO_MILES = 7;
const BORDERLINE_MARGIN_MILES = 0.3;

export type TravelBand = "free" | "standard" | "extended";

export const travelBands: Record<
  TravelBand,
  { fee: string; label: string; range: string }
> = {
  free: { fee: "Free", label: "Free travel", range: `Under ${FREE_UP_TO_MILES} miles` },
  standard: {
    fee: "£5",
    label: "£5 travel",
    range: `${FREE_UP_TO_MILES}–${STANDARD_UP_TO_MILES} miles`,
  },
  extended: {
    fee: "£10+",
    label: "£10+ travel",
    range: `${STANDARD_UP_TO_MILES}+ miles, by arrangement`,
  },
};

/** One-line summary for copy across the site. */
export const travelSummary = `Travel is free within ${FREE_UP_TO_MILES} miles of our ${TRAVEL_BASE.label} base, £5 up to ${STANDARD_UP_TO_MILES} miles, and £10+ beyond that. Any travel fee is confirmed before you book.`;

/** One-line summary covering both locations, for shared pages such as the home page. */
export const travelSummaryAllLocations = `Travel is free within ${FREE_UP_TO_MILES} miles of your practitioner's base (${travelBases.bristol.label} in Bristol, ${travelBases.southampton.label} in Southampton), £5 up to ${STANDARD_UP_TO_MILES} miles and from £10 beyond.`;

/** Southampton equivalent of `travelSummary`. */
export const southamptonTravelSummary = `Travel is free within ${FREE_UP_TO_MILES} miles of our ${travelBases.southampton.label} base, £5 up to ${STANDARD_UP_TO_MILES} miles, and £10+ beyond that. Any travel fee is confirmed before you book.`;

function straightLineMiles(lat: number, lng: number, base: { lat: number; lng: number }) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat - base.lat);
  const dLng = toRad(lng - base.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(base.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 3958.8 * Math.asin(Math.sqrt(h));
}

export type TravelEstimate = {
  roadMiles: number;
  band: TravelBand;
  /** Close enough to a threshold that the fee could go either way. */
  borderline: boolean;
};

export function estimateTravel(
  lat: number,
  lng: number,
  base: TravelBaseKey = "bristol"
): TravelEstimate {
  const roadMiles = straightLineMiles(lat, lng, travelBases[base]) * ROAD_FACTOR;
  const band: TravelBand =
    roadMiles < FREE_UP_TO_MILES
      ? "free"
      : roadMiles < STANDARD_UP_TO_MILES
        ? "standard"
        : "extended";
  const borderline = [FREE_UP_TO_MILES, STANDARD_UP_TO_MILES].some(
    (threshold) => Math.abs(roadMiles - threshold) <= BORDERLINE_MARGIN_MILES
  );
  return { roadMiles, band, borderline };
}

/** Looks up a full postcode's coordinates via the free postcodes.io API. */
export async function lookupPostcode(
  postcode: string,
  signal?: AbortSignal
): Promise<{ lat: number; lng: number } | null> {
  try {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.replace(/\s+/g, ""))}`,
      { signal }
    );
    if (!response.ok) return null;
    const data = (await response.json()) as {
      result?: { latitude: number | null; longitude: number | null };
    };
    const { latitude, longitude } = data.result ?? {};
    return typeof latitude === "number" && typeof longitude === "number"
      ? { lat: latitude, lng: longitude }
      : null;
  } catch {
    return null;
  }
}
