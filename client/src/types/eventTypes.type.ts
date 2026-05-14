export interface EventTypeFormData {
  _id: string;
  name: "single-day" | "multi-day" | "time-slot" | "recurring" | "";
  label: string;

  description: string;

  uiConfig: {
    showDate: boolean;
    showDateRange: boolean;
    showSlots: boolean;
  };

  status: "active" | "inactive";
}

export const eventTypeInitialForm: EventTypeFormData = {
  _id: "",
  name: "",
  label: "",
  description: "",

  uiConfig: {
    showDate: false,
    showDateRange: false,
    showSlots: false,
  },

  status: "active",
};

export const EVENT_TYPE_NOTES = [
  {
    name: "single-day",
    title: "Single Day Event",
    note: "Perfect for concerts, seminars, competitions, and one-time gatherings that happen on a single date.",
  },

  {
    name: "multi-day",
    title: "Multi Day Event",
    note: "Designed for conferences, expos, festivals, retreats, and events that run across multiple days.",
  },

  {
    name: "time-slot",
    title: "Time Slot Event",
    note: "Best for appointments, workshops, training sessions, and events with selectable schedules or booking slots.",
  },

  {
    name: "recurring",
    title: "Recurring Event",
    note: "Ideal for weekly classes, church services, monthly meetings, and repeating activities over time.",
  },
];
