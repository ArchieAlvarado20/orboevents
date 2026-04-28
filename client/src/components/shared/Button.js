import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const baseStyles = "px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors";
const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white",
    outline: "border border-slate-300 hover:bg-slate-100 text-slate-800 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white",
};
const Button = ({ children, variant = "primary", loading = false, disabled, className = "", ...props }) => {
    return (_jsx("button", { disabled: disabled || loading, className: `${baseStyles} ${variants[variant]} ${disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${className}`, ...props, children: loading ? "Processing..." : children }));
};
export default Button;
