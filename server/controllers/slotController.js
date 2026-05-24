const Slot = require("../models/Slot");
const Event = require("../models/Event");

// ==============================
// GET SLOTS BY EVENT
// ==============================
const getSlotsByEvent = async (req, res) => {
  try {
    const slots = await Slot.find({
      event: req.params.eventId,
      status: { $in: ["published", "pending"] },
    }).sort({ date: 1 });

    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const getSlotById = async (req, res) => {
  try {
    const { slotId } = req.params;

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    const existing = await Slot.findOne({
      event: eventId,
      name,
    });

    if (existing) {
      return res.status(400).json({
        message: "Slot name already exists for this event",
      });
    }

    const slot = await Slot.create({
      event: eventId,
      name,
      date,
      startTime,
      endTime,
      capacity,

      status: "pending",
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
    for (const slot of slots) {
      const existing = await Slot.findOne({
        event: eventId,
        name: slot.name,
      });

      if (existing) {
        return res.status(400).json({
          message: `Slot name already exists: ${slot.name}`,
        });
      }
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

      status: "pending",
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

const approveSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const approved = await Slot.findByIdAndUpdate(
      id,
      {
        status: "published",

        approvedBy: req.user._id,
        approvedAt: new Date(),
      },
      { new: true },
    );

    if (!approved) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    res.json({
      message: "Slot approved successfully",
      slot: approved,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const cancelSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const cancelled = await Slot.findByIdAndUpdate(
      id,
      {
        status: "cancelled",

        cancelledBy: req.user._id,
        cancelledAt: new Date(),
      },
      { new: true },
    );

    if (!cancelled) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    res.json({
      message: "Slot cancelled successfully",
      slot: cancelled,
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
  getSlotById,
  getSlotsByEvent,
  createSlots,
  deleteSlot,
  createBulkSlots,
  approveSlot,
  cancelSlot,
};
