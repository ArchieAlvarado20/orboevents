import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, MapPin, MoreVertical, Edit, Ticket } from "lucide-react";
export default function EventCard({ event, onAddTicket }) {
    const statusStyle = {
        active: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        completed: "bg-gray-100 text-gray-600",
        cancelled: "bg-red-600 text-yellow-600",
    };
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden group hover:shadow-md transition-shadow", children: [_jsxs("div", { className: "h-48 relative overflow-hidden", children: [_jsx("img", { src: event.image || "/images/images.jpg", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }), _jsx("div", { className: "absolute top-4 left-4", children: _jsx("span", { className: `px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${statusStyle[event.status || "active"]}`, children: event.status || "active" }) })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "font-semibold text-lg text-slate-900 dark:text-white leading-tight", children: event.name }), _jsx("button", { className: "text-slate-400 hover:text-slate-600 transition-colors", children: _jsx(MoreVertical, { size: 18 }) })] }), _jsxs("div", { className: "space-y-2 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 text-slate-500 text-sm", children: [_jsx(Calendar, { size: 16 }), _jsx("span", { children: new Date(event.date).toLocaleDateString("en-US", {
                                            timeZone: "UTC",
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }) })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-500 text-sm", children: [_jsx(MapPin, { size: 16 }), _jsx("span", { children: event.location })] })] }), _jsxs("div", { className: "pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between", children: [_jsxs("div", { className: "flex -space-x-2", children: [_jsx("div", { className: "w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600", children: "A" }), _jsx("div", { className: "w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600", children: "B" }), _jsx("div", { className: "w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600", children: "+99" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors", children: _jsx(Edit, { size: 18 }) }), _jsx("button", { className: "p-2  text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors", children: _jsx(Ticket, { size: 18, onClick: () => onAddTicket(event) }) })] })] })] })] }));
}
