import { useState } from "react";
import { eventApi } from "@/api/event.api";
import { showError, showSuccess } from "@/lib/toast";
import { EventForm, EventInitialForm } from "@/types/event";

export default function useEventForm(onSuccess?: () => void) {
  const [form, setForm] = useState<EventForm>(EventInitialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setForm(EventInitialForm);
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      // =========================
      // ORGANIZER FIELDS
      // =========================
      if (name.startsWith("organizer.")) {
        const field = name.split(".")[1];

        return {
          ...prev,
          organizer: {
            ...prev.organizer,
            [field]: value,
          },
        };
      }

      // =========================
      // NUMBER FIELDS
      // =========================
      if (name === "basePrice" || name === "capacity") {
        return {
          ...prev,
          [name]: value === "" ? 0 : Number(value),
        };
      }

      // =========================
      // TAGS
      // =========================
      if (name === "tags") {
        return {
          ...prev,
          tags: value
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        };
      }

      // =========================
      // DEFAULT
      // =========================
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // =========================
  // VALIDATE
  // =========================
  const validate = () => {
    const err: Record<string, string> = {};

    // =========================
    // BASIC INFO
    // =========================
    if (!form.name?.trim()) {
      err.name = "Event name is required";
    }

    if (!form.description?.trim()) {
      err.description = "Description is required";
    }

    // =========================
    // CATEGORY / EVENT TYPE
    // =========================
    if (!form.category) {
      err.category = "Category is required";
    }

    if (!form.eventType) {
      err.eventType = "Event type is required";
    }

    if (!form.image && !form._id) {
      err.image = "Image is required";
    }
    // =========================
    // ORGANIZER (NESTED OBJECT)
    // =========================
    if (!form.organizer?.name?.trim()) {
      err.organizer_name = "Organizer name is required";
    }

    if (!form.organizer?.email?.trim()) {
      err.organizer_email = "Organizer email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      form.organizer?.email &&
      !emailRegex.test(form.organizer?.email?.trim())
    ) {
      err.organizer_email = "Invalid email format";
    }

    if (!form.organizer?.phone?.trim()) {
      err.organizer_phone = "Organizer phone is required";
    }

    if (!form.organizer?.company?.trim()) {
      err.organizer_company = "Organizer company is required";
    }

    // =========================
    // LOCATION
    // =========================
    if (!form.location?.trim()) {
      err.location = "Location is required";
    }

    if (!form.venue?.trim()) {
      err.venue = "Venue is required";
    }

    // =========================
    // NUMBERS (IMPORTANT FIX FOR YOUR ERRORS)
    // =========================
    if (form.basePrice == null) {
      err.basePrice = "Base price is required";
    } else if (form.basePrice < 0) {
      err.basePrice = "Base price cannot be negative";
    }

    if (form.capacity == null) {
      err.capacity = "Capacity is required";
    } else if (form.capacity <= 0) {
      err.capacity = "Capacity must be greater than 0";
    }

    // =========================
    // TAGS (OPTIONAL BUT CLEAN VALIDATION)
    // =========================
    if (form.tags && !Array.isArray(form.tags)) {
      err.tags = "Tags must be an array";
    }

    if (form.tags === null) {
      err.tags = "Tags is required";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  // =========================
  // CREATE
  // =========================
  const createEvent = async () => {
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      // =========================
      // BASIC FIELDS
      // =========================
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("eventType", form.eventType);
      formData.append("location", form.location);
      formData.append("venue", form.venue);
      formData.append("basePrice", String(form.basePrice));
      formData.append("capacity", String(form.capacity));

      // =========================
      // IMAGE
      // =========================
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      // =========================
      // ARRAY FIELDS
      // =========================
      formData.append("tags", JSON.stringify(form.tags));

      // =========================
      // OBJECT FIELDS
      // =========================
      formData.append("organizer", JSON.stringify(form.organizer));

      // =========================
      // API CALL
      // =========================
      await eventApi.create(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Event created successfully");
      onSuccess?.();

      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create event");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE
  // =========================
  const updateEvent = async (id: string) => {
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        // 1. IMAGE
        if (key === "image") {
          if (value instanceof File) {
            formData.append("image", value);
          }
          return;
        }

        // 2. ARRAYS (tags)
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
          return;
        }

        // 3. OBJECTS (organizer, schedule)
        if (value && typeof value === "object") {
          formData.append(key, JSON.stringify(value));
          return;
        }

        // 4. PRIMITIVES (safe conversion)
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      await eventApi.update(id, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Event updated successfully");
      onSuccess?.();

      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to update event");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SET EDIT DATA
  // =========================
  const setEditData = (event: EventForm) => {
    setForm({
      _id: event._id,

      name: event.name,
      description: event.description,

      category:
        typeof event.category === "object"
          ? event.category._id
          : event.category,

      eventType:
        typeof event.eventType === "object"
          ? event.eventType._id
          : event.eventType,

      organizer:
        typeof event.organizer === "string"
          ? JSON.parse(event.organizer)
          : event.organizer || {
              name: "",
              email: "",
              phone: "",
              company: "",
            },

      location: event.location,
      venue: event.venue,

      basePrice: event.basePrice,
      capacity: event.capacity,

      status: event.status,

      tags:
        typeof event.tags === "string"
          ? JSON.parse(event.tags)
          : event.tags || "",
    });
  };

  return {
    form,
    setForm,
    errors,
    loading,
    createEvent,
    updateEvent,
    setEditData,
    handleChange,
    resetForm,
  };
}
