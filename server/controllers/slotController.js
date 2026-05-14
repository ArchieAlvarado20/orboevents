const Slot = require("../models/Slot");
const Event = require("../models/Event");

// ==============================
// GET SLOTS BY EVENT
// ==============================
const getSlotsByEvent = async (req, res) => {
  try {
    const slots = await Slot.find({
      event: req.params.eventId,
    }).sort({ date: 1 });

    res.json(slots);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==============================
// CREATE SLOTS
// ==============================
const createSlots = async (req, res) => {
  try {
    const { eventId } = req.params;

    const { name, date, startTime, endTime, capacity } = req.body;

    if (!name || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const slot = await Slot.create({
      event: eventId,
      name,
      date,
      startTime,
      endTime,
      capacity,
    });

    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createBulkSlots = async (req, res) => {
  try {
    const { eventId } = req.params;

    const { slots } = req.body;

    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({
        message: "Slots are required",
      });
    }

    // VALIDATE ALL
    for (const slot of slots) {
      if (!slot.name || !slot.date || !slot.startTime || !slot.endTime) {
        return res.status(400).json({
          message: "Some slots have missing fields",
        });
      }
    }

    const payload = slots.map((slot) => ({
      event: eventId,

      name: slot.name,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,

      capacity: Number(slot.capacity) || 0,
    }));

    const createdSlots = await Slot.insertMany(payload);

    res.status(201).json({
      message: "Slots created successfully",
      slots: createdSlots,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==============================
// DELETE SLOT
// ==============================
const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.slotId);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    res.json({
      message: "Slot deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getSlotsByEvent,
  createSlots,
  deleteSlot,
  createBulkSlots,
};
