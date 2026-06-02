import EventCard from "@/components/features/event/EventCards";
import EventModal from "@/components/features/event/EventModal";
import NoEventsAvailable from "@/components/features/event/NoEventsAvailable";
import SlotBulkModal from "@/components/features/slot/slotBulkModal";
import SlotModal from "@/components/features/slot/SlotModal";
import TicketTypeModal from "@/components/features/tickets/TicketTypeModal";
import Button from "@/components/shared/Button";
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import Unauthorized from "@/components/shared/Unauthorized";
import { useEvent } from "@/hooks/eventHook/useEvent";
import { confirmToast } from "@/lib/confirmToast";
import { getPagination } from "@/lib/pagination";
import { EventForm } from "@/types/event";
import { Calendar, List, Menu, Plus, Search } from "lucide-react";
import { useState } from "react";
export default function Events() {
  const [openModal, setOpenModal] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [openSlotModal, setOpenSlotModal] = useState(false);
  const [openBulkSlotModal, setOpenBulkSlotModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    events,
    loading,
    unauthorized,
    fetchEvents,
    deleteEvent,
    approveEvent,
  } = useEvent();

  const handleOpenTicketModal = (event: EventForm) => {
    setSelectedEvent(event);
    setOpenTicketModal(true);
  };

  if (loading) {
    return <TransparentSpinner />;
  }

  if (!events) {
    return <TransparentSpinner />;
  }

  const handleAddSlot = (event: EventForm) => {
    setSelectedEvent(event);

    const type = event?.eventType?.name;

    if (type === "single-day") {
      setOpenSlotModal(true);
    } else {
      setOpenBulkSlotModal(true);
    }
  };

  const handleDeleteEvent = (event: any) => {
    confirmToast("Cancel this event?", async () => {
      await deleteEvent(event._id);
    });
  };

  const handleApproveEvent = (event: any) => {
    confirmToast("Approve this event?", async () => {
      await approveEvent(event._id);
      fetchEvents();
    });
  };

  const handleEditEvent = (event: EventForm) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  return (
    <>
      {/* Header */}

      {unauthorized ? (
        <>
          <div className="md:ml-64 sm:m-auto">
            <Unauthorized message="Admin access only!" />
          </div>
        </>
      ) : (
        <main
          className={`flex-1 mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}
        >
          <div className="max-w-container-max mx-auto">
            {/* <!-- Header --> */}
            <header className="w-full border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-1 py-2">
              <div className="flex items-center gap-4">
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
              event={selectedEvent}
              onClose={() => {
                setOpenModal(false);
                setSelectedEvent(null);
              }}
              onSuccess={() => {
                fetchEvents();
                setOpenModal(false);
                setSelectedEvent(null);
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

            <SlotModal
              open={openSlotModal}
              event={selectedEvent}
              onClose={() => {
                setOpenSlotModal(false);
                setSelectedEvent(null);
              }}
              onSuccess={() => {
                setOpenSlotModal(false);
                setSelectedEvent(null);
              }}
            />

            <SlotBulkModal
              open={openBulkSlotModal}
              event={selectedEvent}
              onClose={() => {
                setOpenBulkSlotModal(false);
                setSelectedEvent(null);
              }}
              onSuccess={() => {
                setOpenBulkSlotModal(false);
                setSelectedEvent(null);
              }}
            />

            <section className="hidden flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md-w-50">
              {/* FILTERS */}
              <div className="inline-flex flex-wrap p-1 bg-white  border border-slate-200  rounded-xl">
                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-100  text-indigo-600 ">
                  All <span className="hidden md:inline">Events</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                  Active
                </button>
                <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                  Pending
                </button>
                <button className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600  hover:text-slate-900  transition-colors">
                  Completed
                </button>
              </div>

              {/* SEARCH + ACTION */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-200  rounded-lg 
        bg-white  text-sm text-slate-900 
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
        transition-all"
                    placeholder="Search events..."
                    type="text"
                  />
                </div>

                <button
                  className="p-2 border border-slate-200  rounded-lg 
      bg-white  text-slate-600 hover:bg-slate-50 
       transition-colors"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </section>
            {events.length === 0 ? (
              <NoEventsAvailable />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-6">
                {events?.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    onAddTicket={() => handleOpenTicketModal(event)}
                    onAddSlot={() => handleAddSlot(event)}
                    onEdit={() => handleEditEvent(event)}
                    onDelete={() => handleDeleteEvent(event)}
                    onApproveEvent={() => {
                      handleApproveEvent(event);
                    }}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 mt-6 flex-wrap justify-center">
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
                {"<"}
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
                {">"}
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
    </>
  );
}
