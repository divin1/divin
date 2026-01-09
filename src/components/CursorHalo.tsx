"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorHalo() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Helper function to convert hex to rgba
  const getPrimaryWithAlpha = (alpha: number) => {
    return `color-mix(in srgb, var(--primary) ${alpha * 100}%, transparent)`;
  };

  return (
    <>
      {/* Main halo sphere */}
      <motion.div
        className="pointer-events-none fixed z-[50] mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="h-64 w-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${getPrimaryWithAlpha(isHovering ? 0.25 : 0.15)} 0%, ${getPrimaryWithAlpha(isHovering ? 0.12 : 0.08)} 40%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Inner glow */}
      <motion.div
        className="pointer-events-none fixed z-[50] mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="h-32 w-32 rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, ${getPrimaryWithAlpha(0.25)} 0%, ${getPrimaryWithAlpha(0.12)} 50%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Core highlight */}
      <motion.div
        className="pointer-events-none fixed z-[50] mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="h-16 w-16 rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, ${getPrimaryWithAlpha(0.3)} 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    </>
  );
}
