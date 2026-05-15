import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { eventApi } from "@/api/event.api";
import { ticketTypeApi } from "@/api/ticketType.api";
import { slotApi } from "@/api/slot.api"; // assume meron ka
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import Button from "@/components/shared/Button";
import { Calendar, MapPin, Ticket, Layers } from "lucide-react";
import { EventForm } from "@/types/event";
import { TicketTypeForm } from "@/types/ticketTypes";
import { SlotFormType } from "@/types/slot.type";
import { showError, showSuccess } from "@/lib/toast";
import TicketTypeModal from "@/components/features/tickets/TicketTypeModal";
import SlotModal from "@/components/features/slot/SlotModal";
import SlotBulkModal from "@/components/features/slot/slotBulkModal";
import EventModal from "@/components/features/event/EventModal";
import { confirmToast } from "@/lib/confirmToast";

export default function EventInfoPage() {
  const { id } = useParams();

  const [event, setEvent] = useState<EventForm | null>(null);
  const [ticketType, setTicketType] = useState<TicketTypeForm[]>([]);
  const [slots, setSlots] = useState<SlotFormType[]>([]);
  const [loading, setLoading] = useState(true);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenTicketModal = (event: EventForm) => {
    setEvent(event);
    setOpenTicketModal(true);
  };
  const [openSlotModal, setOpenSlotModal] = useState(false);
  const [openBulkSlotModal, setOpenBulkSlotModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleAddSlot = (event: EventForm) => {
    setEvent(event);

    const type = event?.eventType?.name;

    if (type === "single-day") {
      setOpenSlotModal(true);
    } else {
      setOpenBulkSlotModal(true);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized");
        return;
      }

      await eventApi.delete(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Event Cancelled Successfully");
      navigate("/admin/events");
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to delete event");
    }
  };

  const handleEditEvent = (event: EventForm) => {
    setEvent(event);
    setOpenModal(true);
  };

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showError("Unauthorized");
        return;
      }

      const eventRes = await eventApi.getByEvent(id, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvent(eventRes.data);
    } catch (err) {
      console.error("Event failed", err);
      showError("Failed to load event");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showError("Unauthorized");
        return;
      }

      const slotRes = await slotApi.getByEvent(id, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSlots(slotRes.data);
    } catch (err) {
      console.error("Event failed", err);
      showError("Failed to load slots");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showError("Unauthorized");
        return;
      }

      const ticketTypeRes = await ticketTypeApi.getByEvent(id, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTicketType(ticketTypeRes.data);

      console.log(ticketTypeRes.data);
    } catch (err) {
      console.error("Ticket failed", err);
      showError("Failed to load tickets");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <TransparentSpinner />;
  if (!event) return <p className="p-6">Event not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      {openTicketModal && event && (
        <TicketTypeModal
          open={openTicketModal}
          event={event}
          onClose={() => setOpenTicketModal(false)}
          onSuccess={() => {
            fetchData();
            setOpenTicketModal(false);
          }}
        />
      )}

      {/* ADD EVENT MODAL */}
      <EventModal
        open={openModal}
        event={event}
        onClose={() => {
          setOpenModal(false);
        }}
        onSuccess={() => {
          fetchData();
          setOpenModal(false);
        }}
      />

      <SlotModal
        open={openSlotModal}
        event={event}
        onClose={() => {
          setOpenSlotModal(false);
        }}
        onSuccess={() => {
          fetchData();
          setOpenSlotModal(false);
        }}
      />

      <SlotBulkModal
        open={openBulkSlotModal}
        event={event}
        onClose={() => {
          setOpenBulkSlotModal(false);
        }}
        onSuccess={() => {
          fetchData();
          setOpenBulkSlotModal(false);
        }}
      />

      {/* ================= EVENT HEADER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition">
        {/* Image */}
        <div className="h-56 bg-slate-100">
          <img
            src={event.image || "/images/default.jpg"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="p-5 space-y-3">
          <h1 className="text-2xl font-bold text-slate-900">{event.name}</h1>

          <p className="text-slate-600 text-sm">{event.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {event.location}
            </span>

            <span className="flex items-center gap-1">
              <Calendar size={14} /> {event.basePrice}
            </span>
          </div>
        </div>

        {/* ================= TICKET TYPES ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 m-5 space-y-4 shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Ticket size={18} />
            Ticket Types
          </div>

          {ticketType.length === 0 ? (
            <p className="text-sm text-slate-500">No tickets yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {ticketType.map((t) => (
                <div
                  key={t._id}
                  className="p-4 border border-slate-200 rounded-xl hover:shadow-sm transition "
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900">{t.name}</h3>

                    <span
                      className="text-xs uppercase text-slate-200 px-2 py-1 rounded-md"
                      style={{ background: t.color || "#e5e7eb" }}
                    >
                      {t.accessLevel}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mt-1">{t.description}</p>

                  <div className="mt-2 flex justify-between text-sm">
                    <span>₱ {t.price}</span>
                    <span>Qty: {t.quantityTotal}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= SLOTS ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 m-5 space-y-4 shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Layers size={18} />
            Event Slots
          </div>

          {slots.length === 0 ? (
            <p className="text-sm text-slate-500">No slots available</p>
          ) : (
            <div className="grid sm:grid-cols-3 gap-3">
              {slots.map((s) => (
                <div
                  key={s._id}
                  className="p-4 border rounded-xl border-slate-200"
                >
                  <p className="font-medium text-slate-900">{s.name}</p>

                  <p className="text-sm text-slate-500">
                    {s.startTime} - {s.endTime}
                  </p>

                  <div className="text-xs mt-2 text-slate-500">
                    Capacity: {s.capacity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 m-5 space-y-4 shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <Button
              variant="outline"
              className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition"
              onClick={() => navigate("/admin/events")}
            >
              Back
            </Button>
            <Button
              className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition bg-red-600 text-slate-600 hover:bg-red-700"
              onClick={() =>
                confirmToast("Cancel this event?", () => deleteEvent(event._id))
              }
            >
              Delete Event
            </Button>
            <Button
              onClick={() => handleEditEvent(event)}
              variant="primary"
              className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition"
            >
              Edit Event
            </Button>
            <Button
              variant="primary"
              className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition"
              onClick={() => handleAddSlot(event)}
            >
              Add Schedule
            </Button>
            <Button
              variant="primary"
              className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition"
              onClick={() => handleOpenTicketModal(event)}
            >
              Add Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
