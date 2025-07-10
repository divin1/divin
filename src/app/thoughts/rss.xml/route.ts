import { getPosts, THOUGHTS_PATH } from "@/lib/api";
import { NextResponse } from "next/server";
import { APP_CONFIG } from "@/lib/constants";
import { Feed } from "feed";

export async function GET() {
  const posts = await getPosts(THOUGHTS_PATH);

  const feed = new Feed({
    title: "Thoughts",
    description: APP_CONFIG.metadata.description,
    id: APP_CONFIG.domain + "/thoughts/rss.xml",
    link: APP_CONFIG.domain + "/thoughts/rss.xml",
    language: "en",
    image: `${APP_CONFIG.domain}/og.png`,
    favicon: `${APP_CONFIG.domain}/favicon.ico`,
    copyright: `All rights reserved 2025, ${APP_CONFIG.author}`,
    generator: "awesome",
    feedLinks: {
      atom: `${APP_CONFIG.domain}/thoughts/rss.xml`,
    },
    author: {
      name: APP_CONFIG.author,
      email: APP_CONFIG.email,
      link: `${APP_CONFIG.domain}/about`,
    },
  });

  posts.forEach((post) => {
    const url = `${APP_CONFIG.domain}/thoughts/${post.slug}`;

    feed.addItem({
      title: post.metadata.title,
      id: url,
      link: url,
      description: post.metadata.excerpt,
      author: [
        {
          name: APP_CONFIG.author,
          email: APP_CONFIG.email,
          link: `${APP_CONFIG.domain}/about`,
        },
      ],
      date: new Date(post.metadata.date),
      image: post.metadata.cover || `${APP_CONFIG.domain}/og.png`,
    });
  });

  return new NextResponse(feed.atom1(), {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
