"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { House, Umbrella, Lightbulb, Menu as MenuIcon, TestTubeDiagonal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: House },
  { href: "/about", label: "About", icon: Umbrella },
  { href: "/thoughts", label: "Thoughts", icon: Lightbulb },
  { href: "/projects", label: "Projects", icon: TestTubeDiagonal },
];

function Header() {
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu on escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`firefox:bg-background/100 bg-stone/30 sticky top-0 z-20 w-full backdrop-blur-sm backdrop-saturate-150 backdrop-filter ${
        isTop && !isOpen ? "border-none" : "border-border border-b"
      }`}
    >
      <nav className="flex items-center space-x-4 p-6">
        <Link href="/" passHref>
          <div className="h-8 w-8 cursor-pointer rounded-full bg-linear-90 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:animate-pulse hover:shadow-lg hover:shadow-indigo-500/20" />
        </Link>
        <div className="grow" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex items-center gap-2 rounded-full bg-transparent px-3 py-1.5 text-sm/6 font-semibold transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <MenuIcon className="size-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2, ease: "easeInOut" },
            }}
            className="overflow-hidden"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.03,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex flex-col gap-1 px-6 pb-6"
            >
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      open: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      },
                      closed: {
                        opacity: 0,
                        y: -10,
                        transition: {
                          duration: 0.2,
                        },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-foreground/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`size-5 transition-colors duration-200 ${
                          isActive ? "fill-white/30" : "fill-foreground/20 group-hover:fill-white/20"
                        }`}
                      />
                      <span className="text-base font-medium">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-white"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
