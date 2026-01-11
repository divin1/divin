"use client";

import {
  LineChart as RechartsLine,
  BarChart as RechartsBar,
  AreaChart as RechartsArea,
  PieChart as RechartsPie,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ErrorBar,
} from "recharts";
import Chart from "./Chart";

import { formatters, type FormatterKey } from "./formatters";

export interface ChartData {
  [key: string]: string | number;
}

interface BaseChartProps {
  data: ChartData[];
  title?: string;
  description?: string;
  className?: string;
}

interface YKeyConfig {
  key: string;
  label: string;
  errorKey?: string;
  minKey?: string;
  maxKey?: string;
}

interface XYChartProps extends BaseChartProps {
  xKey: string;
  yKeys: string[] | Array<YKeyConfig>;
  colors?: string[];
  valueFormatter?: FormatterKey | ((value: number) => string);
  showGrid?: boolean;
  showLegend?: boolean;
  groupBy?: string;
  valueKey?: string;
  xAxisAngle?: number;
  yDomain?: [number, number];
}

interface PieChartProps extends BaseChartProps {
  dataKey: string;
  nameKey: string;
  colors?: string[];
  valueFormatter?: FormatterKey | ((value: number) => string);
  showLabels?: boolean;
}

const defaultColors = [
  "#7c86ff",
  "#a684ff",
  "#ed6bff",
  "#fb64b6",
  "#ff637e",
  "#51a2ff",
  "#00bcff",
  "#00d3f2",
];

function formatValue(
  value: number,
  formatter?: FormatterKey | ((value: number) => string)
): string {
  if (!formatter) return value.toString();

  // If it's a function, call it directly
  if (typeof formatter === "function") {
    return formatter(value);
  }

  // If it's a formatter key, use the predefined formatter
  if (formatter in formatters) {
    return formatters[formatter](value);
  }

  return value.toString();
}

