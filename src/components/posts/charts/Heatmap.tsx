"use client";

import { ResponsiveHeatMap } from "@nivo/heatmap";

// @ts-expect-error annoying to type
export default function Heatmap({ data, height = 500, colorScheme = "red_yellow_green" }) {
  // Transform CSV-like data to Nivo format
  // @ts-expect-error annoying to type
  const transformData = (rawData) => {
    // @ts-expect-error annoying to type

    return rawData.map((row) => ({
      id: row.model,
      data: Object.entries(row)
        .filter(([key]) => key !== "model")
        .map(([lang, value]) => ({
          x: lang.charAt(0).toUpperCase() + lang.slice(1),
          // @ts-expect-error annoying to type
          y: parseFloat(value),
        })),
    }));
  };

  const nivoData = transformData(data);

  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveHeatMap
        data={nivoData}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.1f"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "",
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Model",
          legendPosition: "middle",
          legendOffset: -72,
        }}
        colors={{
          type: "diverging",
          scheme: colorScheme,
          divergeAt: 0.5,
          minValue: 0,
          maxValue: 100,
        }}
        emptyColor="#555555"
        legends={[
          {
            anchor: "bottom",
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: "row",
            tickPosition: "after",
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            title: "Performance (%) →",
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
        label={(cell) => `${cell.value}%`}
        labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    </div>
  );
}
