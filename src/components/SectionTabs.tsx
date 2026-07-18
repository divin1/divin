"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Tab = {
  key: string;
  label: string;
  rssHref: string;
  content: ReactNode;
};

export default function SectionTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].key);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (tabs.some((tab) => tab.key === hash)) {
      setActive(hash);
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="mt-16 scroll-mt-24">
      <div className="border-border flex items-center justify-between border-b">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors ${
                active === tab.key
                  ? "border-foreground text-foreground"
                  : "text-text-variant hover:text-foreground border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <a
          href={activeTab.rssHref}
          className="text-text-variant hover:text-foreground pb-3 text-xs transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          rss
        </a>
      </div>

      <div className="py-2">{activeTab.content}</div>
    </div>
  );
}
