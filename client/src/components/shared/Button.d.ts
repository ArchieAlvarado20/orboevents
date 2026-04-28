import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    loading?: boolean;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
