import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/TextAria";
import Button from "@/components/shared/Button";
import Select from "@/components/shared/Select";
import useZoneForm from "@/hooks/zone/useZoneForm";
import { EventForm } from "@/types/event";
import { initialZoneForm, ZoneFormType } from "@/types/zone.type";

interface ZoneModalProps {
  zone: ZoneFormType;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ZoneModal({
  zone,
  open,
  onClose,
  onSuccess,
}: ZoneModalProps) {
  const modalRef = useRef(null);

  const statusOptions = [
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
  ];

  const {
    form,
    setForm,
    handleChange,
    createZone,
    loading,
    errors,
    updateZone,
    resetErrors,
  } = useZoneForm(() => {
    onSuccess();
    onClose();
  });

  const handleSubmit = async () => {
    let success = false;

    if (zone) {
      success = await updateZone(zone._id);
    } else {
      success = await createZone();
    }

    if (success) {
      onSuccess();
      onClose();
    }
  };

  useEffect(() => {
    if (zone) {
      resetErrors();
      setForm({
        _id: zone._id,
        name: zone.name,
        description: zone.description,
        isActive: zone.isActive,
      });
    } else {
      resetErrors();
      setForm(initialZoneForm);
    }
  }, [zone, open]);

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
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-900">
                {" "}
                {zone ? "Update Zone" : "Create Zone"}
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
              {/* Zone Name */}
              <Input
                label="Zone Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              {/* Description */}
              <Textarea
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                error={errors.description}
              />

              {/* Status */}
              <Select
                label="Status"
                name="isActive"
                value={form.isActive ? "true" : "false"}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    isActive: e.target.value === "true",
                  }))
                }
                options={statusOptions}
              />
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-slate-200  bg-slate-50 flex justify-end gap-3">
              <Button
                variant="outline"
                className="text-indigo-500"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button onClick={handleSubmit} loading={loading}>
                {zone ? "Update Zone" : "Create Zone"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
