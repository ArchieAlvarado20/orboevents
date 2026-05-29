import { dashboardApi } from "@/api/adminDashboard.api";
import {
  CalendarCheck,
  CalendarDays,
  DollarSign,
  Ticket,
  Users2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Users from "./Users";
import Unauthorized from "@/components/shared/Unauthorized";
import { showError } from "@/lib/toast";
import { useNavigate } from "react-router-dom";

const StatCard = ({
  label,
  value,
  icon: Icon,
  accent,
  iconBg,
  iconColor,
}: {
  label: string;
  value: any;
  icon: React.ElementType;
  accent: string;
  iconBg: string;
  iconColor: string;
}) => (
  <div
    className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default`}
  >
    <div className="flex flex-col gap-3">
      <div
        className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl ${iconBg}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
          {label}
        </p>
        <p className="text-3xl font-bold text-gray-800 mt-1 leading-tight">
          {value ?? "—"}
        </p>
      </div>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm h-36 animate-pulse">
    <div className="flex flex-col gap-3">
      <div className="w-10 h-10 rounded-xl bg-gray-200" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [reservationDashboard, setReservationDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Unauthorized");
          return;
        }
        setLoading(true);
        const res = await dashboardApi.getOverview({
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboard(res.data);
      } catch (err: any) {
        if (err.response && err.response.status === 403) {
          setUnauthorized(true);
          navigate("/admin");
          showError("Unauthorized access. Please log in as admin.");
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchReservationDashboard = async () => {
      try {
        setLoading(true);
        const res = await dashboardApi.getReservationDashboard();
        setReservationDashboard(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    fetchReservationDashboard();
  }, []);

  const stats = [
    {
      label: "Pending Events",
      value: dashboard?.overview?.pendingEvents,
      icon: CalendarDays,
      accent: "border-indigo-500",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      label: "Active Events",
      value: dashboard?.overview?.publishedEvents,
      icon: CalendarDays,
      accent: "border-emerald-500",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      label: "Completed Events",
      value: dashboard?.overview?.completedEvents,
      icon: CalendarDays,
      accent: "border-amber-500",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      label: "Cancelled Events",
      value: dashboard?.overview?.cancelledEvents,
      icon: CalendarDays,
      accent: "border-rose-500",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
  ];

  const reservationStats = [
    {
      label: "Total Reservations",
      value: reservationDashboard?.overview?.totalReservations,
      icon: CalendarCheck,
      accent: "border-indigo-500",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      label: "Pending Reservations",
      value: reservationDashboard?.overview?.pendingReservations,
      icon: CalendarCheck,
      accent: "border-emerald-500",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      label: "Completed Reservations",
      value: reservationDashboard?.overview?.confirmedReservations,
      icon: CalendarCheck,
      accent: "border-amber-500",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      label: "Cancelled Reservations",
      value: reservationDashboard?.overview?.cancelledReservations,
      icon: CalendarCheck,
      accent: "border-rose-500",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
  ];

  return (
    <>
      {unauthorized ? (
        <>
          <div className="md:ml-64 sm:m-auto">
            <Unauthorized message="Admin access only!" />
          </div>
        </>
      ) : (
        <div className="p-8 md:ml-64  min-h-screen bg-white">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Overview of your platform metrics
            </p>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Event Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {loading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
          </div>

          <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-4">
            Tickets Reservation Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {loading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : reservationStats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
          </div>
        </div>
      )}
    </>
  );
}
