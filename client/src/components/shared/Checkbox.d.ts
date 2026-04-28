import React from "react";
interface CheckboxProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
}
declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
