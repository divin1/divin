import { getPosts, THOUGHTS_PATH } from "@/lib/api";
import Link from "next/link";

export default async function PinnedThoughts({ slugs }: { slugs: string[] }) {
  const posts = await getPosts(THOUGHTS_PATH);

  const pinned = posts.filter((post) => slugs.includes(post.slug));

  return (
    <ul>
      {pinned.map((post) => {
        return (
          <Link href={`/thoughts/${post.slug}`} key={post.slug}>
            <li className="hover:bg-background-variant cursor-pointer rounded-lg px-4 py-3">
              <div className="flex flex-col">
                <span className="text-lg font-medium">{post.metadata.title}</span>
                <span className="text-text-variant m-0 text-sm">{post.metadata.excerpt}</span>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
