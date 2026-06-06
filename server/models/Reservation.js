const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    ticketTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketType",
      required: true,
    },

    referenceNumber: {
      type: String,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "expired", "failed"],
      default: "pending",
      index: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "PHP",
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    confirmedAt: {
      type: Date,
    },

    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Reservation", reservationSchema);
