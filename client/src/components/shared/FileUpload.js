import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from "react";
import { ImagePlus } from "lucide-react";
const FileUpload = ({ label, onChange, value, accept = "image/*", error, }) => {
    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current?.click();
    };
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: label })), _jsx("div", { onClick: handleClick, className: `w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/50 group transition-colors
        ${error
                    ? "border-red-500"
                    : "border-slate-200 dark:border-slate-800 hover:border-indigo-400 cursor-pointer"}`, children: value ? (_jsx("img", { src: URL.createObjectURL(value), alt: "preview", className: "h-full object-cover rounded-xl" })) : (_jsxs(_Fragment, { children: [_jsx(ImagePlus, { className: "w-6 h-6 text-slate-400 group-hover:text-indigo-500 mb-2" }), _jsx("p", { className: "text-sm font-medium text-slate-500 group-hover:text-indigo-600", children: "Click to upload event image" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Recommended size: 1200x630px" })] })) }), _jsx("input", { ref: inputRef, type: "file", accept: accept, className: "hidden", onChange: (e) => onChange(e.target.files?.[0] || null) }), error && _jsx("p", { className: "text-xs text-red-500 mt-1", children: error })] }));
};
export default FileUpload;
