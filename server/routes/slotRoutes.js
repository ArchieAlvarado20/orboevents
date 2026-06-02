const express = require("express");

const router = express.Router();

const {
  getSlotsByEvent,
  createSlots,
  deleteSlot,
  createBulkSlots,
  approveSlot,
  cancelSlot,
  getSlotById,
} = require("../controllers/slotController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

// PUBLIC
router.get("/events/:eventId/public/slots", getSlotsByEvent);
router.get("/slot/:slotId", getSlotById);

// GET EVENT SLOTS
router.get(
  "/events/:eventId/slots",
  authMiddleware,
  adminMiddleware,
  getSlotsByEvent,
);

router.patch(
  "/slots/:id/approve",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("APPROVE_SLOTS"),
  approveSlot,
);

router.patch(
  "/slots/:id/cancel",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("APPROVE_SLOTS"),
  cancelSlot,
);

// CREATE SLOTS
router.post("/events/:eventId/slots", createSlots);

router.post("/events/:eventId/slots/bulk", createBulkSlots);

// DELETE SLOT
router.delete("/slots/:slotId", deleteSlot);

module.exports = router;
