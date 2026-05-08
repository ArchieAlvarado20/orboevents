import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/TextAria";
import Button from "@/components/shared/Button";
import useRoleForm from "@/hooks/roleHook/useRoleForm";
import Select from "@/components/shared/Select";
import Checkbox from "@/components/shared/Checkbox";
import { initialForm, RoleFormType } from "@/types/role";
import { permissionsList } from "@/types/permissionList";

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  role: RoleFormType;
}

export default function RoleModal({
  role,
  open,
  onClose,
  onSuccess,
}: RoleModalProps) {
  const modalRef = useRef(null);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const togglePermission = (perm: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const {
    form,
    setForm,
    handleChange,
    createRole,
    loading,
    errors,
    updateRole,
    resetErrors,
  } = useRoleForm(() => {
    onSuccess();
    onClose();
  });

  const handleSubmit = async () => {
    let success = false;

    if (role) {
      success = await updateRole(role._id);
    } else {
      success = await createRole();
    }

    if (success) {
      onSuccess();
      onClose();
    }
  };

  useEffect(() => {
    if (role) {
      resetErrors();
      setForm({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
        status: role.status,
      });
    } else {
      resetErrors();
      setForm(initialForm);
    }
  }, [role, open]);

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
            className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-900">Create Role</h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 overflow-y-auto space-y-6">
              {/* Role Name */}
              <Input
                label="Role Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              {/* Description */}
              <Textarea
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                error={errors.description}
              />

              {/* Permissions */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Permissions
                </label>

                <div
                  className={`grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-lg border transition ${
                    errors.permissions ? "border-red-500" : "border-slate-200"
                  }`}
                >
                  {permissionsList.map((perm) => (
                    <Checkbox
                      key={perm.value}
                      label={perm.label}
                      name={perm.value}
                      checked={form.permissions.includes(perm.value)}
                      onChange={() => togglePermission(perm.value)}
                    />
                  ))}
                </div>

                {errors.permissions && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.permissions}
                  </p>
                )}
              </div>

              {/* Status */}
              <Select
                label="is Active?"
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
                onClick={() => onClose()}
              >
                cancel
              </Button>

              <Button onClick={handleSubmit} loading={loading}>
                {role ? "Update Role" : "Create Role"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
