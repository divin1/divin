import Hello from "@/components/Hello";
import PostList from "@/components/PostList";
import SectionTabs from "@/components/SectionTabs";
import Reveal from "@/components/Reveal";
import { APP_CONFIG } from "@/lib/constants";
import { THOUGHTS_PATH, PROJECTS_PATH, getPosts } from "@/lib/api";

export default async function Home() {
  const thoughts = (await getPosts(THOUGHTS_PATH)).filter(
    (a) => !a.metadata.draft && !a.metadata.hidden
  );
  const projects = (await getPosts(PROJECTS_PATH)).filter(
    (a) => !a.metadata.draft && !a.metadata.hidden
  );

  return (
    <div>
      <section className="pt-16 pb-8 md:pt-24">
        <div className="text-text-variant text-sm">
          <Hello />
        </div>

        <h1 className="mt-4 text-2xl font-semibold md:text-3xl">{APP_CONFIG.fullName}</h1>

        <p className="text-text-variant mt-3 max-w-xl text-base leading-relaxed">
          Full-Stack Software Engineer based in Bern, Switzerland (UTC+1) @{" "}
          <a href="https://amaise.com" className="text-primary hover:text-primary-accent">
            amaise
          </a>
          , focused on architecture, large-scale data systems, and AI. <br />
          <i>Escaping and chasing type 2 fun in the mountains in my time off.</i>
        </p>
      </section>

      <Reveal>
        <SectionTabs
          tabs={[
            {
              key: "articles",
              label: "Articles",
              rssHref: "/thoughts/rss.xml",
              content: <PostList posts={thoughts} basePath="/thoughts" />,
            },
            {
              key: "projects",
              label: "Projects",
              rssHref: "/projects/rss.xml",
              content: <PostList posts={projects} basePath="/projects" />,
            },
          ]}
        />
      </Reveal>
    </div>
  );
}
