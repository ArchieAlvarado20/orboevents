import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import * as roleApi from "@/api/role.api";
import { RoleFormType } from "@/types/role";
import { UserEditType, userInitialEditForm } from "@/types/adminUsers.type";
import UserFileUpload from "@/components/shared/UserFIleUpload";
import { useAdminUsersEditForm } from "@/hooks/adminUsersHook/useAdminUsersEditForm";
import FileUpload from "@/components/shared/FileUpload";

interface UserModalProps {
  user: UserEditType;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserEditModal({
  user,
  open,
  onClose,
  onSuccess,
}: UserModalProps) {
  const modalRef = useRef(null);

  const {
    form,
    handleChange,
    updateUser,
    loading,
    errors,
    setForm,
    resetErrors,
  } = useAdminUsersEditForm(() => {
    onSuccess();
    onClose();
  });

  const [roles, setRoles] = useState<RoleFormType[]>([]);
  const [preview, setPreview] = useState("");

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

  useEffect(() => {
    if (user) {
      resetErrors();
      setForm({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        role: user.role,
      });
    } else {
      resetErrors();
      setForm(userInitialEditForm);
    }
  }, [user, open]);

  const statusOption = [
    { id: "active", value: "active", name: "active" },
    { id: "inacitve", value: "inactive", name: "inactive" },
    { id: "suspended", value: "suspended", name: "suspended" },
    { id: "hold", value: "hold", name: "hold" },
  ];

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (user?.image) {
      setPreview(user?.image);
    }
  }, [user]);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed  max-h-screen inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white  w-full max-w-2xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-slate-100  flex items-center justify-between sticky top-0 bg-white  z-10">
              <h3 className="text-xl font-bold text-slate-900">Edit User</h3>

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
              <UserFileUpload
                label="User Image"
                value={form.image}
                preview={preview}
                error={errors.image}
                clickNote="Click camera icon to change profile"
                onChange={handleImageChange}
              />

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

              {/* PHONE */}
              <Input
                label="Phone"
                name="phone"
                type="number"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <div className="grid grid-cols-1 md:grid-cols-2">
                {" "}
                {/* ROLE */}
                <div className="px-0 py-2 sm:px-2">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Role
                  </label>

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={`w-full border focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-lg p-2 ${
                      errors.role ? "border-red-500" : "border-slate-200"
                    }`}
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
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-2">{errors.role}</p>
                  )}
                </div>
                {/* Status */}
                <div className="px-0 py-2 sm:px-2">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all border border-slate-200 rounded-lg p-2"
                  >
                    <option value="" disabled hidden>
                      Select Status
                    </option>

                    {statusOption.map((status) => (
                      <option key={status.id} value={status.value}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 mb-2 border-t text-indigo-400 border-slate-300  bg-slate-50/50  flex items-center justify-end gap-3 sticky bottom-0 z-10">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button onClick={updateUser} loading={loading}>
                Update User
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
