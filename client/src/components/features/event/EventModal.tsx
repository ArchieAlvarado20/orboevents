import { X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Textarea from "@/components/shared/TextAria";
import Button from "@/components/shared/Button";
import FileUpload from "@/components/shared/FileUpload";

import useEventForm from "@/hooks/eventHook/useEventForm";
import { useCategory } from "@/hooks/category/useCategory";
import { useEventType } from "@/hooks/eventType/useEventType";
import { EventForm, EventInitialForm } from "@/types/event";
import { error } from "console";
import { currency } from "@/types/currency.type";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event: EventForm;
}

export default function EventModal({
  open,
  onClose,
  onSuccess,
  event,
}: EventModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { categories } = useCategory();
  const { eventTypes } = useEventType();

  const {
    form,
    setForm,
    createEvent,
    handleChange,
    loading,
    errors,
    setEditData,
    resetForm,
    updateEvent,
  } = useEventForm(() => {
    onSuccess();
    onClose();
  });

  const [preview, setPreview] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async () => {
    let success = false;

    if (event) {
      success = await updateEvent(event._id);
    } else {
      success = await createEvent();
    }

    if (success) {
      onSuccess();
      onClose();
    }
    setShowAdvanced(true);
  };

  useEffect(() => {
    if (event) {
      setEditData(event);
    } else {
      setForm(EventInitialForm);
      resetForm();
    }
  }, [event, open]);

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (event?.image) {
      setPreview(event.image);
    }
  }, [event]);

  const EVENT_TYPE_LABELS: Record<string, string> = {
    "single-day": "Single Day Event",
    "multi-day": "Multi Day Event",
    "time-slot": "Time Slot Event",
    recurring: "Recurring Event",
  };

  const selectedEventType = eventTypes.find((e) => e._id === form.eventType);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b flex justify-between border-slate-200">
              <h3 className="text-xl font-bold">Create Event</h3>
              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* BODY */}

            {showAdvanced ? (
              <>
                <div className="px-6 py-6 overflow-y-auto space-y-5">
                  {/* EVENT TYPE (ObjectId FIXED) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Event Type
                    </label>

                    <div className="flex flex-wrap gap-2 py-2">
                      {eventTypes.map((e) => {
                        const isActive = form.eventType === e._id;

                        const getColor = (name: string) => {
                          switch (name) {
                            case "single-day":
                              return "bg-blue-100 text-blue-700 border-blue-300";
                            case "multi-day":
                              return "bg-green-100 text-green-700 border-green-300";
                            case "time-slot":
                              return "bg-purple-100 text-purple-700 border-purple-300";
                            case "recurring":
                              return "bg-orange-100 text-orange-700 border-orange-300";
                            default:
                              return "bg-slate-100  text-slate-700 border-slate-300";
                          }
                        };

                        return (
                          <button
                            key={e._id}
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                eventType: e._id,
                              }))
                            }
                            className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                              isActive
                                ? getColor(e.name) + " ring-1 ring-offset-1 "
                                : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {EVENT_TYPE_LABELS[e.name] || e.name}
                          </button>
                        );
                      })}
                    </div>
                    {errors.eventType && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.eventType}
                      </p>
                    )}
                  </div>

                  {/* ORGANIZER (EMBEDDED OBJECT) */}
                  <div className="grid grid-cols-2 gap-3 border-slate-200 border-t border-dashed py-5">
                    <Input
                      label="Organizer Name"
                      name="organizer.name"
                      value={form.organizer.name}
                      type="text"
                      error={errors.organizer_name}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          organizer: {
                            ...prev.organizer,
                            name: e.target.value,
                          },
                        }))
                      }
                    />

                    <Input
                      label="Email"
                      name="organizer.email"
                      type="email"
                      value={form.organizer.email}
                      error={errors.organizer_email}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          organizer: {
                            ...prev.organizer,
                            email: e.target.value,
                          },
                        }))
                      }
                    />

                    <Input
                      label="Phone"
                      name="organizer.phone"
                      type="number"
                      value={form.organizer.phone}
                      error={errors.organizer_phone}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          organizer: {
                            ...prev.organizer,
                            phone: e.target.value,
                          },
                        }))
                      }
                    />

                    <Input
                      label="Company"
                      name="organizer.company"
                      value={form.organizer.company}
                      error={errors.organizer_company}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          organizer: {
                            ...prev.organizer,
                            company: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="px-6 py-6 overflow-y-auto space-y-5">
                {/* IMAGE */}
                <FileUpload
                  label="Event Image"
                  clickNote="Click here to add event banner."
                  preview={preview}
                  value={form.image}
                  error={errors.image}
                  onChange={handleImageChange}
                />

                {/* BASIC INFO */}
                <Input
                  label="Event Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <Textarea
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  error={errors.description}
                />

                {/* CATEGORY (ObjectId FIXED) */}
                <Select
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c._id, // ✅ IMPORTANT
                  }))}
                  error={errors.category}
                />

                {/* LOCATION */}
                <Input
                  label="Location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  error={errors.location}
                />

                <Input
                  label="Venue"
                  name="venue"
                  type="text"
                  value={form.venue}
                  onChange={handleChange}
                  error={errors.venue}
                />

                {/* PRICE + CAPACITY */}
                <Input
                  label={`Base Price (${currency.rupees})`}
                  name="basePrice"
                  type="number"
                  value={form.basePrice}
                  onChange={handleChange}
                  error={errors.basePrice}
                />

                <Input
                  label="Total Event Capacity"
                  name="capacity"
                  type="number"
                  value={form.capacity}
                  onChange={handleChange}
                  error={errors.capacity}
                />

                {/* TAGS */}
                <Input
                  label="Tags (comma separated)"
                  name="tags"
                  type="text"
                  value={form.tags.join(",")}
                  error={errors.tags}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    }))
                  }
                />

                <Select
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  options={[
                    { label: "Draft", value: "draft" },
                    { label: "Active", value: "active" },
                    { label: "Pending", value: "pending" },
                    { label: "Cancelled", value: "cancelled" },
                    { label: "Completed", value: "completed" },
                  ]}
                />
              </div>
            )}

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  if (showAdvanced) {
                    setShowAdvanced(false);
                  } else {
                    onClose();
                  }
                }}
              >
                {showAdvanced ? "Back" : "Cancel"}
              </Button>

              <Button onClick={handleSubmit} loading={loading}>
                {event ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
