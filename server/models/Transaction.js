const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // 👤 User who made the purchase
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🎟️ Tickets purchased
    items: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          required: true,
        },

        slotId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Slot",
          required: true,
        },
        ticketTypeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TicketType",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    // 💰 Breakdown
    subtotal: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0, // percent or fixed (ikaw bahala standard)
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    serviceFee: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    // 💳 Payment info
    paymentMethod: {
      type: String,
      enum: ["stripe", "razorpay", "paypal"],
      default: "razorpay",
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled", "refunded"],
      default: "pending",
    },

    // 🔖 reference / receipt
    referenceNo: {
      type: String,
      unique: true,
    },

    // 📦 optional: QR or ticket code
    qrCode: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionSchema);
