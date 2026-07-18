"use client";

import { useEffect, useState } from "react";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          primaryColor: "#1e1e2e",
          primaryTextColor: "#cdd6f4",
          primaryBorderColor: "#45475a",
          lineColor: "#6c7086",
          secondaryColor: "#181825",
          tertiaryColor: "#11111b",
          background: "#1e1e2e",
          mainBkg: "#1e1e2e",
          nodeBorder: "#45475a",
          clusterBkg: "#181825",
          titleColor: "#cdd6f4",
          edgeLabelBackground: "#181825",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "13px",
        },
      });
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      const { svg } = await mermaid.render(id, chart.trim());
      if (!cancelled) setSvg(svg);
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (!svg) return null;

  return (
    <div
      className="my-6 overflow-x-auto rounded-lg p-4"
      style={{ background: "#181825" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
