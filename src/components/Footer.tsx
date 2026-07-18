import { APP_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-border w-full border-t">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12">
        <h2 className="text-lg font-semibold">Connect</h2>
        <p className="text-text-variant mt-2 max-w-md text-sm">
          Reach me at{" "}
          <a href={`mailto:${APP_CONFIG.email}`} className="text-primary hover:text-primary-accent">
            {APP_CONFIG.email}
          </a>{" "}
          or find me on the platforms below.
        </p>

        <div className="mt-4 flex flex-col gap-1 text-sm">
          <a
            href={APP_CONFIG.github}
            target="_blank"
            rel="noreferrer"
            className="text-text-variant hover:text-foreground w-fit underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href={APP_CONFIG.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-text-variant hover:text-foreground w-fit underline underline-offset-4"
          >
            LinkedIn
          </a>
        </div>

        <div className="text-text-variant mt-10 flex flex-col gap-1 text-xs">
          <span>
            Copyright © {APP_CONFIG.fullName} {new Date().getFullYear()}. All rights reserved.
          </span>
          <span>
            No LLMs were harmed in the making of this website. Here&rsquo;s the{" "}
            <a href="http://github.com/divin1/divin" className="underline">
              code
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
