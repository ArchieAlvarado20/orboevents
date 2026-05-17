import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) {
    return (
      <div className="h-60 flex items-center justify-center bg-slate-100 rounded-xl">
        No images
      </div>
    );
  }

  return (
    <div className="relative w-full h-100 rounded-xl overflow-hidden bg-black">
      {/* IMAGE */}
      <img
        src={images[index]}
        alt="event"
        className="w-full h-full object-cover transition-all duration-300"
      />

      {/* LEFT BUTTON */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
      >
        <ChevronLeft size={20} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
      >
        <ChevronRight size={20} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
