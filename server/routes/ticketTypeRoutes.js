const express = require("express");
const router = express.Router();

const {
  createTicketType,
  getTicketTypesByEvent,
  updateTicketType,
  deleteTicketType,
} = require("../controllers/ticketTypeController");

router.post("/", createTicketType);
router.get("/:eventId", getTicketTypesByEvent);
router.put("/:id", updateTicketType);
router.delete("/:id", deleteTicketType);

module.exports = router;
