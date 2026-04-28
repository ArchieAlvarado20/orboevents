import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function StatsCard({ title, value, icon, trendValue, trendLabel, trendType = "up", }) {
    const trendColor = trendType === "up"
        ? "text-emerald-600"
        : trendType === "down"
            ? "text-red-500"
            : "text-slate-500";
    return (_jsxs("div", { className: "bg-s p-6 border border-slate-200 rounded-xl shadow-sm", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-500 mb-2", children: title }), _jsx("h2", { className: "text-2xl font-semibold text-slate-900", children: value })] }), _jsx("div", { className: "p-2 bg-indigo-50 rounded-lg text-indigo-600", children: icon })] }), trendValue && (_jsxs("div", { className: "mt-4 flex items-center gap-2", children: [_jsxs("span", { className: `flex items-center text-xs font-semibold ${trendColor}`, children: [trendType === "up" && "▲", trendType === "down" && "▼", " ", trendValue] }), trendLabel && (_jsx("span", { className: "text-xs text-slate-500", children: trendLabel }))] }))] }));
}
