// eventSchema.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,

  date: { type: Date, required: true },
  startTime: String, // "06:00 PM"
  endTime: String,

  location: String, // "Grand Sheraton Palace, Indore, Madhya Pradesh"

  capacity: Number, // total across all ticket types

  price: { type: Number, default: 0 }, // fallback/display price

  image: String,

  category: {
    type: String,
    enum: [
      "Sports & Travel",
      "Sports & Travel",
      "Science & Research",
      "New Years Eve",
      "Industrial Engineering",
      "Holi",
      "Health & Wellness",
      "Garbe",
      "Public Event",
    ],
    default: "Public Event",
  },

  status: {
    type: String,
    enum: ["pending", "active", "cancelled", "completed"],
    default: "active",
  },

  // ✦ NEW — organizer info (visible on event page, used for contact)
  organizerName: String, // "Prabhat Agrawal"
  contactNumber: String, // "8827336161"

  // ✦ NEW — discovery & filtering
  tags: [String], // ["startup", "award", "networking", "business"]

  // ✦ NEW — entry rules
  dressCode: String, // "Formal"

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
