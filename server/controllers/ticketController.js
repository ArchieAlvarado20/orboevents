const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const TicketType = require("../models/TicketType");
const QRCode = require("qrcode");
const { nanoid } = require("nanoid");

// GET TICKETS
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id })
      .populate("eventId", "name date location image startTime organizerName")
      .populate("slotId", "date capacity startTime endTime")
      .populate({
        path: "ticketTypeId",
        select: "name price accessLevel allowedZones",
        populate: {
          path: "allowedZones",
          select: "name",
        },
      })
      .populate("transactionId")
      .sort({ createdAt: -1 });

    res.json({ data: tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/tickets/transaction/:id
const getTicketsByTransaction = async (req, res) => {
  const tickets = await Ticket.find({
    transactionId: req.params.id,
  }).populate("eventId");

  res.json({ data: tickets });
};

// 🛠️ admin only
const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find()
    .populate("userId", "name email")
    .populate("eventId", "name");

  res.json({ data: tickets });
};

// VERIFY TICKET (used at entrance scanning)
const verifyTicket = async (req, res) => {
  try {
    const { qrToken, zoneId } = req.body;

    // 1. Find the ticket
    const ticket = await Ticket.findOne({ qrToken }).populate("eventId");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // 2. Status checks
    if (ticket.status === "used") {
      return res.status(400).json({ message: "Ticket already used" });
    }
    if (ticket.status === "cancelled") {
      return res.status(400).json({ message: "Ticket is cancelled" });
    }
    if (ticket.status === "pending") {
      return res.status(400).json({ message: "Ticket is pending approval" });
    }

    // 3. If scanner is checking a specific zone, validate access level
    if (zoneId) {
      const event = ticket.eventId; // already populated
      const zone = event.zones.id(zoneId);

      if (!zone) {
        return res.status(404).json({ message: "Zone not found" });
      }

      if (!zone.allowedTicketTypes.includes(ticket.accessLevel)) {
        return res.status(403).json({
          message: `Access denied: ${ticket.ticketTypeName} is not allowed in ${zone.name}`,
          accessLevel: ticket.accessLevel,
          allowedTypes: zone.allowedTicketTypes,
        });
      }
    }

    // 4. Mark as used and record check-in time
    ticket.status = "used";
    ticket.checkInTime = new Date();
    await ticket.save();

    res.json({
      message: "Entry allowed",
      ticket: {
        _id: ticket._id,
        ticketTypeName: ticket.ticketTypeName,
        accessLevel: ticket.accessLevel,
        checkInTime: ticket.checkInTime,
        event: {
          name: ticket.eventId.name,
          date: ticket.eventId.date,
          location: ticket.eventId.location,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyTickets,
  verifyTicket,
  getTicketsByTransaction,
  getAllTickets,
};
