import { useState } from "react";
import { adminUsersApi } from "@/api/adminUsers.api";
import { Phone } from "lucide-react";
import { UserType } from "@/types/adminUsers.type";
import { showError, showSuccess } from "@/lib/toast";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: null,
  role: "",
  phone: "",
};

export const useAdminUsersForm = (onSuccess?: () => void) => {
  const [form, setForm] = useState<UserType>(initialForm);

  const [unauthorized, setUnauthorized] = useState(false);

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

  // 📌 VALIDATION
  const validate = () => {
    const newErrors: any = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    if (!form.name) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    if (!form.role) {
      newErrors.role = "Role is required";
    }

    if (!form.image) {
      newErrors.image = "Image is required";
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

  const createUser = async () => {
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

      await adminUsersApi.create(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm(initialForm);

      showSuccess("User Created Succesfully.");
      onSuccess?.();
    } catch (err: any) {
      const data = err?.response?.data;

      showError(data?.message || "Failed to create user");

      if (data?.message === "Email already exists") {
        setErrors((prev: any) => ({
          ...prev,
          email: "Email already exists",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    createUser,
    loading,
    errors,
  };
};
