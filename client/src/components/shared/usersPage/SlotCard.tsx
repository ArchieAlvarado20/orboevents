import Button from "@/components/shared/Button";
import { formatTime } from "@/utils/timeLongFormat";

import { SlotFormType } from "@/types/slot.type";
import { useState } from "react";
import FormattedDate from "@/utils/dateLongFormat";
import { useNavigate } from "react-router-dom";
import { EventForm } from "@/types/event";

interface Props {
  slots: SlotFormType;
  event: EventForm;
  onSelect: () => void;
}

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

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 m-5 space-y-4">
      {/* TITLE + DELETE */}
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

      {/* CAPACITY */}
      <div className="text-xs mt-2 text-slate-500">
        Capacity: {slots.capacity}
      </div>

      {/* STATUS */}
      {slots.status === "pending" ? (
        <Button variant="secondary" className="w-full mt-2">
          Comming Soon!
        </Button>
      ) : (
        <Button
          variant="gradient"
          className="w-full mt-2"
          onClick={() => {
            handleClick();
            handleBookNow(event);
          }}
        >
          Book Now!
        </Button>
      )}
    </div>
  );
}
