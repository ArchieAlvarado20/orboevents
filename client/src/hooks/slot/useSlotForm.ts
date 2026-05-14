import { useState } from "react";
import { slotApi } from "@/api/slot.api";
import { showError, showSuccess } from "@/lib/toast";
import { SlotFormType, initialSlotForm } from "@/types/slot.type";

export default function useSlotForm(eventId: string, onSuccess?: () => void) {
  const [form, setForm] = useState<SlotFormType>(initialSlotForm);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "capacity"
          ? value === ""
            ? ""
            : Number(value)
          : (value ?? ""),
    }));
  };

  const resetErrors = () => setErrors({});
  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name?.trim()) {
      newErrors.name = "Slot name is required";
    }

    if (!form.date) {
      newErrors.date = "Date is required";
    }

    if (!form.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!form.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (!form.capacity || form.capacity <= 0) {
      newErrors.capacity = "Capacity must be greater than 0";
    }

    // time validation (optional but good)
    if (form.startTime && form.endTime) {
      if (form.startTime >= form.endTime) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // CREATE SLOT
  // =========================
  const createSlots = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      return;
    }

    setLoading(true);
    resetErrors();

    try {
      const payload = {
        eventId,

        name: form.name?.trim(),
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,

        capacity: Number(form.capacity),
      };

      const res = await slotApi.create(eventId, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      showSuccess("Slot created successfully!");
      onSuccess?.();

      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create slot");
      return false;
    } finally {
      setLoading(false);
    }
  };
  // =========================
  // BULK CREATE (OPTIONAL FUTURE)
  // =========================
  const createManySlots = async (slots: SlotFormType[]) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return false;
    }

    setLoading(true);
    resetErrors();

    try {
      const payload = {
        eventId,

        slots: slots.map((slot) => ({
          name: slot.name?.trim(),
          date: slot.date,
          startTime: slot.startTime,
          endTime: slot.endTime,
          capacity: Number(slot.capacity),
        })),
      };

      const res = await slotApi.bulkCreate(eventId, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      showSuccess("Slots created successfully!");
      onSuccess?.();

      return true;
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
    handleChange,
    createSlots,
    createManySlots,
    loading,
    errors,
    resetErrors,
  };
}
