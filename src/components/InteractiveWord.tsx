"use client";

import Link from "next/link";
import { useState } from "react";

export default function InteractiveWord({
  children,
  href,
  hash,
}: {
  children: React.ReactNode;
  href: string;
  hash: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <span className="relative inline-block">
      <Link
        href={href}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-primary hover:text-primary-accent relative cursor-pointer transition-colors duration-200"
      >
        {children}
        {isHovered && (
          <span className="text-muted-foreground absolute -bottom-2 left-0 text-xs whitespace-nowrap">
            #{hash}
          </span>
        )}
      </Link>
    </span>
  );
}
