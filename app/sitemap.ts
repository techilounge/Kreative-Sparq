import type { MetadataRoute } from "next";
import routes from "@/content/site-routes.json";

const publicOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreativesparq.com"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.indexable.map((route) => ({
    url: `${publicOrigin}${route.path === "/" ? "" : route.path}`,
    changeFrequency: route.changeFrequency as "monthly",
    priority: route.priority,
  }));
}
