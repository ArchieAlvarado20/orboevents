const TicketType = require("../models/TicketType");
const Event = require("../models/Event");

// 📄 GET Ticket Types by Event
const getTicketTypesByEvent = async (req, res) => {
  try {
    const tickets = await TicketType.find({
      eventId: req.params.eventId, // ✔ FIXED
      isActive: true,
      status: ["pending", "published"], // or remove for debug
    }).sort({ createdAt: 1 });

    return res.json(tickets);
  } catch (err) {
    console.error("GET TICKETS ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};

// ➕ CREATE Ticket Type
const createTicketType = async (req, res) => {
  try {
    const {
      eventId,
      name,
      description,
      price,
      quantityTotal,
      accessLevel,
      privileges,
      color,
    } = req.body;

    // 🔥 prevent duplicate ticket type per event (IMPORTANT)
    const existing = await TicketType.findOne({
      eventId,
      name,
    });

    if (existing) {
      return res.status(400).json({
        message: "Ticket type already exists for this event",
      });
    }

    const ticket = await TicketType.create({
      eventId,
      name,
      description,
      price,
      quantityTotal,
      accessLevel,
      privileges,
      color,

      status: "pending",
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE Ticket Type
const updateTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await TicketType.findByIdAndUpdate(
      id,
      {
        ...req.body,
        status: "pending",
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Ticket type not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    const approved = await TicketType.findByIdAndUpdate(
      id,
      {
        status: "published",

        approvedBy: req.user._id,
        approvedAt: new Date(),
      },
      {
        new: true,
      },
    );

    if (!approved) {
      return res.status(404).json({
        message: "Ticket type not found",
      });
    }

    res.json({
      message: "Ticket type approved successfully",
      ticketType: approved,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TicketType.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!deleted) {
      return res.status(404).json({ message: "Ticket type not found" });
    }

    res.json({ message: "Ticket type deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTicketType,
  getTicketTypesByEvent,
  updateTicketType,
  deleteTicketType,
  approveTicketType,
};
