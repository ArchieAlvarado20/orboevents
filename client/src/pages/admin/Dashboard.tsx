import { StatsCard } from "@/components/shared/StatCard";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  CalendarCheck,
  CalendarPlus,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  MoreVertical,
  QrCode,
  ScanLine,
  Ticket,
  TrendingUp,
  UserPlus,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Hardcoded data
───────────────────────────────────────────── */
const scanActivity = [
  { id: "#TIC-99420", timestamp: "Jun 6, 14:22:10", status: "Valid" },
  { id: "#TIC-88124", timestamp: "Jun 6, 14:21:45", status: "Used" },
  { id: "#TIC-77301", timestamp: "Jun 6, 14:19:02", status: "Invalid" },
  { id: "#TIC-99419", timestamp: "Jun 6, 14:18:30", status: "Valid" },
  { id: "#TIC-99418", timestamp: "Jun 6, 14:15:12", status: "Valid" },
  { id: "#TIC-65500", timestamp: "Jun 6, 14:10:08", status: "Invalid" },
];

const activeScanners = [
  { name: "Main Gate A", status: "online" },
  { name: "North Entrance", status: "online" },
  { name: "VIP Access", status: "idle" },
  { name: "South Gate B", status: "online" },
];

const quickLinks = [
  { label: "Event Reports", icon: BarChart3, to: "/admin/analytics" },
  { label: "Ticket Logs", icon: Ticket, to: "/admin/tickets" },
  { label: "User Directory", icon: Users, to: "/admin/users" },
  { label: "Live Monitor", icon: Wifi, to: "/admin/scanner" },
];

