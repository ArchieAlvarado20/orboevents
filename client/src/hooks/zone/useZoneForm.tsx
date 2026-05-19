import { useState } from "react";
import { zoneApi } from "@/api/zone.api";
import { showError, showSuccess } from "@/lib/toast";
import { ZoneFormType, initialZoneForm } from "@/types/zone.type";

export default function useZoneForm(eventId: string, onSuccess?: () => void) {
  const [form, setForm] = useState<ZoneFormType>(initialZoneForm);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  const resetErrors = () => setErrors({});

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name?.trim()) {
      newErrors.name = "Zone name is required";
    }

    if (!form.description?.trim()) {
      newErrors.description = "Zone description is required";
    }

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // CREATE ZONE
  // =========================
  const createZone = async () => {
    if (!validate()) return false;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      return false;
    }

    setLoading(true);
    resetErrors();

    try {
      const payload = {
        name: form.name?.trim(),
        description: form.description?.trim(),

        isActive: form.isActive,
      };
      console.log("ZONE EVENT ID:", eventId);
      const res = await zoneApi.create(payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Zone created successfully!");
      onSuccess?.();
      console.log(res.data);
      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create zone");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE ZONE
  // =========================
  const updateZone = async (id: string) => {
    if (!validate()) return false;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      return false;
    }

    setLoading(true);
    resetErrors();

    try {
      const payload = {
        name: form.name?.trim(),
        description: form.description?.trim(),

        isActive: form.isActive,
      };

      const res = await zoneApi.update(id, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      showSuccess("Zone updated successfully!");
      onSuccess?.();

      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to update zone");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE ZONE (OPTIONAL)
  // =========================
  const deleteZone = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return false;
    }

    try {
      await zoneApi.delete(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Zone deleted successfully!");
      onSuccess?.();

      return true;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to delete zone");
      return false;
    }
  };

  return {
    form,
    setForm,
    handleChange,
    createZone,
    updateZone,
    deleteZone,
    loading,
    errors,
    resetErrors,
  };
}
