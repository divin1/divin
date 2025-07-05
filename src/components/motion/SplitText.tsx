import { motion } from "motion/react";
import React from "react";

// @ts-expect-error annoying to type :)
export default function SplitText({ children, ...rest }) {
  const words = children.split(" ");
  return words.map((word: string, i: number) => {
    const key = `${word}-${i}`;
    return (
      <div key={key} style={{ display: "inline-block", overflow: "hidden" }}>
        <motion.div
          {...rest}
          style={{ display: "inline-block", willChange: "transform" }}
          custom={i}
        >
          {word + (i !== words.length - 1 ? "\u00A0" : "")}
        </motion.div>
      </div>
    );
  });
}
