const mongoose = require("mongoose");

const ticketTypeSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
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

    // 🔥 REPLACED accessLevel
    allowedZones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventZone",
      },
    ],

    accessLevel: {
      type: String,
      enum: ["vip", "premium", "regular"],
      default: "regular",
    },

    // optional extra perks/features
    privileges: [String],

    color: String,

    // approval workflow
    status: {
      type: String,
      enum: ["pending", "cancelled", "published"],
      default: "pending",
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
