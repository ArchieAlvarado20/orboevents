import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export default function Home() {
    return (_jsxs("div", { children: [_jsx("h1", { children: "\uD83C\uDF9F\uFE0F Smart Ticketing System" }), _jsxs("nav", { children: [_jsx(Link, { to: "/scan", children: "Scanner" }), " | ", _jsx(Link, { to: "/login", children: "Login" })] })] }));
}
