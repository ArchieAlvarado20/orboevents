const express = require("express");

const {
  createEventType,
  getEventTypes,
  getEventType,
  updateEventType,
  deleteEventType,
} = require("../controllers/eventTypeController");

const router = express.Router();

// CREATE
router.post("/", createEventType);

// READ ALL
router.get("/", getEventTypes);

// READ ONE
router.get("/:id", getEventType);

// UPDATE
router.put("/:id", updateEventType);

// DELETE
router.delete("/:id", deleteEventType);

module.exports = router;
