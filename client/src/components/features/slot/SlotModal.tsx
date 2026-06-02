import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import useSlotForm from "@/hooks/slot/useSlotForm";
import { EventForm } from "@/types/event";
import { initialSlotForm } from "@/types/slot.type";
import { MoreVertical, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface SlotModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;

  event: EventForm;
}
export default function SlotModal({
  event,
  open,
  onClose,
  onSuccess,
}: SlotModalProps) {
  const modalRef = useRef(null);
  const eventId = event?._id;
  const {
    form,
    setForm,
    handleChange,
    createSlots,
    resetErrors,
    loading,
    errors,
  } = useSlotForm(eventId, () => {
    onSuccess();
    onClose();
  });

  const statusStyle = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-gray-100 text-gray-600",
  };

  useEffect(() => {
    if (!open) {
      setForm(initialSlotForm);
      resetErrors();
    }
  }, [open]);

  const eventTypeName = event?.eventType?.name;

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed mb-5 inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white  w-full max-w-2xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* <!-- Header --> */}
            <div className="px-6 py-4 border-b border-slate-100  flex items-center justify-between sticky top-0 bg-white  z-10">
              <h3 className="text-xl font-bold text-slate-900 ">
                Create New Slot for this Event
              </h3>
              <button
                onClick={() => onClose()}
                className="p-2 text-slate-400 hover:text-slate-600  transition-colors"
              >
                <X />
              </button>
            </div>
            {/* <!-- Body --> */}
            <div className="h-48 relative overflow-hidden">
              <img
                src={event.image || "/images/images.jpg"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* STATUS */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    statusStyle["active"]
                  }`}
                >
                  {event.status || "active"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-start m-4">
              <h3 className="font-semibold text-lg text-slate-900leading-tight">
                {event.name}
              </h3>

              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 space-y-4 overflow-y-auto">
              <Input
                label="Slot Name"
                name="name"
                onChange={handleChange}
                value={form.name}
                error={errors.name}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  type="number"
                  label="Capacity"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  error={errors.capacity}
                />
                <Input
                  type="date"
                  label="Date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  error={errors.date}
                  min={new Date().toISOString().split("T")[0]}
                />

                <Input
                  type="time"
                  label="Start Time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  error={errors.startTime}
                />

                <Input
                  type="time"
                  label="End Time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  error={errors.endTime}
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              {eventTypeName !== "single-day" && <Button>Add Slot</Button>}

              <Button onClick={createSlots} loading={loading}>
                Create Slot
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
