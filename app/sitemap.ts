import type { MetadataRoute } from "next";

const SITE_URL = "https://foot-plus.co.uk";
const LAST_MODIFIED = new Date("2026-07-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/areas",
    "/areas-we-cover",
    "/book",
    "/forms",
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
    "/foot-health-practitioner-bishopston",
    "/foot-health-practitioner-henleaze",
    "/foot-health-practitioner-westbury-on-trym",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
