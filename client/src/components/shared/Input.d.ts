import React from "react";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
export default function Input({ label, name, value, onChange, type, placeholder, className, error, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
