import { EventForm } from "@/types/event";
import { MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface EventCardProps {
  event: EventForm;
}

export default function UserEventCard({ event }: EventCardProps) {
  const navigate = useNavigate();

  const handleBookNow = (event: any) => {
    navigate(`/slots/${event._id}`);
  };
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-[0_15px_50px_rgba(124,58,237,0.18)] hover:shadow-xl transition-shadow group">
      {/* Image Section */}
      <div className="relative h-46 overflow-hidden">
        <img
          src={event.image || "/images/images.jpg"}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform  object-[50%_20%] duration-500 cursor-pointer"
        />

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-violet-600 text-white px-4 py-2 rounded-2xl font-bold text-xs shadow-lg">
          {event.location}
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
            ₹ {event.basePrice}
          </span>

          <button
            onClick={() => handleBookNow(event)}
            className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
