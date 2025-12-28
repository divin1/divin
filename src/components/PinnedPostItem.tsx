"use client";

import Link from "next/link";
import { useState } from "react";

export default function PinnedPostItem({
  post,
  href,
}: {
  post: { slug: string; metadata: { title: string; excerpt: string } };
  href: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <li className="relative">
      <div
        className="group relative cursor-pointer overflow-hidden rounded-lg"
        onMouseMove={handleMouseMove}
      >
        {/* Background with gradient */}
        <div className="from-background via-background/95 to-background absolute inset-0 bg-gradient-to-br" />

        {/* Animated gradient orb that follows mouse */}
        <div
          className="pointer-events-none absolute h-48 w-48 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)`,
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Static gradient accents */}
        <div className="from-primary/5 to-primary/3 absolute inset-0 bg-gradient-to-br via-transparent" />

        {/* Border glow effect */}
        <div className="from-primary/10 to-primary/5 absolute inset-0 rounded-lg bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content - Link wraps content */}
        <Link href={href} className="relative z-10 block">
          <div className="flex flex-col px-4 py-3">
            <span className="text-foreground group-hover:text-primary text-lg font-medium transition-colors duration-300">
              {post.metadata.title}
            </span>
            <span className="text-text-variant m-0 text-sm">{post.metadata.excerpt}</span>
          </div>
        </Link>
      </div>
    </li>
  );
}
