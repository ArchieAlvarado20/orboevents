// /components/ui/Textarea.tsx
import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}

      <textarea
        className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-950 text-sm outline-none transition-all resize-none
        ${
          error
            ? "border-red-500 focus:ring-red-500/10 focus:border-red-500"
            : "border-slate-200 dark:border-slate-800 focus:ring-indigo-500/10 focus:border-indigo-500"
        }`}
        {...props}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;
