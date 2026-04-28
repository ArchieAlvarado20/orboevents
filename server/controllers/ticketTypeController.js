const TicketType = require("../models/TicketType");

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
      requiresApproval,
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
      requiresApproval,
      color,
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📄 GET Ticket Types by Event
const getTicketTypesByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const tickets = await TicketType.find({ eventId });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE Ticket Type
const updateTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await TicketType.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Ticket type not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE Ticket Type
const deleteTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TicketType.findByIdAndDelete(id);

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
};
