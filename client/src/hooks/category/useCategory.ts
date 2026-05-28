import { useEffect, useState } from "react";
import { categoryApi } from "@/api/category.api";
import { showError, showSuccess } from "@/lib/toast";
import toast from "react-hot-toast";

export interface CategoryType {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  // ==============================
  // FETCH ALL
  // ==============================
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized");
        return;
      }
      setLoading(true);

      const res = await categoryApi.get({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(res.data);
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const fetchPublicCategories = async () => {
    try {
      setLoading(true);

      const res = await categoryApi.getPublicCategories();

      setCategories(res.data);
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const deleteCategory = async (id: string) => {
    try {
      await categoryApi.delete(id);

      setCategories((prev) => prev.filter((category) => category._id !== id));

      showSuccess("Category deleted successfully");
      toast.dismiss();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to delete category");
      setUnauthorized(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    unauthorized,
    categories,
    setCategories,
    loading,
    fetchCategories,
    fetchPublicCategories,
    deleteCategory,
  };
};
