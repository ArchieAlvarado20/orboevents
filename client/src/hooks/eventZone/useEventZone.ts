import { useEffect, useState } from "react";

import { eventZoneApi } from "@/api/eventZone.api";
import { showError, showSuccess } from "@/lib/toast";

export default function useEventZone(eventId: string) {
  const [eventZones, setEventZones] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchEventZones = async () => {
    if (!eventId) return;

    const token = localStorage.getItem("token");

    if (!token) return;

    setLoading(true);

    try {
      const res = await eventZoneApi.getByEvent(eventId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEventZones(res.data);

      console.log(res.data);
    } catch (err: any) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to fetch event zones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventZones();
  }, [eventId]);

  // =========================
  // DELETE EVENT ZONE
  // =========================
  const deleteEventZone = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      showError("Unauthorized");
      return false;
    }

    try {
      await eventZoneApi.delete(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Event zone deleted successfully");

      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to delete event zone");

      return false;
    }
  };

  return {
    eventZones,

    loading,

    error,

    fetchEventZones,

    deleteEventZone,
  };
}
