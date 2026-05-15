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

    quantityReserved: {
      type: Number,
      default: 0,
    },

    accessLevel: {
      type: String,
      enum: ["vip", "media", "general", "speaker", "staff"],
      default: "general",
    },

    privileges: [String],

    color: String,

    // 🔥 NEW: Approval workflow
    status: {
      type: String,
      enum: ["draft", "pending", "rejected", "published"],
      default: "draft",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: Date,

    rejectionReason: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TicketType", ticketTypeSchema);
