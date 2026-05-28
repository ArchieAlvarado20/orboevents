import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "success"
    | "warning"
    | "ghost"
    | "dark"
    | "light"
    | "gradient"
    | "glass"
    | "link"
    | "destructiveOutline"
    | "soft"
    | "purple"
    | "cyan";
  loading?: boolean;
}

const baseStyles =
  "px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors";

const variants = {
  primary:
    "bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-500/20",

  secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800",

  outline: "border border-slate-300 hover:bg-slate-100 text-purple-600",

  danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-500/20",

  success:
    "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-500/20",

  warning:
    "bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-500/20",

  ghost: "hover:bg-slate-100 text-slate-700",

  dark: "bg-slate-900 hover:bg-slate-800 text-white",

  light: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700",

  gradient:
    "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-500/20",

  glass:
    "bg-white/70 backdrop-blur-md border border-white/20 hover:bg-white/80 text-slate-800",

  link: "text-indigo-600 hover:text-indigo-700 hover:underline bg-transparent",

  destructiveOutline: "border border-red-300 text-red-600 hover:bg-red-50",

  soft: "bg-slate-100 hover:bg-slate-200 text-slate-700",

  purple:
    "bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-500/20",

  cyan: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm shadow-cyan-500/20",
};
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      {...props}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};

export default Button;
