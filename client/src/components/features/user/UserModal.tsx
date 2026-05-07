import { X } from "lucide-react";
import { useRef, useState } from "react";
import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/TextAria";
import Button from "@/components/shared/Button";
import FileUpload from "@/components/shared/FileUpload";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export default function UserModal({
  open,
  onClose,
  onSubmit,
  loading,
}: UserModalProps) {
  const modalRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    status: "active",
    bio: "",
    image: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setForm({ ...form, image: file });
    }
  };

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
                  error="no error"
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
                label="Full Name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              {/* EMAIL */}
              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              {/* PHONE */}
              <Input
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              {/* ROLE */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2"
                >
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* STATUS */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* BIO */}
              <Textarea
                label="Bio"
                name="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 mb-2 border-t text-indigo-400 border-slate-300  bg-slate-50/50  flex items-center justify-end gap-3 sticky bottom-0 z-10">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button onClick={() => onSubmit(form)} loading={loading}>
                Save User
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
