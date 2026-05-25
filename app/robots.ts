import { MetadataRoute } from "next";

const BASE_URL = "https://anarperfumes.ma";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout", "/cart"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
