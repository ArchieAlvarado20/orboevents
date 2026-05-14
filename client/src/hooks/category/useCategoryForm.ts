import { useState } from "react";
import { categoryApi } from "@/api/category.api";
import { showError, showSuccess } from "@/lib/toast";
import type { CategoryType } from "./useCategory";
import toast from "react-hot-toast";

interface CategoryFormData {
  name: string;
  description: string;
  icon: string;
  status: "active" | "inactive";
}

const initialForm: CategoryFormData = {
  name: "",
  description: "",
  icon: "",
  status: "active",
};

export const useCategoryForm = (onSuccess?: () => void) => {
  const [form, setForm] = useState<CategoryFormData>(initialForm);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof CategoryFormData, string>>
  >({});

  // ==============================
  // VALIDATE
  // ==============================
  const validate = () => {
    const newErrors: Record<string, string> = {};

    // =========================
    // CATEGORY NAME
    // =========================
    if (!form.name.trim()) {
      newErrors.name = "Category name is required";
    }

    // =========================
    // DESCRIPTION
    // =========================
    if (!form.description.trim()) {
      newErrors.description = "Category description is required";
    }

    // =========================
    // ICON (IMPORTANT)
    // =========================
    if (!form.icon) {
      newErrors.icon = "Please select a category icon";
    }

    // =========================
    // STATUS (optional safety check)
    // =========================
    if (!form.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==============================
  // RESET
  // ==============================
  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
  };

  // ==============================
  // CREATE CATEGORY
  // ==============================
  const createCategory = async () => {
    try {
      if (!validate()) return;

      setLoading(true);

      const res = await categoryApi.create(form);

      showSuccess("Category created successfully");

      onSuccess?.();

      return res.data.category;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create category");
      toast.dismiss();
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UPDATE CATEGORY
  // ==============================
  const updateCategory = async (id: string) => {
    try {
      if (!validate()) return;

      setLoading(true);

      const res = await categoryApi.update(id, form);

      showSuccess("Category updated successfully");
      onSuccess?.();
      return res.data.category;
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // SET EDIT DATA
  // ==============================
  const setEditData = (category: CategoryType) => {
    setForm({
      name: category.name || "",
      description: category.description || "",
      icon: category.icon || "",
      status: category.status || "active",
    });
  };

  return {
    form,
    setForm,

    errors,

    loading,

    createCategory,
    updateCategory,

    setEditData,

    resetForm,
  };
};
