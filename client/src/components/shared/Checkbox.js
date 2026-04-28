import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const Checkbox = ({ label, name, checked, onChange, description, }) => {
    return (_jsxs("label", { className: "flex items-start gap-3 cursor-pointer select-none", children: [_jsx("input", { type: "checkbox", name: name, checked: checked, onChange: (e) => onChange(e.target.checked), className: "w-4 h-4 mt-1 accent-blue-500" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-800", children: label }), description && _jsx("p", { className: "text-xs text-slate-500", children: description })] })] }));
};
export default Checkbox;
