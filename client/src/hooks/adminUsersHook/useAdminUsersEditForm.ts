import { useState } from "react";
import { adminUsersApi } from "@/api/adminUsers.api";
import { UserEditType, userInitialEditForm } from "@/types/adminUsers.type";
import { showError, showSuccess } from "@/lib/toast";

export const useAdminUsersEditForm = (onSuccess?: () => void) => {
  const [form, setForm] = useState<UserEditType>(userInitialEditForm);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    const valueToUse = type === "file" ? (files?.[0] ?? null) : value;

    setForm((prev) => ({
      ...prev,
      [name]: valueToUse,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const resetErrors = () => setErrors({});

  // 📌 VALIDATION
  const validate = () => {
    const newErrors: any = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.name) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    }

    if (!form.role) {
      newErrors.role = "Role is required";
    }

    // if (!form.image) {
    //   newErrors.image = "Image is required";
    // }

    if (!form.status) {
      newErrors.status = "Status is required";
    }

    if (!form.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]+$/.test(form.phone)) {
      newErrors.phone = "Phone number contains invalid characters";
    } else if (form.phone.length < 7) {
      newErrors.phone = "Phone number is too short";
    } else if (form.phone.length > 15) {
      newErrors.phone = "Phone number is too long";
    } else if (!/^(\+?\d{1,4}[\s-]?)?(\(?\d+\)?[\s-]?)*\d+$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const updateUser = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    setLoading(true);
    resetErrors();

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (key === "confirmPassword") return;

        if (key === "password" && value === "") return;

        // FIX ROLE
        if (key === "role" && typeof value === "object") {
          formData.append("role", value._id);
          return;
        }

        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      await adminUsersApi.update(form._id, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("User Updated Successfully.");
      onSuccess?.();
      setLoading(false);
    } catch (err: any) {
      console.log(err);

      const message =
        err?.response?.data?.message || err?.message || "Failed to update user";
      console.log(err.response);
      console.log(err.response?.data);
      console.log(err.message);
      showError(message);

      if (message === "Email already exists") {
        setErrors((prev: any) => ({
          ...prev,
          email: "Email already exists",
        }));
      }
    }
  };

  return {
    form,
    setForm,
    handleChange,
    updateUser,
    resetErrors,
    loading,
    errors,
  };
};
