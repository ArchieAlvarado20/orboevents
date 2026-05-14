const express = require("express");

const router = express.Router();

const {
  getSlotsByEvent,
  createSlots,
  deleteSlot,
  createBulkSlots,
} = require("../controllers/slotController");

// GET EVENT SLOTS
router.get("/events/:eventId/slots", getSlotsByEvent);

// CREATE SLOTS
router.post("/events/:eventId/slots", createSlots);

router.post("/events/:eventId/slots/bulk", createBulkSlots);

// DELETE SLOT
router.delete("/slots/:slotId", deleteSlot);

module.exports = router;
