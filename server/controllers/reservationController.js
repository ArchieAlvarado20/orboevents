const Reservation = require("../models/Reservation.js");
const TicketType = require("../models/TicketType.js");

const HOLD_MINUTES = 10;

const generateRef = () => {
  return "RSV-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
};

const createReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, ticketTypeId, slotId, quantity } = req.body;

    // 1. check existing reservation (anti duplicate)
    // const existing = await Reservation.findOne({
    //   userId,
    //   eventId,
    //   status: { $in: "pending" },
    // });

    // if (existing) {
    //   return res.status(400).json({
    //     message: "You already have a reservation for this event.",
    //   });
    // }

    // CHECK IF USER RESERVED DIFFERENT TICKET TYPE
    const existingDifferentTicket = await Reservation.findOne({
      userId,
      eventId,
      slotId,
      ticketTypeId: {
        $ne: ticketTypeId,
      },

      status: {
        $in: ["pending"],
      },
    });

    if (existingDifferentTicket) {
      return res.status(400).json({
        message:
          "Making reservation of another section is not allowed for this event.",
      });
    }

    // TOTAL RESERVED + CONFIRMED FOR THIS EVENT
    const totalReservations = await Reservation.countDocuments({
      userId,
      eventId,
      status: "pending",
    });
    // 2. atomic slot lock (CRITICAL)
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    if (qty + totalReservations > 5) {
      return res.status(400).json({
        message: "Maximum of 5 reservations per event only",
      });
    }

    const ticket = await TicketType.findOneAndUpdate(
      {
        _id: ticketTypeId,
        $expr: {
          $lte: [
            {
              $add: ["$quantitySold", "$quantityReserved", qty],
            },
            "$quantityTotal",
          ],
        },
      },
      {
        $inc: { quantityReserved: qty },
      },
      { new: true },
    );

    if (!ticket) {
      return res.status(400).json({
        message: "No available slots",
      });
    }

    // 3. create reservation
    const expiresAt = new Date(Date.now() + HOLD_MINUTES * 60 * 1000);

    const reservations = [];

    for (let i = 0; i < qty; i++) {
      const reservation = await Reservation.create({
        userId,
        eventId,
        slotId,
        ticketTypeId,
        referenceNumber: generateRef(),
        quantity: 1,
        totalAmount: ticket.price,
        expiresAt,
        status: "pending",
      });

      reservations.push(reservation);
    }

    return res.status(201).json({
      message: "Reservation created",
      reservations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservations = await Reservation.find({
      userId,
      status: { $nin: ["confirmed", "cancelled", "expired"] },
    })
      .populate("eventId", "name image date location")
      .populate("slotId", "date capacity startTime endTime")
      .populate("ticketTypeId", "name price accessLevel")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reservations.length,
      reservations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (reservation.status === "cancelled") {
      return res.status(400).json({ message: "Already cancelled" });
    }

    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // 1. update reservation
    reservation.status = "cancelled";
    reservation.cancelledAt = new Date();
    await reservation.save();

    // 2. return slot to ticket type
    await TicketType.findByIdAndUpdate(reservation.ticketTypeId, {
      $inc: { quantityReserved: -1 },
    });

    return res.json({
      message: "Reservation cancelled successfully",
      reservation,
    });
  } catch (error) {
    console.error("CANCEL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const expireReservations = async () => {
  try {
    const expired = await Reservation.find({
      status: "pending",
      expiresAt: { $lt: new Date() },
    });

    for (const r of expired) {
      r.status = "expired";
      await r.save();

      // release slot
      await TicketType.findByIdAndUpdate(r.ticketTypeId, {
        $inc: { quantityReserved: -1 },
      });
    }

    console.log(`Expired: ${expired.length}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  cancelReservation,
  expireReservations,
};
