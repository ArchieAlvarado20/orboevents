const express = require("express");

const router = express.Router();

const {
  createEventZone,
  getEventZones,
  getEventZonesByEvent,
  getEventZoneById,
  updateEventZone,
  deleteEventZone,
} = require("../controllers/eventZoneController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// CREATE
router.post(
  "/event/:eventId",
  authMiddleware,
  adminMiddleware,
  createEventZone,
);

// GET ALL
router.get("/", authMiddleware, adminMiddleware, getEventZones);

// GET BY EVENT
router.get(
  "/event/:eventId",
  authMiddleware,
  adminMiddleware,
  getEventZonesByEvent,
);

// GET SINGLE
router.get("/:id", authMiddleware, adminMiddleware, getEventZoneById);

// UPDATE
router.put("/:id", authMiddleware, adminMiddleware, updateEventZone);

// DELETE
router.patch("/:id", authMiddleware, adminMiddleware, deleteEventZone);

module.exports = router;
