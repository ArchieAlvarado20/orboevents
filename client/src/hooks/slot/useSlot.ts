import { useEffect, useState } from "react";
import { slotApi } from "@/api/slot.api";
import axios from "axios";

export type SlotType = {
  _id: string;
  event: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked?: number;

  status: string;
};

export default function useSlots(eventId?: string) {
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  // =========================
  // FETCH SLOTS BY EVENT
  // =========================
  const fetchSlots = async () => {
    if (!eventId) return;

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      const res = await slotApi.getByEvent(eventId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSlots(res.data || []);
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

      setError(message);
      console.log(message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE SLOT
  // =========================
  const deleteSlot = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      await slotApi.delete(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSlots((prev) => prev.filter((s) => s._id !== id));
    } catch (err: any) {
      throw err?.response?.data?.message || "Failed to delete slot";
    }
  };

  // =========================
  // AUTO FETCH ON LOAD
  // =========================
  useEffect(() => {
    fetchSlots();
  }, [eventId]);

  return {
    slots,
    loading,
    error,
    unauthorized,
    fetchSlots,
    deleteSlot,
    setSlots,
  };
}
