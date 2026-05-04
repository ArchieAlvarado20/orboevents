// forms/event/useEventForm.ts
import { useState } from "react";
import { validateEvent } from "./useValidateEventForm";
import { initialEventForm, EventForm } from "./useEvent.types";
import { eventApi } from "@/api/event.api";
import { showError, showSuccess } from "@/lib/alert";

export default function useEventForm(onSuccess?: () => void) {
  const [form, setForm] = useState<EventForm>(initialEventForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, files, checked } = e.target;

    const val =
      type === "file" ? files?.[0] : type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: val }));
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const createEvent = async () => {
    const validationErrors = validateEvent(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v != null) formData.append(k, String(v));
      });

      await eventApi.create(formData);

      showSuccess("Event created!");
      setForm(initialEventForm);
      onSuccess?.();
    } catch (err: any) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    errors,
    loading,
    handleChange,
    createEvent,
  };
}
