import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EventForm } from "@/types/event";

export default function EventCarousel({ events = [] }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleBookNow = (event: EventForm) => {
    navigate(`/slots/${event._id}`);
  };

  // AUTO SLIDE
  useEffect(() => {
    if (!events.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [events.length]);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  if (!events.length) {
    return (
      <div className="h-60 flex items-center justify-center bg-slate-100 rounded-xl">
        No events
      </div>
    );
  }

  const currentEvent = events[index];

  return (
    <div
      onClick={() => handleBookNow(currentEvent)}
      className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-black"
    >
      {/* IMAGE */}
      {/* IMAGE */}
      <img
        src={currentEvent.image}
        alt={currentEvent.name}
        className="relative z-10 w-full h-full object-cover object-[50%_20%] duration-500 cursor-pointer"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

      {/* EVENT INFO */}
      <div className="absolute bottom-10 left-8 text-white z-30">
        <h2 className="text-3xl font-bold">{currentEvent.name}</h2>

        {/* <p className="text-sm opacity-80 mt-1">{currentEvent.date}</p> */}

        <p className="mt-3 max-w-lg text-sm line-clamp-5">
          {currentEvent.description}
        </p>
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-20"
      >
        <ChevronLeft size={22} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-20"
      >
        <ChevronRight size={22} />
      </button>

      {/* CIRCLES / DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {events.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white scale-110" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
