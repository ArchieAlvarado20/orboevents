import FormattedDate from "@/utils/dateLongFormat";
import {
  Calendar,
  MapPin,
  MoreVertical,
  Edit,
  Ticket,
  Trash2,
  Building2,
  IndianRupee,
  Eye,
  ThumbsUp,
} from "lucide-react";

import { EventForm } from "@/types/event";
import { useEffect, useRef, useState } from "react";
import { currency } from "@/types/currency.type";
import { useNavigate } from "react-router-dom";
import { FcApprove } from "react-icons/fc";

interface EventCardProps {
  event: EventForm;
  onAddTicket: (event: EventForm) => void;
  onAddSlot: (event: EventForm) => void;
  onEdit: (event: EventForm) => void;
  onDelete: (event: EventForm) => void;
  onApproveEvent: (event: EventForm) => void;
}

export default function EventCard({
  event,
  onAddTicket,
  onAddSlot,
  onEdit,
  onDelete,
  onApproveEvent,
}: EventCardProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusStyle: Record<string, string> = {
    draft: "bg-slate-100 text-slate-600",
    pending: "bg-yellow-100 text-yellow-700",
    published: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  const categoryName =
    typeof event.category === "object" ? event.category?.name : event.category;

  const eventTypeName =
    typeof event.eventType === "object"
      ? event.eventType?.label
      : event.eventType;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden group shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition">
      {/* IMAGE */}
      <div className="h-48 relative overflow-hidden">
        <img
          src={event.image || "/images/images.jpg"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* STATUS */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
              statusStyle[event.status || "draft"]
            }`}
          >
            {event.status || "draft"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* HEADER */}
        <div
          ref={ref}
          className=" relative flex  justify-between items-start mb-2"
        >
          <div>
            <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
              {event.name}
            </h3>

            <p className="text-xs text-slate-400 uppercase tracking-wider">
              {categoryName}
            </p>
          </div>

          <button
            onClick={() => setOpen((p) => !p)}
            className="text-slate-400 hover:text-slate-600"
          >
            <MoreVertical size={18} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-auto bg-white border border-slate-100 rounded shadow flex flex-col gap-1 p-1 shadow-[0_15px_50px_rgba(75,85,99,0.2)] hover:shadow-md transition">
              <button
                onClick={() => navigate(`${event._id}`)}
                className="flex uppercase items-center gap-2 px-3 py-2 text-slate-600 hover:text-violet-600 hover:bg-indigo-50 rounded-lg whitespace-nowrap text-sm font-medium"
              >
                <Eye size={18} className="text-green-600" />
                Explore Event
              </button>

              <button
                onClick={() => onEdit(event)}
                className=" flex uppercase items-center gap-2 px-3 py-2 text-slate-600 hover:text-violet-600 hover:bg-indigo-50 rounded-lg whitespace-nowrap text-sm font-medium"
              >
                <Edit size={18} className="text-blue-600" />
                Edit Event
              </button>

              <button
                onClick={() => onDelete(event)}
                className=" flex uppercase items-center gap-2 px-3 py-2 text-slate-600 hover:text-violet-600 text-sm font-medium hover:bg-red-50 rounded-lg whitespace-nowrap"
              >
                <Trash2 size={18} className="text-red-600" />
                Cancel Event
              </button>
              {event.status === "pending" ? (
                <button
                  onClick={() => onApproveEvent(event)}
                  className=" flex uppercase items-center gap-2 px-3 py-2 text-slate-600 hover:text-violet-600 text-sm font-medium hover:bg-red-50 rounded-lg whitespace-nowrap"
                >
                  <ThumbsUp size={18} className="text-violet-600" />
                  Approve Event
                </button>
              ) : (
                ""
              )}

              <button
                onClick={() => onAddTicket(event)}
                className="hidden flex uppercase items-center gap-2 px-3 py-2 text-slate-600 hover:text-violet-600 text-sm font-medium hover:bg-slate-50 rounded-lg whitespace-nowrap"
              >
                <Ticket size={18} />
                Add Tickets
              </button>

              <button
                onClick={() => onApproveEvent(event)}
                className=" hidden flex uppercase items-center gap-2 px-3 py-2 text-slate-600 hover:text-violet-600 text-sm font-medium hover:bg-slate-50 rounded-lg whitespace-nowrap"
              >
                <Calendar size={18} />
                {event?.eventType?.name ?? "Add Slot"}
              </button>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Calendar size={16} />
            <span>{eventTypeName}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin size={16} />
            <span>{event.location || "No location"}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Building2 size={16} />
            <span>{event.venue || "No venue"}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex-row lg:flex pt-4 border-t border-slate-100 font-bold items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Capacity: {event.capacity || 0}
          </div>

          <div className="flex text-xs text-violet-600">
            <IndianRupee size={14} />
            {event.basePrice ? `${event.basePrice.toFixed(2)}` : "Free Event"}
          </div>

          {/* ACTIONS */}
        </div>
      </div>
    </div>
  );
}
