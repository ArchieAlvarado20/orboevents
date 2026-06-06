import UserCard from "@/components/features/user/UserCard";
import UserEditModal from "@/components/features/user/UserEditModal";
import UserModal from "@/components/features/user/UserModal";
import Button from "@/components/shared/Button";
import Unauthorized from "@/components/shared/Unauthorized";
import { useAdminUsers } from "@/hooks/adminUsersHook/useAdminUsers";
import { confirmToast } from "@/lib/confirmToast";
import { UserType } from "@/types/adminUsers.type";
import {
  Plus,
  Search,
  Users as UsersIcon,
  ShieldCheck,
  UserX,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type StatusFilter = "all" | "active" | "inactive" | "suspended" | "hold";

const STATUS_TABS: {
  label: string;
  value: StatusFilter;
  color: string;
  active: string;
}[] = [
  {
    label: "All Users",
    value: "all",
    color: "text-slate-600",
    active: "bg-indigo-600 text-white shadow-md",
  },
  {
    label: "Active",
    value: "active",
    color: "text-emerald-600",
    active: "bg-emerald-500 text-white shadow-md",
  },
  {
    label: "Inactive",
    value: "inactive",
    color: "text-slate-500",
    active: "bg-slate-500 text-white shadow-md",
  },
  {
    label: "Suspended",
    value: "suspended",
    color: "text-red-500",
    active: "bg-red-500 text-white shadow-md",
  },
  {
    label: "Hold",
    value: "hold",
    color: "text-amber-600",
    active: "bg-amber-500 text-white shadow-md",
  },
];

export default function Users() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { users, loading, error, refetch, unauthorized, deleteUser } =
    useAdminUsers();

  useEffect(() => {
    if (location.state?.openAdd) {
      setOpenModal(true);
      // Clear history state to avoid reopening modal on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleEdit = (user: UserType) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (user: UserType) => {
    confirmToast("Delete this User?", async () => {
      await deleteUser(user._id);
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeCount = users.filter((u) => u.status === "active").length;
  const suspendedCount = users.filter((u) => u.status === "suspended").length;
  const holdCount = users.filter((u) => u.status === "hold").length;

  return (
    <>
      {unauthorized ? (
        <div className="sm:m-auto">
          <Unauthorized message="Admin access only!" />
        </div>
      ) : (
        <main className="min-h-screen p-6 bg-slate-50">
          {/* Modals */}
          <UserModal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              setSelectedUser(null);
            }}
            onSuccess={() => {
              setOpenModal(false);
              setSelectedUser(null);
              refetch();
            }}
          />
          <UserEditModal
            open={openEditModal}
            user={selectedUser}
            onClose={() => {
              setOpenEditModal(false);
              setSelectedUser(null);
            }}
            onSuccess={() => {
              refetch();
              setOpenEditModal(false);
              setSelectedUser(null);
            }}
          />

          {/* ── GRADIENT HEADER ── */}
          <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-xl">
            {/* decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 blur-2xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <UsersIcon size={22} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    User Management
                  </h1>
                </div>
                <p className="text-indigo-200 text-sm ml-1">
                  {users.length} total users &mdash; manage access, roles &
                  status
                </p>
              </div>

              <Button variant="primary" onClick={() => setOpenModal(true)}>
                <Plus size={16} />
                <span>Add User</span>
              </Button>
            </div>

            {/* Stat chips */}
            <div className="relative flex flex-wrap gap-3 mt-5">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-medium">
                <ShieldCheck size={15} className="text-emerald-300" />
                <span>{activeCount} Active</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-medium">
                <UserX size={15} className="text-rose-300" />
                <span>{suspendedCount} Suspended</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-medium">
                <Clock size={15} className="text-amber-300" />
                <span>{holdCount} On Hold</span>
              </div>
            </div>
          </div>

          {/* ── FILTER + SEARCH BAR ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            {/* Status filter tabs */}
            <div className="inline-flex flex-wrap gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    statusFilter === tab.value
                      ? tab.active
                      : `${tab.color} hover:bg-slate-50`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* ── LOADING ── */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          )}

          {/* ── EMPTY STATE ── */}
          {!loading && filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="p-5 bg-indigo-50 rounded-3xl mb-4">
                <UsersIcon size={40} className="text-indigo-300" />
              </div>
              <h3 className="text-slate-700 font-semibold text-lg mb-1">
                No users found
              </h3>
              <p className="text-slate-400 text-sm">
                Try adjusting your search or filter.
              </p>
            </div>
          )}

          {/* ── 3-COLUMN GRID ── */}
          {!loading && filteredUsers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onEdit={() => handleEdit(user)}
                  onDelete={() => handleDeleteUser(user)}
                />
              ))}
            </div>
          )}
        </main>
      )}
    </>
  );
}
