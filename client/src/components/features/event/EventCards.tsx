import FormattedDate from "@/utils/dateLongFormat";
import { Calendar, Edit, MapPin, Ticket, Trash2 } from "lucide-react";

interface EventType {
  _id: string;
  name: string;
  date: string;
  location: string;
  image?: string;
  status?: "active" | "pending" | "completed";
}

interface EventCardProps {
  event: EventType;
  onAddTicket: (event: EventType) => void;
  onDelete: (event: EventType) => void;
}

const statusConfig: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  active: {
    label: "Active",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  },
  pending: {
    label: "Pending",
    dot: "bg-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  },
  completed: {
    label: "Completed",
    dot: "bg-slate-400",
    badge: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
  },
};

export default function EventCard({ event, onAddTicket, onDelete }: EventCardProps) {
  const status = event.status ?? "active";
  const cfg = statusConfig[status] ?? statusConfig.active;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
      {/* ── IMAGE AREA ── */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={event.image || "/images/images.jpg"}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Status badge — top-left */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${cfg.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
            {cfg.label}
          </span>
        </div>

        {/* Event name over gradient — bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6">
          <h3 className="text-white font-bold text-base leading-tight line-clamp-2 drop-shadow-md">
            {event.name}
          </h3>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-0">
        {/* Date & Location */}
        <div className="space-y-2 py-3">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-50 text-indigo-500 flex-shrink-0">
              <Calendar size={14} />
            </span>
            <span className="truncate font-medium text-slate-600">
              <FormattedDate date={event.date} />
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-50 text-violet-500 flex-shrink-0">
              <MapPin size={14} />
            </span>
            <span className="truncate font-medium text-slate-600">
              {event.location}
            </span>
          </div>
        </div>

        {/* ── ACTION BAR ── */}
        <div className="mt-auto border-t border-slate-100 py-2 flex items-center justify-end gap-1">
          {/* Edit */}
          <button
            title="Edit Event"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
          >
            <Edit size={15} />
            <span>Edit</span>
          </button>

          {/* Delete */}
          <button
            title="Delete Event"
            onClick={() => onDelete(event)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-50 transition-colors duration-200"
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>

          {/* Add Ticket */}
          <button
            title="Add Ticket"
            onClick={() => onAddTicket(event)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-600 hover:bg-violet-50 transition-colors duration-200"
          >
            <Ticket size={15} />
            <span>Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
}
