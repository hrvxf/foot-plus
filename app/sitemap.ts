import type { MetadataRoute } from "next";

import { SITE_URL } from "./lib/site";
import { publishedAdviceArticles } from "./lib/advice";

// When each page's content last really changed. Google uses these to decide what
// to recrawl, and ignores them if they look made up, so bump a page's date only
// when its visible content changes. Advice dates come from app/lib/advice.ts.
// Routing and utility pages (/locations, /forms, /toenail-cutting, /card, /review)
// are kept out of search, so they aren't listed here.
const pages: Record<string, string> = {
  "": "2026-11-25",
  "/locations/bristol": "2026-11-25",
  "/locations/bristol/areas-we-cover": "2026-11-21",
  "/locations/southampton": "2026-11-25",
  "/toenail-cutting-bristol": "2026-11-23",
  "/toenail-cutting-southampton": "2026-11-23",
  "/services": "2026-11-23",
  "/hard-skin-and-callus": "2026-11-25",
  "/corn-treatment": "2026-11-12",
  "/cracked-heels": "2026-11-25",
  "/supported-living-foot-care": "2026-11-25",
  "/prices": "2026-11-23",
  "/about": "2026-11-23",
  "/advice": "2026-11-25",
  "/book": "2026-11-25",
  "/partners": "2026-11-23",
  "/privacy": "2026-11-24",
  "/terms": "2026-11-23",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    ...Object.entries(pages),
    ...publishedAdviceArticles.map((article) => [`/advice/${article.slug}`, article.dateModified] as const),
  ];

  return entries.map(([route, date]) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(`${date}T00:00:00.000Z`),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
