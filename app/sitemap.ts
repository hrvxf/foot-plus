import type { MetadataRoute } from "next";

import { SITE_URL } from "./lib/site";
const LAST_MODIFIED = new Date("2026-07-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/areas-we-cover",
    "/book",
    "/prices",
    "/services",
    "/hard-skin-treatment-bristol",
    "/callus-removal-bristol",
    "/corn-removal-bristol",
    "/cracked-heels-bristol",
    "/toenail-cutting-bristol",
    "/foot-health-practitioner-bristol",
    "/foot-health-practitioner-clifton",
    "/foot-health-practitioner-redland",
    "/foot-health-practitioner-cotham",
    "/foot-health-practitioner-bishopston",
    "/foot-health-practitioner-henleaze",
    "/foot-health-practitioner-westbury-on-trym",
    "/foot-health-practitioner-stoke-bishop",
    "/foot-health-practitioner-sneyd-park",
    "/foot-health-practitioner-st-philips",
    "/foot-health-practitioner-old-market",
    "/foot-health-practitioner-redcliffe",
    "/foot-health-practitioner-easton",
    "/foot-health-practitioner-barton-hill",
    "/foot-health-practitioner-totterdown",
    "/foot-health-practitioner-southville",
    "/foot-health-practitioner-bedminster",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
