export const formatters = {
  percent: (v: number) => `${v.toFixed(1)}%`,
  currency: (v: number) => `$${v.toLocaleString()}`,
  number: (v: number) => v.toLocaleString(),
  integer: (v: number) => Math.round(v).toString(),
  decimal: (v: number) => v.toFixed(2),
};

export type FormatterKey = keyof typeof formatters;
