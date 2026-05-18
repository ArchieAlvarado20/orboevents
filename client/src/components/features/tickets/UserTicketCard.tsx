import Button from "@/components/shared/Button";
import { TicketTypeForm } from "@/types/ticketTypes";
import { Ticket } from "lucide-react";
import { useState } from "react";

type TicketCardProps = {
  ticketType: TicketTypeForm;
  onSelect: () => void;
};

export default function UserTicketCard({
  ticketType,
  onSelect,
}: TicketCardProps) {
  const [loading, setLoading] = useState(false);

  const colorHex = [ticketType?.color];

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
      className="bg-white max-w-70 p-6 rounded-2xl border-2 border-indigo-500 flex flex-col justify-between relative shadow-lg shadow-indigo-100 min-w-60"
      style={{ borderColor: colorHex, boxShadow: `0 4px 15px ${colorHex}33` }}
    >
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 text-center bg-indigo-600 w-45 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider"
        style={{ backgroundColor: colorHex }}
      >
        {ticketType.accessLevel}{" "}
      </span>
      {name}
      <div>
        <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center mb-4">
          <Ticket className="w-10 h-10" style={{ color: colorHex }} />
        </div>

        <h3 className="font-bold text-lg">
          {" "}
          {ticketType.name || "Regular Ticket"}
        </h3>

        <p className="text-xs text-slate-500 mb-4">{ticketType.description}</p>

        <p
          className="text-2xl font-bold"
          // style={{ color: colorHex }}
        >
          ₹{ticketType.price}
        </p>
      </div>

      {/* STATUS */}
      {ticketType.status === "pending" ? (
        <Button variant="secondary" className="w-full mt-2">
          Comming Soon!
        </Button>
      ) : (
        <Button
          className="w-full mt-2 "
          onClick={handleClick}
          style={{ backgroundColor: colorHex }}
        >
          Book Now!
        </Button>
      )}
    </div>
  );
}
