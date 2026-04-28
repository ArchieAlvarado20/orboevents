import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin } from "lucide-react";
export default function UserEventCard({ event }) {
    return (_jsxs("div", { className: "bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group", children: [_jsxs("div", { className: "relative h-46 overflow-hidden", children: [_jsx("img", { src: event.image, alt: event.name, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" }), _jsx("div", { className: "absolute top-4 right-4 bg-violet-600 text-white px-4 py-2 rounded-2xl font-bold text-xs shadow-lg", children: new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        }) })] }), _jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex items-center gap-2 text-violet-600 font-bold text-xs mb-4", children: [_jsx(MapPin, {}), event.location] }), _jsx("h3", { className: "font-['Plus_Jakarta_Sans'] font-bold text-xl mb-4", children: event.name }), _jsx("p", { className: "text-slate-500 mb-8 line-clamp-2", children: event.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-2xl font-bold text-violet-600", children: ["\u20B9 ", event.price] }), _jsx("button", { className: "bg-violet-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity", children: "Book Now" })] })] })] }));
}
