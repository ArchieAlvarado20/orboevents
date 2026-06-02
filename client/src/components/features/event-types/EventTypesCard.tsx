import { EventTypeFormData } from "@/types/eventTypes.type";
import {
  MoreVertical,
  Edit,
  Trash2,
  Settings,
  CalendarDays,
  ListTodo,
  Timer,
  CalendarDaysIcon,
} from "lucide-react";
import { FaEvernote, FaRunning } from "react-icons/fa";

interface EventTypeCardProps {
  eventType: EventTypeFormData;
  onEdit: (eventType: EventTypeFormData) => void;
  onDelete: (eventType: EventTypeFormData) => void;
}

export default function EventTypeCard({
  eventType,
  onEdit,
  onDelete,
}: EventTypeCardProps) {
  const statusStyle = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-600",
  };

  // ==============================
  // ICON MAPPING (BASED ON TYPE)
  // ==============================
  const getIcon = () => {
    switch (eventType.name) {
      case "single-day":
        return CalendarDays;

      case "multi-day":
        return ListTodo;

      case "time-slot":
        return Timer;

      case "recurring":
        return FaRunning;

      default:
        return Settings;
    }
  };

  const Icon = getIcon();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-md transition group">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Icon className="text-indigo-600" size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
              {eventType.label}
            </h3>

            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Event Type
            </p>
          </div>
        </div>

        <button className="hidden text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* TYPE BADGE */}
      <div className="mb-4">
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700 uppercase tracking-wider">
          {eventType.name}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-4">
        <span className="py-1 text-xs font-bold rounded-full bg-white text-slate-400 tracking-wider">
          {eventType.description}
        </span>
      </div>

      {/* UI CONFIG PREVIEW */}
      <div className="hidden space-y-2 mb-5 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Date:</span>
          {eventType.uiConfig.showDate ? "Enabled" : "Disabled"}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Date Range:</span>
          {eventType.uiConfig.showDateRange ? "Enabled" : "Disabled"}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Slots:</span>
          {eventType.uiConfig.showSlots ? "Enabled" : "Disabled"}
        </div>
      </div>

      {/* STATUS */}
      <div className="flex items-center justify-between mb-5">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
            statusStyle[eventType.status || "active"]
          }`}
        >
          {eventType.status || "active"}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="hidden flex justify-end gap-2 pt-5 mt-5 border-t border-slate-100">
        <button
          onClick={() => onEdit(eventType)}
          className="p-2.5 rounded-xl text-indigo-600 hover:bg-indigo-50 transition"
        >
          <Edit size={18} />
        </button>

        <button
          onClick={() => onDelete(eventType)}
          className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
