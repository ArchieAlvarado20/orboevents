import { useState } from "react";
import { ticketTypeApi } from "@/api/ticketType.api";
import { showError, showSuccess } from "@/lib/alert";
export default function useTicketTypeForm(eventId, onSuccess) {
    const [loading, setLoading] = useState(false);
    const initialForm = {
        name: "",
        description: "",
        price: "",
        quantityTotal: "",
        privileges: "",
        accessLevel: "vip",
        color: "green",
        requiresApproval: false,
    };
    const [errors, setErrors] = useState({});
    const resetErrors = () => {
        setErrors({});
    };
    const [form, setForm] = useState(initialForm);
    // 🔹 handle input change
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const valueToUse = type === "file" ? (files?.[0] ?? null) : value;
        setForm((prev) => ({
            ...prev,
            [name]: valueToUse,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
        const checked = e.target.checked;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    // 🔹 validation
    const validate = () => {
        const newErrors = {};
        if (!form.name)
            newErrors.name = "Required";
        if (!form.description)
            newErrors.description = "Required";
        if (!form.price)
            newErrors.price = "Required";
        if (!form.quantityTotal)
            newErrors.quantityTotal = "Required";
        if (!form.privileges)
            newErrors.privileges = "Required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const createTicketType = async () => {
        if (!validate())
            return;
        const token = localStorage.getItem("token");
        setLoading(true);
        try {
            const payload = {
                ...form,
                eventId: eventId,
                price: Number(form.price),
                quantityTotal: Number(form.quantityTotal),
                privileges: form.privileges
                    ? form.privileges.split(",").map((p) => p.trim())
                    : [],
            };
            const res = await ticketTypeApi.create(payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setForm(initialForm);
            showSuccess("Ticket created successfully!");
            onSuccess?.();
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Failed to create ticket";
            showError(message);
        }
        finally {
            setLoading(false);
        }
    };
    return {
        form,
        setForm,
        createTicketType,
        handleChange,
        loading,
        errors,
        resetErrors,
    };
}
