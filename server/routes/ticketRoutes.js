const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTicket,
  getMyTickets,
  verifyTicket,
  getTicketsByTransaction,
  getAllTickets,
} = require("../controllers/ticketController");

// 🎟️ User tickets
router.get("/me", authMiddleware, getMyTickets);

// 🎟️ Tickets per transaction (success page)
router.get("/transaction/:id", authMiddleware, getTicketsByTransaction);

// 🛠️ Admin: lahat ng tickets
router.get("/", authMiddleware, adminMiddleware, getAllTickets);

router.post("/tickets/verify", authMiddleware, adminMiddleware, verifyTicket);

module.exports = router;
