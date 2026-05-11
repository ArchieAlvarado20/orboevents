import { handleLogout } from "@/lib/auth";
import {
  BarChart3,
  LayoutDashboard,
  QrCode,
  Ticket,
  PanelLeft,
  CalendarDays,
  Shield,
  ShieldAlert,
  UsersRound,
  Bell,
  User,
  LogOutIcon,
  UserCircle2,
  UserCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const iconSize = isCollapsed ? "w-5 h-5" : "w-5 h-5";
  const Navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed md:fixed left-0 top-0   md:top-16 z-50
    h-screen w-64 bg-white border-r border-slate-200 p-4
    overflow-y-auto
    transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-16" : "md:w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <p
            className={`text-md uppercase font-semibold text-slate-900 ${isCollapsed ? "hidden" : "inline"}`}
          >
            Administrator
          </p>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden md:hidden items-center text-sm font-medium rounded-lg transition-all text-slate-600 hover:bg-slate-100 ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`}
          >
            <PanelLeft
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex flex-col gap-1`}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`
            }
          >
            <LayoutDashboard
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />

            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-1 py-1" : "gap-3 px-3 py-2"}`
            }
          >
            <CalendarDays
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Events
            </span>
          </NavLink>

          <NavLink
            to="/admin/tickets"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-1 py-1" : "gap-3 px-3 py-2"}`
            }
          >
            <Ticket
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Tickets
            </span>
          </NavLink>

          <NavLink
            to="/admin/roles"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-1 py-1" : "gap-3 px-3 py-2"}`
            }
          >
            <ShieldAlert
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Roles & Permissions
            </span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-1 py-1" : "gap-3 px-3 py-2"}`
            }
          >
            <UsersRound
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Users
            </span>
          </NavLink>

          <NavLink
            to="/admin/scanner"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`
            }
          >
            <QrCode
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />

            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Scanners
            </span>
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`
            }
          >
            <BarChart3
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              {" "}
              Analytics
            </span>
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`
            }
          >
            <UserCircle
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />

            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              Profile
            </span>
          </NavLink>

          <NavLink
            to="/admin/notification"
            className={({ isActive }) =>
              `flex items-center text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"}`
            }
          >
            <Bell
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              {" "}
              Notifications
            </span>
          </NavLink>

          <button
            onClick={() => handleLogout(Navigate, "/admin")}
            className="flex items-center text-sm font-medium rounded-lg transition-all text-red-600 bg-white-50 ustify-center  py-2 gap-3 px-3"
          >
            <LogOutIcon
              className={`${iconSize} shrink-0 transition-all duration-200`}
            />
            <span className={`${isCollapsed ? "hidden" : "inline"}`}>
              {" "}
              Logout
            </span>
          </button>
        </nav>
      </aside>
    </>
  );
}
