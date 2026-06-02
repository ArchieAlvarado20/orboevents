import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/TextAria";
import Select from "@/components/shared/Select";
import Button from "@/components/shared/Button";
import { MoreVertical, TicketCheckIcon, X } from "lucide-react";
import Checkbox from "@/components/shared/Checkbox";
import { useRef } from "react";
import useTicketTypeForm from "@/hooks/ticketTypeHook/useTicketTypeForm";
import { EventForm } from "@/types/event";
import { accessLevelColorMap } from "@/types/ticketTypes";
import { EventZoneFormType } from "@/types/eventZone.type";
import { SlotType } from "@/hooks/slot/useSlot";

type TicketTypeModalProps = {
  event: EventForm;
  slots: SlotType[];
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  eventZones: EventZoneFormType[];
};

export default function TicketTypeModal({
  eventZones,
  slots,
  event,
  open,
  onClose,
  onSuccess,
}: TicketTypeModalProps) {
  const modalRef = useRef(null);

  const accessLevelOptions = [
    { label: "Vip", value: "vip" },
    { label: "Premium", value: "premium" },
    { label: "Regular", value: "regular" },
  ];

  const { form, setForm, handleChange, createTicketType, loading, errors } =
    useTicketTypeForm(event._id, () => {
      onSuccess();
      onClose();
    });

  const toggleEventZone = (id: string) => {
    setForm((prev) => ({
      ...prev,
      allowedZones: Array.isArray(prev.allowedZones)
        ? prev.allowedZones.includes(id)
          ? prev.allowedZones.filter((x) => x !== id)
          : [...prev.allowedZones, id]
        : [id],
    }));
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
                Create New Ticket for this Event
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
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                  event.status === "published"
                    ? "bg-green-100 text-green-700"
                    : event.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : event.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                }`}
              >
                {event.status}
              </span>

              <div className="text-sm text-slate-500 mt-2">
                Status Preview:{" "}
                <span className="font-semibold">
                  {form.requiresApproval ? "PENDING APPROVAL" : "PUBLISHED"}
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

            <div className="px-6 py-6 overflow-y-auto space-y-6">
              <Select
                label="Slot (Schedule)"
                name="slotId"
                value={form.slotId}
                onChange={handleChange}
                options={slots
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((s) => ({
                    label: s.name,
                    value: s._id, // ✅ IMPORTANT
                  }))}
                error={errors.slotId}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Ticket Type"
                  name="name"
                  type="text"
                  placeholder="Name VIP TICKETS"
                  className="md:col-span-1"
                  onChange={handleChange}
                  error={errors.name}
                />

                <Input
                  label="Total Quantity"
                  name="quantityTotal"
                  type="number"
                  placeholder=""
                  className="md:col-span-1"
                  onChange={handleChange}
                  error={errors.quantityTotal}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Ticket Price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="md:col-span-1"
                  onChange={handleChange}
                  error={errors.price}
                  min={0}
                />
                <Select
                  label="Access Level"
                  name="accessLevel"
                  value={form.accessLevel}
                  onChange={handleChange}
                  options={accessLevelOptions}
                  error={errors.accessLevel}
                />
              </div>
              <Textarea
                label="Description"
                name="description"
                className="md:col-span-2"
                value={form.description}
                onChange={handleChange}
                placeholder="Tell attendees more about your tickets..."
                rows={4}
                error={errors.description}
              />

              <div className="block text-sm font-semibold text-slate-700  mb-2">
                <span>Allowed Zones: </span>
              </div>
              <div
                className={`grid grid-cols-3 border  p-5 rounded-lg ${errors.allowedZones ? "border-red-500" : "border-slate-200"}`}
              >
                {eventZones.map((ez) => (
                  <label key={ez._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.allowedZones.includes(ez._id)}
                      onChange={() => toggleEventZone(ez._id)}
                    />
                    {ez.zoneId?.name}
                  </label>
                ))}
              </div>

              {errors.allowedZones && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.allowedZones}
                </p>
              )}

              <Input
                label="Privileges"
                name="privileges"
                onChange={handleChange}
                placeholder="Privileges (comma separated)"
                className="md:col-span-2"
                value={form.privileges}
                error={errors.privileges}
              />

              <div className="hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                <Checkbox
                  label="Requires Approval"
                  name="requiresApproval"
                  checked={form.requiresApproval}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      requiresApproval: value,
                    }))
                  }
                  description="Tickets must be approved by admin before confirmation"
                />
              </div>

              <div className="flex gap-3">
                <div className="block text-sm font-semibold text-slate-700  mb-2">
                  <span>Ticket Badge Color: </span>
                </div>
                <span
                  style={{
                    color: accessLevelColorMap[form.accessLevel ?? "regular"],
                  }}
                >
                  <TicketCheckIcon size={24} />
                </span>
              </div>

              {/* <!-- Footer --> */}
              <div className="px-6 py-2 mt-2 border-t text-indigo-400 border-slate-300  bg-slate-50/50  flex items-center justify-end gap-3 sticky bottom-0 z-10">
                <Button
                  variant="outline"
                  className="text-indigo-500"
                  onClick={() => onClose()}
                >
                  cancel
                </Button>

                <Button onClick={createTicketType} loading={loading}>
                  Create <span className="hidden sm:inline">Ticket</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
