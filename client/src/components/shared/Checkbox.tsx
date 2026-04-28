import React from "react";

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  description,
}) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 mt-1 accent-blue-500"
      />

      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>

        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
    </label>
  );
};

export default Checkbox;
