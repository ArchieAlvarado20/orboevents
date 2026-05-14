import { useEffect, useState } from "react";
import { eventTypeApi } from "@/api/eventType.api";
import { showError, showSuccess } from "@/lib/toast";
import { EventTypeFormData } from "@/types/eventTypes.type";

export const useEventType = () => {
  const [eventTypes, setEventTypes] = useState<EventTypeFormData[]>([]);

  const [loading, setLoading] = useState(false);

  const [unauthorized, setUnauthorized] = useState(false);

  // ==============================
  // FETCH ALL EVENT TYPES
  // ==============================
  const fetchEventTypes = async () => {
    try {
      setLoading(true);

      const res = await eventTypeApi.get();

      setEventTypes(res.data);
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to fetch event types");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE EVENT TYPE
  // ==============================
  const deleteEventType = async (id: string) => {
    try {
      await eventTypeApi.delete(id);

      setEventTypes((prev) => prev.filter((type) => type._id !== id));

      showSuccess("Event type deleted successfully");
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to delete event type");

      setUnauthorized(true);
    }
  };

  // ==============================
  // INIT LOAD
  // ==============================
  useEffect(() => {
    fetchEventTypes();
  }, []);

  return {
    eventTypes,
    setEventTypes,

    loading,
    unauthorized,

    fetchEventTypes,
    deleteEventType,
  };
};
