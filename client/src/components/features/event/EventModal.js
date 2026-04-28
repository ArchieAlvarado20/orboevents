import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { X } from "lucide-react";
import { useRef } from "react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Textarea from "@/components/shared/TextAria";
import Button from "@/components/shared/Button";
import FileUpload from "@/components/shared/FileUpload";
import useEventForm from "@/hooks/useEventForm";
export default function EventModal({ open, onClose, onSuccess, }) {
    const modalRef = useRef(null);
    const categoryOptions = [
        { label: "Sports & Travel", value: "Sports & Travel" },
        { label: "Science & Research", value: "Science & Research" },
        { label: "New Years Eve", value: "New Years Eve" },
        { label: "Industrial Engineering", value: "Industrial Engineering" },
        { label: "Holi", value: "Holi" },
        { label: "Health & Wellness", value: "Health & Wellness" },
        { label: "Garbe", value: "Garbe" },
        { label: "Public Event", value: "Public Event" },
    ];
    const { form, setForm, handleChange, createEvent, loading, errors } = useEventForm(() => {
        onSuccess();
        onClose();
    });
    return (_jsx(_Fragment, { children: open && (_jsx("div", { onClick: onClose, className: "fixed mb-5 inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4", children: _jsxs("div", { ref: modalRef, onClick: (e) => e.stopPropagation(), className: "relative bg-white dark:bg-slate-900 w-full max-w-2xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]", children: [_jsxs("div", { className: "px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10", children: [_jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white", children: "Create New Event" }), _jsx("button", { onClick: () => onClose(), className: "p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors", children: _jsx(X, {}) })] }), _jsxs("div", { className: "px-6 py-6 overflow-y-auto space-y-6", children: [_jsx(FileUpload, { label: "Event Image", value: form.image, error: errors.image, onChange: (file) => setForm((prev) => ({
                                    ...prev,
                                    image: file,
                                })) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Input, { label: "Event Name", name: "name", type: "text", value: form.name, onChange: handleChange, error: errors.name }), _jsx(Select, { label: "Event Category", name: "category", value: form.category, onChange: handleChange, options: categoryOptions }), _jsx(Input, { label: "Organizer Name", name: "organizerName", type: "text", value: form.organizerName, onChange: handleChange, error: errors.organizerName }), _jsx(Input, { label: "Organizer Contact No.", name: "contactNumber", type: "number", placeholder: "8812345678", value: form.contactNumber, onChange: handleChange, error: errors.contactNumber }), _jsx(Input, { label: "Date", name: "date", type: "date", value: form.date, onChange: handleChange, min: new Date().toISOString().split("T")[0], error: errors.date }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Input, { label: "Start Time", name: "startTime", type: "time", value: form.startTime, onChange: handleChange, error: errors.startTime }), _jsx(Input, { label: "End Time", name: "endTime", type: "time", value: form.endTime, onChange: handleChange, error: errors.endTime })] }), _jsx(Input, { label: "Location", name: "location", type: "text", className: "md:col-span-2", value: form.location, onChange: handleChange, error: errors.location }), _jsx(Textarea, { label: "Description", name: "description", className: "md:col-span-2", value: form.description, onChange: handleChange, placeholder: "Tell attendees more about your event...", rows: 4, error: errors.description }), _jsx(Input, { label: "All Zones Total Capacity", name: "capacity", type: "number", placeholder: "500", value: form.capacity, onChange: handleChange, error: errors.capacity, min: 0 }), _jsx(Input, { label: "Tickets starts at  ", name: "price", type: "number", placeholder: "0.00", value: form.price, onChange: handleChange, error: errors.price, min: 0 }), _jsx(Input, { label: "Tags #", name: "tags", type: "text", placeholder: "Tags (comma separated)", className: "md:col-span-1", value: form.tags, onChange: handleChange, error: errors.tags }), _jsx(Input, { label: "Dress Code", name: "dressCode", type: "text", className: "md:col-span-1", value: form.dressCode, onChange: handleChange, error: errors.dressCode })] })] }), _jsxs("div", { className: "px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-end gap-3 sticky bottom-0 z-10", children: [_jsx(Button, { variant: "outline", onClick: () => onClose(), children: "cancel" }), _jsx(Button, { onClick: createEvent, loading: loading, children: "Create Events" })] })] }) })) }));
}
