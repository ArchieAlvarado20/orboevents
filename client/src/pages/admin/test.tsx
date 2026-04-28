import { useEffect, useState } from "react";
import axios from "axios";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/test");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>

      {events.map((event) => (
        <div key={event._id}>
          <h2>{event.title}</h2>
          <p>{event.location}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
