const Transaction = require("../models/Transaction");
const Reservation = require("../models/Reservation");
const Ticket = require("../models/Ticket");
const { v4: uuidv4 } = require("uuid");
const { nanoid } = require("nanoid");
const Razorpay = require("razorpay");

const checkout = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { reservationIds, paymentMethod } = req.body;

    if (!reservationIds || reservationIds.length === 0) {
      return res.status(400).json({ message: "No reservations selected" });
    }

    // 1. GET VALID RESERVATIONS
    const reservations = await Reservation.find({
      _id: { $in: reservationIds },
      userId,
      status: "pending",
    })
      .populate("eventId")
      .populate("ticketTypeId")
      .populate("slotId");

    if (!reservations.length) {
      return res.status(400).json({ message: "No valid reservations" });
    }

    const items = reservations.map((r) => ({
      eventId: r.eventId,
      slotId: r.slotId,
      ticketTypeId: r.ticketTypeId,
      name: r.ticketTypeId.name,
      price: r.totalAmount,
      quantity: r.quantity,
    }));

    console.log("CHECKOUT ITEMS SENT:", items);
    // 3. COMPUTE TOTAL
    const subtotal = reservations.reduce((acc, r) => acc + r.totalAmount, 0);

    const discount = 0;
    const discountAmount = 0;
    const serviceFee = 0;

    const total = subtotal - discountAmount + serviceFee;

    // 4. CREATE TRANSACTION
    const transaction = await Transaction.create({
      userId,
      items,
      subtotal,
      discount,
      discountAmount,
      serviceFee,
      total,
      paymentMethod,
      status: "pending",
      referenceNo: uuidv4(),
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // 🔥 paise
      currency: "INR",
      receipt: transaction.referenceNo,
    });

    transaction.razorpayOrderId = razorpayOrder.id;
    await transaction.save();

    return res.status(201).json({
      message: "Transaction created",
      transaction,
      razorpayOrder,
    });
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);

    if (error instanceof Error) {
      console.error("MESSAGE:", error.message);
      console.error("STACK:", error.stack);

      return res.status(500).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Unknown server error",
    });
  }
};
//
// 📜 GET ALL USER TRANSACTIONS
//
const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//
// 🔍 GET SINGLE TRANSACTION
//
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id)
      .populate("userId", "name email")
      .populate("items.ticketId");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const paymentSuccess = async (req, res) => {
  try {
    const { transactionId, reservationIds } = req.body;

    if (!transactionId || !reservationIds?.length) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // 1. FIND TRANSACTION
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    // 2. MARK TRANSACTION PAID
    transaction.status = "paid";
    await transaction.save();

    // 3. UPDATE RESERVATIONS → CONFIRMED
    await Reservation.updateMany(
      {
        _id: { $in: reservationIds },
        status: "pending",
      },
      {
        $set: { status: "confirmed" },
      },
    );

    // 4. CREATE TICKETS
    const tickets = [];

    for (const item of transaction.items) {
      if (!item.eventId || !item.ticketTypeId) {
        console.log("INVALID ITEM:", item);
        continue;
      }

      for (let i = 0; i < item.quantity; i++) {
        tickets.push({
          eventId: item.eventId,
          slotId: item.slotId,
          ticketTypeId: item.ticketTypeId,
          userId: transaction.userId,
          transactionId: transaction._id,
          ticketTypeName: item.name,
          pricePaid: item.price,
          qrToken: nanoid(),
          status: "active",
        });
      }
    }

    await Ticket.insertMany(tickets);

    // 5. RESPONSE
    return res.json({
      success: true,
      transactionId: transaction._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  checkout,
  getUserTransactions,
  getTransactionById,
  paymentSuccess,
};
