import { eventApi } from "@/api/event.api";
import EventCard from "@/components/features/event/EventCards";
import EventModal from "@/components/features/event/EventModal";
import TicketTypeModal from "@/components/features/tickets/TicketTypeModal";
import Button from "@/components/shared/Button";
import Unauthorized from "@/components/shared/Unauthorized";
import { confirmToast } from "@/lib/confirmToast";
import { getPagination } from "@/lib/pagination";
import { showError, showSuccess } from "@/lib/toast";
import axios from "axios";
import {
  CalendarDays,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  image?: string;
  status?: "active" | "pending" | "completed";
}

type FilterTab = "all" | "active" | "pending" | "completed";

const filterTabs: { label: string; value: FilterTab }[] = [
  { label: "All Events", value: "all" },
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

/** Skeleton card shown while loading */
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 animate-pulse">
      <div className="h-52 bg-gradient-to-br from-slate-200 to-slate-300" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 rounded-full w-3/4" />
        <div className="h-3 bg-slate-100 rounded-full w-1/2" />
        <div className="h-3 bg-slate-100 rounded-full w-2/3" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-slate-200 rounded-lg flex-1" />
          <div className="h-8 bg-slate-200 rounded-lg flex-1" />
          <div className="h-8 bg-slate-200 rounded-lg flex-1" />
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [unauthorized, setUnauthorized] = useState(false);
  const [isCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.openAdd) {
      setOpenModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  /* ── handlers ── */
  const handleOpenTicketModal = (event: Event) => {
    setSelectedEvent(event);
    setOpenTicketModal(true);
  };

  const deleteEvent = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) { alert("Unauthorized"); return; }
    try {
      await eventApi.delete(id, { headers: { Authorization: `Bearer ${token}` } });
      showSuccess("Event cancelled successfully");
      setEvents((prev) => prev.filter((r) => r._id !== id));
    } catch (err: any) {
      showError(err?.response?.data?.message || "Failed to delete event");
    }
  };

  const handleDeleteEvent = (event: any) => {
    confirmToast("Cancel this event?", async () => { await deleteEvent(event._id); });
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/events?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents(res.data.events || []);
      setTotalPages(res.data.totalPages || 1);
      console.log(res.data);
    } catch (err: unknown) {
      let message = "Something went wrong!";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
        if (err.response?.status === 401 || err.response?.status === 403) {
          setUnauthorized(true);
        }
      } else if (err instanceof Error) {
        message = err.message;
      }
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, [page]);

  /* ── derived data ── */
  const filteredEvents = events.filter((e) => {
    const matchesFilter = activeFilter === "all" || e.status === activeFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  /* ── unauthorized guard ── */
  if (unauthorized) {
    return (
      <div className="pt-4">
        <Unauthorized message="Admin access only!" />
      </div>
    );
  }

  /* ── main render ── */
  return (
    <main className="min-h-screen p-6 bg-slate-50">
      {/* ════════════════════════════════════
          PAGE HEADER
      ════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="text-indigo-500" size={22} />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Event Management
            </h1>
            {/* Event count badge */}
            <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
              <Sparkles size={10} />
              {events.length} Events
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Manage, schedule and publish your events from one place.
          </p>
        </div>

        {/* Create Event CTA */}
        <Button variant="primary" onClick={() => setOpenModal(true)}>
          <Plus size={16} className="mr-1.5" />
          Create Event
        </Button>
      </div>

      {/* ════════════════════════════════════
          MODALS
      ════════════════════════════════════ */}
      <EventModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => { fetchEvents(); setOpenModal(false); }}
      />

      {openTicketModal && selectedEvent && (
        <TicketTypeModal
          open={openTicketModal}
          event={selectedEvent}
          onClose={() => setOpenTicketModal(false)}
          onSuccess={() => setOpenTicketModal(false)}
        />
      )}

      {/* ════════════════════════════════════
          FILTERS + SEARCH BAR
      ════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        {/* Pill filter tabs */}
        <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeFilter === tab.value
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative flex-1 max-w-sm ml-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by name or location…"
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400
              shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* ════════════════════════════════════
          EVENTS GRID
      ════════════════════════════════════ */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <CalendarDays size={56} strokeWidth={1} className="mb-4 text-slate-300" />
          <p className="text-lg font-semibold">No events found</p>
          <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onAddTicket={handleOpenTicketModal}
              onDelete={() => handleDeleteEvent(event)}
            />
          ))}
        </div>
      )}

      {/* ════════════════════════════════════
          PAGINATION
      ════════════════════════════════════ */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
          {/* First page */}
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            title="First page"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronFirst size={16} />
          </button>

          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            title="Previous page"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page numbers */}
          {getPagination(page, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-2 text-slate-400 font-medium select-none">
                …
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setPage(Number(p))}
                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                  page === p
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-200 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300"
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            title="Next page"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight size={16} />
          </button>

          {/* Last page */}
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            title="Last page"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLast size={16} />
          </button>
        </div>
      )}
    </main>
  );
}
