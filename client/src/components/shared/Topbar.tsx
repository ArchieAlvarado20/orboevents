import { handleLogout } from "@/lib/auth";
import { Bell, LogOut, PanelLeft, ChevronDown, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import OrboeventsLogo from "./LogoIcon";
import { useState } from "react";
import { Shield } from "lucide-react";

export default function Topbar({ user, setIsOpen }: any) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasNotification] = useState(true);

  const handleLogoutClick = async () => {
    setShowDropdown(false);
    await handleLogout();
    navigate("/admin");
  };

  // Derive initials from user name
  const getInitials = (name?: string) => {
    if (!name) return "A";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name);
  const displayName = user?.name ?? "Administrator";
  const displayRole = user?.role?.name ?? "Super Admin";

  return (
    <header
      className="
        sticky top-0 z-40
        flex items-center justify-between
        w-full px-4 md:px-6 h-16
        bg-slate-900/95 backdrop-blur-xl
        border-b border-white/[0.06]
        shadow-[0_4px_24px_rgba(0,0,0,0.3)]
      "
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none" />

      {/* ── LEFT SIDE: Logo + Admin badge ── */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="
            inline-flex md:hidden items-center justify-center
            w-9 h-9 rounded-xl
            text-slate-400 hover:text-white
            hover:bg-white/10
            transition-all duration-200
          "
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        {/* Logo — white-tinted version */}
        <div className="flex items-center gap-2">
          {/* Shield badge */}
          <div className="relative hidden sm:flex">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 blur-md opacity-40 -z-10" />
          </div>

          {/* Brand wordmark */}
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tight text-white">
              orbo
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                admin
              </span>
            </span>
            <span className="hidden sm:block text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600">
              Event Control Panel
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-white/10 mx-1" />

        {/* Environment badge */}
        <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Admin Panel
        </span>
      </div>

      {/* ── RIGHT SIDE ── */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button
          className="
            relative flex items-center justify-center
            w-9 h-9 rounded-xl
            text-slate-400 hover:text-white
            hover:bg-white/10
            transition-all duration-200
          "
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {hasNotification && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 border-2 border-slate-900 shadow-sm shadow-indigo-500/50" />
          )}
        </button>

        {/* Vertical divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((p) => !p)}
            className="
              flex items-center gap-2.5 px-2 py-1.5
              rounded-xl
              hover:bg-white/[0.07]
              border border-transparent hover:border-white/10
              transition-all duration-200
              group
            "
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/30 text-xs font-bold text-white">
                {initials}
              </div>
              {/* Online status */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>

            {/* Name + Role */}
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-sm font-semibold text-white max-w-[120px] truncate">
                {displayName}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">
                {displayRole}
              </span>
            </div>

            <ChevronDown
              className={`hidden sm:block w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              {/* Backdrop click to close */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              />
              <div
                className="
                  absolute right-0 top-full mt-2 z-50
                  w-52
                  bg-slate-900 border border-white/10
                  rounded-2xl shadow-2xl shadow-black/50
                  overflow-hidden
                  animate-in fade-in slide-in-from-top-2 duration-150
                "
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-white/[0.07] bg-white/[0.03]">
                  <p className="text-sm font-semibold text-white truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {displayRole}
                  </p>
                </div>

                {/* Menu items */}
                <div className="p-1.5">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/admin/settings");
                    }}
                    className="
                      w-full flex items-center gap-3 px-3 py-2.5
                      rounded-xl text-slate-400 hover:text-white
                      hover:bg-white/[0.07]
                      text-sm font-medium transition-all duration-150 text-left
                    "
                  >
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    Settings
                  </button>

                  {/* Divider */}
                  <div className="my-1 h-px bg-white/[0.07] mx-1" />

                  {/* Logout */}
                  <button
                    onClick={handleLogoutClick}
                    className="
                      w-full flex items-center gap-3 px-3 py-2.5
                      rounded-xl text-red-400 hover:text-red-300
                      hover:bg-red-500/10 border border-transparent hover:border-red-500/20
                      text-sm font-medium transition-all duration-150 text-left
                    "
                  >
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
