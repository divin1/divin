"use client";

import Link from "next/link";
import Image from "next/image";
import InteractiveGradientBackground from "./InteractiveGradientBackground";

type PostPreviewCardProps = {
  date: string;
  title: string;
  url: string;
  coverImage?: string;
};

export default function PostPreviewCard({ date, title, url, coverImage }: PostPreviewCardProps) {
  return (
    <article className="border-border relative h-64 w-full overflow-hidden rounded-lg">
      <Link href={url} passHref>
        <div className="relative h-full w-full">
          {coverImage ? (
            <Image src={coverImage} alt={title} fill className="rounded-lg object-cover" />
          ) : (
            <InteractiveGradientBackground
              className="h-full w-full"
              orbSize={256}
              staticGradientFrom="from-primary/20"
              staticGradientTo="to-primary/10"
              borderGlowFrom="from-primary/25"
              borderGlowTo="to-primary/17"
              gridOpacity={0.1}
              gridSize={60}
              seed={url}
            >
              {/* Empty children - just the background effect */}
              <div className="h-full w-full" />
            </InteractiveGradientBackground>
          )}

          <div className="absolute top-5 left-5 z-10">
            <h3 className="text-foreground/70 text-lg font-light uppercase">
              {new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <h1 className="text-foreground cursor-pointer text-2xl font-bold transition duration-500 ease-in-out">
              {title}
            </h1>
          </div>
        </div>
      </Link>
    </article>
  );
}
