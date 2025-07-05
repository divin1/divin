import { getPosts, THOUGHTS_PATH } from "@/lib/api";
import PostPreview from "@/components/PostPreview";

export default async function Thoughts() {
  const posts = (await getPosts(THOUGHTS_PATH)).filter(
    (a) => !a.metadata.draft && !a.metadata.hidden
  );

  return (
    <div>
      <h1 className="mt-20 text-4xl font-bold">Thoughts</h1>
      <h3 className="text-text-variant text-xl font-normal">
        Essays, ideas and everything in between.
      </h3>

      <div className="flex flex-col gap-4 py-8">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            url={`/thoughts/${post.slug}`}
            readTime={post.readTime}
            date={post.metadata.date}
            title={post.metadata.title}
          />
        ))}
      </div>
    </div>
  );
}
