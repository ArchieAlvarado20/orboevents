const mongoose = require("mongoose");

const eventTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    label: String,

    uiConfig: {
      showDate: Boolean,
      showDateRange: Boolean,
      showSlots: Boolean,
    },

    description: String,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("EventType", eventTypeSchema);
