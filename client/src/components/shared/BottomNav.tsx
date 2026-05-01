import { LayoutDashboard, Ticket, QrCode, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-white/20  backdrop-blur-xl shadow-lg border-t h-16 flex items-center justify-around z-50">
      {/* Dashboard */}
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${
            isActive ? "text-indigo-600 " : "text-slate-600 "
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px] font-medium">Dashboard</span>
      </NavLink>

      {/* Events */}
      <NavLink
        to="/admin/events"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${
            isActive ? "text-indigo-600" : "text-slate-600"
          }`
        }
      >
        <Ticket className="w-5 h-5" />
        <span className="text-[10px] font-medium">Events</span>
      </NavLink>

      {/* Tickets */}
      <NavLink
        to="/admin/tickets"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${
            isActive ? "text-indigo-600" : "text-slate-600"
          }`
        }
      >
        <Ticket className="w-5 h-5" />
        <span className="text-[10px] font-medium">Tickets</span>
      </NavLink>

      {/* Scan */}
      <NavLink
        to="/admin/scanner"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${
            isActive ? "text-indigo-600" : "text-slate-600"
          }`
        }
      >
        <QrCode className="w-5 h-5" />
        <span className="text-[10px] font-medium">Scanner</span>
      </NavLink>

      {/* Stats */}
      <NavLink
        to="/admin/analytics"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 ${
            isActive ? "text-indigo-600" : "text-slate-600"
          }`
        }
      >
        <BarChart3 className="w-5 h-5" />
        <span className="text-[10px] font-medium">Analytics</span>
      </NavLink>
    </nav>
  );
}
