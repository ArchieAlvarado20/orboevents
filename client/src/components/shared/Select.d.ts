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
declare const Select: React.FC<SelectProps>;
export default Select;
