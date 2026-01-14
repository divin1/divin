"use client";

import { useMemo } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import Chart from "./Chart";

interface HeatmapProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  height?: number;
  title?: string;
  description?: string;
  className?: string;
}

export default function Heatmap({
  data,
  height = 500,
  title,
  description,
  className,
}: HeatmapProps) {
  // Transform CSV-like data to Nivo format - memoized to prevent recalculation
  const nivoData = useMemo(() => {
    return data.map((row) => ({
      id: row.model,
      data: Object.entries(row)
        .filter(([key]) => key !== "model")
        .map(([lang, value]) => ({
          x: lang.charAt(0).toUpperCase() + lang.slice(1),
          y: parseFloat(value as string),
        })),
    }));
  }, [data]);

  return (
    <Chart title={title} description={description} className={className}>
      <div style={{ height: `${height}px` }} className="[&_*]:!transition-none">
        <ResponsiveHeatMap
          data={nivoData}
          margin={{ top: 60, right: 90, bottom: 60, left: 120 }}
          valueFormat=">-.1f"
          motionConfig="gentle"
          axisTop={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: -45,
            legend: "",
            legendOffset: 46,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -72,
          }}
          colors={{
            type: "quantize",
            colors: ["#1a1025", "#3d1f4a", "#6b2a6e", "#9c3585", "#c94199", "#e94eaa"],
            steps: 6,
          }}
          emptyColor="rgba(255, 255, 255, 0.05)"
          borderWidth={2}
          borderColor="rgba(0, 0, 0, 0.3)"
          enableLabels={true}
          label={(cell) => `${cell.value}%`}
          labelTextColor="#ffffff"
          legends={[
            {
              anchor: "bottom",
              translateX: 0,
              translateY: 40,
              length: 300,
              thickness: 10,
              direction: "row",
              tickPosition: "after",
              tickSize: 0,
              tickSpacing: 10,
              tickOverlap: false,
              tickFormat: (value) => `${Math.round(value as number)}%`,
              title: "Accuracy →",
              titleAlign: "start",
              titleOffset: 4,
            },
          ]}
          tooltip={({ cell }) => (
            <div
              style={{
                background: "rgba(0, 0, 0, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "12px 16px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "4px",
                    background: cell.color,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  {cell.serieId}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                {cell.data.x}: <span style={{ color: "#fff", fontWeight: 600 }}>{cell.value}%</span>
              </div>
            </div>
          )}
          theme={{
            text: {
              fontSize: 12,
              fill: "rgba(255, 255, 255, 0.7)",
              fontFamily: "inherit",
            },
            axis: {
              ticks: {
                text: {
                  fontSize: 12,
                  fill: "rgba(255, 255, 255, 0.7)",
                  fontFamily: "inherit",
                },
              },
            },
            legends: {
              text: {
                fontSize: 11,
                fill: "rgba(255, 255, 255, 0.6)",
                fontFamily: "inherit",
              },
              title: {
                text: {
                  fontSize: 11,
                  fill: "rgba(255, 255, 255, 0.5)",
                  fontFamily: "inherit",
                },
              },
            },
          }}
        />
      </div>
    </Chart>
  );
}
