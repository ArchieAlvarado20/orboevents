import { useState } from "react";
import { showError, showSuccess } from "@/lib/alert";
import { eventApi } from "@/api/event.api";

export interface EventForm {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: string;
  price: string;
  image: File | null;
  category: string;
  status: string;

  organizerName: string;
  contactNumber: string;
  tags: string; // or string[]
  dressCode: string;
}

export default function useEventForm(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const initialForm: EventForm = {
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    capacity: "",
    price: "",
    image: null,
    category: "Public Event",
    status: "active",

    organizerName: "",
    contactNumber: "",
    tags: "",
    dressCode: "",
  };

  const [errors, setErrors] = useState<
    Partial<Record<keyof EventForm, string>>
  >({});

  const resetErrors = () => {
    setErrors({});
  };

  const [form, setForm] = useState<EventForm>(initialForm);

  // 🔹 handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    const valueToUse = type === "file" ? (files?.[0] ?? null) : value;

    setForm((prev) => ({
      ...prev,
      [name]: valueToUse,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 validation
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.name) newErrors.name = "Required";
    if (!form.location) newErrors.location = "Required";
    if (!form.startTime) newErrors.startTime = "Required";
    if (!form.endTime) newErrors.endTime = "Required";
    if (!form.description) newErrors.description = "Required";
    if (!form.capacity) newErrors.capacity = "Required";
    if (!form.price) newErrors.price = "Required";
    if (!form.image) newErrors.image = "Required";
    if (!form.organizerName) newErrors.organizerName = "Required";
    if (!form.dressCode) newErrors.dressCode = "Required";
    if (!form.tags) newErrors.tags = "Required";

    if (!form.date) {
      newErrors.date = "Date is required";
    } else {
      const today = new Date();
      const selectedDate = new Date(form.date);

      // remove time para fair comparison
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Date must be in the future";
      }
    }

    if (!form.contactNumber) {
      newErrors.contactNumber = "Required";
    } else if (!/^\+?[\d\s\\-]{7,15}$/.test(form.contactNumber)) {
      newErrors.contactNumber = "Invalid contact number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 🔹 submit
  const createEvent = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      const res = await eventApi.create(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setForm(initialForm);

      showSuccess("Event created successfully!");
      onSuccess?.();
    } catch (err: unknown) {
      let message = "Failed to create event";

      if (err instanceof Error) {
        message = err.message;
      }

      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    createEvent,
    loading,
    errors,
    resetErrors,
  };
}
