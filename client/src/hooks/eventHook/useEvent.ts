import { useEffect, useState } from "react";
import { eventApi } from "@/api/event.api";
import { showError, showSuccess } from "@/lib/toast";
import { EventForm } from "@/types/event";

export interface EventType {
  _id: string;
  name: string;
  description?: string;
  image?: string;

  category: any;
  eventType: any;

  location?: string;
  venue?: string;

  basePrice?: number;
  capacity?: number;

  status: string;
}

export const useEvent = () => {
  const [events, setEvents] = useState<EventForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  // =========================
  // FETCH EVENTS
  // =========================
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized");
        return;
      }
      setLoading(true);

      const res = await eventApi.get({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(res.data.events || res.data);
    } catch (err: any) {
      console.log(err.response?.data?.message || "Failed to fetch events");
      if (err.response?.status === 403) {
        setUnauthorized(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE EVENT
  // =========================
  const deleteEvent = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized");
        return;
      }

      await eventApi.delete(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents((prev) => prev.filter((e) => e._id !== id));

      showSuccess("Event Cancelled Successfully");
    } catch (err: any) {
      console.log(err.response?.data?.message || "Failed to delete event");
      if (err.response?.status === 403) {
        setUnauthorized(true);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    setEvents,
    loading,
    unauthorized,
    fetchEvents,
    deleteEvent,
  };
};
