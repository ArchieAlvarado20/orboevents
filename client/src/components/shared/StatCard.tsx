import { type ReactNode, useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trendValue?: string;
  trendLabel?: string;
  trendType?: "up" | "down" | "neutral";
  /** Optional accent colour override — defaults to violet-to-indigo */
  accentFrom?: string;
  accentTo?: string;
};

function useCountUp(target: number, duration = 1200) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (isNaN(target)) return;
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return current;
}

export function StatsCard({
  title,
  value,
  icon,
  trendValue,
  trendLabel,
  trendType = "neutral",
}: StatsCardProps) {
  // Parse numeric part for count-up animation
  const rawStr = String(value);
  const numericPart = parseFloat(rawStr.replace(/[^0-9.]/g, ""));
  const prefix = rawStr.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = rawStr.match(/[^0-9.]*$/)?.[0] ?? "";
  const isNumeric = !isNaN(numericPart);
  const animated = useCountUp(isNumeric ? numericPart : 0);

  const displayValue = isNumeric
    ? `${prefix}${animated.toLocaleString()}${suffix}`
    : rawStr;

  const trendConfig = {
    up: {
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      Icon: TrendingUp,
    },
    down: {
      color: "text-red-400",
      bg: "bg-red-400/10",
      Icon: TrendingDown,
    },
    neutral: {
      color: "text-slate-400",
      bg: "bg-slate-400/10",
      Icon: Minus,
    },
  }[trendType];

  return (
    <div
      className="
        group relative overflow-hidden
        bg-white/80 dark:bg-slate-900/70
        backdrop-blur-md
        border border-white/60 dark:border-slate-700/60
        rounded-2xl p-5
        shadow-[0_4px_24px_rgba(109,40,217,0.08)]
        hover:shadow-[0_8px_32px_rgba(109,40,217,0.18)]
        hover:scale-[1.025]
        transition-all duration-300 ease-out
        cursor-default
      "
    >
      {/* Gradient top border accent */}
      <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500" />

      {/* Subtle glow blob */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-violet-400/20 to-indigo-500/10 blur-2xl group-hover:scale-125 transition-transform duration-500" />

      {/* Top row: title + icon */}
      <div className="relative flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
          {title}
        </p>

        {/* Gradient icon container */}
        <div className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-indigo-500/30 text-white">
          {icon}
        </div>
      </div>

      {/* Animated number */}
      <div className="relative">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white tabular-nums">
          {displayValue}
        </h2>
      </div>

      {/* Trend row */}
      {trendValue && (
        <div className="relative mt-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${trendConfig.color} ${trendConfig.bg}`}
          >
            <trendConfig.Icon className="w-3 h-3" />
            {trendValue}
          </span>
          {trendLabel && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
