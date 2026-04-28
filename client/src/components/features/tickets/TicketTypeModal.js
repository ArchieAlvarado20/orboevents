import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/TextAria";
import Select from "@/components/shared/Select";
import Button from "@/components/shared/Button";
import { MoreVertical, X } from "lucide-react";
import Checkbox from "@/components/shared/Checkbox";
import { useRef } from "react";
import useTicketTypeForm from "@/hooks/useTicketTypeForm";
export default function TicketTypeModal({ event, open, onClose, onSuccess, }) {
    const modalRef = useRef(null);
    const statusStyle = {
        active: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        completed: "bg-gray-100 text-gray-600",
    };
    const accessLevelOptions = [
        { label: "Vip", value: "vip" },
        { label: "Media", value: "media" },
        { label: "General", value: "general" },
        { label: "Speaker", value: "speaker" },
        { label: "Staff", value: "staff" },
    ];
    const { form, setForm, handleChange, createTicketType, loading, errors } = useTicketTypeForm(event._id, () => {
        onSuccess();
        onClose();
    });
    return (_jsxs(_Fragment, { children: [" ", open && (_jsx("div", { onClick: onClose, className: "fixed mb-5 inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4", children: _jsxs("div", { ref: modalRef, onClick: (e) => e.stopPropagation(), className: "relative bg-white dark:bg-slate-900 w-full max-w-2xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]", children: [_jsxs("div", { className: "px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10", children: [_jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white", children: "Create New Ticket for this Event" }), _jsx("button", { onClick: () => onClose(), className: "p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors", children: _jsx(X, {}) })] }), _jsxs("div", { className: "h-48 relative overflow-hidden", children: [_jsx("img", { src: event.image || "/images/images.jpg", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }), _jsx("div", { className: "absolute top-4 left-4", children: _jsx("span", { className: `px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${statusStyle["active"]}`, children: event.status || "active" }) })] }), _jsxs("div", { className: "flex justify-between items-start m-4", children: [_jsx("h3", { className: "font-semibold text-lg text-slate-900 dark:text-white leading-tight", children: event.name }), _jsx("button", { className: "text-slate-400 hover:text-slate-600 transition-colors", children: _jsx(MoreVertical, { size: 18 }) })] }), _jsxs("div", { className: "px-6 py-6 overflow-y-auto space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Input, { label: "Ticket Type(Zone)", name: "name", type: "text", placeholder: "Name (VIP / GA)", className: "md:col-span-1", onChange: handleChange, error: errors.name }), _jsx(Input, { label: "Total Quantity", name: "quantityTotal", type: "number", placeholder: "", className: "md:col-span-1", onChange: handleChange, error: errors.quantityTotal })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Input, { label: "Ticket Price", name: "price", type: "number", placeholder: "Price", className: "md:col-span-1", onChange: handleChange, error: errors.price, min: 0 }), _jsx(Select, { label: "Access Level", name: "accessLevel", value: form.accessLevel, onChange: handleChange, options: accessLevelOptions, error: errors.accessLevel })] }), _jsx(Textarea, { label: "Description", name: "description", className: "md:col-span-2", value: form.description, onChange: handleChange, placeholder: "Tell attendees more about your tickets...", rows: 4, error: errors.description }), _jsx(Input, { label: "Privileges", name: "privileges", onChange: handleChange, placeholder: "Privileges (comma separated)", className: "md:col-span-2", value: form.privileges, error: errors.privileges }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Checkbox, { label: "Requires Approval", name: "requiresApproval", checked: form.requiresApproval, onChange: (value) => setForm((prev) => ({
                                                ...prev,
                                                requiresApproval: value,
                                            })), description: "Tickets must be approved by admin before confirmation" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: _jsx("span", { children: "Ticket Badge Color: " }) }), [
                                                    { name: "green", label: "" },
                                                    { name: "yellow", label: "" },
                                                    { name: "red", label: "" },
                                                ].map((c) => (_jsx("button", { type: "button", onClick: () => setForm({ ...form, color: c.name }), className: `w-10 h-10 rounded-lg  flex items-center justify-center ${form.color === c.name ? "ring-2 ring-indigo-500" : ""}`, style: { backgroundColor: c.name }, children: c.label }, c.name)))] })] }), _jsxs("div", { className: "px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-end gap-3 sticky bottom-0 z-10", children: [_jsx(Button, { variant: "outline", onClick: () => onClose(), children: "cancel" }), _jsx(Button, { onClick: createTicketType, loading: loading, children: "Create Ticket" })] })] })] }) }))] }));
}
