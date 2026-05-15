import { useState } from "react";
import { ticketTypeApi } from "@/api/ticketType.api";
import { showError, showSuccess } from "@/lib/toast";
import {
  accessLevelColorMap,
  initialTicketTypeForm,
  TicketTypeForm,
} from "@/types/ticketTypes";

export default function useTicketTypeForm(
  eventId: string,
  onSuccess?: () => void,
) {
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof TicketTypeForm, string>>
  >({});

  const resetErrors = () => {
    setErrors({});
  };

  const [form, setForm] = useState<TicketTypeForm>(initialTicketTypeForm);

  // 🔹 handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked } = target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // 🔹 validation
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.name) newErrors.name = "Required";
    if (!form.description) newErrors.description = "Required";
    if (!form.price) newErrors.price = "Required";
    if (!form.quantityTotal) newErrors.quantityTotal = "Required";
    if (!form.privileges) newErrors.privileges = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const createTicketType = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const payload = {
        eventId,

        name: form.name,
        description: form.description,

        price: Number(form.price),
        quantityTotal: Number(form.quantityTotal),

        accessLevel: form.accessLevel,
        color: accessLevelColorMap[form.accessLevel ?? "general"],

        privileges: form.privileges
          ? form.privileges.split(",").map((p) => p.trim())
          : [],

        status: "pending",
      };

      const res = await ticketTypeApi.create(payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm(initialTicketTypeForm);

      showSuccess("Ticket submitted for approval");

      onSuccess?.();
      console.log(res.data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create ticket";

      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    createTicketType,
    handleChange,
    loading,
    errors,
    resetErrors,
  };
}
