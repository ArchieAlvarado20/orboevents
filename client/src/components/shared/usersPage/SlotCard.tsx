import { EventForm } from "@/types/event";
import FormattedDate from "@/utils/dateLongFormat";
import { formatTime } from "@/utils/timeLongFormat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

export default function SlotCard({ slots, event, onSelect }: Props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setLoading(true);
      await onSelect();
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (event: EventForm) => {
    navigate(`/tickets/${event._id}/slots/${slots._id}`);
  };

  const remaining = slots.remaining;

  return (
    <div className="bg-white p-6 m-1 rounded-2xl border-2 border-slate-100 shadow-2xl flex flex-col justify-between relative">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg text-slate-900">
          {slots.name || "Slot"}
        </p>
      </div>

      {/* DATE */}
      <FormattedDate date={slots.date} className="text-sm font-medium mt-2" />

      {/* TIME */}
      <p className="text-sm text-slate-500">
        {formatTime(slots.startTime)} - {formatTime(slots.endTime)}
      </p>

      {/* REMAINING */}
      {!slots.isCompleted && remaining > 0 && (
        <span className="text-green-500 text-sm">
          {remaining > 1 ? `${remaining} slots` : "1 slot"} remaining
        </span>
      )}

      {/* BUTTON */}
      {slots.status === "pending" ? (
        <Button variant="secondary" className="w-full mt-2">
          Coming Soon!
        </Button>
      ) : slots.isCompleted ? (
        <Button variant="primary" className="w-full mt-2" disabled>
          Event Completed.
        </Button>
      ) : remaining <= 0 ? (
        <Button variant="secondary" className="w-full mt-2">
          Fully booked!
        </Button>
      ) : (
        <Button
          variant="gradient"
          className="w-full mt-2"
          onClick={() => {
            handleClick();
            handleBookNow(event);
          }}
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now!"}
        </Button>
      )}
    </div>
  );
}
