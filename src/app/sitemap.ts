import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/graphics`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/collaborations`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/works`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
    // /docs (internal changelog) and /businessos (interactive agent-network
    // demo) are deliberately excluded: neither is a canonical, search-worthy
    // landing page — they're linked in-app for visitors who find them, not
    // meant to rank or draw organic search traffic.
  ];

  return staticPages.map((page) => ({
    url: page.url,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
