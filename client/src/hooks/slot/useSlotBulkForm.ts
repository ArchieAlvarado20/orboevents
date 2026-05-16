import { useState } from "react";
import { slotApi } from "@/api/slot.api";
import { showError, showSuccess } from "@/lib/toast";
import { SlotFormType, initialSlotForm } from "@/types/slot.type";

export default function useSlotBulkForm(
  eventId: string,
  onSuccess?: () => void,
) {
  const [form, setForm] = useState({
    slots: [initialSlotForm],
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<number, Record<string, string>>>(
    {},
  );

  const isLastSlotValid = () => {
    const last = form.slots[form.slots.length - 1];

    if (!last) return false;

    return (
      last.name?.trim() &&
      last.date &&
      last.startTime &&
      last.endTime &&
      last.capacity > 0
    );
  };

  const removeSlot = (index: number) => {
    setForm((prev) => ({
      ...prev,
      slots: prev.slots.filter((_, i) => i !== index),
    }));
  };

  // =========================
  // ADD SLOT
  // =========================
  const addSlot = () => {
    setForm((prev) => ({
      slots: [
        ...prev.slots,
        { name: "", date: "", startTime: "", endTime: "", capacity: null },
      ],
    }));
  };

  // =========================
  // UPDATE SLOT
  // =========================
  const updateSlot = (index: number, field: string, value: any) => {
    setForm((prev) => {
      const updated = [...prev.slots];

      updated[index] = {
        ...updated[index],
        [field]: field === "capacity" ? Number(value) : value,
      };

      return { slots: updated };
    });
  };

  // =========================
  // VALIDATION (IMPORTANT PART)
  // =========================
  const validate = () => {
    const newErrors: Record<number, Record<string, string>> = {};

    form.slots.forEach((slot, index) => {
      const slotErrors: Record<string, string> = {};

      if (!slot.name?.trim()) {
        slotErrors.name = "Slot name is required";
      }

      if (!slot.date) {
        slotErrors.date = "Date is required";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const slotDate = new Date(slot.date);
        slotDate.setHours(0, 0, 0, 0);

        if (slotDate < today) {
          slotErrors.date = "Date must be today or in the future";
        }
      }

      if (!slot.startTime) {
        slotErrors.startTime = "Start time is required";
      }

      if (!slot.endTime) {
        slotErrors.endTime = "End time is required";
      }

      if (!slot.capacity || slot.capacity <= 0) {
        slotErrors.capacity = "Capacity must be greater than 0";
      }

      if (slot.startTime && slot.endTime) {
        if (slot.startTime >= slot.endTime) {
          slotErrors.endTime = "End time must be after start time";
        }
      }

      if (Object.keys(slotErrors).length > 0) {
        newErrors[index] = slotErrors;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => setErrors({});
  // =========================
  // BULK CREATE
  // =========================
  const createManySlots = async () => {
    if (!validate()) return false;

    const token = localStorage.getItem("token");
    if (!token) return false;

    const payload = {
      eventId,
      slots: form.slots,
    };

    setLoading(true);
    resetErrors();

    try {
      const res = await slotApi.bulkCreate(eventId, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      console.log(res.data);

      showSuccess("Slots created successfully!");
      onSuccess?.();
      onSuccess?.();
      return res.data.slots;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create slots");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    addSlot,
    updateSlot,
    createManySlots,
    errors,
    removeSlot,
    loading,
    isLastSlotValid,
    resetErrors,
  };
}
