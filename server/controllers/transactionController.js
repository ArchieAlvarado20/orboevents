const Transaction = require("../models/Transaction");
const Ticket = require("../models/Ticket");
const { v4: uuidv4 } = require("uuid");

const checkout = async (req, res) => {
  try {
    const { userId, items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items found" });
    }

    // 1. COMPUTE TOTAL
    let subtotal = 0;

    items.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const discount = 0; // later promo code
    const discountAmount = subtotal * (discount / 100);
    const serviceFee = 10;
    const total = subtotal - discountAmount + serviceFee;

    // 2. CREATE TRANSACTION (PENDING)
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

    // 3. CREATE TICKETS
    const tickets = [];

    for (const item of items) {
      for (let i = 0; i < item.quantity; i++) {
        tickets.push({
          eventId: item.eventId,
          userId,
          transactionId: transaction._id,
          ticketTypeId: item.ticketTypeId,
          ticketTypeName: item.name,
          accessLevel: item.accessLevel,
          pricePaid: item.price,
          qrToken: uuidv4(),
          status: "active",
        });
      }
    }

    const createdTickets = await Ticket.insertMany(tickets);

    return res.status(201).json({
      message: "Checkout successful",
      transaction,
      tickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

module.exports = { checkout, getUserTransactions, getTransactionById };
