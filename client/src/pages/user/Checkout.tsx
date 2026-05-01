import EventCard from "@/components/features/event/EventCards";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  image?: string;
  status?: "active" | "pending" | "completed";
}

export default function Checkout() {
  const [unauthorized, setUnauthorized] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const Navigate = useNavigate();

  const handleCheckout = () => {
    alert("hello!");
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/event`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEvents(res.data.events || []);

      console.log(res.data);
    } catch (err: unknown) {
      let message = "Something went wrong!";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;

        if (err.response?.status === 401 || err.response?.status === 403) {
          setUnauthorized(true);
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      console.log(message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {unauthorized ? (
        Navigate("/Admin")
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onAddTicket={handleCheckout}
            />
          ))}
        </div>
      )}
    </>
  );
}
