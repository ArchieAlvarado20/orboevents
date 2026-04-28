import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BarChart3, LayoutDashboard, QrCode, Settings, Ticket, PanelLeft, CalendarDays, } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function Sidebar({ isCollapsed, setIsCollapsed }) {
    const [isOpen, setIsOpen] = useState(false);
    const iconSize = isCollapsed ? "w-5 h-5" : "w-5 h-5";
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-40 md:hidden", onClick: () => setIsOpen(false) })), _jsxs("aside", { className: `
          fixed md:fixed left-0 top-16 z-50
    h-screen w-64 bg-white border-r border-slate-200 p-4
    overflow-y-auto
    transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-16" : "md:w-64"}
        `, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: `text-md uppercase font-semibold text-slate-900 ${isCollapsed ? "hidden" : "inline"}`, children: "Administrator" }), _jsx("button", { onClick: () => setIsCollapsed(!isCollapsed), className: `hidden md:flex items-center text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`, children: _jsx(PanelLeft, { className: `${iconSize} shrink-0 transition-all duration-200` }) })] }), _jsxs("nav", { className: `flex flex-col gap-1`, children: [_jsxs(NavLink, { to: "/admin/dashboard", className: ({ isActive }) => `flex items-center text-sm font-medium rounded-lg transition-all ${isActive
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-slate-600 hover:bg-slate-100"} ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`, children: [_jsx(LayoutDashboard, { className: `${iconSize} shrink-0 transition-all duration-200` }), _jsx("span", { className: `${isCollapsed ? "hidden" : "inline"}`, children: "Dashboard" })] }), _jsxs(NavLink, { to: "/admin/events", className: ({ isActive }) => `flex items-center text-sm font-medium rounded-lg transition-all ${isActive
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-slate-600 hover:bg-slate-100"} ${isCollapsed ? "justify-center px-1 py-1" : "gap-3 px-3 py-2"}`, children: [_jsx(CalendarDays, { className: `${iconSize} shrink-0 transition-all duration-200` }), _jsx("span", { className: `${isCollapsed ? "hidden" : "inline"}`, children: "Events" })] }), _jsxs(NavLink, { to: "/admin/tickets", className: ({ isActive }) => `flex items-center text-sm font-medium rounded-lg transition-all ${isActive
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-slate-600 hover:bg-slate-100"} ${isCollapsed ? "justify-center px-1 py-1" : "gap-3 px-3 py-2"}`, children: [_jsx(Ticket, { className: `${iconSize} shrink-0 transition-all duration-200` }), _jsx("span", { className: `${isCollapsed ? "hidden" : "inline"}`, children: "Tickets" })] }), _jsxs(NavLink, { to: "/admin/scanner", className: ({ isActive }) => `flex items-center text-sm font-medium rounded-lg transition-all ${isActive
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-slate-600 hover:bg-slate-100"} ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`, children: [_jsx(QrCode, { className: `${iconSize} shrink-0 transition-all duration-200` }), _jsx("span", { className: `${isCollapsed ? "hidden" : "inline"}`, children: "Scanners" })] }), _jsxs(NavLink, { to: "/admin/analytics", className: ({ isActive }) => `flex items-center text-sm font-medium rounded-lg transition-all ${isActive
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-slate-600 hover:bg-slate-100"} ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`, children: [_jsx(BarChart3, { className: `${iconSize} shrink-0 transition-all duration-200` }), _jsxs("span", { className: `${isCollapsed ? "hidden" : "inline"}`, children: [" ", "Analytics"] })] }), _jsxs(NavLink, { to: "/admin/settings", className: ({ isActive }) => `flex items-center text-sm font-medium rounded-lg transition-all ${isActive
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-slate-600 hover:bg-slate-100"} ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`, children: [_jsx(Settings, { className: `${iconSize} shrink-0 transition-all duration-200` }), _jsxs("span", { className: `${isCollapsed ? "hidden" : "inline"}`, children: [" ", "Settings"] })] })] })] })] }));
}
