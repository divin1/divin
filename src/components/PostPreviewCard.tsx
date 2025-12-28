"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type PostPreviewCardProps = {
  date: string;
  title: string;
  url: string;
  coverImage?: string;
};

export default function PostPreviewCard({ date, title, url, coverImage }: PostPreviewCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article className="border-border relative h-64 w-full overflow-hidden rounded-lg">
      <Link href={url} passHref onMouseMove={!coverImage ? handleMouseMove : undefined}>
        <div className="relative h-full w-full">
          {coverImage ? (
            <Image src={coverImage} alt={title} fill className="rounded-lg object-cover" />
          ) : (
            <div className="group from-background via-background/95 to-background relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br">
              {/* Animated gradient orb that follows mouse */}
              <div
                className="pointer-events-none absolute h-64 w-64 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)`,
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Static gradient accents */}
              <div className="from-primary/20 to-primary/10 absolute inset-0 bg-gradient-to-br via-transparent transition-opacity delay-300 duration-500" />

              {/* Border glow effect */}
              <div className="from-primary/25 to-primary/17 absolute inset-0 rounded-lg bg-gradient-to-br via-transparent opacity-0 transition-opacity delay-300 duration-500 group-hover:opacity-100" />

              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                  backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>
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
