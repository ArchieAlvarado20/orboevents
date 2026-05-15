const express = require("express");
const multer = require("multer");

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// PUBLIC
router.get("/events", getEvents);
router.get("/events/:id", getEventById);

// ADMIN
router.get("/admin/events", authMiddleware, adminMiddleware, getEvents);

router.get("/admin/events/:id", authMiddleware, adminMiddleware, getEventById);

router.post(
  "/admin/events",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createEvent,
);

router.put(
  "/admin/events/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateEvent,
);

router.delete(
  "/admin/events/:id",
  authMiddleware,
  adminMiddleware,
  deleteEvent,
);

module.exports = router;
