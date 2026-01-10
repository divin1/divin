import { APP_CONFIG } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";
import Hello from "@/components/Hello";
import InteractiveWord from "@/components/InteractiveWord";
import PinnedPosts from "@/components/PinnedPosts";
import { THOUGHTS_PATH, PROJECTS_PATH, getPosts } from "@/lib/api";
import Link from "next/link";

export default async function Home() {
  const thoughts = await getPosts(THOUGHTS_PATH);
  const projects = await getPosts(PROJECTS_PATH);

  return (
    <div>
      <section className="flex h-screen flex-col justify-center">
        <div>
          <div className="text-2xl">
            <Hello />
          </div>

          <div className="mt-3 text-3xl font-bold">
            I&rsquo;m{" "}
            <InteractiveWord href="/about" hash="about">
              Nicolas
            </InteractiveWord>
            .
          </div>
          <div className="mt-1 text-3xl leading-10 font-bold">
            I share my{" "}
            <InteractiveWord href="#experiments" hash="experiments">
              experiments
            </InteractiveWord>{" "}
            and{" "}
            <InteractiveWord href="#thoughts" hash="thoughts">
              thoughts
            </InteractiveWord>{" "}
            about software engineering, data science, and &mdash; the engine of it all &mdash;
            people.
          </div>

          <div className="mt-16 flex flex-col gap-6">
            <p className="text-base">
              Full-Stack Software Engineer @{" "}
              <a href="https://amaise.com" className="text-primary hover:text-primary-accent">
                amaise
              </a>
            </p>

            <div className="flex gap-6">
              <a href={APP_CONFIG.github} target="_blank" aria-label="GitHub" rel="noreferrer">
                <Github className="fill-foreground/30 hover:text-primary hover:fill-primary/30 size-5 transition-colors duration-100" />
              </a>

              <a href={APP_CONFIG.linkedin} target="_blank" aria-label="LinkedIn" rel="noreferrer">
                <Linkedin className="fill-foreground/30 hover:text-primary hover:fill-primary/30 size-5 transition-colors duration-100" />
              </a>

              <a href={`mailto:${APP_CONFIG.email}`} aria-label="Email">
                <Mail className="fill-foreground/30 hover:text-primary hover:fill-primary/30 size-5 transition-colors duration-100" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-80" id="thoughts">
        <h2 className="my-2 text-2xl font-semibold">Pinned thoughts</h2>
        <div className="w-full md:w-1/2">
          <PinnedPosts folder="thoughts" slugs={["chasing-exponential-growth"]} posts={thoughts} />
          <Link
            href="/thoughts"
            className="text-primary hover:text-primary-accent mt-4 inline-block text-sm"
          >
            See all thoughts →
          </Link>
        </div>
      </section>

      <section className="min-h-80" id="experiments">
        <h2 className="my-2 text-2xl font-semibold">Pinned projects</h2>
        <div className="w-full md:w-1/2">
          <PinnedPosts folder="projects" slugs={["advent-of-slop"]} posts={projects} />
          <Link
            href="/projects"
            className="text-primary hover:text-primary-accent mt-4 inline-block text-sm"
          >
            See all projects →
          </Link>
        </div>
      </section>
    </div>
  );
}
