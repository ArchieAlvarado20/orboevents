const express = require("express");
const router = express.Router();

const {
  createTicketType,
  getTicketTypesByEvent,
  updateTicketType,
  deleteTicketType,
  approveTicketType,
  cancelTicketType,
} = require("../controllers/ticketTypeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

router.post("/ticket-types/", createTicketType);
router.get(
  "/events/:eventId/ticket-types",
  authMiddleware,
  adminMiddleware,
  getTicketTypesByEvent,
);

router.patch(
  "/ticket-types/:id/approve",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("APPROVE_TICKETTYPES"),
  approveTicketType,
);

router.patch(
  "/ticket-types/:id/cancel",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("APPROVE_TICKETTYPES"),
  cancelTicketType,
);

router.put("/ticket-types/:id", updateTicketType);
router.patch("/ticket-types/:id/delete", deleteTicketType);

module.exports = router;
