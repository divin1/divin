import { getSlugs, getPost, getPostMetadata, THOUGHTS_PATH } from "@/lib/api";
import Post from "@/components/Post";
import { APP_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(THOUGHTS_PATH, slug);

  return <Post post={post} backTo="/thoughts" backToText="All thoughts" />;
}

export function generateStaticParams() {
  const slugs: string[] = getSlugs(THOUGHTS_PATH);
  return slugs.map((slug) => ({
    slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMetadata(THOUGHTS_PATH, slug);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${APP_CONFIG.domain}/thoughts/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export const dynamicParams = false;
