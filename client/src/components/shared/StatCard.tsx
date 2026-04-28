import type { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trendValue?: string;
  trendLabel?: string;
  trendType?: "up" | "down" | "neutral";
};

export function StatsCard({
  title,
  value,
  icon,
  trendValue,
  trendLabel,
  trendType = "up",
}: StatsCardProps) {
  const trendColor =
    trendType === "up"
      ? "text-emerald-600"
      : trendType === "down"
        ? "text-red-500"
        : "text-slate-500";

  return (
    <div className="bg-s p-6 border border-slate-200 rounded-xl shadow-sm">
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-2">{title}</p>
          <h2 className="text-2xl font-semibold text-slate-900">{value}</h2>
        </div>

        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>

      {/* Trend section */}
      {trendValue && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`flex items-center text-xs font-semibold ${trendColor}`}
          >
            {trendType === "up" && "▲"}
            {trendType === "down" && "▼"} {trendValue}
          </span>

          {trendLabel && (
            <span className="text-xs text-slate-500">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
