import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/graphics`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/collaborations`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/works`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  return staticPages.map((page) => ({
    url: page.url,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
