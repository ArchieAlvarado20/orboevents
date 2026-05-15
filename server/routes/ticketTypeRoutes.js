const express = require("express");
const router = express.Router();

const {
  createTicketType,
  getTicketTypesByEvent,
  updateTicketType,
  deleteTicketType,
} = require("../controllers/ticketTypeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/ticket-types/", createTicketType);
router.get(
  "/events/:eventId/ticket-types",
  authMiddleware,
  adminMiddleware,
  getTicketTypesByEvent,
);

router.put("/ticket-types/:id", updateTicketType);
router.patch("/ticket-types/:id/delete", deleteTicketType);

module.exports = router;
