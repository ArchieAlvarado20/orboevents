const eventTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["single-day", "multi-day", "time-slot"],
      required: true,
    },

    label: String, // "Single Day Event", "Time Slot Event"

    // 🧠 UI BEHAVIOR FLAGS
    uiConfig: {
      showDateRange: { type: Boolean, default: false },
      showSingleDate: { type: Boolean, default: true },

      showTimeSlots: { type: Boolean, default: false },
      requireSlots: { type: Boolean, default: false },

      allowMultiDaySelection: { type: Boolean, default: false },
    },

    // ⚙️ RULE ENGINE
    rules: {
      requiresCapacityPerSlot: { type: Boolean, default: false },
      maxTicketsPerBooking: { type: Number, default: 1 },
      enforceSchedule: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("EventType", eventTypeSchema);
