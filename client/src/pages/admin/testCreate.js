import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
export default function CreateTest() {
    const [form, setForm] = useState({
        title: "",
        location: "",
        date: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/test", form);
            console.log("CREATED:", res.data);
            alert("Event created!");
            setForm({
                title: "",
                location: "",
                date: "",
            });
        }
        catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            }
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { name: "title", placeholder: "Title", value: form.title, onChange: handleChange }), _jsx("input", { name: "location", placeholder: "Location", value: form.location, onChange: handleChange }), _jsx("input", { type: "date", name: "date", value: form.date, onChange: handleChange }), _jsx("button", { type: "submit", children: "Create Event" })] }));
}
