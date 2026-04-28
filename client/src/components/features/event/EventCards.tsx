import { Calendar, MapPin, MoreVertical, Edit, Ticket } from "lucide-react";

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
}

export default function EventCard({ event, onAddTicket }: EventCardProps) {
  const statusStyle = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-gray-100 text-gray-600",
    cancelled: "bg-red-600 text-yellow-600",
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
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
              statusStyle[event.status || "active"]
            }`}
          >
            {event.status || "active"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white leading-tight">
            {event.name}
          </h3>

          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* INFO */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Calendar size={16} />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                timeZone: "UTC",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {/* AVATARS (placeholder) */}
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
              A
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
              B
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
              +99
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Edit size={18} />
            </button>

            <button className="p-2  text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Ticket size={18} onClick={() => onAddTicket(event)} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
