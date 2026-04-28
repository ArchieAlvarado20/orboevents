import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MobileBottomNav from "@/components/shared/BottomNav";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { useState } from "react";
export default function Ticket() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Topbar, {}), _jsxs("main", { className: "flex mb-12 min-h-screen", children: [_jsx(Sidebar, { isCollapsed: isCollapsed, setIsCollapsed: setIsCollapsed }), _jsx(MobileBottomNav, { active: "scan" })] })] }));
}
