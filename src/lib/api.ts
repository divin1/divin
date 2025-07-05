import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { CompiledPost } from "@/lib/types";
import { getReadTime } from "@/lib/util";
import { PostMetadata } from "@/lib/types";

export const THOUGHTS_PATH = join(process.cwd(), "content/thoughts");
export const ADVENTURES_PATH = join(process.cwd(), "content/adventures");

/**
 * Get all filenames in a directory.
 * @param dir Directory to search for files.
 * @returns Array of slugs.
 */
export function getSlugs(dir: string): string[] {
  return fs.readdirSync(dir).map((filename) => filename.replace(/\.mdx$/, ""));
}

/**
 * Extract frontmatter info.
 * @param slug Post path name without `.mdx` suffix.
 * @returns `PostMetadata`.
 */
export const getPostMetadata = (dir: string, slug: string): PostMetadata => {
  const path = join(dir, `${slug}.mdx`);
  const rawMdx = fs.readFileSync(path, "utf8");
  const frontmatter = matter(rawMdx).data as PostMetadata;
  return frontmatter;
};

/**
 *
 * @param dir
 * @param slug
 * @returns a promise that resolves to a CompiledPost object
 */
export const getPost = async (dir: string, slug: string): Promise<CompiledPost> => {
  const path = join(dir, `${slug}.mdx`);
  const source = fs.readFileSync(path, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    content,
    readTime: getReadTime(content),
    metadata: {
      date: data.date,
      updated: data.updated,
      draft: data.draft,
      hidden: data.hidden,
      title: data.title,
      excerpt: data.excerpt,
      tags: data.tags,
      keywords: data.keywords,
      cover: data.cover,
    },
  };
};

/**
 * Get all posts in the given directory.
 * @param dir Directory to search for posts.
 * @returns Array of CompiledPost objects.
 */
export async function getPosts(dir: string): Promise<CompiledPost[]> {
  const slugs = getSlugs(dir);
  const postsPromises: Promise<CompiledPost>[] = [];
  slugs.forEach((slug: string) => {
    postsPromises.push(getPost(dir, slug));
  });
  const posts: CompiledPost[] = await Promise.all(postsPromises);
  posts.sort((a, b) => new Date(b.metadata.date).valueOf() - new Date(a.metadata.date).valueOf());
  return posts;
}
