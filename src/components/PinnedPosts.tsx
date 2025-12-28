import { getPosts } from "@/lib/api";
import PinnedPostItem from "./PinnedPostItem";

type PinnedPostsProps = {
  posts: Awaited<ReturnType<typeof getPosts>>;
  slugs: string[];
};

export default function PinnedPosts({ posts, slugs }: PinnedPostsProps) {
  const pinned = posts.filter((post) => slugs.includes(post.slug));

  return (
    <ul className="flex flex-col gap-3">
      {pinned.map((post) => (
        <PinnedPostItem key={post.slug} post={post} href={`/thoughts/${post.slug}`} />
      ))}
    </ul>
  );
}
