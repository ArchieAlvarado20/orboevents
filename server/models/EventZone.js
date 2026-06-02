const mongoose = require("mongoose");

const eventZoneSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    zoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },

    capacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    entryTime: {
      type: String,
    },

    isReEntryAllowed: {
      type: Boolean,
      default: false,
    },

    scanOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// prevent duplicate zone assignment per event
eventZoneSchema.index(
  {
    eventId: 1,
    zoneId: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("EventZone", eventZoneSchema);
