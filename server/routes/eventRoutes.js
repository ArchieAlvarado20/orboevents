const express = require("express");
const multer = require("multer");

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  approveEvent,
  getAdminEvents,
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// PUBLIC
router.get("/events", getEvents);
router.get("/events/:id/public", getEventById);

// ADMIN
router.get(
  "/admin/events",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware(["MANAGE_EVENT"]),
  getAdminEvents,
);

router.get("/admin/events/:id", authMiddleware, adminMiddleware, getEventById);

router.post(
  "/admin/events",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  permissionMiddleware(["MANAGE_EVENT"]),
  createEvent,
);

router.patch(
  "/admin/events/:id/approve",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware(["APPROVE_EVENT"]),
  approveEvent,
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
  permissionMiddleware(["APPROVE_EVENT"]),
  deleteEvent,
);

module.exports = router;
