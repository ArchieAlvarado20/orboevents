import { X, FolderKanban } from "lucide-react";
import {
  PartyPopper,
  Music,
  Trophy,
  Briefcase,
  FlaskConical,
  GraduationCap,
  Utensils,
  HeartPulse,
  Theater,
  Plane,
} from "lucide-react";
import { useEffect, useRef } from "react";

import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/TextAria";
import Button from "@/components/shared/Button";
import Select from "@/components/shared/Select";

import { useCategoryForm } from "@/hooks/category/useCategoryForm";
import { categoryIconOptions, CategoryType } from "@/types/categoryIcon.type";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: CategoryType;
}

const initialForm = {
  name: "",
  description: "",
  icon: "",
  status: "active" as "active" | "inactive",
};

export default function CategoryModal({
  open,
  onClose,
  onSuccess,
  category,
}: CategoryModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const statusOptions = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
  ];

  const {
    form,
    setForm,
    errors,
    loading,
    createCategory,
    updateCategory,
    resetForm,
  } = useCategoryForm();

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==============================
  // HANDLE SUBMIT
  // ==============================
  const handleSubmit = async () => {
    let success = false;

    if (category) {
      success = await updateCategory(category._id);
    } else {
      success = await createCategory();
    }

    if (success) {
      onSuccess();
      onClose();
    }
  };

  // ==============================
  // SET EDIT DATA
  // ==============================
  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
        icon: category.icon || "",
        status: category.status || "active",
      });
    } else {
      setForm(initialForm);
      resetForm();
    }
  }, [category, open]);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FolderKanban className="text-indigo-600" size={20} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {category ? "Update Category" : "Create Category"}
                  </h3>

                  <p className="text-sm text-slate-400">
                    Manage event categories
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 overflow-y-auto space-y-5">
              {/* CATEGORY NAME */}
              <Input
                label="Category Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Enter category name"
              />

              {/* DESCRIPTION */}
              <Textarea
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Enter category description"
              />

              {/* ICON */}
              <div className="px-0 py-2 sm:px-0">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Category Icon
                </label>

                <select
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 outline-none transition-all border-slate-200 focus:border-indigo-500"
                >
                  <option value="" disabled hidden>
                    Select Icon
                  </option>

                  {categoryIconOptions.map((icon) => (
                    <option key={icon.id} value={icon.value}>
                      {icon.name}
                    </option>
                  ))}
                </select>

                {errors.icon && (
                  <p className="text-red-500 text-xs mt-2">{errors.icon}</p>
                )}
              </div>

              {/* STATUS */}
              <Select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={statusOptions}
              />
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
              <Button
                variant="outline"
                className="text-indigo-500"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button onClick={handleSubmit} loading={loading}>
                {category ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
