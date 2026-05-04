import { handleLogout } from "@/lib/auth";
import {
  X,
  Menu,
  LogOut,
  ShoppingCart,
  Bell,
  Info,
  Home,
  Calendar,
  Grid3X3,
  UserCircle,
  Receipt,
  FileText,
  CalendarCheck,
} from "lucide-react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserMobileSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  return (
    <>
      {/* MENU BUTTON */}
      <button onClick={() => setIsOpen(true)} className="p-2 md:hidden">
        <Menu size={28} />
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-100" onClick={() => setIsOpen(false)} />
      )}

      {/* SIDEBAR (RIGHT TO LEFT) */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full bg-white z-50 shadow-xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-between p-4 border-b "
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <Home size={24} />
            Home
          </NavLink>

          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* LINKS */}
        <nav className="p-4 space-y-3 bg-white rounded-lg shadow-gray-500 h-screen z-50">
          <NavLink
            to="/events"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <Calendar size={24} />
            Events
          </NavLink>
          <NavLink
            to="/category"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <Grid3X3 size={24} />
            Categories
          </NavLink>
          <NavLink
            to="/organizer"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <UserCircle size={24} />
            Organizer
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <Info size={24} />
            About
          </NavLink>

          {/* NOTIFICATIONS */}
          <NavLink
            to="/notifications"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <div className="relative">
              {" "}
              <Bell size={24} />{" "}
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
            Notifications
          </NavLink>

          <NavLink
            to="/reservation"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <div className="relative">
              {" "}
              <CalendarCheck size={24} />{" "}
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
            Reservation
          </NavLink>

          <NavLink
            to="/transactions"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            <div className="relative">
              {" "}
              <FileText size={24} />{" "}
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
            Transactions
          </NavLink>
          <button
            onClick={() => handleLogout(navigate, "/login")}
            className="flex items-center gap-2 p-2 mt-4 text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut size={24} />
            Logout
          </button>
        </nav>
      </div>
    </>
  );
}
