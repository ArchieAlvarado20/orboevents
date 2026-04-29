import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  _id: string;
  name?: string;
  date: string;
  location: string;
  image?: string;
  status?: "active" | "pending" | "completed";
  description: string;
  price?: number;
}

interface EventCardProps {
  event: Event;
}

export default function UserEventCard2({ event }: EventCardProps) {
  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(124,58,237,0.04)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-50">
        <div className="relative h-64 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/40 shadow-sm">
            <span
              className="material-symbols-outlined text-violet-600 text-base"
              data-icon="star"
            >
              star
            </span>
            <span className="font-semibold text-sm text-violet-600">4.9</span>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-semibold text-xs text-violet-600 shadow-sm">
              Exhibition
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col grow">
          <div className="flex flex-col gap-2 text-xs mb-3">
            <div className="flex items-center gap-2 text-gray-400 font-semibold">
              <CalendarDays className="w-4 h-4 text-indigo-500" />
              {new Date(event.date).toLocaleDateString("en-US", {
                timeZone: "UTC",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-gray-400 font-semibold">
              <MapPin className="w-4 h-4 text-indigo-500" />
              {event.location}
            </div>
          </div>

          <h3 className="font-headline font-bold text-2xl text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
            {event.name}
          </h3>
          <p className="text-gray-600 line-clamp-2 mb-4">{event.description}</p>
          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-400 font-semibold text-[10px] uppercase">
                Starting from
              </span>
              <span className="font-headline font-bold text-violet-600 text-xl">
                ₹ {event.price}
              </span>
            </div>
            <Link to="/tickets">
              <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-violet-600/30 transition-all hover:-translate-y-0.5">
                Book Spot
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
