"use client";

import Link from "next/link";
import InteractiveGradientBackground from "./InteractiveGradientBackground";

export default function PinnedPostItem({
  post,
  href,
}: {
  post: { slug: string; metadata: { title: string; excerpt: string } };
  href: string;
}) {
  return (
    <li className="relative">
      <InteractiveGradientBackground className="cursor-pointer" seed={post.slug}>
        <Link href={href} className="block">
          <div className="flex flex-col px-4 py-3">
            <span className="text-foreground text-lg font-medium transition-colors duration-300">
              {post.metadata.title}
            </span>
            <span className="text-text-variant m-0 text-sm">{post.metadata.excerpt}</span>
          </div>
        </Link>
      </InteractiveGradientBackground>
    </li>
  );
}
