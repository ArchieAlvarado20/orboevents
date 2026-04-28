const mongoose = require("mongoose");

const ticketTypeSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    capacity: Number, // total across all ticket types

    description: String,

    price: {
      type: Number,
      required: true,
    },

    quantityTotal: {
      type: Number,
      required: true,
    },

    quantitySold: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    accessLevel: {
      type: String,
      enum: ["vip", "media", "general", "speaker", "staff"],
      default: "general",
    },

    privileges: [String],

    requiresApproval: {
      type: Boolean,
      default: false,
    },

    color: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TicketType", ticketTypeSchema);
