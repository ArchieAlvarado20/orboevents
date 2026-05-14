const EventType = require("../models/EventType");

// ==============================
// CREATE EVENT TYPE
// ==============================
const createEventType = async (req, res) => {
  try {
    const { name, label, uiConfig, status, description } = req.body;

    const existing = await EventType.findOne({ name });

    if (existing) {
      return res.status(400).json({
        message: "Event type already exists",
      });
    }

    const eventType = await EventType.create({
      name,
      label,
      description,
      uiConfig,
      status,
    });

    res.status(201).json({
      message: "Event type created successfully",
      eventType,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// GET ALL EVENT TYPES
// ==============================
const getEventTypes = async (req, res) => {
  try {
    const eventTypes = await EventType.find().sort({
      createdAt: -1,
    });

    res.status(200).json(eventTypes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// GET SINGLE EVENT TYPE
// ==============================
const getEventType = async (req, res) => {
  try {
    const { id } = req.params;

    const eventType = await EventType.findById(id);

    if (!eventType) {
      return res.status(404).json({
        message: "Event type not found",
      });
    }

    res.status(200).json(eventType);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// UPDATE EVENT TYPE
// ==============================
const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, label, uiConfig, status, description } = req.body;

    const eventType = await EventType.findById(id);

    if (!eventType) {
      return res.status(404).json({
        message: "Event type not found",
      });
    }

    if (name && name !== eventType.name) {
      const existing = await EventType.findOne({ name });

      if (existing) {
        return res.status(400).json({
          message: "Event type already exists",
        });
      }
    }

    eventType.name = name || eventType.name;
    eventType.label = label || eventType.label;
    eventType.description = description || eventType.description;
    eventType.uiConfig = uiConfig || eventType.uiConfig;
    eventType.status = status || eventType.status;

    await eventType.save();

    res.status(200).json({
      message: "Event type updated successfully",
      eventType,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// DELETE EVENT TYPE
// ==============================
const deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;

    const eventType = await EventType.findById(id);

    if (!eventType) {
      return res.status(404).json({
        message: "Event type not found",
      });
    }

    await eventType.deleteOne();

    res.status(200).json({
      message: "Event type deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEventType,
  getEventTypes,
  getEventType,
  updateEventType,
  deleteEventType,
};
