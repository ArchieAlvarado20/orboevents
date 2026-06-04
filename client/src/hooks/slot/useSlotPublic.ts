import { useEffect, useState } from "react";
import { slotApi } from "@/api/slot.api";

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

export default function useSlotsPublic(eventId?: string) {
  const [slotsPublic, setSlotsPublic] = useState<SlotType[]>([]);

  const fetchPublicSlots = async () => {
    if (!eventId) return;
    try {
      const slotsRes = await slotApi.getByEventPublic(eventId);

      setSlotsPublic(slotsRes.data || []);
      console.log(slotsRes.data);
    } catch (err) {
      console.error("Slots failed", err);
      setSlotsPublic([]);
    }
  };

  // =========================
  // AUTO FETCH ON LOAD
  // =========================
  useEffect(() => {
    fetchPublicSlots();
  }, [eventId]);

  return {
    slotsPublic,
    fetchPublicSlots,
  };
}
