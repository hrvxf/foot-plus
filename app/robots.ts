import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://foot-plus.co.uk/sitemap.xml",
    host: "https://foot-plus.co.uk",
  };
}
