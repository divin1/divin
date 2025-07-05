"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { House, Umbrella, Lightbulb, Menu as MenuIcon, MountainSnow } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "/", label: "Home", icon: House },
  { href: "/about", label: "About", icon: Umbrella },
  { href: "/thoughts", label: "Thoughts", icon: Lightbulb },
  { href: "/adventures", label: "Adventures", icon: MountainSnow },
];

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
      className={`firefox:bg-background/100 bg-stone/30 sticky top-0 z-20 w-full backdrop-blur-sm backdrop-saturate-150 backdrop-filter ${isTop ? "border-none" : "border-border border-b"}`}
    >
      <nav className="flex items-center space-x-4 p-6">
        <Link href="/" passHref>
          <div className="h-8 w-8 cursor-pointer rounded-full bg-linear-90 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:animate-pulse hover:shadow-lg hover:shadow-indigo-500/20" />
        </Link>
        <div className="grow" />

        <Menu>
          {({ open }) => (
            <div>
              <MenuButton className="inline-flex items-center gap-2 rounded-full bg-transparent px-3 py-1.5 text-sm/6 font-semibold focus:not-data-focus:outline-hidden data-focus:outline data-focus:outline-white data-hover:bg-white/10 data-open:bg-white/10">
                <MenuIcon className="size-6" />
              </MenuButton>

              <AnimatePresence>
                {open && (
                  <MenuItems
                    static
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    anchor="bottom end"
                    className="text-text border-border bg-background z-99 w-52 origin-top-right rounded-xl border p-1 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(1)] focus:outline-hidden data-closed:scale-95 data-closed:opacity-0"
                  >
                    {links.map((link) => {
                      const Icon = link.icon;

                      return (
                        <MenuItem key={link.href}>
                          <Link
                            href={link.href}
                            className="group data-focus:bg-foreground/10 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-colors duration-300"
                          >
                            <span className="flex w-full items-center gap-2 px-3 py-1.5">
                              <Icon className="fill-foreground/30 size-4" />
                              <span className="group-hover:text-primary transition-colors delay-100 duration-200">
                                {link.label}
                              </span>
                            </span>
                          </Link>
                        </MenuItem>
                      );
                    })}
                  </MenuItems>
                )}
              </AnimatePresence>
            </div>
          )}
        </Menu>
      </nav>
    </header>
  );
}

export default Header;
