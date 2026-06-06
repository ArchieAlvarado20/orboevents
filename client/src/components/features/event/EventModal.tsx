import { X } from "lucide-react";
import { useRef } from "react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Textarea from "@/components/shared/TextAria";
import Button from "@/components/shared/Button";
import FileUpload from "@/components/shared/FileUpload";
import useEventForm from "@/hooks/eventHook/useEventForm";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EventModal({
  open,
  onClose,
  onSuccess,
}: EventModalProps) {
  const modalRef = useRef(null);

  const categoryOptions = [
    { label: "Sports & Travel", value: "Sports & Travel" },
    { label: "Science & Research", value: "Science & Research" },
    { label: "New Years Eve", value: "New Years Eve" },
    { label: "Industrial Engineering", value: "Industrial Engineering" },
    { label: "Holi", value: "Holi" },
    { label: "Health & Wellness", value: "Health & Wellness" },
    { label: "Garbe", value: "Garbe" },
    { label: "Public Event", value: "Public Event" },
  ];

  const { form, setForm, handleChange, createEvent, loading, errors } =
    useEventForm(() => {
      onSuccess();
      onClose();
    });
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-900 border border-white/10 w-full max-w-2xl sm:rounded-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white"
          >
            {/* Top gradient highlight */}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600" />

            {/* <!-- Header --> */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Create New Event
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Fill in the details below to publish your event</p>
              </div>
              <button
                onClick={() => onClose()}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="px-6 py-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <FileUpload
                label={<span className="text-sm font-semibold text-slate-200">Event Image</span>}
                value={form.image}
                error={errors.image}
                clickNote="Click here to upload event image."
                onChange={(file) =>
                  setForm((prev) => ({
                    ...prev,
                    image: file,
                  }))
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <!-- Event Name --> */}
                <Input
                  label="Event Name"
                  name="name"
                  type="text"
                  placeholder="e.g. Neon Dance Festival"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                {/* <!-- Category --> */}
                <Select
                  label="Event Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={categoryOptions}
                />
                {/* <!-- Organizer Name --> */}
                <Input
                  label="Organizer Name"
                  name="organizerName"
                  type="text"
                  placeholder="e.g. Orbo Events Ltd."
                  value={form.organizerName}
                  onChange={handleChange}
                  error={errors.organizerName}
                />
                {/* <!-- Organizer Contact --> */}
                <Input
                  label="Organizer Contact No."
                  name="contactNumber"
                  type="number"
                  placeholder="e.g. 8812345678"
                  value={form.contactNumber}
                  onChange={handleChange}
                  error={errors.contactNumber}
                />
                {/* <!-- Date & Time --> */}
                <Input
                  label="Date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  error={errors.date}
                />
                {/* <!-- Start Time --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Start Time"
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={handleChange}
                    error={errors.startTime}
                  />
                  {/* <!-- End Time --> */}
                  <Input
                    label="End Time"
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={handleChange}
                    error={errors.endTime}
                  />
                </div>
                {/* <!-- Location --> */}
                <Input
                  label="Location"
                  name="location"
                  type="text"
                  placeholder="e.g. Grand Arena, Sector 4"
                  className="md:col-span-2"
                  value={form.location}
                  onChange={handleChange}
                  error={errors.location}
                />
                {/* <!-- Description --> */}
                <Textarea
                  label="Description"
                  name="description"
                  className="md:col-span-2"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell attendees more about your event..."
                  rows={4}
                  error={errors.description}
                />
                {/* <!-- Ticket Capacity --> */}
                <Input
                  label="All Zones Total Capacity"
                  name="capacity"
                  type="number"
                  placeholder="500"
                  value={form.capacity}
                  onChange={handleChange}
                  error={errors.capacity}
                  min={0}
                />
                {/* <!-- Ticket Price --> */}
                <Input
                  label="Tickets starts at  "
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  error={errors.price}
                  min={0}
                />
                {/* <!-- Tags --> */}
                <Input
                  label="Tags #"
                  name="tags"
                  type="text"
                  placeholder="music, festival, dance"
                  className="md:col-span-1"
                  value={form.tags}
                  onChange={handleChange}
                  error={errors.tags}
                />
                {/* <!-- Dress Code --> */}
                <Input
                  label="Dress Code"
                  name="dressCode"
                  type="text"
                  className="md:col-span-1"
                  placeholder="e.g. Smart Casual"
                  value={form.dressCode}
                  onChange={handleChange}
                  error={errors.dressCode}
                />
              </div>
            </div>
            {/* <!-- Footer --> */}
            <div className="px-6 py-4 border-t border-white/5 bg-slate-950/40 flex items-center justify-end gap-3 sticky bottom-0 z-10">
              <button
                onClick={() => onClose()}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                Cancel
              </button>

              <button
                onClick={createEvent}
                disabled={loading}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] hover:shadow-indigo-500/35 active:scale-95 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>Create Event</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
