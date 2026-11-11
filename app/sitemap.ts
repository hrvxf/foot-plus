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
        : LAST_MODIFIED,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
