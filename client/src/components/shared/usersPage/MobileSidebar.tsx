import { handleLogout } from "@/lib/auth";
import { useScrollToSection } from "@/utils/scrollToSection";
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
  Users,
  UsersRound,
  Users2Icon,
  Ticket,
  LogIn,
  HelpCircle,
  HomeIcon,
  Building2,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: string;
};

export default function UserMobileSidebar({
  isOpen,
  setIsOpen,
  user,
}: SidebarProps) {
  const { scrollToSection } = useScrollToSection();

  const navLinks = [
    { name: "Home", id: "home", icon: Building2 },
    { name: "Events", path: "/events", id: "events", icon: Calendar },
    { name: "How It Works", id: "how-it-works", icon: HelpCircle },
    { name: "Contact", id: "contact", icon: Phone },
  ];

  const navigate = useNavigate();
  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR (RIGHT TO LEFT) */}
      <div
        className={`
          fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-1/4 bg-white z-50 shadow-xl 
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between w-full  border-b border-slate-200">
          <div className="flex-row items-center justify-between p-4 font-sans ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg font-black hover:bg-gray-100  text-violet-600 ${
                  isActive ? "text-violet-600 font-black" : "text-gray-600"
                }`
              }
            >
              <UserCircle size={24} />
              {user?.name || "Guest"}
            </NavLink>

            {user ? (
              <>
                {" "}
                {/* NOTIFICATIONS */}
                <NavLink
                  to="/notifications"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 font-bold ${
                      isActive ? "text-violet-600 font-black" : "text-gray-600"
                    }`
                  }
                >
                  <div className="relative">
                    {" "}
                    <Bell size={24} />{" "}
                    <span className="hidden absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      0
                    </span>
                  </div>
                  Notifications
                </NavLink>
                <NavLink
                  to="/reservation"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 font-bold ${
                      isActive ? "text-violet-600 font-black" : "text-gray-600"
                    }`
                  }
                >
                  <div className="relative">
                    {" "}
                    <CalendarCheck size={24} />{" "}
                    <span className="hidden absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      0
                    </span>
                  </div>
                  Reservation
                </NavLink>
                <NavLink
                  to="/transaction"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 font-bold ${
                      isActive ? "text-violet-600 font-black" : "text-gray-600"
                    }`
                  }
                >
                  <div className="relative">
                    {" "}
                    <Ticket size={24} />{" "}
                    <span className="hidden absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      0
                    </span>
                  </div>
                  My Tickets
                </NavLink>
                <button
                  onClick={() => handleLogout(navigate, "/login")}
                  className="flex items-center gap-2 p-2 mt-auto text-red-600 font-bold hover:bg-red-50"
                >
                  <LogOut size={24} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleLogout(navigate, "/login")}
                className="flex font-bold items-center gap-2 p-2 mt-auto text-gray-600 hover:bg-red-50 rounded"
              >
                <LogIn size={24} />
                Sign in
              </button>
            )}
          </div>
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="lg:hidden p-4 space-y-0 bg-white rounded-lg h-screen">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <button
                key={link.name + (link.id || link.path)}
                onClick={() => {
                  setIsOpen(false);
                  if (link.path) {
                    navigate(link.path);
                  } else if (link.id) {
                    scrollToSection(link.id);
                  }
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 font-bold text-gray-600 hover:text-violet-600"
              >
                <Icon size={24} />
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* LINKS */}
        <nav className="hidden p-4 space-y-0 bg-white rounded-lg shadow-gray-500 h-screen z-50">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg  hover:bg-gray-100 font-bold ${
                isActive ? "text-violet-600 font-black" : "text-gray-600"
              }`
            }
          >
            <Building2 size={24} />
            Home
          </NavLink>

          <NavLink
            to="/events"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 font-bold ${
                isActive ? "text-violet-600 font-black" : "text-gray-600"
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
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 font-bold ${
                isActive ? "text-violet-600 font-black" : "text-gray-600"
              }`
            }
          >
            <HelpCircle size={24} />
            How it works
          </NavLink>
          <NavLink
            to="/organizer"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100  font-bold ${
                isActive ? "text-violet-600 font-black" : "text-gray-600"
              }`
            }
          >
            <Phone size={24} />
            Contact
          </NavLink>
        </nav>
      </div>
    </>
  );
}
