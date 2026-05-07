import { useState } from "react";
import * as roleApi from "@/api/role.api";
import { RoleFormType } from "@/types/role";
import { showError, showSuccess } from "@/lib/toast";

export default function useRoleForm(onSuccess?: () => void) {
  const [form, setForm] = useState<RoleFormType>({
    name: "",
    description: "",
    permissions: [] as string[],
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const setEditData = (data: RoleFormType) => {
    setForm(data);
    setErrors({});
  };

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

    setLoading(true);
    resetErrors();

    try {
      const res = await roleApi.createRole(form);

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
    setLoading(true);
    try {
      await roleApi.updateRole(id, form);

      onSuccess?.();
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
    setEditData,
    updateRole,
  };
}
