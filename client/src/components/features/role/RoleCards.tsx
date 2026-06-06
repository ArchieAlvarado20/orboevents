import { permissionsList } from "@/types/permissionList";
import { Shield, Edit, Trash2, Crown } from "lucide-react";

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

// Colorful chip palette — cycles per permission index
const CHIP_COLORS = [
  "bg-violet-100 text-violet-700 border border-violet-200",
  "bg-blue-100 text-blue-700 border border-blue-200",
  "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "bg-rose-100 text-rose-700 border border-rose-200",
  "bg-amber-100 text-amber-700 border border-amber-200",
  "bg-cyan-100 text-cyan-700 border border-cyan-200",
  "bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200",
  "bg-lime-100 text-lime-700 border border-lime-200",
];

// Shield icon gradient per role
function getShieldGradient(roleName: string): string {
  const lower = roleName.toLowerCase();
  if (lower.includes("super") || lower.includes("admin"))
    return "from-amber-400 to-orange-500";
  if (lower.includes("manager"))
    return "from-violet-500 to-purple-600";
  if (lower.includes("staff"))
    return "from-blue-500 to-indigo-600";
  if (lower.includes("scanner"))
    return "from-emerald-400 to-teal-500";
  return "from-indigo-500 to-purple-600";
}

// Top accent gradient per role
function getTopBorderGradient(roleName: string): string {
  const lower = roleName.toLowerCase();
  if (lower.includes("super") || lower.includes("admin"))
    return "from-amber-400 via-orange-400 to-red-400";
  if (lower.includes("manager"))
    return "from-violet-500 via-purple-500 to-fuchsia-500";
  if (lower.includes("staff"))
    return "from-blue-500 via-indigo-500 to-sky-400";
  if (lower.includes("scanner"))
    return "from-emerald-400 via-teal-500 to-green-400";
  return "from-indigo-500 via-purple-500 to-pink-500";
}

const STATUS_STYLES = {
  active: { pill: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
  inactive: { pill: "bg-slate-100 text-slate-500 border border-slate-200", dot: "bg-slate-400" },
};

export default function RoleCard({ role, onEdit, onDelete }: RoleCardProps) {
  const isSuperAdmin = role?.name === "Super-Admin";
  const status = role.status || "active";
  const statusConfig = STATUS_STYLES[status] ?? STATUS_STYLES.active;
  const shieldGradient = getShieldGradient(role.name);
  const borderGradient = getTopBorderGradient(role.name);

  return (
    <div className="relative bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.18)] transition-all duration-300 group overflow-hidden flex flex-col">
      {/* Gradient top border */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${borderGradient} rounded-t-2xl`} />

      <div className="p-6 flex flex-col flex-1">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Shield icon with gradient bg */}
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${shieldGradient} shadow-md shrink-0`}
            >
              <Shield size={20} className="text-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 leading-tight">{role.name}</h3>
                {isSuperAdmin && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm">
                    <Crown size={9} />
                    SUPER
                  </span>
                )}
              </div>
              {/* Status pill */}
              <span
                className={`inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider ${statusConfig.pill}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-500 leading-relaxed mb-4 min-h-[2.5rem]">
          {role.description || "No description provided."}
        </p>

        {/* PERMISSIONS */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {role.permissions.length > 0 ? (
            role.permissions.map((perm, index) => {
              const permission = permissionsList.find((p) => p.value === perm);
              const chipColor = CHIP_COLORS[index % CHIP_COLORS.length];
              return (
                <span
                  key={index}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex items-center gap-1 ${chipColor}`}
                >
                  <Shield size={9} />
                  {permission?.label || perm}
                </span>
              );
            })
          ) : (
            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              No permissions assigned
            </span>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100">
          {isSuperAdmin && (
            <span className="text-[10px] text-slate-400 mr-auto italic">Protected role</span>
          )}
          <button
            onClick={() => !isSuperAdmin && onEdit(role)}
            disabled={isSuperAdmin}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              isSuperAdmin
                ? "text-slate-300 bg-slate-50 cursor-not-allowed"
                : "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
            }`}
          >
            <Edit size={13} />
            Edit
          </button>
          <button
            onClick={() => !isSuperAdmin && onDelete(role)}
            disabled={isSuperAdmin}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              isSuperAdmin
                ? "text-slate-300 bg-slate-50 cursor-not-allowed"
                : "text-red-500 bg-red-50 hover:bg-red-100"
            }`}
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
