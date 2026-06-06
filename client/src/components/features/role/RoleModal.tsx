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
        _id: role._id,
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
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 border border-white/10 w-full max-w-xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white"
          >
            {/* Top gradient highlight */}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600" />

            {/* HEADER */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  {role ? "Edit Role" : "Create New Role"}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Configure access level permissions and settings</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {/* Role Name */}
              <Input
                label="Role Name"
                name="name"
                placeholder="e.g. Event Coordinator"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              {/* Description */}
              <Textarea
                label="Description"
                name="description"
                placeholder="Tell us what this role is responsible for..."
                value={form.description}
                onChange={handleChange}
                error={errors.description}
              />

              {/* Permissions */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Permissions
                </label>

                <div
                  className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border bg-slate-950/20 transition ${
                    errors.permissions ? "border-red-500" : "border-slate-300 dark:border-slate-800"
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
                label="Is Active?"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={statusOptions}
              />
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-white/5 bg-slate-950/40 flex items-center justify-end gap-3 sticky bottom-0 z-10">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] hover:shadow-indigo-500/35 active:scale-95 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>{role ? "Update Role" : "Create Role"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
