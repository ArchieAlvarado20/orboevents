// forms/event/event.validation.ts
import { EventForm } from "./useEvent";

export type EventErrors = Partial<Record<keyof EventForm, string>>;

export function validateEvent(form: EventForm): EventErrors {
  const errors: EventErrors = {};

  if (!form.name) errors.name = "Required";
  if (!form.location) errors.location = "Required";
  if (!form.startTime) errors.startTime = "Required";
  if (!form.endTime) errors.endTime = "Required";
  if (!form.description) errors.description = "Required";
  if (!form.capacity) errors.capacity = "Required";
  if (!form.price) errors.price = "Required";
  if (!form.image) errors.image = "Required";

  if (!form.date) {
    errors.date = "Date is required";
  } else {
    const today = new Date();
    const selected = new Date(form.date);
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      errors.date = "Date must be in the future";
    }
  }

  if (!form.contactNumber) {
    errors.contactNumber = "Required";
  }

  return errors;
}
