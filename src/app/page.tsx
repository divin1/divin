import { APP_CONFIG } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";
import LatestThoughts from "@/components/LatestThoughts";
import Hello from "@/components/Hello";

export default function Home() {
  return (
    <div>
      <section className="flex h-screen flex-col justify-center">
        <div>
          <div className="text-2xl">
            <Hello />
          </div>

          <div className="mt-3 text-3xl font-bold">I&rsquo;m Nicolas.</div>
          <div className="mt-1 text-3xl font-bold">
            Techie by trade, explorer at heart.
            <br />I write about tech, data, people, and adventures &mdash; both in code and in
            nature.
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
                <Github className="hover:text-primary size-4 transition-colors delay-50 duration-200" />
              </a>

              <a href={APP_CONFIG.linkedin} target="_blank" aria-label="LinkedIn" rel="noreferrer">
                <Linkedin className="hover:text-primary size-4 transition-colors delay-50 duration-200" />
              </a>

              <a href={`mailto:${APP_CONFIG.email}`} aria-label="Email">
                <Mail className="hover:text-primary size-4 transition-colors delay-50 duration-200" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-80">
        <h2 className="my-2 text-2xl font-semibold">Latest thoughts</h2>
        <div className="w-full md:w-1/2">
          <LatestThoughts />
        </div>
      </section>
    </div>
  );
}
