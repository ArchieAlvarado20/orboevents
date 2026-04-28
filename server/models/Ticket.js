// ticketSchema.js — separate collection, one doc per purchase
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Reference the embedded subdoc by its auto-generated _id
  ticketTypeId: { type: mongoose.Schema.Types.ObjectId, required: true },

  // Snapshot — store at purchase time so you don't lose data if the event is edited
  ticketTypeName: String, // "VIP / Red Carpet"
  accessLevel: String, // "vip"

  // ✦ NEW — zone assignment (assigned at check-in or purchase)
  zoneId: mongoose.Schema.Types.ObjectId,

  pricePaid: { type: Number, default: 0 },

  // QR validation
  qrToken: { type: String, unique: true, required: true },

  status: {
    type: String,
    enum: ["active", "used", "cancelled"],
    default: "active",
  },

  // ✦ NEW
  checkInTime: Date,
  isTransferred: { type: Boolean, default: false },

  purchasedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);
