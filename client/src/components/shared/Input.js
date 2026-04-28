import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// /components/ui/Input.tsx
import React from "react";
export default function Input({ label, name, value, onChange, type = "text", placeholder, className = "", error, ...props }) {
    return (_jsxs("div", { className: `w-full ${className}`, children: [label && (_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: label })), _jsx("input", { name: name, value: value, onChange: onChange, type: type, placeholder: placeholder, className: `w-full px-4 py-2.5 border dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all
        ${error
                    ? "border-red-500 focus:ring-red-200"
                    : "border-slate-300 focus:ring-indigo-200"}
    `, ...props }), error && _jsx("p", { className: "text-red-500 text-xs mt-1", children: error })] }));
}
