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
        role: user.role?._id,
      });
    } else {
      resetErrors();
      setForm(userInitialEditForm);
    }
  }, [user, open]);

  const statusOption = [
    { id: 1, name: "Active", value: "active" },
    { id: 2, name: "Inactive", value: "inactive" },
    { id: 3, name: "Suspended", value: "suspended" },
    { id: 4, name: "Hold", value: "hold" },
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

  const isSuperAdmin = user?.role?.name === "Super-Admin";

  const selectableRoles = roles.filter((role) => role.status === "active");

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
            className={`relative bg-slate-900 border border-white/10 w-full max-w-2xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white ${
              isSuperAdmin ? "pointer-events-none opacity-90" : ""
            }`}
          >
            {/* Top gradient highlight */}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600" />

            {isSuperAdmin && (
              <div className="bg-red-500/10 text-red-400 text-xs px-4 py-2 border-b border-red-500/20 font-medium">
                This Super Admin account is protected and cannot be edited.
              </div>
            )}
            
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Edit User Profile
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Update user information and access controls</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {/* PROFILE IMAGE */}
              <UserFileUpload
                label={<span className="text-sm font-semibold text-slate-200">User Profile Image</span>}
                value={form.image}
                preview={preview}
                error={errors.image}
                clickNote="Only users can edit their avatar."
                onChange={handleImageChange}
                disabled
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
                label="Phone Number"
                name="phone"
                type="number"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ROLE */}
                <div className="py-2">
                  <label className="text-sm font-semibold text-slate-200 mb-2 block">
                    Role
                  </label>

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    disabled={isSuperAdmin}
                    className={`w-full border rounded-lg p-2.5 outline-none transition-all text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100
                    ${isSuperAdmin ? "bg-slate-800 cursor-not-allowed text-slate-400" : "focus:border-indigo-500"}
                    ${errors.role ? "border-red-500" : "border-slate-300 dark:border-slate-800 focus:ring-indigo-200 dark:focus:ring-indigo-400/10"}
                  `}
                  >
                    <option value="" disabled hidden className="text-slate-400">
                      Select Role
                    </option>

                    {selectableRoles.map((role) => (
                      <option
                        key={role._id}
                        value={role._id}
                        disabled={role.name === "Super-Admin"}
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                      >
                        {role.name}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-2">{errors.role}</p>
                  )}
                </div>
                
                {/* Status */}
                <div className="py-2">
                  <label className="text-sm font-semibold text-slate-200 mb-2 block">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    disabled={isSuperAdmin}
                    className={`w-full border rounded-lg p-2.5 outline-none transition-all text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100
                    ${isSuperAdmin ? "bg-slate-800 cursor-not-allowed text-slate-400" : "focus:border-indigo-500"}
                    border-slate-300 dark:border-slate-800 focus:ring-indigo-200 dark:focus:ring-indigo-400/10
                  `}
                  >
                    <option value="" disabled hidden className="text-slate-400">
                      Select Status
                    </option>

                    {statusOption.map((status) => (
                      <option
                        key={status.id}
                        value={status.value}
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                      >
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
                onClick={updateUser}
                disabled={loading}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] hover:shadow-indigo-500/35 active:scale-95 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <span>Update Profile</span>
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
