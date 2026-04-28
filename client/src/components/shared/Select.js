import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// /components/ui/Select.tsx
import React from "react";
const Select = ({ label, error, options, className = "", ...props }) => {
    return (_jsxs("div", { className: `w-full ${className}`, children: [label && (_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: label })), _jsx("select", { className: `w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-950 text-sm outline-none transition-all
        ${error
                    ? "border-red-500 focus:ring-red-500/10 focus:border-red-500"
                    : "border-slate-200 dark:border-slate-800 focus:ring-indigo-500/10 focus:border-indigo-500"}`, ...props, children: options.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) }), error && _jsx("p", { className: "text-xs text-red-500 mt-1", children: error })] }));
};
export default Select;
