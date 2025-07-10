import { getPosts, THOUGHTS_PATH } from "@/lib/api";
import PostPreview from "@/components/PostPreview";

export default async function Thoughts() {
  const posts = (await getPosts(THOUGHTS_PATH)).filter(
    (a) => !a.metadata.draft && !a.metadata.hidden
  );

  return (
    <div>
      <h1 className="mt-20 text-4xl font-bold">Thoughts</h1>
      <div className="flex">
        <h3 className="text-text-variant text-xl font-normal">
          Essays, ideas and everything in between.
        </h3>

        <div className="flex-1"></div>

        <a
          href="/thoughts/rss.xml"
          className="text-text-variant bg-background-variant hover:text-text rounded-lg px-2 py-1 text-sm font-normal transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          rss
        </a>
      </div>

      <div className="flex flex-col gap-4 py-8">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            url={`/thoughts/${post.slug}`}
            readTime={post.readTime}
            date={post.metadata.date}
            title={post.metadata.title}
            excerpt={post.metadata.excerpt}
          />
        ))}
      </div>
    </div>
  );
}