// Custom tooltip styling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, valueFormatter, statsKeys }: any) => {
  if (active && payload && payload.length) {
    // Get the original data item to access additional stats
    const dataItem = payload[0]?.payload;

    return (
      <div
        style={{
          background: "rgba(0, 0, 0, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          padding: "12px 16px",
          backdropFilter: "blur(8px)",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          {label}
        </p>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          payload.map((entry: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: "4px 0",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: entry.color,
                }}
              />
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                {entry.name}:
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "rgba(255, 255, 255, 0.95)",
                }}
              >
                {formatValue(entry.value, valueFormatter)}
              </span>
            </div>
          ))
        }
        {statsKeys && dataItem && (
          <div
            style={{
              marginTop: "8px",
              paddingTop: "8px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: "0.8rem",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            {statsKeys.minKey && dataItem[statsKeys.minKey] !== undefined && (
              <div style={{ margin: "2px 0" }}>
                Min: {formatValue(dataItem[statsKeys.minKey], valueFormatter)}
              </div>
            )}
            {statsKeys.maxKey && dataItem[statsKeys.maxKey] !== undefined && (
              <div style={{ margin: "2px 0" }}>
                Max: {formatValue(dataItem[statsKeys.maxKey], valueFormatter)}
              </div>
            )}
            {statsKeys.errorKey && dataItem[statsKeys.errorKey] !== undefined && (
              <div style={{ margin: "2px 0" }}>
                Std Dev: ±{formatValue(dataItem[statsKeys.errorKey], valueFormatter)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Components
export function LineChart({
  data,
  xKey,
  yKeys,
  title,
  description,
  colors = defaultColors,
  valueFormatter,
  showGrid = true,
  showLegend = true,
  className,
}: XYChartProps) {
  // Normalize yKeys to always be array of objects
  const normalizedYKeys =
    Array.isArray(yKeys) && typeof yKeys[0] === "string"
      ? (yKeys as string[]).map((key) => ({ key, label: key }))
      : (yKeys as Array<{ key: string; label: string }>);

  return (
    <Chart title={title} description={description} className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsLine data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.05)"
              vertical={false}
            />
          )}
          <XAxis
            dataKey={xKey}
            stroke="rgba(255, 255, 255, 0.3)"
            style={{ fontSize: "0.875rem", fontFamily: "DM Sans, sans-serif" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.3)"
            style={{ fontSize: "0.875rem", fontFamily: "DM Sans, sans-serif" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatValue(v, valueFormatter)}
          />
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />
          {showLegend && (
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "0.875rem",
                fontFamily: "DM Sans, sans-serif",
              }}
              iconType="circle"
            />
          )}
          {normalizedYKeys.map((item, index) => (
            <Line
              key={item.key}
              type="monotone"
              dataKey={item.key}
              name={item.label}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLine>
      </ResponsiveContainer>
    </Chart>
  );
}

export function BarChart({
  data,
  xKey,
  yKeys,
  title,
  description,
  colors = defaultColors,
  valueFormatter,
  showGrid = true,
  showLegend = true,
  className,
  groupBy,
  valueKey,
  xAxisAngle = 0,
  yDomain,
}: XYChartProps) {
  // Handle grouped bar chart
  if (groupBy && valueKey) {
    // Get unique group values (these become the bar series)
    const groups = [...new Set(data.map((d) => String(d[groupBy])))];
    // Get unique x values (these become the x-axis categories)
    const xValues = [...new Set(data.map((d) => String(d[xKey])))];

    // Pivot the data: each x value becomes a row with group values as columns
    const pivotedData = xValues.map((xVal) => {
      const row: ChartData = { [xKey]: xVal };
      groups.forEach((group) => {
        const match = data.find((d) => String(d[xKey]) === xVal && String(d[groupBy]) === group);
        row[group] = match ? (match[valueKey] as number) : 0;
      });
      return row;
    });

    const bottomMargin = xAxisAngle !== 0 ? 80 : 5;

    return (
      <Chart title={title} description={description} className={className}>
        <ResponsiveContainer width="100%" height={xAxisAngle !== 0 ? 400 : 320}>
          <RechartsBar
            data={pivotedData}
            margin={{ top: 5, right: 20, left: 0, bottom: bottomMargin }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.05)"
                vertical={false}
              />
            )}
            <XAxis
              dataKey={xKey}
              stroke="rgba(255, 255, 255, 0.3)"
              style={{ fontSize: "0.875rem", fontFamily: "DM Sans, sans-serif" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
              angle={xAxisAngle}
              textAnchor={xAxisAngle !== 0 ? "end" : "middle"}
              height={xAxisAngle !== 0 ? 80 : 30}
              interval={0}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.3)"
              style={{ fontSize: "0.875rem", fontFamily: "DM Sans, sans-serif" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatValue(v, valueFormatter)}
              domain={yDomain}
            />
            <Tooltip
              content={<CustomTooltip valueFormatter={valueFormatter} />}
              cursor={{ fill: "rgba(99, 102, 241, 0.08)", radius: 4 }}
            />
            {showLegend && (
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "0.875rem",
                  fontFamily: "DM Sans, sans-serif",
                }}
                iconType="circle"
              />
            )}
            {groups.map((group, index) => (
              <Bar
                key={group}
                dataKey={group}
                name={group}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                activeBar={{
                  fill: colors[index % colors.length],
                  fillOpacity: 0.7,
                  filter: "brightness(1.3)",
                }}
              />
            ))}
          </RechartsBar>
        </ResponsiveContainer>
      </Chart>
    );
  }

  // Normalize yKeys to always be array of objects
  const normalizedYKeys: YKeyConfig[] =
    Array.isArray(yKeys) && typeof yKeys[0] === "string"
      ? (yKeys as string[]).map((key) => ({ key, label: key }))
      : (yKeys as Array<YKeyConfig>);

  // Extract statsKeys from first yKey config for tooltip
  const firstYKey = normalizedYKeys[0];
  const statsKeys =
    firstYKey?.errorKey || firstYKey?.minKey || firstYKey?.maxKey
      ? {
          errorKey: firstYKey.errorKey,
          minKey: firstYKey.minKey,
          maxKey: firstYKey.maxKey,
        }
      : undefined;

  // For single yKey charts, use Cell to color each bar differently
  const useCellColors = normalizedYKeys.length === 1;
  const bottomMargin = xAxisAngle !== 0 ? 80 : 5;

  return (
    <Chart title={title} description={description} className={className}>
      <ResponsiveContainer width="100%" height={xAxisAngle !== 0 ? 400 : 320}>
        <RechartsBar data={data} margin={{ top: 5, right: 20, left: 0, bottom: bottomMargin }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.05)"
              vertical={false}
            />
          )}
          <XAxis
            dataKey={xKey}
            stroke="rgba(255, 255, 255, 0.3)"
            style={{ fontSize: "0.875rem", fontFamily: "DM Sans, sans-serif" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            angle={xAxisAngle}
            textAnchor={xAxisAngle !== 0 ? "end" : "middle"}
            height={xAxisAngle !== 0 ? 80 : 30}
            interval={0}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.3)"
            style={{ fontSize: "0.875rem", fontFamily: "DM Sans, sans-serif" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatValue(v, valueFormatter)}
            domain={yDomain}
          />
          <Tooltip
            content={<CustomTooltip valueFormatter={valueFormatter} statsKeys={statsKeys} />}
            cursor={{ fill: "rgba(99, 102, 241, 0.08)", radius: 4 }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "0.875rem",
                fontFamily: "DM Sans, sans-serif",
              }}
              iconType="circle"
            />
          )}
          {normalizedYKeys.map((item, index) => (
            <Bar
              key={item.key}
              dataKey={item.key}
              name={item.label}
              fill={useCellColors ? undefined : colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              activeBar={{
                fillOpacity: 0.7,
                filter: "brightness(1.3)",
              }}
            >
              {useCellColors &&
                data.map((_, i) => <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />)}
              {item.errorKey && (
                <ErrorBar
                  dataKey={item.errorKey}
                  width={4}
                  strokeWidth={2}
                  stroke="rgba(255, 255, 255, 0.6)"
                />
              )}
            </Bar>
          ))}
        </RechartsBar>
      </ResponsiveContainer>
    </Chart>
  );
}

export function AreaChart({
  data,
  xKey,
  yKeys,
  title,
  description,
  colors = defaultColors,
  valueFormatter,
  showGrid = true,
  showLegend = true,
  className,
}: XYChartProps) {
  // Normalize yKeys to always be array of objects
  const normalizedYKeys =
    Array.isArray(yKeys) && typeof yKeys[0] === "string"
      ? (yKeys as string[]).map((key) => ({ key, label: key }))
      : (yKeys as Array<{ key: string; label: string }>);

  return (
    <Chart title={title} description={description} className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsArea data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.05)"
              vertical={false}
            />
          )}
          <XAxis
            dataKey={xKey}
            stroke="rgba(255, 255, 255, 0.3)"
            style={{ fontSize: "0.875rem", fontFamily: "DM Sans, sans-serif" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.3)"
            style={{ fontSize: "0.875rem", fontFamily: "DM Sans, sans-serif" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatValue(v, valueFormatter)}
          />
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />
          {showLegend && (
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "0.875rem",
                fontFamily: "DM Sans, sans-serif",
              }}
              iconType="circle"
            />
          )}
          {normalizedYKeys.map((item, index) => (
            <Area
              key={item.key}
              type="monotone"
              dataKey={item.key}
              name={item.label}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          ))}
        </RechartsArea>
      </ResponsiveContainer>
    </Chart>
  );
}

