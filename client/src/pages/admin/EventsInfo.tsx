import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { eventApi } from "@/api/event.api";
import { ticketTypeApi } from "@/api/ticketType.api";
import { slotApi } from "@/api/slot.api"; // assume meron ka
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import Button from "@/components/shared/Button";
import {
  Calendar,
  MapPin,
  Ticket,
  Layers,
  Currency,
  Trash2,
  Edit2,
  Edit,
  ChevronLeft,
  Plus,
} from "lucide-react";
import { EventForm } from "@/types/event";
import { TicketTypeForm } from "@/types/ticketTypes";
import { SlotFormType } from "@/types/slot.type";
import { showError, showSuccess } from "@/lib/toast";
import TicketTypeModal from "@/components/features/tickets/TicketTypeModal";
import SlotModal from "@/components/features/slot/SlotModal";
import SlotBulkModal from "@/components/features/slot/slotBulkModal";
import EventModal from "@/components/features/event/EventModal";
import { confirmToast } from "@/lib/confirmToast";
import FormattedDate from "@/utils/dateLongFormat";
import { formatTime } from "@/utils/timeLongFormat";
import { currency } from "@/types/currency.type";

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
      if (!token) return;

      const [eventRes, ticketRes, slotRes] = await Promise.all([
        eventApi.getByEvent(id, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        ticketTypeApi.getByEvent(id, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        slotApi.getByEvent(id, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setEvent(eventRes.data);
      setTicketType(ticketRes.data);
      setSlots(slotRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const approveTicketType = async (id: string) => {
    if (!id) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showError("Unauthorized");
        return;
      }

      await ticketTypeApi.approveTicketType(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Ticket type approved successfully");

      fetchData?.(); // refresh list optional
    } catch (err: any) {
      console.error(err);

      showError(err.response?.data?.message || "Failed to approve ticket type");
    } finally {
      setLoading(false);
    }
  };

  const cancelTicketType = async (id: string) => {
    if (!id) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showError("Unauthorized");
        return;
      }

      await ticketTypeApi.calcelTicketType(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Ticket type cancelled successfully");

      fetchData?.(); // refresh list optional
    } catch (err: any) {
      console.error(err);

      showError(err.response?.data?.message || "Failed to cancel ticket type");
    } finally {
      setLoading(false);
    }
  };

  const approveSlot = async (id: string) => {
    if (!id) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showError("Unauthorized");
        return;
      }

      await slotApi.approveSlots(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Slot approved successfully");

      fetchData?.();
    } catch (err: any) {
      console.error(err);

      showError(err.response?.data?.message || "Failed to approve slot");
    } finally {
      setLoading(false);
    }
  };
  const cancelSlot = async (id: string) => {
    if (!id) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showError("Unauthorized");
        return;
      }

      await slotApi.calcelSlots(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Slot cancelled successfully");

      fetchData?.();
    } catch (err: any) {
      console.error(err);

      showError(err.response?.data?.message || "Failed to cancel slot");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <TransparentSpinner />;
  if (!event) return <TransparentSpinner />;

  return (
    <div className="max-w-full md:ml-64 md:py-10 md:px-10  xl:px-20">
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
      <div className="bg-white sm:rounded-2xl border border-slate-200 overflow-hidden shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition">
        {/* Image */}
        <div className="h-100 bg-slate-100 relative">
          <img
            src={event.image || "/images/default.jpg"}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 z-40 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5  shadow-sm">
            <span
              className="text-xs font-extrabold uppercase text-slate-400 px-2 hover:text-slate-500 py-1 rounded-md"
              onClick={() => navigate("/admin/events")}
            >
              <ChevronLeft size={24} />
            </span>
          </div>
          <div className="absolute top-4 right-4 z-40 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5  shadow-sm">
            <span
              className="text-xs uppercase text-blue-400 px-2 hover:text-blue-500 py-1 rounded-md"
              onClick={() => handleEditEvent(event)}
            >
              <Edit size={16} />
            </span>
            <span
              className="text-xs uppercase text-red-400 px-2 hover:text-red-500 py-1 rounded-md"
              onClick={() =>
                confirmToast("Cancel this event?", () => deleteEvent(event._id))
              }
            >
              <Trash2 size={16} />
            </span>
          </div>
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
        <div className="bg-white rounded-2xl border border-slate-200 p-5 m-5 space-y-4 ">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Ticket size={18} />
            Ticket Types
            <div
              className="flex items-center gap-2 text-blue-600 font-semibold"
              onClick={() => handleOpenTicketModal(event)}
            >
              <Plus size={18} />
            </div>
          </div>

          {ticketType.length === 0 ? (
            <p className="text-sm text-slate-500">No tickets yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols- gap-3 lg:grid-cols-4">
              {ticketType.map((t) => (
                <div
                  key={t._id}
                  className="p-4 border border-slate-200 rounded-xl hover:shadow-sm transition "
                >
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="font-bold text-lg text-slate-900">
                        {t.name}
                      </h3>

                      <span
                        className="text-xs uppercase text-red-400 px-2 py-1 rounded-md"
                        onClick={() =>
                          confirmToast("Cancel this ticket?", () =>
                            cancelTicketType(t._id),
                          )
                        }
                      >
                        <Trash2 size={16} />
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-xs uppercase text-slate-200 px-2 py-1 rounded-md"
                    style={{ background: t.color || "#e5e7eb" }}
                  >
                    {t.accessLevel}
                  </span>

                  <p className="text-sm font-medium text-slate-700 mt-1">
                    {t.description}
                  </p>

                  <div className="mt-2 flex justify-between text-sm">
                    <span>
                      {currency.rupees} {t.price}
                    </span>
                    <span>Qty: {t.quantityTotal}</span>
                  </div>
                  {t.status === "pending" ? (
                    <Button
                      variant="warning"
                      className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition w-full mt-2"
                      onClick={() =>
                        confirmToast("Approve this ticket?", () =>
                          approveTicketType(t._id),
                        )
                      }
                    >
                      For Approval
                    </Button>
                  ) : (
                    <Button
                      variant="gradient"
                      className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition w-full mt-2"
                    >
                      Published
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= SLOTS ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 m-5 space-y-4 ">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Layers size={18} />
            Event Slots <p className="uppercase">({event.eventType.name})</p>
            <div
              className="flex items-center gap-2 text-blue-600 font-semibold"
              onClick={() => handleAddSlot(event)}
            >
              <Plus size={18} />
            </div>
          </div>

          {slots.length === 0 ? (
            <p className="text-sm text-slate-500">No slots available</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols- gap-3 lg:grid-cols-4">
              {slots.map((s) => (
                <div
                  key={s._id}
                  className="p-4 border rounded-xl border-slate-200"
                >
                  <div className="flex justify-between items-center w-full">
                    <p className="font-bold text-lg text-slate-900">{s.name}</p>

                    <span
                      className="text-xs uppercase text-red-400 px-2 py-1 rounded-md"
                      onClick={() =>
                        confirmToast("Cancel this Schedule?", () =>
                          cancelSlot(s._id),
                        )
                      }
                    >
                      <Trash2 size={16} />
                    </span>
                  </div>

                  <FormattedDate
                    date={s.date}
                    className="text-sm font-medium"
                  />

                  <p className="text-sm text-slate-500">
                    {formatTime(s.startTime)} - {formatTime(s.endTime)}
                  </p>

                  <div className="text-xs mt-2 text-slate-500">
                    Capacity: {s.capacity}
                  </div>
                  {s.status === "pending" ? (
                    <Button
                      variant="warning"
                      className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition w-full mt-2"
                      onClick={() =>
                        confirmToast("Approve this schedule?", () =>
                          approveSlot(s._id),
                        )
                      }
                    >
                      For Approval
                    </Button>
                  ) : (
                    <Button
                      variant="gradient"
                      className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition w-full mt-2"
                    >
                      Published
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="hidden bg-white rounded-2xl border border-slate-200 p-5 m-5 space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols- gap-3 lg:grid-cols-4">
            <Button
              variant="success"
              className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition"
            >
              Add Ticket
            </Button>
            <Button
              variant="cyan"
              className="shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition"
              onClick={() => handleAddSlot(event)}
            >
              Add Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
