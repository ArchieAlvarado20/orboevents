import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { EventForm } from "@/types/event";
import { MoreVertical, X, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import useSlotBulkForm from "@/hooks/slot/useSlotBulkForm";

interface SlotBulkModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event: EventForm;
}

export default function SlotBulkModal({
  event,
  open,
  onClose,
  onSuccess,
}: SlotBulkModalProps) {
  const modalRef = useRef(null);
  const eventId = event?._id;

  const {
    form,
    addSlot,
    updateSlot,
    createManySlots,
    errors,
    removeSlot,
    isLastSlotValid,
  } = useSlotBulkForm(eventId, () => {
    onSuccess();
    onClose();
  });

  useEffect(() => {
    if (!open) {
      // reset handled inside hook or optional reset logic
    }
  }, [open]);

  const handleSubmit = async () => {
    await createManySlots();
  };

  const statusStyle = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-gray-100 text-gray-600",
  };

  return (
    <>
      {" "}
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
                Create New Slots for this Event
              </h3>
              <button
                onClick={() => onClose()}
                className="p-2 text-slate-400 hover:text-slate-600  transition-colors"
              >
                <X />
              </button>
            </div>
            {/* <!-- Body --> */}
            <div className="px-0 py-0 overflow-y-auto space-y-0">
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

                <button className="hidden text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* SLOT LIST */}
              {form.slots.map((slot, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl p-4 space-y-3 relative shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-md transition group m-5"
                >
                  {/* REMOVE SLOT */}
                  {form.slots.length > 1 && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-slate-500"
                      onClick={() => removeSlot(index)}
                    >
                      <X size={16} />
                    </button>
                  )}

                  <Input
                    label="Slot Name"
                    value={slot.name}
                    onChange={(e) => updateSlot(index, "name", e.target.value)}
                    error={errors[index]?.name}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      type="date"
                      label="Date"
                      value={slot.date}
                      onChange={(e) =>
                        updateSlot(index, "date", e.target.value)
                      }
                      error={errors[index]?.date}
                      min={new Date().toISOString().split("T")[0]}
                    />

                    <Input
                      type="number"
                      label="Capacity"
                      placeholder="0"
                      value={slot.capacity}
                      onChange={(e) =>
                        updateSlot(index, "capacity", e.target.value)
                      }
                      error={errors[index]?.capacity}
                    />

                    <Input
                      type="time"
                      label="Start Time"
                      value={slot.startTime}
                      onChange={(e) =>
                        updateSlot(index, "startTime", e.target.value)
                      }
                      error={errors[index]?.startTime}
                    />

                    <Input
                      type="time"
                      label="End Time"
                      value={slot.endTime}
                      onChange={(e) =>
                        updateSlot(index, "endTime", e.target.value)
                      }
                      error={errors[index]?.endTime}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={addSlot}
                  disabled={!isLastSlotValid()}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Slot
                </Button>
              </div>

              <Button onClick={handleSubmit}>Create Slots</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