export function PieChart({
  data,
  dataKey,
  nameKey,
  title,
  description,
  colors = defaultColors,
  valueFormatter,
  showLabels = true,
  className,
}: PieChartProps) {
  return (
    <Chart title={title} description={description} className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey={dataKey}
            nameKey={nameKey}
            label={showLabels ? (entry) => String((entry as unknown as ChartData)[nameKey]) : false}
            labelLine={showLabels}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "0.875rem",
              fontFamily: "DM Sans, sans-serif",
            }}
            iconType="circle"
          />
        </RechartsPie>
      </ResponsiveContainer>
    </Chart>
  );
}

interface BarListItem {
  name: string;
  value: number;
}

interface BarListProps {
  data: BarListItem[];
  title?: string;
  description?: string;
  className?: string;
  valueFormatter?: FormatterKey | ((value: number) => string);
  color?: string;
}

export function BarList({
  data,
  title,
  description,
  valueFormatter,
  color = "#3b82f6",
  className,
}: BarListProps) {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <Chart title={title} description={description} className={className}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  minWidth: "140px",
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  flex: 1,
                  height: "32px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${percentage}%`,
                    background: color,
                    transition: "width 0.6s ease-out",
                  }}
                />
              </div>
              <div
                style={{
                  minWidth: "80px",
                  textAlign: "right",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {formatValue(item.value, valueFormatter)}
              </div>
            </div>
          );
        })}
      </div>
    </Chart>
  );
}
