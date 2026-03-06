import type { MetadataRoute } from "next";

const SITE_URL = "https://foot-plus.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/areas", "/book", "/prices", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
