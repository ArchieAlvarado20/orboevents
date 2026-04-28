import type { ReactNode } from "react";
type StatsCardProps = {
    title: string;
    value: string | number;
    icon: ReactNode;
    trendValue?: string;
    trendLabel?: string;
    trendType?: "up" | "down" | "neutral";
};
export declare function StatsCard({ title, value, icon, trendValue, trendLabel, trendType, }: StatsCardProps): import("react/jsx-runtime").JSX.Element;
export {};
