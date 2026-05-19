const EventZone = require("../models/EventZone");

// CREATE EVENT ZONE
const createEventZone = async (req, res) => {
  try {
    const { eventId } = req.params;

    const {
      zoneId,
      capacity,
      entryTime,
      isReEntryAllowed,
      scanOrder,
      isActive,
    } = req.body;

    // prevent duplicate
    const existing = await EventZone.findOne({
      eventId,
      zoneId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Zone already assigned to this event",
      });
    }

    const eventZone = await EventZone.create({
      eventId,
      zoneId,
      capacity,
      entryTime,
      isReEntryAllowed,
      scanOrder,
      isActive,
    });

    res.status(201).json(eventZone);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// GET ALL EVENT ZONES
const getEventZones = async (req, res) => {
  try {
    const eventZones = await EventZone.find()
      .populate("eventId", "name")
      .populate("zoneId", "name description");

    res.json(eventZones);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET EVENT ZONES BY EVENT
const getEventZonesByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const eventZones = await EventZone.find({
      eventId,
      isActive: { $in: true },
    })
      .populate("zoneId", "name description")
      .sort({ scanOrder: 1 });

    res.json(eventZones);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET SINGLE EVENT ZONE
const getEventZoneById = async (req, res) => {
  try {
    const eventZone = await EventZone.findById(req.params.id)
      .populate("eventId", "name")
      .populate("zoneId", "name description");

    if (!eventZone) {
      return res.status(404).json({
        message: "Event zone not found",
      });
    }

    res.json(eventZone);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE EVENT ZONE
const updateEventZone = async (req, res) => {
  try {
    const updated = await EventZone.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Event zone not found",
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE EVENT ZONE
const deleteEventZone = async (req, res) => {
  try {
    const deleted = await EventZone.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
      },
      { new: true },
    );

    if (!deleted) {
      return res.status(404).json({
        message: "Event zone not found",
      });
    }

    res.json({
      message: "Event zone deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createEventZone,
  getEventZones,
  getEventZonesByEvent,
  getEventZoneById,
  updateEventZone,
  deleteEventZone,
};
