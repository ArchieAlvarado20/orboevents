import { X, Settings } from "lucide-react";
import { useEffect, useRef } from "react";

import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import Select from "@/components/shared/Select";

import { useEventTypeForm } from "@/hooks/eventType/useEventTypeForm";
import type { EventType } from "@/hooks/eventType/useEventType";
import { eventTypeInitialForm } from "@/types/eventTypes.type";
import Textarea from "@/components/shared/TextAria";

interface EventTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  eventType: EventType | null;
}

export default function EventTypeModal({
  open,
  onClose,
  onSuccess,
  eventType,
}: EventTypeModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const {
    form,
    setForm,
    errors,
    loading,
    createEventType,
    updateEventType,
    resetForm,
  } = useEventTypeForm();

  // ==============================
  // HANDLE CHANGE
  // ==============================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==============================
  // UI CONFIG TOGGLE
  // ==============================
  const toggleUIConfig = (key: keyof typeof form.uiConfig) => {
    setForm((prev) => ({
      ...prev,
      uiConfig: {
        ...prev.uiConfig,
        [key]: !prev.uiConfig[key],
      },
    }));
  };

  // ==============================
  // SUBMIT
  // ==============================
  const handleSubmit = async () => {
    let success = false;

    if (eventType) {
      success = await updateEventType(eventType._id);
    } else {
      success = await createEventType();
    }

    if (success) {
      onSuccess();
      onClose();
    }
  };

  // ==============================
  // SET EDIT DATA
  // ==============================
  useEffect(() => {
    if (eventType) {
      setForm({
        _id: eventType._id,
        name: eventType.name,
        label: eventType.label,
        description: eventType.description,
        uiConfig: {
          showDate: eventType.uiConfig?.showDate || false,
          showDateRange: eventType.uiConfig?.showDateRange || false,
          showSlots: eventType.uiConfig?.showSlots || false,
        },
        status: eventType.status || "active",
      });
    } else {
      setForm(eventTypeInitialForm);
      resetForm();
    }
  }, [eventType, open]);

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
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Settings className="text-indigo-600" size={20} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {eventType ? "Update Event Type" : "Create Event Type"}
                  </h3>

                  <p className="text-sm text-slate-400">
                    Configure event behavior rules
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 space-y-5 overflow-y-auto">
              {/* TYPE */}
              <Input
                label="Event Types Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              {/* LABEL */}
              <Input
                label="Label"
                name="label"
                value={form.label}
                onChange={handleChange}
                error={errors.label}
              />

              {/* DESCRIPTION */}
              <Textarea
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Enter event type description"
              />

              {/* UI CONFIG */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">
                  UI Configuration
                </label>

                <div className="grid grid-cols-1 gap-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.uiConfig.showDate}
                      onChange={() => toggleUIConfig("showDate")}
                    />
                    Show Date Picker
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.uiConfig.showDateRange}
                      onChange={() => toggleUIConfig("showDateRange")}
                    />
                    Show Date Range
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.uiConfig.showSlots}
                      onChange={() => toggleUIConfig("showSlots")}
                    />
                    Show Time Slots
                  </label>
                </div>

                {errors.uiConfig && (
                  <p className="text-red-500 text-xs">{errors.uiConfig}</p>
                )}
              </div>

              {/* STATUS */}
              <Select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={statusOptions}
              />
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button onClick={handleSubmit} loading={loading}>
                {eventType ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
