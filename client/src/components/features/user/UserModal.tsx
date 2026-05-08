import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import FileUpload from "@/components/shared/FileUpload";
import { useAdminUsersForm } from "@/hooks/adminUsersHook/useAdminUsersForm";
import * as roleApi from "@/api/role.api";
import { RoleFormType } from "@/types/role";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserModal({
  open,
  onClose,
  onSuccess,
}: UserModalProps) {
  const modalRef = useRef(null);

  const { form, handleChange, createUser, loading, errors, setForm } =
    useAdminUsersForm(() => {
      onSuccess();
      onClose();
    });

  const [roles, setRoles] = useState<RoleFormType[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized");
        return;
      }

      try {
        const res = await roleApi.getRoles({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRoles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoles();
  }, []);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed mb-12 inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white  w-full max-w-2xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-slate-100  flex items-center justify-between sticky top-0 bg-white  z-10">
              <h3 className="text-xl font-bold text-slate-900">Create User</h3>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 overflow-y-auto space-y-5">
              {/* PROFILE IMAGE */}
              <div>
                <FileUpload
                  label="User Image"
                  value={form.image}
                  error={errors.image}
                  clickNote="Click here to upload user image."
                  onChange={(file) =>
                    setForm((prev) => ({
                      ...prev,
                      image: file,
                    }))
                  }
                />

                {form.image && (
                  <p className="text-xs text-green-600 mt-1">
                    Selected: {form.image.name}
                  </p>
                )}
              </div>

              {/* NAME */}
              <Input
                type="text"
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              {/* EMAIL */}
              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                type="email"
              />

              <Input
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                type="password"
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              {/* PHONE */}
              <Input
                label="Phone"
                name="phone"
                type="number"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              {/* ROLE */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Role
                </label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg p-2"
                >
                  <option value="" disabled hidden>
                    Select Role
                  </option>

                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 mb-2 border-t text-indigo-400 border-slate-300  bg-slate-50/50  flex items-center justify-end gap-3 sticky bottom-0 z-10">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button onClick={createUser} loading={loading}>
                Save User
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
