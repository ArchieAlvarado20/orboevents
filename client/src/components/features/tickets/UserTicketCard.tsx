import { Ticket } from "lucide-react";
import { useState } from "react";

type TicketCardProps = {
  name: string;
  accessLevel: string;
  description?: string;
  price: number;
  onSelect: () => void;
  color?: "green" | "yellow" | "red";
};

export default function UserTicketCard({
  name,
  accessLevel,
  description,
  price,
  onSelect,
  color = "green",
}: TicketCardProps) {
  const [loading, setLoading] = useState(false);
  const colorMap = {
    green: "#77fc84",
    yellow: "#fae173",
    red: "#e01039",
  };

  const colorHex = colorMap[color];

  const handleClick = async () => {
    try {
      setLoading(true);
      await onSelect();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white max-w-70 p-6 rounded-2xl border-2 border-indigo-500 flex flex-col justify-between relative shadow-lg shadow-indigo-100"
      style={{ borderColor: colorHex, boxShadow: `0 4px 15px ${colorHex}33` }}
    >
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 text-center bg-indigo-600 w-45 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider"
        style={{ backgroundColor: colorHex }}
      >
        {accessLevel}{" "}
      </span>

      <div>
        <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center mb-4">
          <Ticket className="w-10 h-10" style={{ color: colorHex }} />
        </div>

        <h3 className="font-bold text-lg"> {name || "Regular Ticket"}</h3>

        <p className="text-xs text-slate-500 mb-4">{description}</p>

        <p
          className="text-2xl font-bold"
          // style={{ color: colorHex }}
        >
          ₹{price.toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleClick}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        style={{ backgroundColor: colorHex }}
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}
