import UserCard from "@/components/features/user/UserCard";
import UserEditModal from "@/components/features/user/UserEditModal";
import UserModal from "@/components/features/user/UserModal";
import Button from "@/components/shared/Button";
import Unauthorized from "@/components/shared/Unauthorized";
import { useAdminUsers } from "@/hooks/adminUsersHook/useAdminUsers";
import { confirmToast } from "@/lib/confirmToast";
import { UserType } from "@/types/adminUsers.type";

import { List, Menu, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function Users() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { users, loading, error, refetch, unauthorized, deleteUser } =
    useAdminUsers();

  const handleEdit = (user: UserType) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (user: UserType) => {
    confirmToast("Delete this User?", async () => {
      await deleteUser(user._id);
    });
  };

  return (
    <>
      {unauthorized ? (
        <div className="md:ml-64 sm:m-auto">
          {" "}
          <Unauthorized message="Admin access only!" />
        </div>
      ) : (
        <main
          className={`flex-1 mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}
        >
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

          <header className="w-full border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-1 py-2 z-0">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Users Overview
              </h2>
            </div>
            <Button variant="primary" onClick={() => setOpenModal(true)}>
              {" "}
              <Plus className="sm:hidden" />
              <span className="hidden sm:inline">Add User</span>
            </Button>
          </header>

          <section className="hidden flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md-w-50">
            {/* FILTERS */}
            <div className="inline-flex flex-wrap p-1 bg-white  border border-slate-200  rounded-xl">
              <button className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-100  text-indigo-600 ">
                All <span className="hidden md:inline">Events</span>
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Active
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Pending
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Completed
              </button>
            </div>

            {/* SEARCH + ACTION */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-200  rounded-lg 
        bg-white  text-sm text-slate-900 
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
        transition-all"
                  placeholder="Search users..."
                  type="text"
                />
              </div>

              <button
                className="p-2 border border-slate-200  rounded-lg 
      bg-white  text-slate-600 hover:bg-slate-50 
       transition-colors"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* USERS GRID (Cards instead of table 👇) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onEdit={() => {
                  handleEdit(user);
                }}
                onDelete={() => handleDeleteUser(user)}
              />
            ))}
          </div>
        </main>
      )}
    </>
  );
}
