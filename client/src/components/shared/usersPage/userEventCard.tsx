import { MapPin } from "lucide-react";

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

export default function UserEventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
      {/* Image Section */}
      <div className="relative h-46 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-violet-600 text-white px-4 py-2 rounded-2xl font-bold text-xs shadow-lg">
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Location */}
        <div className="flex items-center gap-2 text-violet-600 font-bold text-xs mb-4">
          <MapPin />
          {event.location}
        </div>

        {/* Title */}
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl mb-4">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-slate-500 mb-8 line-clamp-2">{event.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-violet-600">
            ₹ {event.price}
          </span>

          <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
