import { UserType } from "@/types/adminUsers.type";
import { permissionsList } from "@/types/permissionList";
import { Mail, Shield, Edit, Trash2 } from "lucide-react";

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
}

// Gradient palette for avatars — cycles through positions by first letter
const AVATAR_GRADIENTS = [
  "from-violet-500 to-purple-700",
  "from-blue-500 to-indigo-700",
  "from-emerald-400 to-teal-600",
  "from-rose-400 to-pink-600",
  "from-amber-400 to-orange-600",
  "from-cyan-400 to-sky-600",
  "from-fuchsia-400 to-purple-600",
  "from-lime-400 to-green-600",
];

function getAvatarGradient(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[idx];
}

// Role badge colors keyed by lowercase role name fragments
function getRoleBadgeStyle(roleName?: string): string {
  if (!roleName) return "bg-slate-100 text-slate-600 border border-slate-200";
  const lower = roleName.toLowerCase();
  if (lower.includes("super") || lower.includes("admin"))
    return "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm";
  if (lower.includes("manager"))
    return "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-sm";
  if (lower.includes("staff"))
    return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm";
  if (lower.includes("scanner"))
    return "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-sm";
  return "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-sm";
}

// Status pill styles
const STATUS_STYLES: Record<string, { pill: string; dot: string }> = {
  active: { pill: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
  inactive: { pill: "bg-slate-100 text-slate-500 border border-slate-200", dot: "bg-slate-400" },
  suspended: { pill: "bg-red-50 text-red-600 border border-red-200", dot: "bg-red-500" },
  hold: { pill: "bg-amber-50 text-amber-700 border border-amber-200", dot: "bg-amber-500" },
};

// Permission chip color palette (cycles)
const PERM_CHIP_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-cyan-100 text-cyan-700",
];

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const status = user.status || "active";
  const statusConfig = STATUS_STYLES[status] ?? STATUS_STYLES.active;
  const avatarGradient = getAvatarGradient(user.name || "U");
  const roleName = (user as any)?.role?.name as string | undefined;
  const permissions: string[] = (user as any)?.role?.permissions ?? [];

  return (
    <div className="relative bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.18)] transition-all duration-300 group overflow-hidden flex flex-col">
      {/* Gradient top accent border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl" />

      <div className="p-6 flex flex-col flex-1">
        {/* HEADER — Avatar + Info */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center bg-gradient-to-br ${avatarGradient} shadow-md`}
          >
            {(user as any).image ? (
              <img
                src={(user as any).image}
                alt={user.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <span className="text-white text-xl font-bold tracking-wide select-none">
                {user.name?.charAt(0)?.toUpperCase() ?? "?"}
              </span>
            )}
          </div>

          {/* Name + Email */}
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base text-slate-900 truncate leading-tight">
              {user.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs min-w-0">
              <Mail size={12} className="shrink-0 text-slate-400" />
              <span className="truncate">{user.email}</span>
            </div>

            {/* Role badge */}
            {roleName && (
              <span
                className={`inline-block mt-2.5 px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${getRoleBadgeStyle(roleName)}`}
              >
                {roleName}
              </span>
            )}
          </div>
        </div>

        {/* STATUS PILL */}
        <div className="mt-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-full uppercase tracking-wider ${statusConfig.pill}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
            {status}
          </span>
        </div>

        {/* PERMISSIONS */}
        <div className="flex flex-wrap gap-1.5 mt-4 flex-1">
          {permissions.length > 0 ? (
            permissions.map((perm: string, index: number) => {
              const permission = permissionsList.find((p) => p.value === perm);
              const chipColor = PERM_CHIP_COLORS[index % PERM_CHIP_COLORS.length];
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
              No permissions
            </span>
          )}
        </div>

        {/* FOOTER — Actions */}
        <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100">
          <button
            onClick={() => onEdit(user)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
          >
            <Edit size={14} />
            Edit
          </button>
          <button
            onClick={() => onDelete(user)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
