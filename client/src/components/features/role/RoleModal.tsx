import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/TextAria";
import Button from "@/components/shared/Button";
import useRoleForm from "@/hooks/roleHook/useRoleForm";
import Select from "@/components/shared/Select";
import Checkbox from "@/components/shared/Checkbox";

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RoleModal({
  open,
  onClose,
  onSuccess,
}: RoleModalProps) {
  const modalRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const permissionsList = [
    "CREATE_EVENT",
    "EDIT_EVENT",
    "DELETE_EVENT",
    "SCAN_TICKET",
    "VIEW_LOGS",
    "MANAGE_USERS",
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
    setEditData,
  } = useRoleForm(() => {
    onSuccess();
    onClose();
  });

  const handleEdit = (role: any) => {
    setSelectedRole(role);

    setEditData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      status: role.status,
    });

    onSuccess();
    onClose();
  };

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
                      key={perm}
                      label={perm}
                      name={perm}
                      checked={form.permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
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
                label="Event Category"
                name="category"
                value={form.status}
                onChange={handleChange}
                options={statusOptions}
              />
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button onClick={createRole} loading={loading}>
                Save Role
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
