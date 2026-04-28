import { jsx as _jsx } from "react/jsx-runtime";
import logo from "@/assets/logo.png";
export default function Logo({ className = "" }) {
    return (_jsx("div", { className: "flex items-center gap-2", children: _jsx("img", { src: logo, alt: "Logo", className: className }) }));
}
