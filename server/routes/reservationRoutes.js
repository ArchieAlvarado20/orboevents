const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createReservation,
  getMyReservations,
  cancelReservation,
} = require("../controllers/reservationController");

// CREATE reservation
router.post("/", authMiddleware, createReservation);

// GET user reservations
router.get("/my", authMiddleware, getMyReservations);

// CANCEL reservation
router.patch("/:id/cancel", authMiddleware, cancelReservation);

module.exports = router;
