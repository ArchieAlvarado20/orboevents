import { useState } from "react";
import { eventTypeApi } from "@/api/eventType.api";
import { showError, showSuccess } from "@/lib/toast";
import {
  EventTypeFormData,
  eventTypeInitialForm,
} from "@/types/eventTypes.type";

export const useEventTypeForm = (onSuccess?: () => void) => {
  const [form, setForm] = useState<EventTypeFormData>(eventTypeInitialForm);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof EventTypeFormData, string>>
  >({});

  // ==============================
  // VALIDATE
  // ==============================
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name) {
      newErrors.name = "Event type is required";
    }

    if (!form.label.trim()) {
      newErrors.label = "Label is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    // uiConfig safety check
    if (
      !form.uiConfig.showDate &&
      !form.uiConfig.showDateRange &&
      !form.uiConfig.showSlots
    ) {
      newErrors.uiConfig = "At least one UI config must be enabled";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==============================
  // RESET
  // ==============================
  const resetForm = () => {
    setForm(eventTypeInitialForm);
    setErrors({});
  };

  // ==============================
  // CREATE
  // ==============================
  const createEventType = async () => {
    try {
      if (!validate()) return;

      setLoading(true);

      const res = await eventTypeApi.create(form);

      showSuccess("Event type created successfully");

      onSuccess?.();

      return res.data.eventType;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create event type");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UPDATE
  // ==============================
  const updateEventType = async (id: string) => {
    try {
      if (!validate()) return;

      setLoading(true);

      const res = await eventTypeApi.update(id, form);

      showSuccess("Event type updated successfully");

      onSuccess?.();

      return res.data.eventType;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to update event type");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // SET EDIT DATA
  // ==============================
  const setEditData = (data: any) => {
    setForm({
      _id: data._id || "",
      name: data.name || "",
      label: data.label || "",
      description: data.description || "",

      uiConfig: {
        showDate: data.uiConfig?.showDate || false,
        showDateRange: data.uiConfig?.showDateRange || false,
        showSlots: data.uiConfig?.showSlots || false,
      },

      status: data.status || "active",
    });
  };

  return {
    form,
    setForm,

    errors,
    loading,

    createEventType,
    updateEventType,

    setEditData,
    resetForm,
  };
};
