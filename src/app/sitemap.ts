import { getPosts, THOUGHTS_PATH, ADVENTURES_PATH } from "@/lib/api";
import { MetadataRoute } from "next";
import { APP_CONFIG } from "@/lib/constants";

type SitemapEntry = MetadataRoute.Sitemap[number];

export default async function GET(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_CONFIG.domain;

  const thoughts = await getPosts(THOUGHTS_PATH);
  const adventures = await getPosts(ADVENTURES_PATH);

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...thoughts.map(
      (post) =>
        ({
          url: `${baseUrl}/thoughts/${post.slug}`,
          lastModified: new Date(post.metadata.date),
          changeFrequency: "monthly",
          priority: 1,
        }) as SitemapEntry
    ),
    ...adventures.map(
      (post) =>
        ({
          url: `${baseUrl}/adventures/${post.slug}`,
          lastModified: new Date(post.metadata.date),
          changeFrequency: "monthly",
          priority: 1,
        }) as SitemapEntry
    ),
  ];
}
