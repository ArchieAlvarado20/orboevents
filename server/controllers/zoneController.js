const Zone = require("../models/Zone");
const Event = require("../models/Event");

// =========================
// CREATE ZONE
// =========================
const createZone = async (req, res) => {
  try {
    const { eventId, name, description, isActive } = req.body;

    const zone = await Zone.create({
      name,
      description,
      isActive,
    });

    return res.status(201).json(zone);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// =========================
// GET ZONES BY EVENT
// =========================
const getZones = async (req, res) => {
  try {
    const zones = await Zone.find().sort({ createdAt: 1 });

    res.json(zones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// UPDATE ZONE
// =========================
const updateZone = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Zone.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// DELETE ZONE (soft delete style)
// =========================
const deleteZone = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Zone.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!deleted) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.json({ message: "Zone deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// APPROVE ZONE (optional workflow like ticketType)
// =========================
const approveZone = async (req, res) => {
  try {
    const { id } = req.params;

    const approved = await Zone.findByIdAndUpdate(
      id,
      {
        isActive: true,
        approvedBy: req.user._id,
        approvedAt: new Date(),
      },
      { new: true },
    );

    if (!approved) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.json({
      message: "Zone approved successfully",
      zone: approved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createZone,
  getZones,
  updateZone,
  deleteZone,
  approveZone,
};
