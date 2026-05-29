const express = require("express");
const router = express.Router();
const {
  getDashboardOverview,
  getReservationDashboard,
} = require("../controllers/adminDashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

// OPTIONAL AUTH MIDDLEWARE
// const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET DASHBOARD OVERVIEW
router.get(
  "/overview",
  // protect,
  // adminOnly,
  authMiddleware,
  adminMiddleware,
  permissionMiddleware(["MANAGE_EVENT"]),
  getDashboardOverview,
);

// GET RESERVATION DASHBOARD
router.get(
  "/reservations",
  // protect,
  // adminOnly,
  getReservationDashboard,
);

module.exports = router;
