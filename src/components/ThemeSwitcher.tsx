"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  // Prevents Hydration error
  if (!mounted) return null;

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      onClick={toggleTheme}
      className={`flex-start flex h-[40px] w-[60px] rounded-[25px] bg-zinc-300 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${theme === "light" && "place-content-end bg-zinc-100"}`}
    >
      <motion.div
        className="flex size-[30px] items-center justify-center rounded-full bg-black/90"
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>
          {theme === "light" ? (
            <Sun className="size-5 text-amber-300" />
          ) : (
            <Moon className="size-5 text-indigo-300" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
