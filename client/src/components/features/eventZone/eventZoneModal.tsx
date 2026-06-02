import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import Select from "@/components/shared/Select";
import Checkbox from "@/components/shared/Checkbox";

import useEventZoneForm from "@/hooks/eventZone/useEventZoneForm";

import { EventForm } from "@/types/event";
import { EventZoneFormType } from "@/types/eventZone.type";
import { ZoneFormType } from "@/types/zone.type";

interface EventZoneModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;

  event: EventForm;

  zones: ZoneFormType[];

  eventZone?: EventZoneFormType | null;
}

export default function EventZoneModal({
  open,
  onClose,
  onSuccess,
  event,
  zones,
  eventZone,
}: EventZoneModalProps) {
  const modalRef = useRef(null);

  const {
    form,
    setForm,
    handleChange,
    createEventZone,
    updateEventZone,
    loading,
    errors,
    resetErrors,
  } = useEventZoneForm(event?._id, () => {
    onSuccess();
    onClose();
  });

  useEffect(() => {
    if (eventZone) {
      setForm({
        _id: eventZone._id,

        zoneId:
          typeof eventZone.zoneId === "string"
            ? eventZone.zoneId
            : eventZone.zoneId?._id || "",

        capacity: eventZone.capacity,
        entryTime: eventZone.entryTime || "",

        isReEntryAllowed: eventZone.isReEntryAllowed,
        scanOrder: eventZone.scanOrder,

        isActive: eventZone.isActive,
      });
    } else {
      resetErrors();

      setForm({
        zoneId: "",

        capacity: "",
        entryTime: "",

        isReEntryAllowed: false,
        scanOrder: "",

        isActive: true,
      });
    }
  }, [eventZone, open]);

  const handleSubmit = async () => {
    let success = false;

    if (eventZone?._id) {
      success = await updateEventZone(eventZone._id);
    } else {
      success = await createEventZone();
    }

    if (success) {
      onSuccess();
      onClose();
    }
  };

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
            className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-900">
                {eventZone ? "Update Event Zone" : "Create Event Zone"}
              </h3>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 overflow-y-auto space-y-6">
              {/* ZONE */}
              <Select
                label="Select Zone"
                name="zoneId"
                value={form.zoneId}
                onChange={handleChange}
                error={errors.zoneId}
                options={zones.map((zone) => ({
                  label: zone.name,
                  value: zone._id || "",
                }))}
              />

              {/* CAPACITY */}
              <Input
                label="Zone Capacity"
                name="capacity"
                type="number"
                placeholder="0"
                value={form.capacity}
                onChange={handleChange}
                error={errors.capacity}
              />

              {/* ENTRY TIME */}
              <Input
                label="Entry Time"
                name="entryTime"
                type="time"
                value={form.entryTime}
                onChange={handleChange}
                error={errors.entryTime}
              />

              {/* SCAN ORDER */}
              <Input
                label="Scan Order"
                name="scanOrder"
                type="number"
                value={form.scanOrder}
                onChange={handleChange}
                error={errors.scanOrder}
              />

              {/* RE ENTRY */}
              <div className=" grid grid-cols-2 rounded-xl p-4">
                <Checkbox
                  label="Allow Re-entry"
                  name="isReEntryAllowed"
                  checked={form.isReEntryAllowed}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isReEntryAllowed: !prev.isReEntryAllowed,
                    }))
                  }
                />

                {/* STATUS */}
                <Select
                  label="Status"
                  name="isActive"
                  className="hidden"
                  value={form.isActive ? "true" : "false"}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isActive: e.target.value === "true",
                    }))
                  }
                  options={[
                    {
                      label: "Active",
                      value: "true",
                    },
                    {
                      label: "Inactive",
                      value: "false",
                    },
                  ]}
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
              <Button
                variant="outline"
                className="text-indigo-500"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button onClick={handleSubmit} loading={loading}>
                {eventZone ? "Update Event Zone" : "Create Event Zone"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
