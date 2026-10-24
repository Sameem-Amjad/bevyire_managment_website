import type { MetadataRoute } from "next";
import { demoMode, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: demoMode
      ? { userAgent: "*", disallow: "/" }
      : {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/api/"],
        },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