/* ─────────────────────────────────────────────
   Status badge helper
───────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Valid: "bg-emerald-500/15 text-emerald-500 ring-1 ring-emerald-500/30",
    Used: "bg-amber-500/15 text-amber-500 ring-1 ring-amber-500/30",
    Invalid: "bg-red-500/15 text-red-400 ring-1 ring-red-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Quick Action button
───────────────────────────────────────────── */
type QuickActionProps = {
  label: string;
  icon: React.ElementType;
  gradient: string;
  shadowColor: string;
  onClick?: () => void;
};
function QuickAction({
  label,
  icon: Icon,
  gradient,
  shadowColor,
  onClick,
}: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl
        ${gradient}
        shadow-lg ${shadowColor}
        hover:scale-105 hover:brightness-110
        transition-all duration-200 ease-out
        text-white cursor-pointer
      `}
    >
      <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold tracking-wide">{label}</span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main Dashboard
───────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen p-6 bg-slate-50 dark:bg-slate-950">
      {/* ── Subtle background texture ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-400/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-indigo-400/5 blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* ════════════════════════════════════════
            PAGE HEADER
        ════════════════════════════════════════ */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              System Overview
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Real-time ticketing performance &amp; monitoring —{" "}
              <span className="font-medium text-slate-600 dark:text-slate-300">
                last updated just now
              </span>
            </p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Live
            </span>
          </div>
        </div>

        {/* ════════════════════════════════════════
            STATS CARDS
        ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard
            title="Total Events"
            value="148"
            icon={<CalendarCheck className="w-5 h-5" />}
            trendValue="+8%"
            trendLabel="vs last month"
            trendType="up"
          />
          <StatsCard
            title="Total Users"
            value="9,340"
            icon={<Users className="w-5 h-5" />}
            trendValue="+14%"
            trendLabel="vs last month"
            trendType="up"
          />
          <StatsCard
            title="Total Tickets"
            value="12,482"
            icon={<Ticket className="w-5 h-5" />}
            trendValue="+12%"
            trendLabel="vs last month"
            trendType="up"
          />
          <StatsCard
            title="Active Events"
            value="23"
            icon={<Zap className="w-5 h-5" />}
            trendValue="-2"
            trendLabel="since yesterday"
            trendType="down"
          />
        </div>

        {/* ════════════════════════════════════════
            QUICK ACTIONS
        ════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-violet-500" />
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <QuickAction
              label="Create Event"
              icon={CalendarPlus}
              gradient="bg-gradient-to-br from-violet-600 to-indigo-700"
              shadowColor="shadow-indigo-500/30"
              onClick={() => navigate("/admin/events", { state: { openAdd: true } })}
            />
            <QuickAction
              label="Add User"
              icon={UserPlus}
              gradient="bg-gradient-to-br from-fuchsia-600 to-purple-700"
              shadowColor="shadow-purple-500/30"
              onClick={() => navigate("/admin/users", { state: { openAdd: true } })}
            />
            <QuickAction
              label="Scan Ticket"
              icon={ScanLine}
              gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
              shadowColor="shadow-blue-500/30"
              onClick={() => navigate("/admin/scanner")}
            />
            <QuickAction
              label="View Reports"
              icon={BarChart3}
              gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
              shadowColor="shadow-teal-500/30"
              onClick={() => navigate("/admin/analytics")}
            />
          </div>
        </div>

        {/* ════════════════════════════════════════
            BOTTOM GRID  — Table (2/3) + Sidebar (1/3)
        ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* ── Recent Scan Activity ── */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-white/60 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(109,40,217,0.06)]">
            {/* Table header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-violet-500/20">
                  <ScanLine className="w-4 h-4 text-violet-300" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Recent Scan Activity
                </h3>
              </div>
              <button
                onClick={() => navigate("/admin/scanner")}
                className="flex items-center gap-1 text-xs font-semibold text-violet-300 hover:text-violet-100 transition-colors"
              >
                View all <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-4 px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40">
              {["Ticket ID", "Timestamp", "Status", ""].map((col) => (
                <span
                  key={col}
                  className="text-[11px] font-bold uppercase tracking-widest text-slate-400"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {scanActivity.map((row, i) => (
                <div
                  key={row.id}
                  className={`grid grid-cols-4 items-center px-6 py-3.5 transition-colors hover:bg-violet-50/50 dark:hover:bg-violet-900/10 ${
                    i % 2 === 0
                      ? "bg-white/50 dark:bg-slate-900/30"
                      : "bg-slate-50/50 dark:bg-slate-800/20"
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-mono">
                    {row.id}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {row.timestamp}
                  </span>
                  <StatusBadge status={row.status} />
                  <div className="flex justify-end">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Table footer */}
            <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
              <span className="text-xs text-slate-400">
                Showing {scanActivity.length} of 1,284 entries
              </span>
              <button className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
                Load more →
              </button>
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-4">

            {/* Active Scanners card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 p-6 text-white shadow-xl shadow-indigo-500/25">
              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-6 -left-4 w-24 h-24 rounded-full bg-purple-400/20 blur-xl" />
              {/* Big watermark icon */}
              <QrCode className="absolute top-4 right-4 w-16 h-16 text-white/10" />

              <div className="relative z-10">
                <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-1">
                  Active Scanners
                </p>
                <div className="flex items-end gap-2 mb-5">
                  <h4 className="text-4xl font-black">{activeScanners.filter(s => s.status === "online").length}</h4>
                  <span className="text-indigo-200 text-sm mb-1">
                    / {activeScanners.length} devices online
                  </span>
                </div>

                <div className="space-y-2">
                  {activeScanners.map((scanner) => (
                    <div
                      key={scanner.name}
                      className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Wifi className="w-3.5 h-3.5 text-indigo-200" />
                        <span className="text-sm font-medium">{scanner.name}</span>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          scanner.status === "online"
                            ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                            : "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links card */}
            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-white/60 dark:border-slate-700/60 rounded-2xl p-5 shadow-[0_4px_20px_rgba(109,40,217,0.06)]">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-violet-500" />
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                  Quick Links
                </h3>
              </div>
              <div className="space-y-2">
                {quickLinks.map(({ label, icon: Icon, to }) => (
                  <button
                    key={label}
                    onClick={() => navigate(to)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors" />
                    </div>
                    {label}
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-300 group-hover:text-violet-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

          </div>{/* end sidebar */}
        </div>{/* end bottom grid */}

      </div>{/* end max-w container */}
    </main>
  );
}
