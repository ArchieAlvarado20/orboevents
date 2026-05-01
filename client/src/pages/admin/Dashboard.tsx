import Sidebar from "@/components/shared/Sidebar";
import { StatsCard } from "@/components/shared/StatCard";
import {
  Blocks,
  CheckCircle,
  Download,
  MoreVertical,
  PlusCircle,
  QrCode,
  Search,
  Ticket,
  Timer,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user.name);

  return (
    <>
      <main
        className={`flex-1 mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}
      >
        <div className="max-w-container-max mx-auto">
          {/* <!-- Page Header --> */}
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              System Overview
            </h1>

            <p className="text-sm text-slate-500">
              Real-time ticketing performance and monitoring.
            </p>
          </div>
          {/* <!-- Stats Cards Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* <!-- Total Tickets Card --> */}
            <StatsCard
              title="Total Tickets"
              value="12,482"
              icon={<Ticket className="w-5 h-5" />}
              trendValue="12%"
              trendLabel="vs last month"
              trendType="up"
            />
            {/* <!-- Active Tickets Card --> */}
            <StatsCard
              title="Active Tickets"
              value="4,819"
              icon={<Timer className="w-5 h-5" />}
              trendValue="5%"
              trendLabel="vs last month"
              trendType="up"
            />
            {/* <!-- Used Tickets Card --> */}
            <StatsCard
              title="Used Tickets"
              value="7,663"
              icon={<CheckCircle className="w-5 h-5" />}
              trendValue="5%"
              trendLabel="vs last month"
              trendType="neutral"
            />
          </div>
          {/* <!-- Main Layout Grid --> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* <!-- Scan Activity Table (Left - 2/3) --> */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-h3 text-h3 text-on-background">
                  Recent Scan Activity
                </h3>
                <button className="text-primary font-label-md hover:underline cursor-pointer">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant">
                        Ticket ID
                      </th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant">
                        Timestamp
                      </th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant">
                        Status
                      </th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-body-base text-on-background font-medium">
                        #TIC-99420
                      </td>
                      <td className="px-6 py-4 font-body-sm text-on-surface-variant">
                        Oct 24, 14:22:10
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Valid
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-body-base text-on-background font-medium">
                        #TIC-88124
                      </td>
                      <td className="px-6 py-4 font-body-sm text-on-surface-variant">
                        Oct 24, 14:21:45
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Used
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-body-base text-on-background font-medium">
                        #TIC-77301
                      </td>
                      <td className="px-6 py-4 font-body-sm text-on-surface-variant">
                        Oct 24, 14:19:02
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Invalid
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-body-base text-on-background font-medium">
                        #TIC-99419
                      </td>
                      <td className="px-6 py-4 font-body-sm text-on-surface-variant">
                        Oct 24, 14:18:30
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Valid
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-body-base text-on-background font-medium">
                        #TIC-99418
                      </td>
                      <td className="px-6 py-4 font-body-sm text-on-surface-variant">
                        Oct 24, 14:15:12
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Valid
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!-- Right Sidebar / Active Scanners (1/3) --> */}
            <div className="space-y-3">
              {/* <!-- Active Scanners Bento --> */}
              <div className="bg-indigo-600 rounded-xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <p className="text-indigo-100 font-label-md mb-1">
                    Active Scanners
                  </p>
                  <div className="flex items-end gap-2 mb-4">
                    <h4 className="text-3xl font-bold">24</h4>
                    <span className="text-indigo-200 font-label-xs mb-1">
                      Devices Online
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                      <span className="font-body-sm">Main Gate A</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                      <span className="font-body-sm">North Entrance</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                      <span className="font-body-sm">VIP Access</span>
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
                  <QrCode />
                </div>
              </div>
              {/* <!-- Quick Actions Bento --> */}
              <div className="bg-surface-container-lowest border border-slate-200 rounded-xl p-6">
                <h3 className="font-label-md text-on-background mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                    <PlusCircle className="h-5 w-5 text-indigo-600 mb-2" />
                    <span className="font-label-xs">New Batch</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                    <Download className="h-4 w-4" />
                    <span className="font-label-xs">Export All</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                    <Search className="h-4 w-4" />
                    <span className="font-label-xs">Lookup</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                    <Blocks />
                    <span className="font-label-xs">Revoke</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
