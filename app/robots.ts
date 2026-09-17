import type { MetadataRoute } from "next";

import { isLocalSiteUrl, siteUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  if (isLocalSiteUrl) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
    host: siteUrl.origin,
  };
}
