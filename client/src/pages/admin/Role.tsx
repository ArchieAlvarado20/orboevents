import RoleCard from "@/components/features/role/RoleCards";
import RoleModal from "@/components/features/role/RoleModal";
import Button from "@/components/shared/Button";
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import Unauthorized from "@/components/shared/Unauthorized";
import useRoles from "@/hooks/roleHook/useRoles";
import { confirmToast } from "@/lib/confirmToast";
import { showSuccess } from "@/lib/toast";
import { RoleFormType } from "@/types/role";
import {
  Calendar,
  Edit,
  Edit2,
  List,
  Menu,
  Plus,
  Search,
  Shield,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Role() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { roles, loading, deleteRole, fetchRoles, unauthorized } = useRoles();

  if (loading) {
    return <TransparentSpinner />;
  }
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
  return (
    <>
      {unauthorized ? (
        <>
          <div className="md:ml-64 sm:m-auto">
            <Unauthorized message="Admin access only!" />
          </div>
        </>
      ) : (
        <main
          className={`flex-1 mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}
        >
          <RoleModal
            open={openModal}
            role={selectedRole}
            onClose={() => {
              setOpenModal(false);
              setSelectedRole(null);
            }}
            onSuccess={() => {
              fetchRoles();
              setOpenModal(false);
              setSelectedRole(null);
            }}
          />

          {/* <!-- Table Controls Section --> */}

          <header className="w-full border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-1 py-2">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Roles & Permission Overview
              </h2>
            </div>
            <Button onClick={() => setOpenModal(true)} variant="primary">
              {" "}
              <Plus className="sm:hidden" />
              <span className="hidden sm:inline">Add Roles</span>
            </Button>
          </header>

          <section className="hidden flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md-w-50">
            {/* FILTERS */}
            <div className="inline-flex flex-wrap p-1 bg-white  border border-slate-200  rounded-xl">
              <button className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-100  text-indigo-600 ">
                All <span className="hidden md:inline">Roles</span>
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Manager
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Scanner
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                Staff
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
                  placeholder="Search roles..."
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

          {roles.length === 0 ? (
            <div className="bg-white w-full rounded-3xl p-12 border border-dashed border-slate-200 text-center">
              <Shield className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No roles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {roles.map((role) => (
                <RoleCard
                  key={role._id}
                  role={role}
                  onEdit={() => {
                    handleEdit(role);
                  }}
                  onDelete={() => handleDeleteRole(role)}
                />
              ))}
            </div>
          )}

          {/* <!-- Footer Info Section --> */}
          <div className="mt-8 p-6 text-center border-2 border-dashed border-slate-200 rounded-xl">
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Total {rolesCount} roles identified. Roles define access levels
              across the environment.
            </p>
          </div>
        </main>
      )}
    </>
  );
}
