import { permissionsList } from "@/types/permissionList";
import { Shield, MoreVertical, Edit, Trash2, UserCog } from "lucide-react";

interface RoleType {
  _id: string;
  name: string;
  description?: string;
  permissions: string[];
  status?: "active" | "inactive";
}

interface RoleCardProps {
  role: RoleType;
  onEdit: (role: RoleType) => void;
  onDelete: (role: RoleType) => void;
}

export default function RoleCard({ role, onEdit, onDelete }: RoleCardProps) {
  const statusStyle = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-600",
  };

  const isSuperAdmin = role?.name === "Super-Admin";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-md transition group">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <UserCog className="text-indigo-600" size={20} />
          <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
            {role.name}
          </h3>
        </div>

        <button className="hidden text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-slate-500 mb-4">
        {role.description || "No description provided"}
      </p>

      {/* STATUS */}
      <div className="mb-4">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
            statusStyle[role.status || "active"]
          }`}
        >
          {role.status || "active"}
        </span>
      </div>

      {/* PERMISSIONS */}
      <div className="flex flex-wrap gap-2 mb-5">
        {role.permissions.map((perm, index) => {
          const permission = permissionsList.find((p) => p.value === perm);
          return (
            <span
              key={index}
              className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full flex items-center gap-1"
            >
              <Shield size={12} />
              {permission?.label || perm}
            </span>
          );
        })}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end gap-2 pt-5 mt-5 border-t border-slate-100">
        <button
          onClick={() => !isSuperAdmin && onEdit(role)}
          disabled={isSuperAdmin}
          className={`p-2.5 rounded-xl transition ${
            isSuperAdmin
              ? "text-slate-300 cursor-not-allowed"
              : "text-indigo-600 hover:bg-indigo-50"
          }`}
        >
          <Edit size={18} />
        </button>

        <button
          onClick={() => !isSuperAdmin && onDelete(role)}
          disabled={isSuperAdmin}
          className={`p-2.5 rounded-xl transition ${
            isSuperAdmin
              ? "text-slate-300 cursor-not-allowed"
              : "text-red-500 hover:bg-red-50"
          }`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
