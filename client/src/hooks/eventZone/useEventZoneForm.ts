import { useState } from "react";

import { eventZoneApi } from "@/api/eventZone.api";

import { showError, showSuccess } from "@/lib/toast";

import {
  EventZoneFormType,
  initialEventZoneForm,
} from "@/types/eventZone.type";

export default function useEventZoneForm(
  eventId: string,
  onSuccess?: () => void,
) {
  const [form, setForm] = useState<EventZoneFormType>(initialEventZoneForm);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : name === "capacity" || name === "scanOrder"
            ? value === ""
              ? ""
              : Number(value)
            : value,
    }));
  };

  // =========================
  // RESET ERRORS
  // =========================
  const resetErrors = () => {
    setErrors({});
  };

  // =========================
  // VALIDATE
  // =========================
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.zoneId) {
      newErrors.zoneId = "Zone is required";
    }

    if (!form.capacity || Number(form.capacity) <= 0) {
      newErrors.capacity = "Capacity must be greater than 0";
    }

    if (!form.entryTime?.trim()) {
      newErrors.entryTime = "Entry time is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // CREATE EVENT ZONE
  // =========================
  const createEventZone = async () => {
    if (!validate()) return false;

    const token = localStorage.getItem("token");

    if (!token) {
      showError("Unauthorized");
      return false;
    }

    setLoading(true);

    resetErrors();

    try {
      const payload = {
        zoneId: form.zoneId,

        capacity: Number(form.capacity),

        entryTime: form.entryTime,

        isReEntryAllowed: form.isReEntryAllowed,

        scanOrder: Number(form.scanOrder),

        isActive: form.isActive,
      };

      const res = await eventZoneApi.create(eventId, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      showSuccess("Event zone created successfully");

      setForm(initialEventZoneForm);

      onSuccess?.();

      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create event zone");

      return false;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE EVENT ZONE
  // =========================
  const updateEventZone = async (id: string) => {
    if (!validate()) return false;

    const token = localStorage.getItem("token");

    if (!token) {
      showError("Unauthorized");
      return false;
    }

    setLoading(true);

    resetErrors();

    try {
      const payload = {
        zoneId: form.zoneId,

        capacity: Number(form.capacity),

        entryTime: form.entryTime,

        isReEntryAllowed: form.isReEntryAllowed,

        scanOrder: Number(form.scanOrder),

        isActive: form.isActive,
      };

      const res = await eventZoneApi.update(id, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      showSuccess("Event zone updated successfully");

      onSuccess?.();

      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to update event zone");

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,

    handleChange,

    createEventZone,
    updateEventZone,

    loading,
    errors,

    resetErrors,
  };
}
