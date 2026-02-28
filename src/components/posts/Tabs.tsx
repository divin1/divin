"use client";

import { useState, useRef, useEffect, useCallback, isValidElement, Children } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// @ts-expect-error annoying to type
export function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tabs = Children.toArray(children).filter(isValidElement);

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 150;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="tabs-container my-6 w-0 min-w-full">
      <div className="relative mb-4">
        {/* Left scroll indicator */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="from-background via-background absolute top-0 left-0 z-10 flex h-full items-center bg-gradient-to-r to-transparent pr-3 pl-1"
            aria-label="Scroll tabs left"
          >
            <ChevronLeft className="text-text-variant hover:text-primary size-5" />
          </button>
        )}

        {/* Tabs */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-none flex overflow-x-auto border-b border-gray-200"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`shrink-0 px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === index
                  ? "border-primary text-primary border-b-2"
                  : "hover:text-primary-accent text-gray-600"
              }`}
            >
              {(tab.props as { label: string }).label}
            </button>
          ))}
        </div>

        {/* Right scroll indicator */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="from-background via-background absolute top-0 right-0 z-10 flex h-full items-center bg-gradient-to-l to-transparent pr-1 pl-3"
            aria-label="Scroll tabs right"
          >
            <ChevronRight className="text-text-variant hover:text-primary size-5" />
          </button>
        )}
      </div>
      <div className="tab-content w-0 min-w-full overflow-x-auto">
        {tabs.map((tab, index) => (
          <div key={index} hidden={activeTab !== index} aria-hidden={activeTab !== index}>
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}

// @ts-expect-error annoying to type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Tab({ children, label }) {
  return <div className="py-4">{children}</div>;
}
