import { getPosts, PROJECTS_PATH } from "@/lib/api";
import PostPreviewCard from "@/components/PostPreviewCard";

export default async function Projects() {
  const posts = (await getPosts(PROJECTS_PATH)).filter(
    (a) => !a.metadata.draft && !a.metadata.hidden
  );

  return (
    <div>
      <h1 className="mt-20 text-4xl font-bold">Projects</h1>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-text-variant text-xl font-normal">
          Experiments and more completed works.
        </h3>

        <a
          href="/projects/rss.xml"
          className="text-text-variant bg-background-variant hover:text-text ml-auto shrink-0 rounded-lg px-3 py-1 text-sm font-normal transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          rss
        </a>
      </div>

      <div className="flex flex-col gap-4 py-8">
        {posts.map((post) => (
          <PostPreviewCard
            key={post.slug}
            url={`/projects/${post.slug}`}
            date={post.metadata.date}
            title={post.metadata.title}
          />
        ))}
      </div>
    </div>
  );
}
