import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MobileBottomNav from "@/components/shared/BottomNav";
import ComingSoon from "@/components/shared/ComingSoon";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { useState } from "react";
export default function Analytics() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Topbar, {}), _jsxs("div", { className: "flex max-h-[calc(100vh-72px)]", children: [_jsx(Sidebar, { isCollapsed: isCollapsed, setIsCollapsed: setIsCollapsed }), _jsx("main", { className: `flex-1 mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`, children: _jsx("div", { className: "max-w-container-max mx-auto", children: _jsx("div", { className: "mb-0 space-y-1", children: _jsx(ComingSoon, {}) }) }) })] }), _jsx(MobileBottomNav, { active: "analytics" })] }));
}
