const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    name: String,

    startTime: String,
    endTime: String,

    capacity: {
      type: Number,
      default: 0,
    },

    booked: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Slot", slotSchema);
