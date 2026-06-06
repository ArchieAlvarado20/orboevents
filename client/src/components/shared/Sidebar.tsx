import { handleLogout } from "@/lib/auth";
import {
  BarChart3,
  LayoutDashboard,
  QrCode,
  Ticket,
  PanelLeft,
  CalendarDays,
  Shield,
  ShieldCheck,
  UsersRound,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Settings,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navSections = [
  {
    label: "Overview",
    items: [
      {
        to: "/admin/dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
      },
      {
        to: "/admin/analytics",
        icon: BarChart3,
        label: "Analytics",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        to: "/admin/events",
        icon: CalendarDays,
        label: "Events",
      },
      {
        to: "/admin/tickets",
        icon: Ticket,
        label: "Tickets",
      },
      {
        to: "/admin/scanner",
        icon: QrCode,
        label: "Scanners",
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        to: "/admin/users",
        icon: UsersRound,
        label: "Users",
      },
      {
        to: "/admin/roles",
        icon: ShieldCheck,
        label: "Roles & Permissions",
      },
    ],
  },
];

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const navigate = useNavigate();

  // Read real user from localStorage
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); } catch { return {}; }
  })();
  const displayName = storedUser?.name || "Administrator";
  const displayRole = storedUser?.role?.name || "Super Admin";
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "A";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  const initials = getInitials(displayName);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/admin");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen flex flex-col
          bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
          border-r border-white/5
          transition-all duration-300 ease-in-out
          shadow-[4px_0_24px_rgba(0,0,0,0.4)]
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-[72px]" : "md:w-64"}
          w-64
        `}
      >
        {/* Subtle gradient glow top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        {/* ── BRAND AREA ── */}
        <div
          className={`
            relative flex items-center gap-3 px-4 h-16
            border-b border-white/5
            ${isCollapsed ? "justify-center" : "justify-between"}
          `}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Shield icon with gradient background */}
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 blur-md opacity-40 -z-10" />
            </div>

            {/* Brand text */}
            {!isCollapsed && (
              <div className="flex flex-col leading-none min-w-0 overflow-hidden">
                <span className="text-base font-black tracking-tight text-white whitespace-nowrap">
                  Orbo
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    Admin
                  </span>
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 mt-0.5">
                  Control Panel
                </span>
              </div>
            )}
          </div>

          {/* Collapse toggle — desktop only */}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expand button when collapsed — desktop */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="hidden md:flex mx-auto mt-2 items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* ── NAVIGATION ── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 scrollbar-none">
          {navSections.map((section, sIdx) => (
            <div key={section.label} className={sIdx !== 0 ? "mt-1" : ""}>
              {/* Section separator label */}
              {!isCollapsed ? (
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 select-none">
                  {section.label}
                </p>
              ) : (
                <div className="mx-2 my-2 h-px bg-white/5" />
              )}

              {/* Nav items */}
              <div className="flex flex-col gap-0.5">
                {section.items.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `relative group flex items-center gap-3 rounded-xl transition-all duration-200
                      ${isCollapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}
                      ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600/90 to-violet-600/90 text-white shadow-md shadow-indigo-500/25"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active left-bar glow */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-indigo-300 shadow-[0_0_8px_2px_rgba(129,140,248,0.7)]" />
                        )}

                        {/* Icon */}
                        <span
                          className={`flex-shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                        >
                          <Icon
                            className={`w-[18px] h-[18px] ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}
                          />
                        </span>

                        {/* Label */}
                        {!isCollapsed && (
                          <span className="text-sm font-medium leading-none whitespace-nowrap">
                            {label}
                          </span>
                        )}

                        {/* Tooltip when collapsed */}
                        {isCollapsed && (
                          <span className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-[100]">
                            {label}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* ── BOTTOM SECTION ── */}
        <div className="border-t border-white/5 p-3 space-y-1">
          {/* User info row */}
          <div
            className={`flex items-center gap-3 px-2 py-2 rounded-xl bg-white/[0.03] border border-white/5 ${isCollapsed ? "justify-center" : ""}`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <span className="text-xs font-bold text-white">{initials}</span>
              </div>
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">
                  {displayName}
                </span>
                <span className="text-[10px] text-slate-500 truncate">
                  {displayRole}
                </span>
              </div>
            )}
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogoutClick}
            className={`
              group w-full flex items-center gap-3 rounded-xl px-3 py-2.5
              text-red-400 hover:text-red-300
              hover:bg-red-500/10 border border-transparent hover:border-red-500/20
              transition-all duration-200
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOut className="w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {!isCollapsed && (
              <span className="text-sm font-medium">Sign Out</span>
            )}
            {isCollapsed && (
              <span className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-[100]">
                Sign Out
              </span>
            )}
          </button>
        </div>

        {/* Bottom gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </aside>

      {/* Desktop spacer — pushes main content */}
      <div
        className={`hidden md:block flex-shrink-0 transition-all duration-300 ${isCollapsed ? "w-[72px]" : "w-64"}`}
      />
    </>
  );
}
