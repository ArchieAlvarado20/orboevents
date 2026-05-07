import { Mail, Shield, MoreVertical, Edit, Trash2 } from "lucide-react";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  image?: string;
  status?: "active" | "inactive" | "suspended";
}

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const statusStyle = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-slate-100 text-slate-600",
    suspended: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-xl transition duration-300 group">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          {/* PROFILE IMAGE */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-slate-500">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* USER INFO */}
          <div>
            <h3 className="font-bold text-lg text-slate-900">{user.name}</h3>

            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Mail size={14} />
              {user.email}
            </div>

            {/* ROLE */}
            <div className="mt-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* STATUS */}
      <div className="mt-5">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
            statusStyle[user.status || "active"]
          }`}
        >
          {user.status || "active"}
        </span>
      </div>

      {/* PERMISSIONS */}
      <div className="flex flex-wrap gap-2 mt-5">
        {user.permissions.map((perm, index) => (
          <span
            key={index}
            className="px-2.5 py-1 text-xs bg-slate-100 text-slate-600 rounded-full flex items-center gap-1"
          >
            <Shield size={12} />
            {perm}
          </span>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-2 pt-5 mt-5 border-t border-slate-100">
        <button
          onClick={() => onEdit(user)}
          className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition"
        >
          <Edit size={18} />
        </button>

        <button
          onClick={() => onDelete(user)}
          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
