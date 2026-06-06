import RoleCard from "@/components/features/role/RoleCards";
import RoleModal from "@/components/features/role/RoleModal";
import Button from "@/components/shared/Button";
import Unauthorized from "@/components/shared/Unauthorized";
import useRoles from "@/hooks/roleHook/useRoles";
import { confirmToast } from "@/lib/confirmToast";
import { RoleFormType } from "@/types/role";
import { Plus, Search, Shield, ShieldCheck, Lock, LayoutGrid } from "lucide-react";
import { useState } from "react";

type RoleFilter = "all" | string;

export default function Role() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<RoleFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { roles, loading, deleteRole, fetchRoles, unauthorized } = useRoles();

  const handleDeleteRole = (role: any) => {
    confirmToast("Delete this role?", async () => {
      await deleteRole(role._id);
    });
  };

  const handleEdit = (role: RoleFormType) => {
    setSelectedRole(role);
    setOpenModal(true);
  };

  const rolesCount = roles.length;

  // Dynamically build filter tabs from role names
  const dynamicTabs: string[] = Array.from(
    new Set(roles.map((r) => r.name).filter((n) => n !== "Super-Admin"))
  );

  const FILTER_TABS = ["all", ...dynamicTabs, "Super-Admin"];

  const filteredRoles = roles.filter((role) => {
    const matchesFilter = activeFilter === "all" || role.name === activeFilter;
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const superAdminCount = roles.filter((r) => r.name === "Super-Admin").length;
  const activeCount = roles.filter((r) => (r.status ?? "active") === "active").length;

  return (
    <>
      {unauthorized ? (
        <div className="sm:m-auto">
          <Unauthorized message="Admin access only!" />
        </div>
      ) : (
        <main className="min-h-screen p-6 bg-slate-50">
          {/* Modal */}
          <RoleModal
            open={openModal}
            role={selectedRole}
            onClose={() => { setOpenModal(false); setSelectedRole(null); }}
            onSuccess={() => { fetchRoles(); setOpenModal(false); setSelectedRole(null); }}
          />

          {/* ── GRADIENT HEADER ── */}
          <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 p-6 shadow-xl">
            {/* decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-24 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 blur-2xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Shield size={22} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Roles & Permissions</h1>
                </div>
                <p className="text-purple-200 text-sm ml-1">
                  {rolesCount} role{rolesCount !== 1 ? "s" : ""} configured &mdash; control access across your platform
                </p>
              </div>

              <Button onClick={() => setOpenModal(true)} variant="primary">
                <Plus size={16} />
                <span>Add Role</span>
              </Button>
            </div>

            {/* Stat chips */}
            <div className="relative flex flex-wrap gap-3 mt-5">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-medium">
                <LayoutGrid size={15} className="text-purple-200" />
                <span>{rolesCount} Total Roles</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-medium">
                <ShieldCheck size={15} className="text-emerald-300" />
                <span>{activeCount} Active</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-medium">
                <Lock size={15} className="text-amber-300" />
                <span>{superAdminCount} Protected</span>
              </div>
            </div>
          </div>

          {/* ── FILTER TABS + SEARCH ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            {/* Role filter tabs */}
            <div className="inline-flex flex-wrap gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 capitalize ${
                    activeFilter === tab
                      ? "bg-violet-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab === "all" ? "All Roles" : tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-violet-400 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* ── LOADING ── */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
            </div>
          )}

          {/* ── EMPTY STATE ── */}
          {!loading && filteredRoles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
              <div className="p-5 bg-violet-50 rounded-3xl mb-4">
                <Shield size={40} className="text-violet-300" />
              </div>
              <h3 className="text-slate-700 font-semibold text-lg mb-1">No roles found</h3>
              <p className="text-slate-400 text-sm">Try changing your search or filter.</p>
            </div>
          )}

          {/* ── 3-COLUMN GRID ── */}
          {!loading && filteredRoles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredRoles.map((role) => (
                <RoleCard
                  key={role._id}
                  role={role}
                  onEdit={() => handleEdit(role)}
                  onDelete={() => handleDeleteRole(role)}
                />
              ))}
            </div>
          )}

          {/* ── FOOTER INFO CARD ── */}
          {!loading && rolesCount > 0 && (
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl shadow-md shrink-0">
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {rolesCount} role{rolesCount !== 1 ? "s" : ""} identified across your platform
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Roles define granular access levels for your team. The{" "}
                  <span className="font-medium text-amber-600">Super-Admin</span> role is protected and cannot be modified or deleted.
                </p>
              </div>
              <div className="sm:ml-auto flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 rounded-lg">
                  {activeCount} active
                </span>
                <span className="px-3 py-1.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
                  {superAdminCount} protected
                </span>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}
