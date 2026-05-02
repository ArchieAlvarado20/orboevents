import { handleLogout } from "@/lib/auth";
import { X, Menu, LogOut, ShoppingCart } from "lucide-react";
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
          fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b ">
          <NavLink
            to="/"
            className="font-semibold text-lg mt-2 text-indigo-600 "
          >
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
              `block p-2 rounded hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-bold" : "text-slate-600 "
              }`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/category"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-bold" : "text-slate-600 "
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/organizer"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-bold" : "text-slate-600 "
              }`
            }
          >
            Organizer
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-100 ${
                isActive ? "text-indigo-600 font-bold" : "text-slate-600 "
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/reservation"
            onClick={() => setIsOpen(false)}
            className="inline-block md:hidden relative p-2 text-violet-600"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              1
            </span>
          </NavLink>

          <button
            onClick={() => handleLogout(navigate, "/login")}
            className="flex items-center gap-2 p-2 mt-4 text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut />
          </button>
        </nav>
      </div>
    </>
  );
}
