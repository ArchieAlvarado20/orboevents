const express = require("express");

const router = express.Router();

const {
  getSlotsByEvent,
  createSlots,
  deleteSlot,
  createBulkSlots,
} = require("../controllers/slotController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// GET EVENT SLOTS
router.get(
  "/events/:eventId/slots",
  authMiddleware,
  adminMiddleware,
  getSlotsByEvent,
);

// CREATE SLOTS
router.post("/events/:eventId/slots", createSlots);

router.post("/events/:eventId/slots/bulk", createBulkSlots);

// DELETE SLOT
router.delete("/slots/:slotId", deleteSlot);

module.exports = router;
