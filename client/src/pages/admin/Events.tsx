import EventCard from "@/components/features/event/EventCards";
import EventModal from "@/components/features/event/EventModal";
import TicketTypeModal from "@/components/features/tickets/TicketTypeModal";
import MobileBottomNav from "@/components/shared/BottomNav";
import Button from "@/components/shared/Button";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import Unauthorized from "@/components/shared/Unauthorized";
import { getPagination } from "@/lib/pagination";
import axios from "axios";
import { List, Menu, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  image?: string;
  status?: "active" | "pending" | "completed";
}

export default function Events() {
  const [openModal, setOpenModal] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [unauthorized, setUnauthorized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleOpenTicketModal = (event: Event) => {
    setSelectedEvent(event);
    setOpenTicketModal(true);
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/event?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEvents(res.data.events || []);
      setTotalPages(res.data.totalPages);
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
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);

  return (
    <>
      {/* Header */}
      <Topbar />
      <div className="flex min-h-screen">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        {unauthorized ? (
          <Unauthorized message="Admin access only!" />
        ) : (
          <main
            className={`flex-1 mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}
          >
            <div className="max-w-container-max mx-auto">
              {/* <!-- Header --> */}
              <header className="w-full border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-1 py-2">
                <div className="flex items-center gap-4">
                  <Menu />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Event Overview
                  </h2>
                </div>
                <Button variant="primary" onClick={() => setOpenModal(true)}>
                  {" "}
                  <Plus className="sm:hidden" />
                  <span className="hidden sm:inline">Create Event</span>
                </Button>
              </header>
              {/* ADD EVENT MODAL */}
              <EventModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={() => {
                  fetchEvents();
                  setOpenModal(false);
                }}
              />

              {/* ADD TICKET TYPE MODAL */}
              {openTicketModal && selectedEvent && (
                <TicketTypeModal
                  open={openTicketModal}
                  event={selectedEvent}
                  onClose={() => setOpenTicketModal(false)}
                  onSuccess={() => {
                    setOpenTicketModal(false);
                  }}
                />
              )}

              <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md-w-50">
                {/* FILTERS */}
                <div className="inline-flex flex-wrap p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                    All <span className="hidden md:inline">Events</span>
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    Active
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    Pending
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    Completed
                  </button>
                </div>

                {/* SEARCH + ACTION */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg 
        bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
        transition-all"
                      placeholder="Search events..."
                      type="text"
                    />
                  </div>

                  <button
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg 
      bg-white dark:bg-slate-900 text-slate-600 hover:bg-slate-50 
      dark:hover:bg-slate-800 transition-colors"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </section>
              <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-6">
                {events?.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    onAddTicket={handleOpenTicketModal}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-6">
                {/* First */}
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
                >
                  {"<<"}
                </button>

                {/* Prev */}
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {/* Pages */}
                {getPagination(page, totalPages).map((p, i) =>
                  p === "..." ? (
                    <span key={i} className="px-2 text-slate-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={i}
                      onClick={() => setPage(Number(p))}
                      className={`px-3 py-1 rounded ${
                        page === p
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200 hover:bg-slate-300"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                {/* Next */}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
                >
                  Next
                </button>

                {/* Last */}
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
                >
                  {">>"}
                </button>
              </div>
            </div>
          </main>
        )}
      </div>
      <MobileBottomNav active="events" />
    </>
  );
}
