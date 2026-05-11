// eventSchema.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    // 🟨 BASIC INFO
    name: { type: String, required: true },
    description: String,
    image: String,

    // 🟦 RELATIONSHIPS (NEW STRUCTURE)
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    eventType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventType",
      required: true,
    },

    // 🟪 SCHEDULE (flexible based on EventType)
    schedule: {
      startDate: Date,
      endDate: Date, // for multi-day

      date: Date, // for single-day fallback

      startTime: String, // "06:00 PM"
      endTime: String,
    },

    // 📍 LOCATION
    location: String,

    // 👥 CAPACITY
    capacity: { type: Number, default: 0 },

    // 💰 BASE PRICE (fallback only)
    basePrice: { type: Number, default: 0 },

    // 🏷 ORGANIZER INFO
    organizer: {
      name: String,
      contactNumber: String,
    },

    // 🔖 TAGS / SEARCH
    tags: [String],

    // ⚙️ RULES (computed from EventType but override possible)
    rules: {
      allowWalkin: { type: Boolean, default: true },
      requiresApproval: { type: Boolean, default: false },
    },

    // 📊 STATUS
    status: {
      type: String,
      enum: ["draft", "pending", "active", "cancelled", "completed"],
      default: "draft",
    },

    // 🎟 RELATIONSHIPS
    ticketTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TicketType",
      },
    ],

    slots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
