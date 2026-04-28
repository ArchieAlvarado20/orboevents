// /components/ui/Input.tsx
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  className = "",
  error,
  ...props
}: InputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 border dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all
        ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-slate-300 focus:ring-indigo-200"
        }
    `}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
