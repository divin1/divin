"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplitText from "@/components/motion/SplitText";

type Hello = {
  text: string;
  lang: string;
};

// NOTE: language is unused atm, will be in a future feature
const hellos: Hello[] = [
  { text: "Hello", lang: "en-US" },
  { text: "Hola", lang: "es-ES" },
  { text: "Salut", lang: "fr-FR" },
  { text: "Hallo", lang: "de-DE" },
  { text: "Ciao", lang: "it-IT" },
  { text: "Olá", lang: "pt-PT" },
  { text: "Привет", lang: "ru-RU" },
  { text: "你好", lang: "zh-CN" },
  { text: "こんにちは", lang: "ja-JP" },
  { text: "안녕하세요", lang: "ko-KR" },
  { text: "Merhaba", lang: "tr-TR" },
  { text: "Salam", lang: "ar-SA" },
  { text: "नमस्ते", lang: "hi-IN" },
  { text: "Sawubona", lang: "zu-ZA" },
  { text: "Habari", lang: "sw-KE" },
  { text: "Hej", lang: "sv-SE" },
  { text: "Ahoj", lang: "cs-CZ" },
  { text: "Szia", lang: "hu-HU" },
  { text: "Terve", lang: "fi-FI" },
  { text: "Xin chào", lang: "vi-VN" },
  { text: "Halo", lang: "id-ID" },
  { text: "Kamusta", lang: "fil-PH" },
  { text: "Selam", lang: "am-ET" },
  { text: "Siema", lang: "pl-PL" },
  { text: "สวัสดี", lang: "th-TH" },
];

const getRandomHello = (): Hello => {
  const randomIndex = Math.floor(Math.random() * hellos.length);
  return hellos[randomIndex];
};

export default function Hello() {
  const [hello, setHello] = useState(getRandomHello());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const interval = setInterval(() => {
      setHello(getRandomHello());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      <motion.h1 initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <SplitText
          initial={{ y: "100%" }}
          animate="visible"
          variants={{
            visible: (i: number) => ({
              y: 0,
              transition: {
                delay: i * 0.1,
              },
            }),
          }}
        >
          {hello.text}
        </SplitText>
      </motion.h1>
    </AnimatePresence>
  );
}
