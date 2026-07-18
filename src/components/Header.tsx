"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`firefox:bg-background/100 bg-stone/30 sticky top-0 z-20 w-full backdrop-blur-sm backdrop-saturate-150 backdrop-filter ${
        isTop ? "border-none" : "border-border border-b"
      }`}
    >
      <nav className="flex items-center p-6">
        <Link href="/" passHref aria-label="Home">
          <div className="logo-orb h-8 w-8 cursor-pointer" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
