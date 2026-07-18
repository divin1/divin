import Link from "next/link";
import { CompiledPost } from "@/lib/types";

type PostListProps = {
  posts: CompiledPost[];
  basePath: string;
};

export default function PostList({ posts, basePath }: PostListProps) {
  const seenYears = new Set<number>();
  const rows = posts.map((post) => {
    const year = new Date(post.metadata.date).getFullYear();
    const showYear = !seenYears.has(year);
    seenYears.add(year);
    return { post, year, showYear };
  });

  return (
    <div className="divide-border divide-y">
      {rows.map(({ post, year, showYear }) => {
        const date = new Date(post.metadata.date);

        return (
          <Link
            key={post.slug}
            href={`${basePath}/${post.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-4 sm:grid-cols-[3.5rem_1fr_auto]"
          >
            <span className="text-text-variant text-sm">{showYear ? year : ""}</span>
            <span>
              <span className="font-medium group-hover:underline">{post.metadata.title}</span>
              <p className="text-text-variant mt-0.5 text-sm">{post.metadata.excerpt}</p>
            </span>
            <time dateTime={post.metadata.date} className="text-text-variant shrink-0 text-sm">
              {date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })}
            </time>
          </Link>
        );
      })}
    </div>
  );
}
