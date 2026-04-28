import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
export default function EventsPage() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/test");
                setEvents(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchEvents();
    }, []);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Events" }), events.map((event) => (_jsxs("div", { children: [_jsx("h2", { children: event.title }), _jsx("p", { children: event.location }), _jsx("p", { children: new Date(event.date).toLocaleDateString() })] }, event._id)))] }));
}
