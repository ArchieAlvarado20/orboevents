import { useState } from "react";
import { ticketTypeApi } from "@/api/ticketType.api";
import { showError, showSuccess } from "@/lib/alert";

type TicketTypeForm = {
  name: string;
  description?: string;

  price: number | string;
  quantityTotal: number | string;

  privileges?: string;

  accessLevel?: "vip" | "media" | "general" | "speaker" | "staff";

  color?: string;

  requiresApproval: boolean;

  eventId?: string;
};

export default function useTicketTypeForm(
  eventId: string,
  onSuccess?: () => void,
) {
  const [loading, setLoading] = useState(false);

  const initialForm: TicketTypeForm = {
    name: "",
    description: "",
    price: "",
    quantityTotal: "",
    privileges: "",
    accessLevel: "vip",
    color: "green",
    requiresApproval: false,
  };

  const [errors, setErrors] = useState<
    Partial<Record<keyof TicketTypeForm, string>>
  >({});

  const resetErrors = () => {
    setErrors({});
  };

  const [form, setForm] = useState<TicketTypeForm>(initialForm);

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
        ...form,

        eventId: eventId,

        price: Number(form.price),
        quantityTotal: Number(form.quantityTotal),

        privileges: form.privileges
          ? form.privileges.split(",").map((p) => p.trim())
          : [],
      };

      const res = await ticketTypeApi.create(payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setForm(initialForm);

      showSuccess("Ticket created successfully!");
      onSuccess?.();
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
