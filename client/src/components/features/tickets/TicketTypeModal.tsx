import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/TextAria";
import Select from "@/components/shared/Select";
import Button from "@/components/shared/Button";
import { MoreVertical, X } from "lucide-react";
import Checkbox from "@/components/shared/Checkbox";
import { useRef } from "react";
import useTicketTypeForm from "@/hooks/useTicketTypeForm";

export type EventType = {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  image?: string;
  status: "draft" | "active" | "cancelled" | "completed";
  color: "green";
};

type TicketTypeModalProps = {
  event: EventType;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function TicketTypeModal({
  event,
  open,
  onClose,
  onSuccess,
}: TicketTypeModalProps) {
  const modalRef = useRef(null);

  const statusStyle = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-gray-100 text-gray-600",
  };

  const accessLevelOptions = [
    { label: "Vip", value: "vip" },
    { label: "Media", value: "media" },
    { label: "General", value: "general" },
    { label: "Speaker", value: "speaker" },
    { label: "Staff", value: "staff" },
  ];

  const { form, setForm, handleChange, createTicketType, loading, errors } =
    useTicketTypeForm(event._id, () => {
      onSuccess();
      onClose();
    });

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
            className="relative bg-white dark:bg-slate-900 w-full max-w-2xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* <!-- Header --> */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Create New Ticket for this Event
              </h3>
              <button
                onClick={() => onClose()}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
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
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white leading-tight">
                {event.name}
              </h3>

              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="px-6 py-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Ticket Type(Zone)"
                  name="name"
                  type="text"
                  placeholder="Name (VIP / GA)"
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

              <Input
                label="Privileges"
                name="privileges"
                onChange={handleChange}
                placeholder="Privileges (comma separated)"
                className="md:col-span-2"
                value={form.privileges}
                error={errors.privileges}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="flex gap-3">
                  <div className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    <span>Ticket Badge Color: </span>
                  </div>
                  {[
                    { name: "green", label: "" },
                    { name: "yellow", label: "" },
                    { name: "red", label: "" },
                  ].map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setForm({ ...form, color: c.name })}
                      className={`w-10 h-10 rounded-lg  flex items-center justify-center ${
                        form.color === c.name ? "ring-2 ring-indigo-500" : ""
                      }`}
                      style={{ backgroundColor: c.name }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* <!-- Footer --> */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-end gap-3 sticky bottom-0 z-10">
                <Button variant="outline" onClick={() => onClose()}>
                  cancel
                </Button>

                <Button onClick={createTicketType} loading={loading}>
                  Create Ticket
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
