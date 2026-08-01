import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fullcourthq.com";
  const updated = new Date();

  return [
    { url: siteUrl, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/security`, lastModified: updated, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/privacy`, lastModified: updated, changeFrequency: "monthly", priority: 0.4 },
    {
      url: `${siteUrl}/community-standards`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${siteUrl}/support`, lastModified: updated, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/accessibility`, lastModified: updated, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/terms`, lastModified: updated, changeFrequency: "monthly", priority: 0.4 },
  ];
}
