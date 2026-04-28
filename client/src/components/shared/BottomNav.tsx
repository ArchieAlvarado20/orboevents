import { LayoutDashboard, Ticket, QrCode, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {
  active?: "dashboard" | "events" | "tickets" | "scan" | "analytics";
};

export default function MobileBottomNav({ active = "dashboard" }: Props) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-white/20  backdrop-blur-xl shadow-lg border-t h-16 flex items-center justify-around z-50">
      {/* Dashboard */}
      <NavLink
        to="/admin/dashboard"
        className={`flex flex-col items-center gap-1 ${
          active === "dashboard" ? "text-indigo-600" : "text-muted-foreground"
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px] font-medium">Dashboard</span>
      </NavLink>

      {/* Events */}
      <NavLink
        to="/admin/events"
        className={`flex flex-col items-center gap-1 ${
          active === "events" ? "text-indigo-600" : "text-muted-foreground"
        }`}
      >
        <Ticket className="w-5 h-5" />
        <span className="text-[10px] font-medium">Events</span>
      </NavLink>

      {/* Scan */}
      <NavLink
        to="/admin/scanner"
        className={`flex flex-col items-center gap-1 ${
          active === "scan" ? "text-indigo-600" : "text-muted-foreground"
        }`}
      >
        <QrCode className="w-5 h-5" />
        <span className="text-[10px] font-medium">Scanner</span>
      </NavLink>

      {/* Stats */}
      <NavLink
        to="/admin/analytics"
        className={`flex flex-col items-center gap-1 ${
          active === "analytics" ? "text-indigo-600" : "text-muted-foreground"
        }`}
      >
        <BarChart3 className="w-5 h-5" />
        <span className="text-[10px] font-medium">Analytics</span>
      </NavLink>

      {/* Stats */}
      {/* <NavLink
        to="/admin/settings"
        className={`flex flex-col items-center gap-1 ${
          active === "stats" ? "text-indigo-600" : "text-muted-foreground"
        }`}
      >
        <Settings className="w-5 h-5" />
        <span className="text-[10px] font-medium">Settings</span>
      </NavLink> */}
    </nav>
  );
}
