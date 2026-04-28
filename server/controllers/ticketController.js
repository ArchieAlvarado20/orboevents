const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const QRCode = require("qrcode");
const { nanoid } = require("nanoid");

// CREATE TICKET
const createTicket = async (req, res) => {
  try {
    const { eventId, ticketTypeId, zoneId } = req.body;

    if (!eventId || !ticketTypeId) {
      return res.status(400).json({
        message: "eventId and ticketTypeId are required",
      });
    }

    // 1. Fetch the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.status !== "active") {
      return res.status(400).json({ message: "Event is not active" });
    }

    // 2. Find the requested ticket type inside the event
    const ticketType = event.ticketTypes.id(ticketTypeId);
    if (!ticketType) {
      return res.status(404).json({ message: "Ticket type not found" });
    }

    if (!ticketType.isActive) {
      return res
        .status(400)
        .json({ message: "This ticket type is no longer available" });
    }

    // 3. Check stock
    if (ticketType.quantitySold >= ticketType.quantityTotal) {
      return res.status(400).json({ message: "This ticket type is sold out" });
    }

    // 4. If a zone is requested, validate it
    let zone = null;
    if (zoneId) {
      zone = event.zones.id(zoneId);
      if (!zone) {
        return res.status(404).json({ message: "Zone not found" });
      }

      // Check if this ticket type's accessLevel is allowed in the zone
      if (!zone.allowedTicketTypes.includes(ticketType.accessLevel)) {
        return res.status(403).json({
          message: `Access denied: ${ticketType.name} is not allowed in ${zone.name}`,
        });
      }

      // Check zone capacity
      if (zone.currentOccupancy >= zone.capacity) {
        return res
          .status(400)
          .json({ message: `${zone.name} is at full capacity` });
      }
    }

    // 5. If ticket type requires approval, flag it as pending instead of active
    const initialStatus = ticketType.requiresApproval ? "pending" : "active";

    // 6. Create the ticket — snapshot key fields from ticketType
    const ticket = await Ticket.create({
      eventId,
      userId: req.user.id,
      ticketTypeId,
      ticketTypeName: ticketType.name,
      accessLevel: ticketType.accessLevel,
      zoneId: zoneId || null,
      pricePaid: ticketType.price,
      qrToken: nanoid(),
      status: initialStatus,
    });

    // 7. Increment quantitySold on the embedded subdoc and save
    ticketType.quantitySold += 1;

    // 8. Increment zone occupancy if zone was assigned
    if (zone) {
      zone.currentOccupancy += 1;
    }

    await event.save();

    // 9. Generate QR code — embed key info for scanner
    const qrData = JSON.stringify({
      ticketId: ticket._id,
      qrToken: ticket.qrToken,
      eventId: ticket.eventId,
      accessLevel: ticket.accessLevel,
      zoneId: ticket.zoneId,
    });

    const qrCodeImage = await QRCode.toDataURL(qrData);
    ticket.qrCode = qrCodeImage;
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET TICKETS
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("userId", "name email")
      .populate("eventId", "name date location organizerName");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

module.exports = { createTicket, getTickets, verifyTicket };
