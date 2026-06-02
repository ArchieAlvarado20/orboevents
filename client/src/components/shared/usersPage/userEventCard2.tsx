import FormattedDate from "@/utils/dateLongFormat";
import { CalendarDays, MapPin, Star, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  name?: string;
  date: string;
  location: string;
  image?: string;
  status?: "active" | "pending" | "completed";
  description: string;
  price?: number;
  category?: string;
}

interface EventCardProps {
  event: Event;
}

export default function UserEventCard2({ event }: EventCardProps) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/tickets/${event._id}`);
  };

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-violet-200 shadow-sm hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-400 flex flex-col h-full cursor-pointer"
      onClick={handleBookNow}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.image || "/images/images.jpg"}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-bold text-xs text-violet-700 shadow-sm">
            {event.category || "Event"}
          </span>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-800">4.9</span>
          </div>
        </div>

        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-violet-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Details <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <div className="flex flex-col gap-1.5 text-xs mb-3">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <CalendarDays className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <FormattedDate date={event.date} />
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <h3 className="font-black text-lg text-slate-900 mb-2 group-hover:text-violet-700 transition-colors leading-snug line-clamp-2">
          {event.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 font-medium">
          {event.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
              Starting from
            </span>
            <span className="font-black text-violet-600 text-xl">
              ₹{event.basePrice?.toLocaleString("en-IN") ?? "—"}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBookNow();
            }}
            className="flex items-center gap-1.5 bg-violet-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-violet-700 shadow-md shadow-violet-600/20 hover:shadow-violet-600/35 hover:-translate-y-0.5 transition-all"
          >
            Book Spot
          </button>
        </div>
      </div>
    </div>
  );
}
