// /components/ui/Select.tsx
import React from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
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

      <select
        className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all
        ${
          error
            ? "border-red-500 focus:ring-red-500/10 focus:border-red-500"
            : "border-slate-200 dark:border-slate-800 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 focus:border-indigo-500 dark:focus:border-indigo-400"
        }`}
        {...props}
      >
        {options.map((opt) => (
          <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Select;
