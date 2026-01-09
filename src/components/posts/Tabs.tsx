"use client";

import { useState } from "react";

// @ts-expect-error annoying to type
export function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = Array.isArray(children) ? children : [children];

  return (
    <div className="tabs-container my-6">
      <div className="mb-4 flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === index
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-primary-accent"
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab]}</div>
    </div>
  );
}

// @ts-expect-error annoying to type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Tab({ children, label }) {
  return <div className="py-4">{children}</div>;
}
