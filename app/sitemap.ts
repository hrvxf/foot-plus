import type { MetadataRoute } from "next";

import { SITE_URL } from "./lib/site";
import { publishedAdviceArticles } from "./lib/advice";
const LOCATION_UPDATE = new Date("2026-10-07T00:00:00.000Z");
const updatedRoutes = new Set([
  "",
  "/about",
  "/prices",
  "/advice",
  "/locations",
  "/locations/bristol",
  "/locations/southampton",
  "/services",
  "/locations/bristol/areas-we-cover",
  "/hard-skin-treatment-bristol",
  "/callus-removal-bristol",
  "/corn-removal-bristol",
  "/cracked-heels-bristol",
  "/toenail-cutting-bristol",
]);
const LAST_MODIFIED = new Date("2026-07-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/locations",
    "/locations/bristol",
    "/locations/bristol/areas-we-cover",
    "/locations/southampton",
    "/book",
    "/forms",
    "/prices",
    "/about",
    "/privacy",
    "/services",
    "/terms",
    "/advice",
    "/hard-skin-treatment-bristol",
    "/callus-removal-bristol",
    "/corn-removal-bristol",
    "/cracked-heels-bristol",
    "/toenail-cutting-bristol",
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
    ...publishedAdviceArticles.map((article) => `/advice/${article.slug}`),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: route.startsWith("/advice/")
      ? new Date(
          publishedAdviceArticles.find(
            (article) => route === `/advice/${article.slug}`,
          )!.dateModified,
        )
      : updatedRoutes.has(route)
        ? LOCATION_UPDATE
        : route.startsWith("/foot-health-practitioner-")
          ? new Date("2026-10-05T00:00:00.000Z")
          : LAST_MODIFIED,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
