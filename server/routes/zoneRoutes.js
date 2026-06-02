const express = require("express");
const router = express.Router();

const {
  createZone,
  getZones,
  updateZone,
  deleteZone,
  approveZone,
} = require("../controllers/zoneController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// =========================
// CREATE ZONE (per event)
// =========================
router.post("/", authMiddleware, adminMiddleware, createZone);

// =========================
// GET ZONES BY EVENT (IMPORTANT FOR YOUR UI)
// =========================
router.get("/", authMiddleware, adminMiddleware, getZones);

// =========================
// GET SINGLE ZONE
// // =========================
// router.get("/:id", authMiddleware, adminMiddleware, getZoneById);

// =========================
// UPDATE ZONE
// =========================
router.put("/:id", authMiddleware, adminMiddleware, updateZone);

// =========================
// DELETE ZONE (soft delete)
// =========================
router.delete("/:id", authMiddleware, adminMiddleware, deleteZone);

// =========================
// APPROVE ZONE (optional workflow)
// =========================
router.patch("/:id/approve", authMiddleware, adminMiddleware, approveZone);

module.exports = router;
