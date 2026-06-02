const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: {
      type: String,
      required: true,
    },

    description: String,

    image: String,

    // RELATIONS
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

    // ORGANIZER INFO
    organizer: {
      name: String,
      email: String,
      phone: String,
      company: String,
    },

    // WHO CREATED EVENT IN SYSTEM
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // LOCATION
    location: String,

    venue: String,

    // DISPLAY PRICE
    basePrice: {
      type: Number,
      default: 0,
    },

    // TOTAL CAPACITY
    capacity: {
      type: Number,
      default: 0,
    },

    // TAGS
    tags: [String],

    // STATUS
    status: {
      type: String,
      enum: ["draft", "pending", "published", "cancelled", "completed"],
      default: "draft",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: Date,

    rejectionReason: String,

    // TICKETS
    ticketTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TicketType",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
