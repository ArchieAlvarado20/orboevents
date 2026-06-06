import { useState } from "react";
import * as roleApi from "@/api/role.api";
import { initialForm, RoleFormType } from "@/types/role";
import { showError, showSuccess } from "@/lib/toast";

export default function useRoleForm(onSuccess?: () => void) {
  const [form, setForm] = useState<RoleFormType>(initialForm);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetErrors = () => setErrors({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Role name is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Role description is required";
    }

    if (form.permissions.length === 0) {
      newErrors.permissions = "Select at least 1 permission";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const createRole = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    setLoading(true);
    resetErrors();

    try {
      const res = await roleApi.createRole(form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Role created successfully!");
      onSuccess?.(); // close modal / refresh list

      return res.data.role;
    } catch (err: unknown) {
      let message = "Failed to create Role";

      if (err instanceof Error) {
        message = err.message;
      }
      console.log(message);
      showError("Role name already exists");
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id: string) => {
    if (!validate()) return;

    setLoading(true);
    resetErrors();
    try {
      await roleApi.updateRole(id, form);

      onSuccess?.();
      showSuccess("Role updated successfully!");
    } catch (err: any) {
      const data = err?.response?.data;

      if (err?.response?.status === 400) {
        if (data?.message === "Role already exists") {
          setErrors((prev) => ({
            ...prev,
            name: "Role already exists",
          }));
          return;
        }
      }

      throw data?.message || "Failed to update role";
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    createRole,
    loading,
    errors,
    resetErrors,
    updateRole,
  };
}
