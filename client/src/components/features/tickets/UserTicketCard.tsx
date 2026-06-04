import Button from "@/components/shared/Button";
import { TicketTypeForm } from "@/types/ticketTypes";
import { Ticket } from "lucide-react";
import { useState } from "react";

type TicketCardProps = {
  ticketType: TicketTypeForm;
  onSelect: (ticket: TicketTypeForm, quantity: number) => void;
};

export default function UserTicketCard({
  ticketType,
  onSelect,
}: TicketCardProps) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const colorHex = ticketType?.color || "#6366F1";

  const handleClick = async () => {
    try {
      setLoading(true);
      await onSelect(ticketType, quantity);
    } finally {
      setLoading(false);
    }
  };

  const remaining =
    ticketType.quantityTotal -
    ticketType.quantitySold -
    ticketType.quantityReserved;

  return (
    <div
      className="bg-white max-w-70 p-6 rounded-2xl border-2 flex flex-col justify-between relative shadow-lg min-w-60"
      style={{
        borderColor: colorHex,
        boxShadow: `0 4px 15px ${colorHex}33`,
      }}
    >
      {/* ACCESS LEVEL */}
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 text-center text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider w-45"
        style={{ backgroundColor: colorHex }}
      >
        {ticketType.accessLevel}
      </span>

      <div>
        {/* ICON */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
          <Ticket className="w-10 h-10" style={{ color: colorHex }} />
        </div>

        {/* NAME */}
        <h3 className="font-bold text-lg">
          {ticketType.name || "Regular Ticket"}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-xs text-slate-500 mb-4">{ticketType.description}</p>

        {/* PRICE */}
        <p className="text-2xl font-bold mb-4">₱{ticketType.price}</p>

        {remaining <= 0 ? (
          <span className="text-red-500">Sold Out</span>
        ) : remaining <= 10 ? (
          <span className="text-orange-500">Only {remaining} left!</span> // ✅ urgency
        ) : (
          <span className="text-green-500">{remaining} available</span>
        )}

        {/* QUANTITY */}
        <div className="py-4">
          <label className="text-xs text-slate-500 block mb-1">Quantity</label>

          <div className="flex items-center gap-2 w-full">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 p-2 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center font-bold"
            >
              -
            </button>

            <input
              type="number"
              value={quantity}
              min={1}
              max={5}
              onChange={(e) => {
                const value = Number(e.target.value);

                setQuantity(Math.min(5, Math.max(1, value)));
              }}
              className="w-full text-center border border-slate-200 text-slate-600 rounded-lg py-1"
            />

            <button
              type="button"
              disabled={quantity >= 5}
              onClick={() =>
                setQuantity((prev) => Math.min(remaining, prev + 1))
              }
              className="w-8 h-8 p-2 rounded-lg border border-slate-200 text-slate-600  flex items-center justify-center font-bold disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* BUTTON */}

      {ticketType.status === "pending" ? (
        <Button variant="secondary" className="w-full mt-2">
          Coming Soon!
        </Button>
      ) : remaining <= 0 ? (
        <Button variant="secondary" className="w-full mt-2">
          Sold Out
        </Button>
      ) : (
        <Button
          className="w-full mt-2"
          onClick={handleClick}
          style={{ backgroundColor: colorHex }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Book Now!"}
        </Button>
      )}
    </div>
  );
}
